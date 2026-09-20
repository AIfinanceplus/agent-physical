#!/usr/bin/env python3
"""对"被拦下"的可疑仓库做二次判定：真的没硬件，还是我们的检测漏了。

关键区分：仓库把 CAD 放在 release、submodule 或压缩包里时，文件树里看不到，
但文件确实存在——这类不能当成"没有硬件"。
"""
from __future__ import annotations

import json
import subprocess
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

SUSPECTS = [
    "HybridRobotics/Berkeley-Humanoid-Lite",
    "PetoiCamp/OpenCat-Quadruped-Robot",
    "zeroth-robotics/zeroth-bot",
    "orcahand/orca_core",
    "Nate711/StanfordDoggoProject",
    "leap-hand/LEAP_Hand_API",
    "Open-X-Humanoid/TienKung-Lab",
    "TheRobotStudio/V2_DexHand",
    "esa-prl/ExoMy",
    "NimbRo/nimbro-op2",
    "ManufacturedMotion/Hex",
    "mmmarinho/UMIRobot",
    "kscalelabs/kbot",
    "Agroecology-Lab/feldfreund_devkit_ros",
    "cbedio/OpenScout",
    "OpenPodcar/OpenPodcar",
    "mjbots/quad",
]


def gh(endpoint: str) -> dict | None:
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=90)
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


report = json.loads((ROOT / "data" / "gap-fetch-report.json").read_text(encoding="utf-8"))
by_full = {r["full_name"]: r for r in report["ok"]}

for full in SUSPECTS:
    rec = by_full.get(full)
    print(f"\n{'='*78}\n{full}")
    if rec:
        print(f"  file_count={rec['file_count']}  evidence={rec.get('evidence')}")
        print(f"  license={rec.get('license')}  stars={rec.get('stars')}")
        print(f"  desc={(rec.get('description') or '')[:110]}")
    else:
        print("  (不在已拉取报告中)")

    meta = gh(f"repos/{full}")
    if not meta:
        print("  gh: 仓库不可达")
        continue
    sub = meta.get("submodules_url") or ""
    print(f"  has_submodules={'yes' if meta.get('size') and meta.get('submodules_count') else 'unknown'}"
          f"  size={meta.get('size')}KB  default_branch={meta.get('default_branch')}")

    # 顶层条目 + 扩展名直方图（看它到底发不发 CAD 类文件）
    tree = gh(f"repos/{full}/git/trees/{meta.get('default_branch')}?recursive=1")
    if not tree or not tree.get("tree"):
        print("  tree 不可得")
        continue
    entries = tree["tree"]
    print(f"  truncated={tree.get('truncated')}  entries={len(entries)}")
    tops = Counter(e["path"].split("/")[0] for e in entries if e.get("type") in ("tree", "blob"))
    print(f"  顶层: {', '.join(f'{k}({v})' for k, v in tops.most_common(14))}")
    exts = Counter("." + e["path"].rsplit(".", 1)[-1].lower()
                   for e in entries if e.get("type") == "blob" and "." in e["path"])
    interest = {k: v for k, v in exts.items()
                if k in (".step", ".stp", ".stl", ".3mf", ".obj", ".f3d", ".sldprt",
                         ".iges", ".igs", ".urdf", ".xacro", ".mjcf", ".dxf", ".fcstd",
                         ".kicad_pcb", ".brd", ".pdf", ".zip")}
    print(f"  相关扩展名: {dict(sorted(interest.items(), key=lambda x: -x[1])[:16])}")

    rel = gh(f"repos/{full}/releases")
    if rel:
        names = [a["name"] for r in rel[:3] for a in r.get("assets", [])]
        if names:
            print(f"  release 资产: {names[:6]}")
