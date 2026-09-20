#!/usr/bin/env python3
"""对"代码库/硬件外置"的候选，解析 .gitmodules 与同组织兄弟仓库，找出真正的硬件仓库。"""
from __future__ import annotations

import base64
import json
import subprocess
import sys
from pathlib import Path

CODE_ONLY = [
    "HybridRobotics/Berkeley-Humanoid-Lite",
    "zeroth-robotics/zeroth-bot",
    "Nate711/StanfordDoggoProject",
    "orcahand/orca_core",
    "leap-hand/LEAP_Hand_API",
    "mmmarinho/UMIRobot",
    "Open-X-Humanoid/TienKung-Lab",
    "cbedio/OpenScout",
    "mjbots/quad",
    "Agroecology-Lab/feldfreund_devkit_ros",
    "OpenPodcar/OpenPodcar",
    "kscalelabs/kbot",
]


def gh(endpoint: str):
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=90)
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


for full in CODE_ONLY:
    print(f"\n{'='*78}\n{full}")
    # .gitmodules 内容
    f = gh(f"repos/{full}/contents/.gitmodules")
    if f and f.get("content"):
        try:
            txt = base64.b64decode(f["content"]).decode("utf-8", "replace")
            print("  .gitmodules:")
            for line in txt.splitlines():
                s = line.strip()
                if s.startswith("path") or s.startswith("url") or s.startswith("[submodule"):
                    print(f"    {s}")
        except Exception as e:
            print(f"  (decode 失败 {e})")
    else:
        print("  .gitmodules: 无")

    # 同组织兄弟仓库（找带 hardware / cad / description 的）
    owner = full.split("/")[0]
    repos = gh(f"orgs/{owner}/repos?per_page=100&sort=updated") or \
        gh(f"users/{owner}/repos?per_page=100&sort=updated") or []
    names = [r["name"] for r in repos]
    if names:
        hint = [n for n in names if any(
            k in n.lower() for k in ("hardware", "cad", "mechanic", "description",
                                     "model", "stl", "step", "pcb", "electric"))]
        print(f"  兄弟仓库 {len(names)} 个；硬件相关: {hint[:12]}")
