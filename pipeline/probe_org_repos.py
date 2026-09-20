#!/usr/bin/env python3
"""列出 org 全部仓库并按其文件树判定哪些是硬件仓库。"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from build_projects import classify  # noqa: E402


def gh(endpoint: str):
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=90)
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


def probe(full: str) -> tuple[dict, str]:
    meta = gh(f"repos/{full}")
    if not meta:
        return {}, "不可达"
    br = meta.get("default_branch") or "main"
    tree = gh(f"repos/{full}/git/trees/{br}?recursive=1")
    if not tree or not tree.get("tree"):
        return meta, "tree 不可得"
    ev: dict[str, int] = {}
    for e in tree["tree"]:
        if e.get("type") == "blob":
            k = classify(e.get("path", ""))
            if k:
                ev[k] = ev.get(k, 0) + 1
    return meta, json.dumps(ev)


for org in ("HybridRobotics",):
    repos = gh(f"orgs/{org}/repos?per_page=100") or []
    print(f"=== {org}：{len(repos)} 个仓库 ===")
    for r in sorted(repos, key=lambda x: x["name"].lower()):
        full = r["full_name"]
        if not any(k in r["name"].lower() for k in
                   ("lite", "humanoid", "hardware", "description", "asset", "cad",
                    "mechanic", "bom")):
            continue
        meta, ev = probe(full)
        print(f"  ★{r['stargazers_count']:<5} {full:<58} {(r.get('description') or '')[:48]:<50} {ev}")

print("\n=== 已定位的硬件仓库 ===")
for full in ("zeroth-robotics/hardware", "Nate711/Doggo",
             "orcahand/orcahand_hardware", "orcahand/orcahand_description",
             "kscalelabs/kbot-models"):
    meta, ev = probe(full)
    if not meta:
        print(f"  ✗ {full}  不可达")
        continue
    print(f"  ★{meta.get('stargazers_count',0):<5} {full:<42} "
          f"{(meta.get('description') or '')[:44]:<46} {ev}")
