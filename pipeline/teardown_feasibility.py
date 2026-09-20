"""量这 29 个项目能不能按 Berkeley 的标准做 3D 拆解台。

不猜、不填：逐个从缓存仓库树里数真实的 URDF / 网格文件与格式，
从已解析的 BOM 里数真实零件行，再判定八项交付物里哪些**有据可建**、
哪些**这个仓库里没有**。

输出 data/teardown-feasibility.json，供生成器与报告共用。
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

import build_projects as B  # noqa: E402

CACHE = B.CACHE

URDF_RX = re.compile(r"\.(urdf|xacro|urdf\.xacro)$", re.I)
MESH_EXT = {
    ".stl": "STL", ".dae": "DAE", ".obj": "OBJ", ".ply": "PLY",
    ".glb": "GLB", ".gltf": "GLTF", ".fbx": "FBX", ".3mf": "3MF",
    ".stp": "STEP", ".step": "STEP", ".igs": "IGES", ".iges": "IGES",
}

# 只有这些能被 three.js 直接吃下或经简单转换后吃下（用于 3D 视图port）
WEB_MESH = {"STL", "DAE", "OBJ", "PLY", "GLB", "GLTF", "FBX", "3MF"}
# 网格是可近似渲染的（有面片），CAD 实体不是（需要内核）
SOLID_CAD = {"STEP", "IGES"}


def mesh_files(tree: list[dict]) -> list[dict]:
    out = []
    for e in tree:
        if e.get("type") != "blob":
            continue
        p = e["path"]
        if B.VENDOR_PATH_RX.search(p):
            continue
        ext = ("." + p.rsplit(".", 1)[-1].lower()) if "." in p else ""
        if ext in MESH_EXT:
            out.append({"path": p, "ext": ext, "kind": MESH_EXT[ext],
                        "size": e.get("size", 0)})
    return out


def main() -> None:
    scores = json.loads((ROOT / "data" / "score-audit.json").read_text())["scores"]
    bom = json.loads((ROOT / "data" / "bom-content.json").read_text())
    audit = {x["id"]: x for x in json.loads((ROOT / "data" / "audit-all.json").read_text())}

    targets = sorted(
        [(k, v) for k, v in scores.items() if v.get("score") is not None and v["score"] >= 70],
        key=lambda t: -t[1]["score"],
    )
    print(f"目标：{len(targets)} 个项目（≥70）\n")

    report = []
    for pid, sc in targets:
        repo = sc["repository"].replace("https://github.com/", "").rstrip("/")
        tree = B.load_tree(repo) or []

        urdfs = [e["path"] for e in tree
                 if e.get("type") == "blob" and URDF_RX.search(e["path"])
                 and not B.VENDOR_PATH_RX.search(e["path"])]
        meshes = mesh_files(tree)
        kinds: dict[str, int] = {}
        bytes_by_kind: dict[str, int] = {}
        for m in meshes:
            kinds[m["kind"]] = kinds.get(m["kind"], 0) + 1
            bytes_by_kind[m["kind"]] = bytes_by_kind.get(m["kind"], 0) + m["size"]

        web = {k: v for k, v in kinds.items() if k in WEB_MESH}
        # 该项目的 BOM 解析结果
        rows = sum(i.get("rows", 0) for i in bom.get(repo, {}).values()
                   if i.get("status") == "ok")
        bom_files = [p for p, i in bom.get(repo, {}).items() if i.get("status") == "ok"]

        a = audit.get(pid, {})
        report.append({
            "id": pid,
            "name": sc["name"],
            "repo": repo,
            "score": sc["score"],
            "urdf": urdfs[:40],
            "urdfCount": len(urdfs),
            "meshKinds": kinds,
            "meshBytesByKind": bytes_by_kind,
            "webMeshCount": sum(web.values()),
            "webMeshKinds": web,
            "totalMeshBytes": sum(bytes_by_kind.values()),
            "bomFiles": bom_files,
            "bomRows": rows,
            "kinematicsEvidence": a.get("evidence", {}).get("total"),
        })

    (ROOT / "data" / "teardown-feasibility.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")

    # --- 打印 ---
    def mb(b: int) -> str:
        return f"{b/1e6:.1f}MB" if b >= 1e6 else f"{b/1e3:.0f}KB"

    print(f"{'项目':<34}{'分':>6}{'URDF':>6}{'可渲染网格':>10}{'网格体积':>10}{'BOM行':>7}  格式")
    for r in report:
        fm = ",".join(f"{k}×{v}" for k, v in sorted(r["webMeshKinds"].items(),
                                                   key=lambda t: -t[1])) or "—"
        print(f"{r['name'][:33]:<34}{r['score']:>6.1f}{r['urdfCount']:>6}"
              f"{r['webMeshCount']:>10}{mb(r['totalMeshBytes']):>10}{r['bomRows']:>7}  {fm[:46]}")

    has_urdf = sum(1 for r in report if r["urdfCount"])
    has_web = sum(1 for r in report if r["webMeshCount"])
    both = sum(1 for r in report if r["urdfCount"] and r["webMeshCount"])
    print(f"\n有 URDF: {has_urdf}/{len(report)} · 有可渲染网格: {has_web}/{len(report)}"
          f" · 两者都有: {both}/{len(report)}")
    print(f"有可解析 BOM 行: {sum(1 for r in report if r['bomRows'])}/{len(report)}")
    print(f"总网格体积: {mb(sum(r['totalMeshBytes'] for r in report))}")


if __name__ == "__main__":
    main()
