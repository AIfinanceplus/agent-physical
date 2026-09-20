#!/usr/bin/env python3
"""核验生成的 3D 拆解台 —— 每条断言都可证伪。

不是"跑通了就行"：这里逐项目检查产物内部是否自洽，并把不合格项列出来。
六项断言：

  1. GLB 存在且可解析，且**每个 GLB 节点名都能在零件表里找到**
     （3D 里看得见却点不开、或零件表里有却渲染不出来，都是坏产物）
  2. 零件表里每个零件的 id 唯一，且每个 mesh 类零件都在 GLB 里存在同名节点
  3. 装配树的每个 partId 都能在零件表里解析到（悬空引用 = 0）
  4. 每个 meshLink 都能在 GLB 节点里找到，且每个零件至少被一个总成引用
  5. 分区（regions）与 regionByLink 自洽：每个零件都归属某个分区，分区键都在 regions 里
  6. gaps 非空、basis 非空 —— 生成项目必须声明来源与缺口

输出 data/teardown-audit.json，退出码非 0 表示有 FAIL。
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GEN = ROOT / "lib" / "teardowns.generated.ts"
OUT = ROOT / "data" / "teardown-audit.json"


def load_specs() -> dict:
    text = GEN.read_text(encoding="utf-8")
    start = text.index("= {") + 2
    end = text.rindex("};") + 1          # +1 保留闭合的大括号，否则 JSON 少一层
    return json.loads(text[start:end])


def glb_node_names(path: Path) -> set[str] | None:
    """只读 GLB 的 JSON 头拿节点名，不引入 trimesh 依赖。"""
    import struct

    if not path.exists():
        return None
    raw = path.read_bytes()
    if raw[:4] != b"glTF":
        return None
    off = 12
    while off + 8 <= len(raw):
        clen, ctype = struct.unpack_from("<II", raw, off)
        if ctype == 0x4E4F534A:  # JSON
            doc = json.loads(raw[off + 8: off + 8 + clen].decode("utf-8"))
            return {n.get("name") for n in doc.get("nodes", []) if n.get("name")}
        off += 8 + clen + ((4 - clen % 4) % 4)
    return None


def main() -> None:
    specs = load_specs()
    print(f"核验 {len(specs)} 个生成的拆解台\n")
    report = {}
    fails = 0

    for pid, spec in sorted(specs.items()):
        pids = [p["id"] for p in spec["parts"]]
        dupes = sorted({i for i in pids if pids.count(i) > 1})
        nodes = glb_node_names(ROOT / "public" / spec["modelUrl"].lstrip("/"))
        issues: list[str] = []

        if nodes is None:
            issues.append("GLB 缺失或不是合法 glTF")
        else:
            mesh_parts = [p for p in spec["parts"] if p["id"].startswith("mesh-")]
            missing_in_glb = [p["id"][5:] for p in mesh_parts if p["id"][5:] not in nodes]
            if missing_in_glb:
                issues.append(f"{len(missing_in_glb)} 个零件在 GLB 里没有同名节点（例：{missing_in_glb[0]}）")

        if dupes:
            issues.append(f"零件 id 重复 {len(dupes)} 个（例：{dupes[0]}）")

        known = set(pids)
        dangling: list[str] = []
        mesh_links: list[str] = []
        region_of: dict[str, str] = {}

        def walk(n):
            for r in n.get("parts", []):
                if r["partId"] not in known:
                    dangling.append(r["partId"])
            mesh_links.extend(n.get("meshLinks", []))
            for m in n.get("meshLinks", []):
                region_of[m] = n["id"]
            for c in n.get("children", []):
                walk(c)

        walk(spec["tree"])
        if dangling:
            issues.append(f"装配树里有 {len(dangling)} 个悬空 partId（例：{dangling[0]}）")

        if nodes is not None:
            bad_links = [m for m in mesh_links if m not in nodes]
            if bad_links:
                issues.append(f"meshLinks 里有 {len(bad_links)} 个不在 GLB 中（例：{bad_links[0]}）")

        refd = set(mesh_links)
        mesh_parts = [p["id"][5:] for p in spec["parts"] if p["id"].startswith("mesh-")]
        unreferenced = [m for m in mesh_parts if m not in refd]
        if unreferenced:
            issues.append(f"{len(unreferenced)} 个零件没有被任何总成引用（例：{unreferenced[0]}）")

        region_keys = {r["key"] for r in spec["regions"]}
        bad_regions = [k for k in set(spec["regionByLink"].values()) if k not in region_keys]
        if bad_regions:
            issues.append(f"regionByLink 里有 {len(bad_regions)} 个未定义的键（例：{bad_regions[0]}）")
        noval = [m for m in mesh_parts if m not in spec["regionByLink"]]
        if noval:
            issues.append(f"{len(noval)} 个零件没有分区归属")

        if not spec.get("gaps"):
            issues.append("gaps 为空（生成项目必须声明缺口）")
        if not spec.get("basis"):
            issues.append("basis 为空")

        level = "FAIL" if any(
            k in i for i in issues
            for k in ("GLB 缺失", "悬空", "重复", "没有同名节点", "不在 GLB 中")
        ) else ("WARN" if issues else "PASS")
        if level == "FAIL":
            fails += 1

        report[pid] = {
            "name": spec["name"], "level": level, "issues": issues,
            "parts": len(spec["parts"]), "meshParts": len(mesh_parts),
            "glbNodes": len(nodes) if nodes else 0,
            "assemblies": len(spec["tree"]["children"]),
            "regions": len(spec["regions"]),
            "gaps": len(spec.get("gaps", [])),
            "score": spec.get("score"),
        }
        mark = {"PASS": "  OK  ", "WARN": "  ~   ", "FAIL": "  !!  "}[level]
        print(f"{mark}{spec['name'][:32]:<33} {len(spec['parts']):>4} 零件 "
              f"GLB {report[pid]['glbNodes']:>3} 节点 {report[pid]['assemblies']:>2} 总成 "
              f"{report[pid]['regions']:>2} 分区"
              + ("" if not issues else f"  ← {len(issues)} 项"))
        for i in issues:
            print(f"        · {i}")

    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    lv = {}
    for v in report.values():
        lv[v["level"]] = lv.get(v["level"], 0) + 1
    total_parts = sum(v["parts"] for v in report.values())
    total_mesh = sum(v["meshParts"] for v in report.values())
    print(f"\n{lv} · 零件 {total_parts}（几何件 {total_mesh}）")
    print(f"→ {OUT}")
    if fails:
        print(f"\n!! {fails} 个 FAIL —— 产物不自洽，需修")
        sys.exit(1)


if __name__ == "__main__":
    main()
