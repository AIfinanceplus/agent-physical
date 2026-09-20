#!/usr/bin/env python3
"""抓取并解析全部 BOM 文件，得到"物料是否真的可采购"的实测值。

为什么要抓内容而不是只看文件名：目录里 78 个项目"有 BOM"这件事本身不说明
它可采购。真正决定能不能买到零件的是 BOM 里有没有型号、厂家、价格。
只看文件名等于把"存在一个叫 BOM.csv 的文件"当成"能买到零件"——那就是幻觉。

解析结果落盘 data/bom-content.json，重跑不再重复抓取。
解析不了的格式**如实记为 unparsed 并写明原因**，绝不当成 0 行行项——
"没测到"和"测到是 0"是两件事，混为一谈会让评分失真。
"""
from __future__ import annotations

import csv
import io
import json
import re
import sys
import urllib.parse
import urllib.request
import zipfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import build_projects as B  # noqa: E402

OUT = ROOT / "data" / "bom-content.json"
UA = {"User-Agent": "agent-physical-bom-audit"}

# 四类关键列：有型号才能买到指定件，有厂家才能找替代，有价格才能做预算。
COL_RX = {
    "mpn": re.compile(r"(型号|规格|料号|货号|mpn|manufacturer\s*part|mfr\s*part|"
                      r"part\s*(number|no\.?|#|id)|pn\b|sku|digikey\s*part|"
                      r"component|器件|物料名称)", re.I),
    "supplier": re.compile(r"(供应商|厂家|厂商|店铺|品牌|渠道|supplier|vendor|manufacturer|"
                           r"mfr|source|来源|购买|链接|link|url)", re.I),
    "price": re.compile(r"(单价|价格|价钱|参考价|price|cost|usd|rmb|cny|￥|¥|\$)", re.I),
    "qty": re.compile(r"(数量|用量|个数|qty|quantity|pcs|需求)", re.I),
}

TEXT_EXT = {".csv", ".tsv", ".md", ".txt", ".json", ".xml", ".html"}
UNPARSED_EXT = {".pdf": "PDF 二进制，需专门解析器",
                ".xls": "旧版 Excel 二进制格式，标准库不支持",
                ".ods": "OpenDocument 表格，需专门解析器",
                ".docx": "Word 文档，需专门解析器"}

# 表头候选行必须在文件前部；真 BOM 表常跟在标题/签名块之后。
HEADER_SCAN = 60


def raw_url(full: str, path: str) -> str:
    # HEAD 让 GitHub 解析到默认分支，避免 master/main 写死导致 404。
    # 路径必须逐段转义：BOM 文件名里带空格是常态（"BOM - Arm.csv"），
    # 不转义会让 55 个文件直接 InvalidURL 全部丢掉。
    safe = "/".join(urllib.parse.quote(seg) for seg in path.split("/"))
    return f"https://raw.githubusercontent.com/{full}/HEAD/{safe}"


def fetch_bytes(url: str, limit: int = 8_000_000) -> tuple[bytes | None, str]:
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.read(limit), ""
    except Exception as e:
        return None, type(e).__name__


def looks_binary(text: str) -> bool:
    """真正的二进制判定。要在**解码成功之后**做，不能只看字节。"""
    if "\x00" in text:
        return True
    sample = text[:4000]
    if not sample:
        return False
    bad = sum(1 for c in sample if ord(c) < 9 or (13 < ord(c) < 32))
    return bad / len(sample) > 0.05


ENCODINGS = ("utf-8-sig", "utf-8", "gb18030", "big5", "utf-16", "latin-1")


def decode_text(data: bytes) -> tuple[str | None, str]:
    """按优先级试编码。

    中文项目的 BOM 常是 GBK/GB18030 或 UTF-16（Excel 另存为）。首版只试 UTF-8，
    于是 38 份中文 BOM 全被判成"疑似二进制"——那是测量失败，不是数据缺失。
    最后一个候选 latin-1 永不抛错，所以必须靠 looks_binary 兜底，不能直接信它。
    """
    for enc in ENCODINGS:
        try:
            t = data.decode(enc)
        except Exception:
            continue
        if not looks_binary(t):
            return t, enc
    return None, ""


def detect_cols(header: list[str]) -> dict[str, bool]:
    joined = " ".join(header)
    return {k: bool(rx.search(joined)) for k, rx in COL_RX.items()}


# ------------------------------------------------------------------ xlsx

def xlsx_shared(zf: zipfile.ZipFile) -> list[str]:
    try:
        sx = zf.read("xl/sharedStrings.xml").decode("utf-8", "replace")
    except KeyError:
        return []
    out = []
    for si in re.findall(r"<si>(.*?)</si>", sx, re.S):
        out.append(re.sub(r"<[^>]+>", "", si))
    return out


