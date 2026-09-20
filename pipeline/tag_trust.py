#!/usr/bin/env python3
"""给候选文件补/刷新 trust 字段。

trust="hardware" 只给"收录范围本身是可复现开放硬件"的来源：
  growbotics 站点与清单、stephane-caron 的开源机器人清单、
  orobot.io 的 3D 打印机器人目录，以及我逐个核verify过的 submodule/兄弟仓库。
其余（通用清单、GitHub 检索、机器人描述清单）一律 "other"。
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from trust_policy import trust_of  # noqa: E402

DATA = ROOT / "data"

for name in ("candidates-gap.json", "candidates-search.json", "candidates-lists.json"):
    p = DATA / name
    if not p.exists():
        print(f"跳过（不存在）: {name}")
        continue
    items = json.loads(p.read_text(encoding="utf-8"))
    changed = 0
    for it in items:
        want = trust_of(it.get("src"), it.get("trust"))
        if it.get("trust") != want:
            it["trust"] = want
            changed += 1
    p.write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8")

    c = Counter(i["trust"] for i in items)
    print(f"{name:<28} {len(items):>4} 条 · 更新 {changed:>4} · {dict(c)}")
