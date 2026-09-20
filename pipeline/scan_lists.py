#!/usr/bin/env python3
"""扫描更多策展清单（含中文社区），提取其中的 GitHub 仓库并比对已知集合。

比 GitHub 检索更准的原因：清单是人工挑过的，条目本身就是"这是个硬件项目"的判断。
比之前几份清单更广的原因：新增了中文社区清单、机器人描述清单、3D 打印机器人目录站。
"""
from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOME = Path.home()
ROBOTS = HOME / "hermes-robot-course" / "data" / "robots.json"
SEED_GAP = ROOT / "data" / "seed-gap.json"
REPO_IDS = ROOT / "data" / "repo-ids.json"
OUT = ROOT / "data" / "candidates-lists.json"

from trust_policy import trust_of  # noqa: E402

SOURCES = {
    # label: url。可信度不在这里写死，统一由 trust_policy 按来源判定——
    # 散在两处就会有两套解释，awesome-mjyc 漏映射就是这么来的。
    "awesome-robots(srebroa)":
        "https://raw.githubusercontent.com/srebroa/awesome-robots/main/README.md",
    "awesome-open-source-robotics(growbotics)":
        "https://raw.githubusercontent.com/Growbotics-AI/awesome-open-source-robotics/main/README.md",
    "awesome-robotics-ee-opensource(中文)":
        "https://raw.githubusercontent.com/automaticdai/awesome-robotics-ee-opensource/main/README.md",
    "awesome-robot-descriptions":
        "https://raw.githubusercontent.com/robot-descriptions/awesome-robot-descriptions/main/README.md",
    "awesome-humanoid-robot":
        "https://raw.githubusercontent.com/YansongW/awesome-humanoid-robot/main/README.md",
    # 刻意不收录 awesome-robotic-tooling：那份清单的范围就是"工具"，
    # 条目按定义不是硬件项目（它曾一次贡献 811 个候选，全是库和工具链）。
    "orobot.io 目录":
        "https://orobot.io/?tag=robot-arm",
}

REPO_RX = re.compile(r"github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+?)(?=[/\s)#?\"'\]|]|$)")
SKIP_OWNER = {"features", "topics", "collections", "orgs", "users", "apps",
              "marketplace", "sponsors", "about", "site", "blog", "settings",
              "awesome", "raw", "assets", "cdn", "github"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            return r.read().decode("utf-8", "replace")
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
        print(f"    抓取失败: {e}")
        return ""


def known() -> set[str]:
    ks: set[str] = set()
    for r in json.loads(ROBOTS.read_text(encoding="utf-8")):
        ks.add(r["full_name"].lower())
    if SEED_GAP.exists():
        for r in json.loads(SEED_GAP.read_text(encoding="utf-8")):
            ks.add(r["full_name"].lower())
    if REPO_IDS.exists():
        ks.update(json.loads(REPO_IDS.read_text(encoding="utf-8")))
    return ks


def main() -> None:
    ks = known()
    print(f"已知仓库 {len(ks)} 个\n")
    found: dict[str, dict] = {}
    for label, url in SOURCES.items():
        trust = trust_of(label)
        text = fetch(url)
        if not text:
            continue
        slugs = set()
        for owner, repo in REPO_RX.findall(text):
            if owner.lower() in SKIP_OWNER or not repo:
                continue
            if repo.endswith((".md", ".png", ".jpg", ".svg", ".zip")):
                continue
            slugs.add(f"{owner}/{repo}")
        new = [s for s in slugs if s.lower() not in ks]
        print(f"  {label:<42} [{trust:<8}] 链接 {len(slugs):>4} · 新 {len(new):>4}")
        for s in new:
            o, r = s.split("/", 1)
            found.setdefault(s.lower(), {"slug": r, "owner": o, "name": r,
                                         "cat": "list", "src": label,
                                         "trust": trust})
    OUT.write_text(json.dumps(sorted(found.values(), key=lambda x: x["owner"]),
                              ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n合计新候选 {len(found)} 个 → {OUT}")


if __name__ == "__main__":
    main()