def xlsx_rows(data: bytes) -> list[list[str]]:
    """xlsx 是装着 XML 的 zip，标准库足够读出单元格文本。

    注意单元格属性必须从**完整标签**里取：首版的正则把 `t="s"` 属性吞掉了，
    于是共享字符串单元格被当成数字，表头读出来是 `['0','3','2','1']`——
    行号而不是列名，四类关键列一个都判不出来。
    """
    zf = zipfile.ZipFile(io.BytesIO(data))
    shared = xlsx_shared(zf)
    sheets = sorted(n for n in zf.namelist()
                    if re.match(r"xl/worksheets/sheet\d+\.xml$", n))
    if not sheets:
        raise ValueError("no worksheet")
    rows_out: list[list[str]] = []
    # 逐个工作表读，取行数最多的那张（BOM 不一定在第一张表）
    best: list[list[str]] = []
    for name in sheets[:5]:
        s = zf.read(name).decode("utf-8", "replace")
        cur: list[list[str]] = []
        for rxml in re.findall(r"<row[^>]*>(.*?)</row>", s, re.S):
            vals: list[str] = []
            for cell in re.findall(r"<c\b[^>]*>.*?</c>|<c\b[^>]*/>", rxml, re.S):
                head = cell[:cell.find(">") + 1]
                t = (re.search(r'\bt="([^"]*)"', head) or [None, ""])[1]
                v = re.search(r"<v>(.*?)</v>", cell, re.S)
                isv = re.search(r"<is>(.*?)</is>", cell, re.S)
                if isv:
                    text = re.sub(r"<[^>]+>", "", isv.group(1))
                elif v is None:
                    text = ""
                elif t == "s":
                    try:
                        text = shared[int(v.group(1))]
                    except Exception:
                        text = ""
                else:
                    text = v.group(1)
                vals.append(text.strip())
            while vals and not vals[-1]:
                vals.pop()
            if vals:
                cur.append(vals)
        if len(cur) > len(best):
            best = cur
    return best


# ------------------------------------------------------------------ 各格式

def pick_header_and_rows(rows: list[list[str]]) -> tuple[list[str], int]:
    """在前若干行里挑最像表头的一行：非空单元格最多、且含关键词。

    取第 0 行是错的——真 BOM 表前面常有标题、日期与签名块。
    """
    if not rows:
        return [], 0
    scan = rows[:HEADER_SCAN]
    best_i, best_score = 0, -1
    for i, r in enumerate(scan):
        filled = [c for c in r if c]
        if len(filled) < 2:
            continue
        joined = " ".join(filled)
        kw = sum(bool(rx.search(joined)) for rx in COL_RX.values())
        # 表头行几乎不含纯数字单元格
        numeric = sum(1 for c in filled if re.fullmatch(r"[\d.]+", c))
        score = kw * 10 + len(filled) - numeric * 2
        if score > best_score:
            best_i, best_score = i, score
    return rows[best_i], best_i


def finish(rows: list[list[str]], note: str = "") -> dict:
    header, idx = pick_header_and_rows(rows)
    body = rows[idx + 1:]
    # 行项 = 表头之后、至少有一个非空单元格的行
    data_rows = [r for r in body if any(c.strip() for c in r)]
    out = {"status": "ok", "rows": len(data_rows),
           "header": [c for c in header if c][:24],
           "cols": detect_cols([c for c in header if c])}
    if note:
        out["note"] = note
    if not data_rows:
        out["note"] = (out.get("note", "") + " 表头之后无可计行项").strip()
    return out


def parse_csv(text: str) -> dict:
    sample = text[:65536]
    # 分隔符按前 5 行里逗号/制表符/分号的出现次数投票，别信扩展名：
    # 真实数据里就有 .csv 其实是制表符分隔（KiCad/立创导出常见）。
    lines = [l for l in sample.splitlines() if l.strip()][:5]
    counts = {d: sum(l.count(d) for l in lines) for d in (",", "\t", ";")}
    delim = max(counts, key=counts.get) or ","
    rows = [r for r in csv.reader(io.StringIO(text), delimiter=delim)
            if any(c.strip() for c in r)]
    return finish(rows, f"分隔符 {delim!r}")


def parse_markdown(text: str) -> dict:
    """Markdown 里可能有多个表；取行数最多的那张（真 BOM 表通常不是第一张）。"""
    lines = text.splitlines()
    tables: list[list[list[str]]] = []
    cur: list[list[str]] = []
    for l in lines:
        if l.count("|") >= 2:
            if re.match(r"^\s*\|?[\s:|-]+\|?\s*$", l) and set(l.strip()) <= set("|-: "):
                continue
            cur.append([c.strip() for c in l.strip().strip("|").split("|")])
        else:
            if len(cur) >= 3:
                tables.append(cur)
            cur = []
    if len(cur) >= 3:
        tables.append(cur)
    if tables:
        best = max(tables, key=len)
        return finish(best, f"取 {len(tables)} 张表中最大的（{len(best)} 行）")
    items = [l for l in lines if re.match(r"^\s*(?:[-*+]|\d+[.)])\s+\S", l)]
    return {"status": "ok", "rows": len(items), "header": [],
            "cols": detect_cols(lines[:HEADER_SCAN]),
            "note": "无表格，按列表条目计数"}


