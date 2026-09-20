#!/usr/bin/env python3
"""按命名惯例直接搜"硬件仓库"，而不是逐个账号列举。

为什么放弃逐个账号列举：对 792 个主账号调 `/repos` 实测约 32 秒/账号，
跑完要 4 小时以上，而它的收益完全可以用搜索拿到——反复出现的模式是
"软件仓库出名、硬件仓库默默无闻，但硬件仓库**名字里一定带硬件词**"
（-hardware / -assets / -mechanical / -cad / -description…）。

搜索用少数几次 API 调用覆盖同样的命名空间，快几个数量级。
收录判定仍然只走 build_projects 那一条证据闸，这里只管找候选。
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from trust_policy import trust_of  # noqa: E402

OUT = ROOT / "data" / "candidates-hardware-search.json"

# 名字里带"这就是硬件仓库"的词 → 给可信档
STRONG_HW_RX = re.compile(
    r"(hardware|mechanical|mechanism|chassis|assets?|stl|step|3d[-_]?print|parts?|kit)",
    re.I)
# 弱一些 → 不给可信档，让它自己凭 CAD/BOM/PCB 过关
WEAK_HW_RX = re.compile(
    r"(cad|description|models?|meshes|urdf|body|structure|frame|design)", re.I)

NEG_RX = re.compile(
    r"(sim|gym|rl|learn|train|benchmark|test|example|tutorial|doc|website|blog|"
    r"paper|dataset|demo|web|api|sdk|lib|driver|firmware|awesome|template|"
    r"config|plugin|extension|server|client|tool|script|utils?|helper)", re.I)

# 查询设计：把"硬件命名"和"机器人语义"交叉，两个条件都要命中，
# 否则只会捞到"computer hardware"这类无关仓库。
QUERIES = [
    "robot hardware in:name stars:>10",
    "robotics hardware in:name,description stars:>5",
    "robot mechanical in:name stars:>5",
    "humanoid hardware in:name stars:>5",
    "robot cad in:name stars:>5",
    "robot description in:name,description stars:>10",
    "robot assets in:name stars:>3",
    "robotic arm hardware in:name,description stars:>5",
    "quadruped hardware in:name stars:>3",
    "bipedal hardware in:name stars:>3",
    "open source robot hardware in:name,description stars:>10",
    "3d printed robot in:name,description stars:>10",
    "robot stl files in:name,description stars:>5",
    "topic:robot-hardware stars:>5",
    "topic:open-hardware robot stars:>10",
    "topic:robotics hardware in:name stars:>5",
]


def gh_json(path: str) -> dict | None:
    try:
        out = subprocess.run(["gh", "api", path], capture_output=True,
                             text=True, timeout=90)
        if out.returncode != 0:
            return None
        return json.loads(out.stdout)
    except Exception:
        return None


def known_names() -> set[str]:
    ks: set[str] = set()
    for f in ("repo-ids.json", "seed-gap.json"):
        p = ROOT / "data" / f
        if not p.exists():
            continue
        data = json.loads(p.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            for k, v in data.items():
                ks.add(k.lower())
                if isinstance(v, dict) and v.get("canonical"):
                    ks.add(v["canonical"].lower())
        else:
            for r in data:
                ks.add(r["full_name"].lower())
    for t in (ROOT / "pipeline" / ".cache").glob("t_*.json"):
        ks.add(t.stem[2:].replace("__", "/").lower())
    return ks


def main() -> None:
    known = known_names()
    print(f"已知仓库 {len(known)} 个\n")

    found: dict[str, dict] = {}
    for q in QUERIES:
        path = ("search/repositories?per_page=100&q="
                + urllib.parse.quote(q))
        data = gh_json(path)
        items = (data or {}).get("items") or []
        n_new = 0
        for r in items:
            full = (r.get("full_name") or "").lower()
            nm = r.get("name") or ""
            if not full or full in known or full in found:
                continue
            if r.get("archived") or r.get("fork"):
                continue
            if not (STRONG_HW_RX.search(nm) or WEAK_HW_RX.search(nm)):
                continue
            if NEG_RX.search(nm):
                continue
            found[full] = {
                "owner": r["owner"]["login"], "slug": nm, "name": nm,
                "cat": "hardware", "src": "hardware-search",
                "trust": "hardware" if STRONG_HW_RX.search(nm) else "other",
                "stars": r.get("stargazers_count") or 0,
                "desc": r.get("description") or "",
            }
            n_new += 1
        print(f"  {len(items):>3} 命中 · 新 {n_new:>3}   {q}")

    cands = sorted(found.values(), key=lambda x: -x["stars"])
    OUT.write_text(json.dumps(cands, ensure_ascii=False, indent=1),
                   encoding="utf-8")
    print(f"\n硬件仓库候选 {len(cands)} 个 → {OUT}")
    for c in cands[:30]:
        print(f"  ★{c['stars']:<6} {c['owner']}/{c['slug']:<42}"
              f"[{c['trust']:<8}] {(c['desc'] or '')[:44]}")


if __name__ == "__main__":
    main()
