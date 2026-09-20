#!/usr/bin/env python3
"""人工审看 gap 候选：谁有真硬件证据、谁与现目录重复、谁会被哪道闸拦下。"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

from build_projects import (  # noqa: E402
    NEG_SIGNAL, ROBOT_SIGNAL, SIM_DESC_RX, SIM_NAME_RX,
)

seed = json.loads((ROOT / "data" / "seed-gap.json").read_text(encoding="utf-8"))
gen_src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
gen = json.loads(gen_src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";"))
have = {p["repository"].lower().replace("https://github.com/", "") for p in gen}
have |= {p["id"] for p in gen}

rows = []
for r in seed:
    full = r["full_name"]
    low = full.lower()
    if low in have:
        rows.append(("DUP", r, "已在目录内"))
        continue
    ev = r.get("evidence") or {}
    mesh, cad = ev.get("MESH", 0), ev.get("CAD", 0)
    bom, pcb, desc = ev.get("BOM", 0), ev.get("PCB", 0), ev.get("DESC", 0)
    text = f"{r.get('name','')} {r.get('description') or ''} {' '.join(r.get('topics') or [])} {full}"
    why = None
    if SIM_NAME_RX.search(r.get("name", "")) or SIM_DESC_RX.search(r.get("description") or ""):
        why = "仿真器/模型库"
    elif NEG_SIGNAL.search(text):
        why = "反信号命中"
    elif not (cad or bom or pcb or (mesh >= 8 and desc)):
        why = "无硬件证据"
    elif not ROBOT_SIGNAL.search(text) and not desc:
        why = "无机器人信号"
    rows.append(("DROP" if why else "KEEP", r,
                 why or f"MESH{mesh} CAD{cad} PCB{pcb} BOM{bom} DESC{desc}"))

keep = [r for s, r, _ in rows if s == "KEEP"]
drop = [(r, w) for s, r, w in rows if s == "DROP"]
dup = [r for s, r, _ in rows if s == "DUP"]

print(f"候选 {len(seed)} · 收 {len(keep)} · 拦 {len(drop)} · 重复 {len(dup)}\n")
print("=== 收录（按星数）===")
for r in sorted(keep, key=lambda x: -x["stars"]):
    ev = r.get("evidence") or {}
    print(f"  ★{r['stars']:<6} {r['full_name']:<52} "
          f"MESH{ev.get('MESH',0):<4} CAD{ev.get('CAD',0):<4} "
          f"PCB{ev.get('PCB',0):<3} BOM{ev.get('BOM',0):<3} "
          f"{(r.get('license') or '-'):<16} {r['_gap'].get('cat','')}")

print("\n=== 拦下 ===")
for r, w in sorted(drop, key=lambda x: -x[0]["stars"]):
    print(f"  ★{r['stars']:<6} {r['full_name']:<52} {w}")

print("\n=== 已存在 ===")
for r in dup:
    print(f"  {r['full_name']}")