def parse_json(text: str) -> dict:
    try:
        d = json.loads(text)
    except Exception as e:
        return {"status": "unparsed", "reason": f"JSON 解析失败: {type(e).__name__}"}
    arr = None
    if isinstance(d, list):
        arr = d
    elif isinstance(d, dict):
        cands = [v for v in d.values() if isinstance(v, list)]
        if cands:
            arr = max(cands, key=len)
    if arr is None:
        return {"status": "ok", "rows": 0, "header": [], "cols": detect_cols([])}
    header = sorted({k for it in arr[:5] if isinstance(it, dict) for k in it})
    return {"status": "ok", "rows": len(arr), "header": header[:24],
            "cols": detect_cols(header)}


def parse_text_generic(text: str) -> dict:
    lines = [l for l in text.splitlines() if l.strip()]
    return {"status": "ok", "rows": len(lines), "header": [],
            "cols": detect_cols(lines[:HEADER_SCAN]),
            "note": "纯文本，按非空行数计数"}


def parse(full: str, path: str) -> dict:
    """单个文件的解析。任何异常都收敛成 unparsed——

    一个坏文件不该让整批 197 个文件的抓取白跑（首版就是这样挂掉的，
    而且因为崩在写盘之前，全部结果一起丢了）。
    """
    ext = ("." + path.rsplit(".", 1)[-1].lower()) if "." in path.rsplit("/", 1)[-1] else ""
    url = raw_url(full, path)
    if ext in UNPARSED_EXT:
        return {"file": path, "url": url, "status": "unparsed",
                "reason": UNPARSED_EXT[ext]}
    try:
        if ext == ".xlsx":
            data, err = fetch_bytes(url)
            if data is None:
                return {"file": path, "url": url, "status": "fetch_failed", "reason": err}
            rows = xlsx_rows(data)
            if not rows:
                return {"file": path, "url": url, "status": "unparsed",
                        "reason": "xlsx 内无可用行"}
            return {"file": path, "url": url, **finish(rows)}
        data, err = fetch_bytes(url)
        if data is None:
            return {"file": path, "url": url, "status": "fetch_failed", "reason": err}
        text, enc = decode_text(data)
        if text is None:
            return {"file": path, "url": url, "status": "unparsed",
                    "reason": "所有候选编码下都呈现二进制"}
        if ext in (".csv", ".tsv"):
            r = parse_csv(text)
        elif ext in (".md", ".html"):
            r = parse_markdown(text)
        elif ext == ".json":
            r = parse_json(text)
        else:
            r = parse_text_generic(text)
        if enc not in ("utf-8", "utf-8-sig"):
            r["note"] = (r.get("note", "") + f" 编码 {enc}").strip()
        return {"file": path, "url": url, **r}
    except Exception as e:
        return {"file": path, "url": url, "status": "unparsed",
                "reason": f"解析异常: {type(e).__name__}"}


def main() -> None:
    src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    projects = json.loads(src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";"))

    jobs: list[tuple[str, str]] = []
    for p in projects:
        full = p["repository"].replace("https://github.com/", "")
        for e in B.load_tree(full) or []:
            if e.get("type") == "blob" and B.classify(e.get("path", "")) == "BOM":
                jobs.append((full, e["path"]))

    done: dict = {}
    if OUT.exists():
        done = json.loads(OUT.read_text(encoding="utf-8"))

    force = "--force" in sys.argv

    def reusable(f: str, p: str) -> bool:
        """只复用成功与"确定解析不了"的结果。

        fetch_failed 必须重试：它可能是瞬时网络失败，也可能是本脚本自己的 bug
        （首版路径不转义，一次丢掉 55 个带空格的文件）。把它当终局结果缓存，
        等于把 bug 永久固化进数据。
        """
        if force:
            return False
        st = (done.get(f) or {}).get(p, {}).get("status")
        return st in ("ok", "unparsed")

    todo = [(f, p) for f, p in jobs if not reusable(f, p)]
    print(f"BOM 文件 {len(jobs)} 个 · 已缓存 {len(jobs) - len(todo)} · 待抓 {len(todo)}")

    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(lambda a: parse(*a), todo))
    for (f, p), r in zip(todo, results):
        done.setdefault(f, {})[p] = r
        print(f"  {r['status']:<12} {r.get('rows', '-'):>5} 行  {f}/{p}"
              + (f"  ({r.get('reason', r.get('note',''))})" if r["status"] != "ok"
                 or r.get("note") else ""))
    OUT.write_text(json.dumps(done, ensure_ascii=False, indent=1), encoding="utf-8")

    ok = sum(1 for f in done.values() for r in f.values() if r["status"] == "ok")
    un = sum(1 for f in done.values() for r in f.values() if r["status"] == "unparsed")
    ff = sum(1 for f in done.values() for r in f.values() if r["status"] == "fetch_failed")
    print(f"\n解析成功 {ok} · 未解析 {un} · 抓取失败 {ff} → {OUT}")


if __name__ == "__main__":
    main()
