#!/usr/bin/env python3
"""审计 lib/projects.generated.ts 里的零件链接是否真的可达。

为什么需要单独一个脚本：抽查 3 条 URL 全部 200 并不能说明目录是健康的。
成片失效（例如整个仓库因默认分支不是 main 而全部 404）只有覆盖式检测才看得见。
"""
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent.parent


def load_projects() -> list[dict]:
    src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    body = src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";")
    return json.loads(body)


def head(url: str) -> int:
    req = urllib.request.Request(url, method="HEAD",
                                 headers={"User-Agent": "agent-physical-link-audit"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0


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
    with ThreadPoolExecutor(max_workers=12) as ex:
        codes = list(ex.map(head, urls))

    bad = [(i, u, c) for (i, u), c in zip(sample.items(), codes) if c != 200]
    print(f"可达 {sum(1 for c in codes if c == 200)} · 异常 {len(bad)}")
    for i, u, c in bad[:40]:
        print(f"  {c}  {i}\n      {u}")
    if len(bad) > 40:
        print(f"  ... 另有 {len(bad) - 40} 条")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
