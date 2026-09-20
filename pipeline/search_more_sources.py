#!/usr/bin/env python3
"""从 GitHub 结构化检索补漏：不依赖"有没有人整理成清单"。

之前的来源都是人工策展清单——覆盖的是被整理过的部分。
GitHub 自带的话题标签与搜索索引能覆盖没被任何清单收录的仓库。

做法：多路查询（话题 + 关键词）→ 汇总 → 与已知集合比对 → 输出新候选。
只做检索与比对，不做收录判定；收录仍走 build_projects 的同一套证据闸。
"""
from __future__ import annotations

import json
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOME = Path.home()
ROBOTS = HOME / "hermes-robot-course" / "data" / "robots.json"
SEED_GAP = ROOT / "data" / "seed-gap.json"
OUT = ROOT / "data" / "search-hits.json"

# 话题查询：话题是仓库作者自己打的标签，比搜索关键词准
TOPIC_QUERIES = [
    "topic:humanoid-robot",
    "topic:humanoid",
    "topic:bipedal-robot",
    "topic:quadruped-robot",
    "topic:quadruped",
    "topic:legged-robot",
    "topic:robot-arm",
    "topic:robotic-arm",
    "topic:manipulator",
    "topic:dexterous-hand",
    "topic:robotic-hand",
    "topic:open-hardware robot",
    "topic:3d-printed-robot",
    "topic:robotics topic:3d-printing",
    "topic:ros2 topic:robot",
    "topic:robot-dog",
    "topic:exoskeleton",
    "topic:humanoid-robots",
    "topic:locomotion topic:robot",
    "topic:teleoperation",
]

# 关键词查询：命中名字/描述/README 里同时出现硬件证据词的
KEYWORD_QUERIES = [
    "humanoid robot CAD stars:>50",
    "humanoid robot BOM stars:>50",
    "open source humanoid robot stars:>100",
    "3d printed humanoid robot stars:>50",
    "quadruped robot STL stars:>50",
    "legged robot hardware stars:>50",
    "robot arm STEP files stars:>50",
    "open source robot arm stars:>100",
    "dexterous hand open source stars:>50",
    "robot bill of materials stars:>50",
    "open hardware robot stars:>100",
    "robot dog open source stars:>100",
    "biped robot open source stars:>50",
    "exoskeleton open source stars:>50",
    "mobile manipulator open source stars:>100",
    "robot CAD files assembly stars:>50",
    "3d printable robot stars:>100",
    "open source robotics hardware stars:>100",
    "humanoid robot reinforcement learning hardware stars:>100",
    "gripper open source hardware stars:>50",
]


def gh_search(q: str, per_page: int = 100) -> list[dict]:
    r = subprocess.run(
        ["gh", "api", "-X", "GET", "search/repositories",
         "-f", f"q={q}", "-f", "sort=stars", "-f", "order=desc",
         "-f", f"per_page={per_page}",
         "--jq", "[.items[] | {full_name, stars: .stargazers_count, "
                 "description, topics, license: (.license.spdx_id // null), "
                 "archived, default_branch}]"],
        capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        return []
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return []


def known() -> set[str]:
    ks: set[str] = set()
    for r in json.loads(ROBOTS.read_text(encoding="utf-8")):
        ks.add(r["full_name"].lower())
    if SEED_GAP.exists():
        for r in json.loads(SEED_GAP.read_text(encoding="utf-8")):
            ks.add(r["full_name"].lower())
    ids = ROOT / "data" / "repo-ids.json"
    if ids.exists():
        for k in json.loads(ids.read_text(encoding="utf-8")):
            ks.add(k)
    return ks


def main() -> None:
    ks = known()
    print(f"已知仓库 {len(ks)} 个\n")

    hits: dict[str, dict] = {}
    for tag, queries in (("话题", TOPIC_QUERIES), ("关键词", KEYWORD_QUERIES)):
        print(f"--- {tag}查询 {len(queries)} 条 ---")
        for q in queries:
            items = gh_search(q)
            new = 0
            for it in items:
                k = it["full_name"].lower()
                if k in ks:
                    continue
                if k not in hits:
                    it["_via"] = []
                    hits[k] = it
                    new += 1
                hits[k]["_via"].append(q)
            print(f"  {len(items):>3} 命中 / 新增 {new:>3}  · {q}")
            time.sleep(2.2)   # 搜索 API 限速 30 次/分钟

    OUT.write_text(json.dumps(sorted(hits.values(), key=lambda x: -x["stars"]),
                              ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n=== 新候选 {len(hits)} 个（按星数）===")
    for it in sorted(hits.values(), key=lambda x: -x["stars"])[:60]:
        arch = " [ARCHIVED]" if it["archived"] else ""
        print(f"  ★{it['stars']:<6} {it['full_name']:<52}"
              f"{(it['license'] or '-'):<16}{arch}")
    print(f"\n写入 {OUT}")


if __name__ == "__main__":
    main()
