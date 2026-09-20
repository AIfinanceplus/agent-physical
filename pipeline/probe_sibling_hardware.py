#!/usr/bin/env python3
"""系统性找回"外置的硬件"：同主账号下的硬件兄弟仓库。

为什么需要这一步：同一个机器人项目经常拆成两个仓库——软件库名字响亮、
星多、被清单收录；硬件（CAD / BOM / 网格）单独放在一个名字毫无线索的
仓库里。已经因此漏掉过 6 次：
    HybridRobotics/Berkeley-Humanoid-Lite   → …-Lite-Assets
    zeroth-robotics/zeroth-bot              → zeroth-robotics/hardware
    Nate711/StanfordDoggoProject            → Nate711/Doggo
    orcahand/orca_core                      → orcahand/orcahand_hardware
    kscalelabs/kbot                         → kscalelabs/kbot-models
    leap-hand/LEAP_Hand_API                 → LEAP_Hand_Hardware（同类模式）
靠一个项目一个项目地手动发现，永远只能捞到碰巧想到的那几个。这里对
**全部已知主账号**统一扫一遍：列出每个账号下的仓库，把名字带硬件意味、
且尚未收录的挑出来当候选，真正的收录判定仍交给 build_projects 的证据闸。

产物只写候选文件，不直接改目录——判定逻辑保持单一入口。
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OGR_CACHE = ROOT / "data" / "org-repos.json"
OUT = ROOT / "data" / "candidates-sibling.json"

# 仓库名里出现这些词，才值得为它拉一次文件树
STRONG_HW_RX = re.compile(
    r"(hardware|mechanical|mechanism|chassis|assets?|stl|step|"
    r"3d[-_]?print|parts?|kit)",
    re.I)
# 弱一些的名字：可能是显示网格或描述文件，仍值得看，但不给"可信"档，
# 要它自己凭 CAD/BOM/PCB 过关——商用机器人的 description 仓库就长这样。
WEAK_HW_RX = re.compile(
    r"(cad|description|models?|meshes|urdf|body|structure|frame|design)",
    re.I)
HARDWARE_NAME_RX = re.compile(STRONG_HW_RX.pattern + "|" + WEAK_HW_RX.pattern,
                              re.I)
# 明显不是硬件的名字，直接跳过（省掉一次树请求）
SKIP_NAME_RX = re.compile(
    r"(sim|gym|rl|learn|train|benchmark|test|example|tutorial|doc|website|"
    r"blog|paper|dataset|demo|web|api|sdk|lib|driver|firmware|^\.|"
    r"awesome|template|config|action|plugin|extension|app$)",
    re.I)


def gh_json(path: str) -> object | None:
    try:
        out = subprocess.run(["gh", "api", path], capture_output=True,
                             text=True, timeout=60)
        if out.returncode != 0:
            return None
        return json.loads(out.stdout)
    except Exception:
        return None


def known_names() -> set[str]:
    ks: set[str] = set()
    for f, key in ((ROOT / "data" / "repo-ids.json", None),
                   (ROOT / "data" / "seed-gap.json", "full_name")):
        p = Path(f)
        if not p.exists():
            continue
        data = json.loads(p.read_text(encoding="utf-8"))
        if key is None:
            for k, v in data.items():
                ks.add(k.lower())
                if isinstance(v, dict) and v.get("canonical"):
                    ks.add(v["canonical"].lower())
        else:
            for r in data:
                ks.add(r[key].lower())
    # 本地采集缓存里的仓库也算已知
    for t in (ROOT / "pipeline" / ".cache").glob("t_*.json"):
        ks.add(t.stem[2:].replace("__", "/").lower())
    return ks


def owners(known: set[str]) -> list[str]:
    return sorted({n.split("/")[0] for n in known if "/" in n})


def list_owner(owner: str, cache: dict) -> list[dict]:
    if owner in cache:
        return cache[owner]
    repos = gh_json(f"orgs/{owner}/repos?per_page=100")
    if repos is None:
        repos = gh_json(f"users/{owner}/repos?per_page=100")
    repos = repos if isinstance(repos, list) else []
    cache[owner] = repos
    return repos


def main() -> None:
    known = known_names()
    cache: dict[str, list] = {}
    if OGR_CACHE.exists():
        cache = json.loads(OGR_CACHE.read_text(encoding="utf-8"))
    print(f"已知仓库 {len(known)} 个 · 主账号 {len(owners(known))} 个")

    cands: list[dict] = []
    seen: set[str] = set()
    missing = [o for o in owners(known) if o not in cache]
    print(f"需要列举的账号 {len(missing)} 个（其余已缓存）")

    for i, owner in enumerate(owners(known), 1):
        repos = list_owner(owner, cache)
        if i % 50 == 0 or i == len(owners(known)):
            print(f"  [{i}/{len(owners(known))}] {owner}: {len(repos)} 个仓库")
            # 中途落盘：只在结束时写会让中断/超时把几十分钟的列举工作全丢掉，
            # 而账号列举是本步骤里唯一昂贵（受配额限制）的部分。
            OGR_CACHE.write_text(json.dumps(cache, ensure_ascii=False),
                                 encoding="utf-8")
        for r in repos:
            if not isinstance(r, dict):
                continue
            full = (r.get("full_name") or "").lower()
            nm = r.get("name") or ""
            if not full or full in known or full in seen:
                continue
            if r.get("archived") or r.get("fork"):
                continue
            if SKIP_NAME_RX.search(nm) or not HARDWARE_NAME_RX.search(nm):
                continue
            seen.add(full)
            cands.append({
                "owner": r["owner"]["login"], "slug": nm, "name": nm,
                "cat": "hardware", "src": "sibling",
                # 名字即"这就是硬件仓库"的（-hardware / -assets / 机械件），
                # 给可信档；只叫 description/models 的不给，让它自己凭证据过关。
                "trust": "hardware" if STRONG_HW_RX.search(nm) else "other",
                "stars": r.get("stargazers_count") or 0,
                "desc": r.get("description") or "",
            })

    OUT.write_text(json.dumps(cands, ensure_ascii=False, indent=1),
                   encoding="utf-8")
    OGR_CACHE.write_text(json.dumps(cache, ensure_ascii=False),
                         encoding="utf-8")
    print(f"\n硬件兄弟仓库候选 {len(cands)} 个 → {OUT}")
    for c in sorted(cands, key=lambda x: -x["stars"])[:25]:
        print(f"  ★{c['stars']:<6} {c['owner']}/{c['slug']:<44}"
              f"{(c['desc'] or '')[:52]}")


if __name__ == "__main__":
    main()
