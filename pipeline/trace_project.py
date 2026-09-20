#!/usr/bin/env python3
"""追踪某几个仓库在生成流程各关卡的去留。

诊断"这条为什么没进目录"时用。手工挨个猜关卡很慢，而且生成器的关卡顺序
（层级过滤 → 大小写去重 → 合并种子 → id 去重 → 仿真/反信号/关键词闸 → 硬件闸）
里任何一关都能拦下它，光看最终计数看不出是哪一关。
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import build_projects as B  # noqa: E402

TARGETS = [t.lower() for t in sys.argv[1:]] or [
    "wuphilipp/gello_mechanical", "fuwei007/navbot-en01"]


def hit(name: str) -> bool:
    return name.lower() in TARGETS


def main() -> None:
    order = {"A": 0, "B": 1, "C": 2, "D": 3}
    cutoff = order["B"]
    robots = json.load(open(B.ROBOTS))
    raw = [r for r in robots if order.get(r.get("tier"), 9) <= cutoff]
    print(f"robots.json {len(robots)} 条 → tier≤B {len(raw)} 条")
    for r in robots:
        if hit(r["full_name"]):
            print(f"  [层级过滤] {r['full_name']} tier={r.get('tier')} "
                  f"→ {'通过' if order.get(r.get('tier'), 9) <= cutoff else '被层级别挡下'}")

    seen: dict[str, dict] = {}
    for r in raw:
        seen.setdefault(r["full_name"].lower(), r)
    print(f"大小写去重后 {len(seen)} 条")

    for r in json.loads(B.SEED_GAP.read_text(encoding="utf-8")):
        k = r["full_name"].lower()
        if hit(k):
            print(f"  [合并种子] {r['full_name']} → "
                  f"{'新增' if k not in seen else '已存在（被 robots.json 那版占位）'}")
        if k not in seen:
            seen[k] = r
    print(f"合并种子后 {len(seen)} 条")
    for t in TARGETS:
        print(f"  [合并后仍存在] {t}: {'在' if t in seen else '不在'}")

    id_map = json.loads(B.REPO_IDS.read_text(encoding="utf-8"))
    by_id: dict = {}
    for r in seen.values():
        meta = id_map.get(r["full_name"].lower())
        if meta:
            r["full_name"] = meta["canonical"]
            key = meta["id"]
        else:
            key = r["full_name"].lower()
        prev = by_id.get(key)
        if prev is None:
            by_id[key] = r
            continue
        score = lambda x: (x.get("file_count") or 0) + 10 * len(x.get("bom_files") or [])  # noqa: E731
        if hit(r["full_name"]) or hit(prev["full_name"]):
            print(f"  [id 去重] id={key} 撞了: {prev['full_name']}({score(prev)}) "
                  f"vs {r['full_name']}({score(r)}) → 保留分高者")
        if score(r) > score(prev):
            by_id[key] = r
    repos = list(by_id.values())
    print(f"id 去重后 {len(repos)} 条")
    for t in TARGETS:
        print(f"  [id 去重后仍存在] {t}: "
              f"{'在' if any(x['full_name'].lower() == t for x in repos) else '不在'}")

    stats = Counter()
    for r in repos:
        blob = (f"{r.get('name','')} {r.get('description') or ''} "
                f"{' '.join(r.get('topics') or [])} {r.get('full_name','')}")
        tree = B.load_tree(r["full_name"])
        has_desc = bool(tree) and any(
            e.get("type") == "blob" and B.classify(e.get("path", "")) == "DESC"
            for e in tree)
        if B.SIM_NAME_RX.search(r.get("name", "")) or \
                B.SIM_DESC_RX.search(r.get("description") or ""):
            if hit(r["full_name"]):
                print(f"  [仿真闸] {r['full_name']} 被挡")
            stats["drop_simulator"] += 1
            continue
        if B.NEG_SIGNAL.search(blob):
            if hit(r["full_name"]):
                print(f"  [反信号闸] {r['full_name']} 被挡："
                      f"{B.NEG_SIGNAL.search(blob).group(0)!r}")
            stats["drop_neg_signal"] += 1
            continue
        if not B.ROBOT_SIGNAL.search(blob):
            if not (r.get("_trust") == "hardware" or has_desc):
                if hit(r["full_name"]):
                    print(f"  [关键词闸] {r['full_name']} 被挡："
                          f"无关键词、trust={r.get('_trust')}、URDF={has_desc}")
                stats["drop_no_robot_signal"] += 1
                continue
        if not tree:
            if hit(r["full_name"]):
                print(f"  [无树] {r['full_name']} 被挡")
            stats["drop_no_tree"] += 1
            continue
        B.classify_form(r)
        proj = B.build_project(r, tree, 26)
        if not proj:
            if hit(r["full_name"]):
                print(f"  [硬件闸] {r['full_name']} 被挡")
            stats["drop_no_cad"] += 1
            continue
        if hit(r["full_name"]):
            print(f"  [✓ 收录] {r['full_name']} → {len(proj['parts'])} 零件")
    print(f"\n各关拦下计数: {dict(stats)}")


if __name__ == "__main__":
    main()
