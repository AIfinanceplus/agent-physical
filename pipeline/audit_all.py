#!/usr/bin/env python3
"""全量审计：把抽检的做法推广到**每一个**项目。

抽检查出三处系统性漏判后，紧接着的问题必然是"那另外 90% 呢"。
抽样只能证伪"全坏"，不能证明"全好"——所以凡属"每一条都必须对"的数据
（仓库树、证据引用、BOM 抓取覆盖），一律覆盖式检测。

对每个项目回答六个问题：
  A. 树是否取全（实时重取、条目数比对、截断标记、缓存后新增）
  B. 分类器是否漏判（真硬件扩展名被判 ∅）与是否误判（噪声路径被计入）
  C. BOM 是否取全（每个 BOM 文件都有抓取记录；未解析的必须带原因）
  D. 评分是否能复算（用同一算式喂**实时树**，逐步比对记录值）
  E. 证据引用是否每条都对（URL 形状、指向本仓库、被引路径在实时树里存在）
  F. 是否有外置硬件线索（.gitmodules、子模块）

与抽检脚本的关键差别：结果**边跑边落盘**到 JSONL，跑一千个仓库也不会因为
中途超时把已完成的部分丢掉。

输出：data/audit-all.json（全量）+ data/audit-all.jsonl（增量落盘的中转）
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import threading
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import build_projects as B  # noqa: E402
import score_reproduction as S2  # noqa: E402
from score_reproduction import (LABELS, MAX_MULT, WEIGHTS,  # noqa: E402
                                build_anchor, sat)

OUT = ROOT / "data" / "audit-all.json"
JSONL = ROOT / "data" / "audit-all.jsonl"
LOCK = threading.Lock()

# 分类器"应该认识"的硬件扩展名。判据故意比分类器宽——
# 审计的价值正在于它用一把比被审计对象更宽的尺子去量。
HW_EXT = {
    # 参数化 CAD
    ".step", ".stp", ".stpz", ".iges", ".igs", ".f3d", ".f3z", ".sldprt", ".sldasm",
    ".x_t", ".x_b", ".brep", ".fcstd", ".scad", ".3dm", ".catpart", ".catproduct",
    ".ipt", ".iam", ".par", ".prt", ".dwg", ".dxf", ".brt", ".3mf", ".amf",
    # 网格
    ".stl", ".obj", ".ply", ".glb", ".gltf", ".fbx", ".blend", ".dae", ".usdz",
    # 运动学描述
    ".urdf", ".xacro", ".mjcf", ".sdf", ".usd", ".usda", ".usdc", ".srdf",
    # PCB / EDA
    ".kicad_pcb", ".kicad_sch", ".kicad_pro", ".brd", ".sch", ".gbr", ".gerber",
    ".gko", ".gtl", ".gbl", ".gts", ".gbs", ".drl", ".xln", ".pcb", ".epro",
    # 物料
    ".csv", ".xlsx", ".xls", ".ods", ".tsv",
}
# 把"声音/视频/模型权重/编译产物"这类明确无关的扩展名排除在外，
# 否则噪声会把报告淹掉。
NOISE_EXT = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".bmp", ".webp", ".mp4",
    ".mp3", ".wav", ".avi", ".mov", ".webm", ".pdf", ".zip", ".tar", ".gz",
    ".whl", ".so", ".dylib", ".dll", ".a", ".o", ".class", ".jar",
    ".pt", ".pth", ".onnx", ".pb", ".h5", ".ckpt", ".safetensors", ".bin",
    ".pyc", ".pyo", ".lock", ".map", ".min.js", ".log", ".db", ".sqlite",
}
# 这些路径下的文件通常是第三方/工具自带/测试夹具，不该算成"本项目的硬件证据"。
NOISE_PATH_RX = re.compile(
    r"(^|/)(\.github|node_modules|venv|\.venv|site-packages|dist-packages|third_party"
    r"|thirdparty|extern|external|vendor|deps|templates?|samples?|examples?|fixtures?"
    r"|testdata|test_data|__pycache__|\.git)(/|$)", re.I)


def gh(endpoint: str, tries: int = 3) -> tuple[dict | list | None, str]:
    """调 GitHub API。返回 (数据, 状态)。

    状态必须是三值而不是布尔——"确定失效"(404/410) 与"请求没成功"(超时/5xx)
    含义完全不同：前者说明文件真不在，后者只说明这次没问到。
    把两者混为一谈的审计脚本会周期性误报，久而久之就没人信它了。
    """
    for i in range(tries):
        try:
            r = subprocess.run(["gh", "api", endpoint], capture_output=True,
                               text=True, timeout=120)
        except subprocess.TimeoutExpired:
            continue
        if r.returncode == 0:
            try:
                return json.loads(r.stdout), "ok"
            except json.JSONDecodeError:
                return None, "failed"
        err = (r.stderr or "") + (r.stdout or "")
        if "404" in err or "Not Found" in err:
            return None, "notfound"
        if "451" in err or "410" in err:
            return None, "notfound"
    return None, "failed"


def audit_one(item: dict, anchors: dict, bom_content: dict,
              gen_by_full: dict, cur_by_id: dict) -> dict:
    pid, name, full, recorded = (item["id"], item["name"], item["repository"],
                                 item["recorded"])
    rec: dict = {"id": pid, "name": name, "repository": full,
                 "score": recorded.get("score"), "findings": [],
                 "tree": {}, "live_counts": {}, "bom": {},
                 "evidence": {}, "orphans": {}, "suspect": {}}

    def add(level: str, what: str) -> None:
        rec["findings"].append({"level": level, "what": what})

    # ---------- A. 树 ----------
    meta, st = gh(f"repos/{full}")
    if st == "notfound":
        add("HIGH", "仓库已无法访问（404/410）——链接与证据全部失效")
        rec["tree"] = {"status": "notfound"}
        return rec
    if st != "ok" or not isinstance(meta, dict):
        add("MEDIUM", "仓库元数据请求未成功（超时或 5xx），本次未能核对——需重跑")
        rec["tree"] = {"status": "request_failed"}
        return rec

    branch = meta.get("default_branch") or "main"
    tree_obj, tst = gh(f"repos/{full}/git/trees/{branch}?recursive=1")
    if tst == "notfound":
        add("HIGH", f"默认分支 {branch} 的树不存在")
        rec["tree"] = {"status": "tree_notfound", "branch": branch}
        return rec
    if tst != "ok" or not isinstance(tree_obj, dict):
        add("MEDIUM", "仓库树请求未成功（超时或 5xx），本次未能核对——需重跑")
        rec["tree"] = {"status": "tree_request_failed", "branch": branch}
        return rec

    live = tree_obj.get("tree", [])
    cached = B.load_tree(full) or []
    live_blobs = sum(1 for e in live if e.get("type") == "blob")
    cached_blobs = sum(1 for e in cached if e.get("type") == "blob")
    rec["tree"] = {
        "branch": branch,
        "live_blobs": live_blobs,
        "cached_blobs": cached_blobs,
        "api_truncated": bool(tree_obj.get("truncated")),
        "archived": bool(meta.get("archived")),
        "pushed_at": meta.get("pushed_at"),
        "size_kb": meta.get("size"),
    }
    if tree_obj.get("truncated"):
        add("HIGH", f"实时树被 API 截断（blob {live_blobs}），计数不可用")
    if not cached:
        add("HIGH", "缓存里没有这棵仓库树，该项目的分数不是从树算出来的")

    if live_blobs != cached_blobs:
        ls = {e.get("path") for e in live if e.get("type") == "blob"}
        cs = {e.get("path") for e in cached if e.get("type") == "blob"}
        added, removed = ls - cs, cs - ls
        rec["tree"].update(added_since_cache=len(added),
                          removed_since_cache=len(removed))
        if added:
            add("MEDIUM", f"仓库自缓存后新增 {len(added)} 个文件"
                          f"（缓存 {cached_blobs}）——计数可能偏低，缓存该刷新")
        if removed:
            add("MEDIUM", f"仓库自缓存后减少 {len(removed)} 个文件——"
                          f"被引用的路径可能已不存在")

    # ---------- B. 分类器 ----------
    live_by: dict[str, list[str]] = defaultdict(list)
    orphans: Counter = Counter()
    orphan_proj: dict[str, str] = {}
    suspect: Counter = Counter()
    dirs_orphan: Counter = Counter()
    for e in live:
        if e.get("type") != "blob":
            continue
        p = e["path"]
        k = B.classify(p)
        if k:
            live_by[k].append(p)
            if NOISE_PATH_RX.search(p):
                # 被计入，但路径是第三方/模板/夹具——假阳性嫌疑
                m = NOISE_PATH_RX.search(p)
                suspect[f"{k} ← {m.group(0)}"] += 1
                continue
        else:
            base = p.rsplit("/", 1)[-1].lower()
            if "." not in base:
                continue
            ext = "." + base.rsplit(".", 1)[-1]
            if ext in HW_EXT and ext not in NOISE_EXT:
                orphans[ext] += 1
                orphan_proj.setdefault(ext, p)
                seg = p.rsplit("/", 2)[0] if "/" in p else ""
                dirs_orphan[seg.rsplit("/", 1)[-1]] += 1
    rec["live_counts"] = {k: len(v) for k, v in sorted(live_by.items())}
    rec["orphans"] = dict(orphans)
    rec["orphan_examples"] = orphan_proj
    rec["suspect"] = dict(suspect)
    if orphans:
        add("MEDIUM", f"疑似漏计的真硬件文件："
                      f"{dict(orphans.most_common(6))}；例：{list(orphan_proj.values())[:2]}")
    if suspect:
        add("MEDIUM", f"疑似误计（噪声路径下的文件被当作本项目证据）："
                      f"{dict(suspect.most_common(5))}")

    if any(e.get("path") == ".gitmodules" for e in live):
        add("MEDIUM", "仓库有 .gitmodules——硬件可能在外置子模块里，需人工确认")

    # ---------- C. BOM ----------
    bomfiles = live_by.get("BOM", [])
    parsed = bom_content.get(full, {})
    status = Counter()
    unparsed_no_reason = []
    for p in bomfiles:
        entry = parsed.get(p) or {}
        s = entry.get("status", "未抓")
        status[s] += 1
        if s == "unparsed" and not (entry.get("reason") or "").strip():
            unparsed_no_reason.append(p)
    rec["bom"] = {"files": len(bomfiles), "status": dict(status),
                  "files_list": bomfiles[:20]}
    if bomfiles and status.get("未抓"):
        add("HIGH", f"{status['未抓']} 个 BOM 文件从未被抓取"
                    f"（共 {len(bomfiles)} 个）→ 这些项目的物料维度被系统性低估")
    if bomfiles and status.get("ok", 0) == 0:
        add("HIGH", f"有 {len(bomfiles)} 个 BOM 文件，但一个都没解析成功："
                    f"{dict(status)} → 物料维度被低估")
    if unparsed_no_reason:
        add("MEDIUM", f"{len(unparsed_no_reason)} 个未解析 BOM 没写明原因，"
                      f"无法区分'测不出来'与'数据缺失'")

    # ---------- D. 用实时树复算 ----------
    anchor = anchors
    p_obj = gen_by_full.get(full)
    if p_obj is not None:
        dims, meta2 = S2.dims_for_project(p_obj, live, bom_content)
    elif pid in cur_by_id:
        dims, meta2 = S2.dims_for_project(
            {"id": pid, "repository": item["repository"],
             "license": cur_by_id[pid][1]}, live, bom_content)
    else:
        dims, meta2 = None, None
    if dims is not None:
        recomputed = {}
        for k in WEIGHTS:
            n, _ev, _d = dims[k]
            measured = meta2["sourcing_measured"] if k == "sourcing" else True
            ratio = min(MAX_MULT, sat(n) / sat(anchor[k])) if measured else None
            recomputed[k] = {"value": round(n, 2),
                             "points": round(WEIGHTS[k] * ratio, 2) if measured else None}
        rec["recomputed"] = recomputed
        diffs = []
        for i, k in enumerate(WEIGHTS.keys()):
            old = recorded["dimensions"][i]
            new = recomputed[k]
            if abs((old["value"] or 0) - new["value"]) > 0.01:
                diffs.append(f"{LABELS[k]} 记录 {old['value']} → 实时 {new['value']}")
        if diffs:
            add("MEDIUM", "从实时树复算与记录不一致：" + "；".join(diffs))

    # ---------- E. 证据引用逐条核对 ----------
    live_paths = {e.get("path") for e in live if e.get("type") == "blob"}
    from urllib.parse import unquote
    # 证据有两种合法形式，都要认：
    #   1. https://github.com/{repo}/blob/HEAD/{path}   ← 界面跳转用
    #   2. https://raw.githubusercontent.com/{repo}/HEAD/{path}
    #      ← 物料维度用这个：它是被抓取并解析的**原始字节**，指向的正是被测量的东西。
    # 首版只认第 1 种，于是 84 条合法证据被报成"不是合法 URL"——
    # **审计脚本报错时先怀疑审计脚本**：声明与枚举不符时，两边都要验。
    forms = (f"https://github.com/{full}/blob/HEAD/",
             f"https://raw.githubusercontent.com/{full}/HEAD/")
    total = dangling = malformed = wrongrepo = 0
    dangling_ex = []
    for d in recorded["dimensions"]:
        for url in d.get("evidence") or []:
            total += 1
            if not isinstance(url, str) or not url.startswith("https://"):
                malformed += 1
                continue
            matched = next((p for p in forms if url.startswith(p)), None)
            if matched is None:
                wrongrepo += 1
                continue
            path = unquote(url[len(matched):])
            if path not in live_paths:
                dangling += 1
                if len(dangling_ex) < 3:
                    dangling_ex.append(path)
    rec["evidence"] = {"total": total, "dangling": dangling,
                       "malformed": malformed, "wrong_repo": wrongrepo,
                       "dangling_examples": dangling_ex}
    if malformed:
        add("HIGH", f"{malformed} 条证据不是合法 URL")
    if wrongrepo:
        add("HIGH", f"{wrongrepo} 条证据既不是本仓库的 blob 也不是它的 raw 形式")
    if dangling:
        add("HIGH", f"{dangling}/{total} 条证据指向的文件在实时树里不存在："
                    f"{dangling_ex[:2]}")

    return rec


def main() -> None:
    audit_data = json.loads((ROOT / "data" / "score-audit.json").read_text(encoding="utf-8"))
    scores = audit_data["scores"]
    anchors = build_anchor()["anchor"]
    src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    projects = json.loads(src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";"))
    gen_by_full = {p["repository"].replace("https://github.com/", ""): p for p in projects}
    bom_content = json.loads((ROOT / "data" / "bom-content.json").read_text(encoding="utf-8"))

    cur_by_id: dict[str, tuple[str, str | None]] = {}
    try:
        from fetch_curated_trees import curated_repos
        from score_reproduction import curated_license
        for cid, url in curated_repos().items():
            if "github.com" not in url:
                continue
            full = url.replace("https://github.com/", "").rstrip("/")
            try:
                cur_by_id[cid] = (full, curated_license(full))
            except Exception:
                cur_by_id[cid] = (full, None)
    except Exception as exc:  # noqa: BLE001
        print(f"（未能载入策展清单：{exc}）")

    items = []
    for pid, s in scores.items():
        full = s["repository"].replace("https://github.com/", "").rstrip("/")
        if "github.com" not in s["repository"]:
            continue
        items.append({"id": pid, "name": s["name"], "repository": full,
                      "recorded": s})
    items.sort(key=lambda x: -(x["recorded"].get("score") or 0))

    print(f"全量审计 {len(items)} 个项目（不再抽样）· 并发 6\n")
    JSONL.write_text("", encoding="utf-8")
    done = 0
    with ThreadPoolExecutor(max_workers=6) as pool:
        for rec in pool.map(lambda it: audit_one(it, anchors, bom_content,
                                                 gen_by_full, cur_by_id), items):
            with LOCK:
                done += 1
                with JSONL.open("a", encoding="utf-8") as fh:
                    fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
                t = rec["tree"]
                print(f"[{done:>3}/{len(items)}] "
                      f"{(rec['score'] or 0):>6.1f} {rec['name'][:34]:<34} "
                      f"树 {t.get('cached_blobs','-'):>6}（实时 {t.get('live_blobs','-'):>6}）"
                      f" 证据 {rec['evidence'].get('total',0):>3}"
                      f" 悬空 {rec['evidence'].get('dangling',0):>3}"
                      f" · 发现 {len(rec['findings'])}")

    report = [json.loads(l) for l in JSONL.read_text(encoding="utf-8").splitlines() if l.strip()]
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")

    # ---------- 汇总 ----------
    levels = Counter(f["level"] for r in report for f in r["findings"])
    print(f"\n{'='*72}\n全量审计完成：{len(report)} 个项目 · "
          f"{sum(len(r['findings']) for r in report)} 条发现 · {dict(levels)}")

    print("\n--- 树覆盖 ---")
    exact = sum(1 for r in report
                if r["tree"].get("live_blobs") == r["tree"].get("cached_blobs"))
    trunc = [r for r in report if r["tree"].get("api_truncated")]
    nocache = [r for r in report if not r["tree"].get("cached_blobs")]
    drifted = [r for r in report if r["tree"].get("added_since_cache")]
    print(f"  条目数完全一致: {exact}/{len(report)}")
    print(f"  API 截断: {len(trunc)}   缓存缺失: {len(nocache)}   "
          f"缓存后仓库有变动: {len(drifted)}")
    for r in nocache[:6]:
        print(f"     无缓存: {r['name'][:34]:<34} {r['repository']}")

    print("\n--- 证据引用（每条都必须对） ---")
    tot = sum(r["evidence"].get("total", 0) for r in report)
    dang = sum(r["evidence"].get("dangling", 0) for r in report)
    mal = sum(r["evidence"].get("malformed", 0) for r in report)
    wr = sum(r["evidence"].get("wrong_repo", 0) for r in report)
    print(f"  共 {tot} 条 · 悬空 {dang} · 非法 {mal} · 指向他库 {wr}")
    for r in report:
        if r["evidence"].get("dangling") or r["evidence"].get("malformed"):
            print(f"     {r['name'][:34]:<34} 悬空 {r['evidence']['dangling']} "
                  f"例：{r['evidence']['dangling_examples'][:1]}")

    print("\n--- 分类器漏判（全量汇总） ---")
    agg: Counter = Counter()
    agg_ex: dict[str, str] = {}
    agg_proj: Counter = Counter()
    for r in report:
        for ext, n in (r["orphans"] or {}).items():
            agg[ext] += n
            agg_ex.setdefault(ext, r["orphan_examples"].get(ext, ""))
            agg_proj[ext] += 1
    if agg:
        for ext, n in agg.most_common(20):
            print(f"  {ext:<10} {n:>6} 个文件 / {agg_proj[ext]:>3} 个项目   例：{agg_ex[ext][:66]}")
    else:
        print("  无")

    print("\n--- 疑似误计（噪声路径下被计入） ---")
    agg2: Counter = Counter()
    for r in report:
        for k, n in (r["suspect"] or {}).items():
            agg2[k] += n
    for k, n in agg2.most_common(15):
        print(f"  {k:<28} {n}")
    if not agg2:
        print("  无")

    print("\n--- BOM 抓取覆盖 ---")
    tot_bom = sum(r["bom"].get("files", 0) for r in report)
    st: Counter = Counter()
    for r in report:
        for k, v in (r["bom"].get("status") or {}).items():
            st[k] += v
    print(f"  BOM 文件 {tot_bom} 个 · 状态 {dict(st)}")
    never = [r for r in report if (r["bom"].get("status") or {}).get("未抓")]
    print(f"  有文件从未被抓取的项目: {len(never)}")
    for r in never[:10]:
        print(f"     {r['name'][:34]:<34} {r['bom']['status']}")

    print("\n--- 复算差异 ---")
    diffs = [r for r in report if any("复算与记录不一致" in f["what"] for f in r["findings"])]
    print(f"  与记录不一致的项目: {len(diffs)}")
    for r in diffs[:10]:
        for f in r["findings"]:
            if "复算与记录不一致" in f["what"]:
                print(f"     {r['name'][:30]:<30} {f['what'][:120]}")

    print("\n--- 需重跑（请求未成功，不代表数据有问题） ---")
    retry = [r for r in report if r["tree"].get("status", "").endswith("request_failed")]
    print(f"  {len(retry)} 个")
    for r in retry[:10]:
        print(f"     {r['name'][:34]:<34} {r['tree']['status']}")


if __name__ == "__main__":
    main()
