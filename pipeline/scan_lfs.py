"""全量扫一遍：哪些项目的网格/实体文件其实是 Git LFS 指针。

LFS 指针是 ~130 字节的文本文件（version/oid/size 三行）。所以"树的体积"就能判定，
不需要下载任何东西 —— 这是覆盖式检测，不是抽样。

用法：python3 pipeline/scan_lfs.py
输出：data/lfs-affected.json

为什么要单独扫：这件事会**双向**骗人。指针文件看着像网格（有 .stl 后缀、在仓库里、
有 sha），按名字统计会把它当成零件；按"文件取不回内容"统计又会把整个项目
报成"没有几何"。两种都是错的 —— 几何一直在，只是要经 LFS 批量接口换真实对象。
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

import build_projects as B  # noqa: E402
import build_teardowns as T  # noqa: E402

MESH = set(T.WEB_EXT) | set(T.SOLID_EXT)


def main() -> None:
    scores = json.loads((ROOT / "data" / "score-audit.json").read_text())["scores"]
    rows = []
    for pid, sc in sorted(scores.items()):
        repo = sc["repository"].replace("https://github.com/", "").rstrip("/")
        tree = B.load_tree(repo)
        if not tree:
            continue
        meshes = [
            (e["path"], e.get("size", 0)) for e in tree
            if e.get("type") == "blob"
            and ("." + e["path"].rsplit(".", 1)[-1].lower()) in MESH
            and not B.VENDOR_PATH_RX.search(e["path"])
        ]
        if not meshes:
            continue
        tiny = [m for m in meshes if m[1] <= 400]
        if not tiny:
            continue
        rows.append({
            "pid": pid, "name": sc["name"], "repo": repo, "score": sc["score"],
            "tiny": len(tiny), "total": len(meshes), "allTiny": len(tiny) == len(meshes),
        })

    rows.sort(key=lambda r: -r["tiny"])
    full = [r for r in rows if r["allTiny"]]
    print(f"网格全是 LFS 指针（整项目无可用几何）：{len(full)} 个项目")
    for r in full:
        print(f"   {r['score']:>5}  {r['total']:>5} 个网格  {r['name'][:30]:<32} {r['repo']}")
    part = [r for r in rows if not r["allTiny"]]
    print(f"\n部分网格是 LFS 指针：{len(part)} 个项目")
    for r in part[:15]:
        print(f"   {r['score']:>5}  {r['tiny']:>5}/{r['total']:<5} {r['name'][:30]:<32} {r['repo']}")
    if len(part) > 15:
        print(f"   … 其余 {len(part) - 15} 个")

    out = ROOT / "data" / "lfs-affected.json"
    out.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n共 {len(rows)} 个项目受影响 → {out}")


if __name__ == "__main__":
    main()
