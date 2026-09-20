#!/usr/bin/env python3
"""补拉人工策展项目的仓库树，让它们也能用**同一估计量**计分。

背景：5 个人工策展条目里，4 个有 GitHub 仓库、1 个只在 OSF（无仓库树）。
只有把树落到与主采集相同的缓存里，score_reproduction.py 才能对它们跑
和另外 212 个项目完全相同的计数——否则只能给它们一个不同的算式，
那就等于把两把不同的尺子并排放在一张表里。
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from build_projects import CACHE  # noqa: E402

SRC = ROOT / "lib" / "workbench-projects.ts"


def gh(endpoint: str):
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


def curated_repos() -> dict[str, str]:
    """从 lib/workbench-projects.ts 解析「策展条目 id → 仓库 URL」。

    读源文件而不是另立一份清单：另立一份就会与真正渲染的界面脱钩，
    出现"计分的项目"与"显示的项目"不是同一批的情况。
    """
    text = SRC.read_text(encoding="utf-8")
    consts = dict(re.findall(r'const\s+(\w+Source)\s*=\s*"([^"]+)"', text))
    head = text.split("export const WORKBENCH_PROJECTS", 1)[1].split("\n];", 1)[0]
    out: dict[str, str] = {}
    for m in re.finditer(r'id:\s*"([A-Z0-9][A-Z0-9_-]+)",(.*?)repository:\s*(\w+),',
                         head, re.S):
        pid, _, cname = m.group(1), m.group(2), m.group(3)
        url = consts.get(cname)
        if url:
            out[pid] = url
    return out


def main() -> None:
    repos = curated_repos()
    print(f"策展条目 {len(repos)} 个:")
    for pid, url in sorted(repos.items()):
        full = url.replace("https://github.com/", "").rstrip("/")
        if "github.com" not in url:
            print(f"  {pid:<26} {url}  → 非 GitHub，无仓库树可数")
            continue
        cache = CACHE / f"t_{full.replace('/', '__')}.json"
        if cache.exists():
            print(f"  {pid:<26} {full}  → 已缓存")
            continue
        meta = gh(f"repos/{full}")
        if not meta or meta.get("message"):
            print(f"  {pid:<26} {full}  → 元数据拿不到（{meta.get('message') if meta else 'gh 失败'}）")
            continue
        branch = meta.get("default_branch") or "main"
        tree = gh(f"repos/{full}/git/trees/{branch}?recursive=1")
        if not tree or not tree.get("tree"):
            print(f"  {pid:<26} {full}  → 文件树拿不到")
            continue
        cache.write_text(json.dumps([True, tree]), encoding="utf-8")
        print(f"  {pid:<26} {full}  → 已抓取，{len(tree['tree'])} 个条目（分支 {branch}）")


if __name__ == "__main__":
    main()
