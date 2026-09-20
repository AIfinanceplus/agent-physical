#!/usr/bin/env python3
"""把 GitHub 检索命中筛成可送进采集管线的候选。

前置过滤只用元数据（名字/描述/话题），因为拉文件树是两次 API 调用，
不能对 1000+ 个仓库无差别地做。真正的收录判定仍由 build_projects 的证据闸负责，
这里只负责把明显不是硬件的挡在外面。
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

from build_projects import NEG_SIGNAL, SIM_DESC_RX, SIM_NAME_RX  # noqa: E402

HITS = ROOT / "data" / "search-hits.json"
OUT = ROOT / "data" / "candidates-search.json"

# 不是硬件项目的高频命名模式。这些是"关于机器人"的东西，不是机器人。
NOT_HARDWARE_RX = re.compile(
    r"awesome[-_ ]|^list[-_ ]|tooling|toolkit|\bsdk\b|\bapi\b|framework|"
    r"simulator|simulation|benchmark|\bdataset\b|\bcorpus\b|tutorial|"
    r"learn[-_ ]by[-_ ]doing|course|curriculum|handbook|cheat[-_ ]?sheet|"
    r"notes?$|docs?$|paper|survey|review[-_ ]|collection|"
    r"navigation|slam|calibration|driver|firmware$|plugin|wrapper|"
    r"deploy|inference|retarget|teleop$|visuali[sz]|viewer|editor|"
    r"pipeline|workflow|controller$|planning|optimization|estimation",
    re.I)

MIN_STARS = 20


def main() -> None:
    hits = json.loads(HITS.read_text(encoding="utf-8"))
    keep, dropped = [], {"star": 0, "archived": 0, "sim": 0, "neg": 0, "nothw": 0}
    for h in hits:
        full = h["full_name"]
        name = full.split("/", 1)[1]
        desc = h.get("description") or ""
        topics = " ".join(h.get("topics") or [])
        text = f"{name} {desc} {topics} {full}"

        if h["stars"] < MIN_STARS:
            dropped["star"] += 1
            continue
        if h["archived"]:
            dropped["archived"] += 1
            continue
        if SIM_NAME_RX.search(name) or SIM_DESC_RX.search(desc):
            dropped["sim"] += 1
            continue
        if NEG_SIGNAL.search(text):
            dropped["neg"] += 1
            continue
        if NOT_HARDWARE_RX.search(name):
            dropped["nothw"] += 1
            continue
        owner, slug = full.split("/", 1)
        keep.append({"slug": slug, "owner": owner, "name": slug,
                     "cat": "search", "src": "github-search",
                     "_stars": h["stars"], "_via": h.get("_via", [])})

    OUT.write_text(json.dumps(keep, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"命中 {len(hits)} → 候选 {len(keep)}")
    print(f"  拦下：星数不足 {dropped['star']} · 已归档 {dropped['archived']} · "
          f"仿真器 {dropped['sim']} · 反信号 {dropped['neg']} · 非硬件命名 {dropped['nothw']}")
    print(f"\n入候选（按星数前 45）：")
    for c in sorted(keep, key=lambda x: -x["_stars"])[:45]:
        print(f"  ★{c['_stars']:<6} {c['owner']}/{c['slug']}")


if __name__ == "__main__":
    main()
