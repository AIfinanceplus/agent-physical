#!/usr/bin/env python3
"""解析每个候选仓库的稳定标识（GitHub 数字 id）与当前规范名。

为什么需要：仓库改名/换组织后，同一仓库会以两个完全不同的名字出现
（menloresearch/asimov-1 ≡ asimovinc/asimov-1、Source-Robotics/Faze4-Robotic-arm
≡ PCrnjak/Faze4-Robotic-arm）。按名字去重——哪怕是小写化之后——都拦不住这类重复。
**稳定的身份是数字 id，不是名字。**

产物 data/repo-ids.json 让生成器保持离线：id 映射单独落盘、可复核，
生成时不发网络请求。
"""
from __future__ import annotations

import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

HOME = Path.home()
ROBOTS = HOME / "hermes-robot-course" / "data" / "robots.json"
SEED_GAP = ROOT / "data" / "seed-gap.json"
OUT = ROOT / "data" / "repo-ids.json"


def resolve(full: str) -> tuple[str, dict | None]:
    r = subprocess.run(
        ["gh", "api", f"repos/{full}", "--jq",
         "{id, full_name, archived, disabled}"],
        capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        return full, None
    try:
        return full, json.loads(r.stdout)
    except json.JSONDecodeError:
        return full, None


def main() -> None:
    names: list[str] = []
    for r in json.loads(ROBOTS.read_text(encoding="utf-8")):
        names.append(r["full_name"])
    if SEED_GAP.exists():
        for r in json.loads(SEED_GAP.read_text(encoding="utf-8")):
            names.append(r["full_name"])
    # 按小写去重再解析，省一半请求
    uniq = sorted({n.lower(): n for n in names}.values())
    print(f"待解析 {len(uniq)} 个仓库")

    with ThreadPoolExecutor(max_workers=10) as ex:
        res = list(ex.map(resolve, uniq))

    table: dict[str, dict] = {}
    failed = []
    for full, meta in res:
        if not meta:
            failed.append(full)
            continue
        table[full.lower()] = {
            "id": meta["id"],
            "canonical": meta["full_name"],
            "archived": bool(meta.get("archived")),
        }
    OUT.write_text(json.dumps(table, ensure_ascii=False, indent=1), encoding="utf-8")

    # 改名后缓存文件仍挂在旧名下，而生成器是按 full_name 找缓存的。
    # 不迁移的话，规范化名字反而会让生成器找不到树。
    try:
        from build_projects import CACHE  # noqa: PLC0415
        moved = 0
        for k, v in table.items():
            if v["canonical"].lower() == k:
                continue
            old = CACHE / f"t_{k.replace('/', '__')}.json"
            new = CACHE / f"t_{v['canonical'].replace('/', '__')}.json"
            if old.exists() and not new.exists():
                new.write_bytes(old.read_bytes())
                moved += 1
        if moved:
            print(f"缓存已按规范名复制 {moved} 份")
    except Exception as e:  # 缓存不存在时不是致命错误
        print(f"（缓存迁移跳过: {e}）")

    # 立刻报出 id 重复——这正是要拦的东西
    by_id: dict[int, list[str]] = {}
    for k, v in table.items():
        by_id.setdefault(v["id"], []).append(v["canonical"])
    dups = {i: v for i, v in by_id.items() if len(v) > 1}

    print(f"解析成功 {len(table)}   失败 {len(failed)}   唯一 id {len(by_id)}")
    if dups:
        print(f"\n发现 {len(dups)} 组同一仓库的不同名字（改名/换组织）:")
        for i, v in dups.items():
            print(f"  id {i}: {v}")
    if failed:
        print(f"\n无法解析（已删除或改名后无重定向）: {failed[:20]}")


if __name__ == "__main__":
    main()
