#!/usr/bin/env python3
"""审计 lib/projects.generated.ts 里的零件链接是否真的可达。

为什么需要单独一个脚本：抽查 3 条 URL 全部 200 并不能说明目录是健康的。
成片失效（例如整个仓库因默认分支不是 main 而全部 404）只有覆盖式检测才看得见。

为什么必须区分「确定失效」与「请求没成功」：首次实测把 11 条状态 0 报成了死链，
逐条复测全部 200——那是瞬时网络失败。不重试、并把一切非 200 都算失效的审计
会周期性误报，久而久之就没人信它了，而它恰恰是唯一能发现成片失效的手段。
所以：404/410 才算确定失效（文件真的不在那儿），0/5xx 归为待复核，重试后退避收场。
"""
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent.parent

# 只有这两个码能证明"链接指向的文件不存在"
DEFINITE_GONE = {404, 410}


def load_projects() -> list[dict]:
    src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    body = src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";")
    return json.loads(body)


def _one(url: str, method: str) -> int:
    headers = {"User-Agent": "agent-physical-link-audit"}
    if method == "GET":
        # 只要第一个字节：既能验证存在，又不会把大文件拖下来
        headers["Range"] = "bytes=0-0"
    req = urllib.request.Request(url, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0


def head(url: str, attempts: int = 3) -> int:
    """状态码。0 表示"请求没成功"，不等于"链接坏了"。"""
    code = 0
    for i in range(attempts):
        code = _one(url, "HEAD")
        if code and code < 500 and code != 405:
            return code
        # HEAD 不被支持，或服务端抖了一下——换带 Range 的 GET 再试
        code = _one(url, "GET")
        if code and code < 500:
            return code
        time.sleep(1.5 * (i + 1))
    return code


def main() -> None:
    projects = load_projects()
    # 每个项目取一条零件链接做代表
    sample: dict[str, str] = {}
    total_rows = 0
    for p in projects:
        for part in p.get("parts", []):
            u = part.get("source") or ""
            if "/blob/" in u:
                total_rows += 1
                if p["id"] not in sample:
                    sample[p["id"]] = u

    urls = list(sample.values())
    print(f"项目 {len(projects)} · 零件行 {total_rows} · 逐项目抽检 {len(urls)}")
    with ThreadPoolExecutor(max_workers=8) as ex:
        codes = list(ex.map(head, urls))

    ok = [(i, u, c) for (i, u), c in zip(sample.items(), codes) if 200 <= c < 300]
    gone = [(i, u, c) for (i, u), c in zip(sample.items(), codes) if c in DEFINITE_GONE]
    unclear = [(i, u, c) for (i, u), c in zip(sample.items(), codes)
               if c not in DEFINITE_GONE and not (200 <= c < 300)]

    print(f"可达 {len(ok)} · 确定失效 {len(gone)} · 待复核 {len(unclear)}")
    for label, rows in (("确定失效", gone), ("待复核", unclear)):
        for i, u, c in rows[:40]:
            print(f"  [{label}] {c}  {i}\n      {u}")
        if len(rows) > 40:
            print(f"  ... 另有 {len(rows) - 40} 条")
    # 只有"文件真的不在"才算失败；请求没成功不该让审计红掉
    sys.exit(1 if gone else 0)


if __name__ == "__main__":
    main()
