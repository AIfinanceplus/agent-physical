#!/usr/bin/env python3
"""STEP/IGES → STL，交给独立子进程跑。

为什么必须是子进程：gmsh 遇到致命输入（真实语料里有 132 字节的残缺 .step）
会直接 abort 整个进程——不是抛异常，try/except 拦不住。而且 gmsh 是全局状态、
非线程安全，放进线程池里跑同样会把整批任务带走。

输入：JSON 数组 [[输入路径, 输出路径], ...]（由 build_teardowns.py 写入临时文件）
输出：stdout 上一行 JSON：{成功数, 失败数, 失败列表}
"""

from __future__ import annotations

import json
import sys
from pathlib import Path


def tessellate(src: Path, dst: Path) -> bool:
    import gmsh

    # 网格粗细随文件体量自适应：小件细一点看得出结构，17 MB 的 PCB 导出件必须粗，
    # 否则单个文件就要跑十几分钟。实体网格化的代价随体量急剧上升。
    mb = src.stat().st_size / 1e6
    size_factor = 2.0 + min(6.0, 2.0 + mb / 2.0)

    gmsh.initialize()
    try:
        gmsh.option.setNumber("General.Terminal", 0)
        gmsh.option.setNumber("General.Verbosity", 0)
        gmsh.model.occ.importShapes(str(src))
        gmsh.model.occ.synchronize()
        if not gmsh.model.getEntities(2):
            return False
        gmsh.option.setNumber("Mesh.MeshSizeFactor", size_factor)
        gmsh.option.setNumber("Mesh.Algorithm", 6)
        gmsh.model.mesh.generate(2)
        gmsh.write(str(dst))
        return dst.exists() and dst.stat().st_size > 0
    finally:
        gmsh.finalize()


def main() -> None:
    pairs = json.loads(Path(sys.argv[1]).read_text())
    ok, failed = 0, []
    for pair in pairs:
        src, dst = pair[0], pair[1]
        try:
            if tessellate(Path(src), Path(dst)):
                ok += 1
            else:
                failed.append(src)
        except Exception:
            failed.append(src)
    print(json.dumps({"ok": ok, "failed": failed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
