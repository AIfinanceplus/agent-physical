#!/usr/bin/env python3
"""为每个目标项目生成 Berkeley 标准的深 3D 拆解台。

对照 Berkeley 参照实现的八项交付物，逐项从仓库自身取证：

  1. 3D 几何     URDF 引用的网格（STL/OBJ/3MF/DAE）；纯 STEP/IGES 的项目用
                 gmsh 用真 CAD 内核网格化。**不生成任何虚构几何。**
  2. link/joint  URDF 的 link/joint：质量、包围盒、三角面数、关节类型/父子/
     元数据       轴向/限位；无 URDF 时如实留空。
  3. 装配层级    有 URDF 按关节树分组（根 link 的第一层分支 = 分区）；
                 无 URDF 按仓库目录分组。
  4. 零件表      每个网格文件 = 一个零件（数量取它在 URDF 里被引用的次数）；
                 物料清单的行项作为外购件收入，类别与来源逐行可查。
  5. 分区与爆炸  分区来自项目自身结构（四足是"机身 + 四条腿"，不是人形的躯干四肢）。
  6. 证据分      直接读 score-audit.json，锚点 Berkeley = 100。
  7. 交互组件    复用同一套深工作台组件（爆炸/点选/隔离/关节/BOM/分件卡）。
  8. 缺口声明    gaps 必填：缺什么写什么。

需要可选依赖（缺失时对应格式如实记为能力缺口，不冒充成功）：

    uv run --with trimesh --with fast-simplification --with gmsh \
        python pipeline/build_teardowns.py --only <id> [--only <id> ...]

用法：
    --only <id>      只做指定项目（可重复）
    --min-score 70   分数门槛（默认 70）
    --max-parts 400  每个项目的零件行上限
    --budget-faces   全项目三角形面数预算（默认 160000）
    --dry-run        只报告判定结果，不写产物
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import math
import os
import re
import subprocess
import sys
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote

import urllib.request

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

import build_projects as B  # noqa: E402

WORK = ROOT / ".teardown-work"          # 下载缓存（不进 git）
OUT_GLB = ROOT / "public" / "teardowns"
RAW = "https://raw.githubusercontent.com"

DEFAULT_BUDGET_FACES = 160_000
MIN_FACES_PER_PART = 900
FETCH_TIMEOUT = 90
NO_LFS = False              # --no-lfs 时置真：不解析 Git LFS 指针

MESH_EXT = {".stl", ".obj", ".ply", ".3mf", ".dae", ".fbx", ".glb", ".gltf"}
SOLID_EXT = {".step", ".stp", ".iges", ".igs"}
WEB_EXT = MESH_EXT | SOLID_EXT

# 物料清单行项原文（data/bom-rows.json），main 里加载后供 build_one 使用。
BOM_ROWS: dict = {}

URDF_RX = re.compile(r"\.(urdf|xacro|urdf\.xacro)$", re.I)


# ---------------------------------------------------------------- 抓取

LFS_POINTER_MAGIC = b"version https://git-lfs.github.com/spec/v1"


def lfs_token() -> str | None:
    """GitHub 令牌：只在本进程内用于 LFS 批量接口，不写入任何产物、不打印。

    环境变量优先，其次取 `gh auth token`（本机 gh 已认证）。
    """
    for key in ("GITHUB_TOKEN", "GH_TOKEN"):
        if os.environ.get(key):
            return os.environ[key]
    try:
        out = subprocess.run(["gh", "auth", "token"], capture_output=True,
                             text=True, timeout=20)
        return out.stdout.strip() or None
    except Exception:
        return None


def lfs_fetch(repo: str, pointer: bytes, timeout: int) -> bytes | None:
    """把 Git LFS 指针换成真实对象字节。失败返回 None（不抛异常）。

    真实语料里大量仓库把网格放在 LFS 里：raw 链接取回来的是 130 字节的
    "version/oid/size" 文本，看着像文件、其实不是网格。不换真实对象就会误判成
    "这个项目没有几何" —— 那是在用存储方式冒充内容缺失。
    """
    oid, size = None, 0
    for line in pointer.decode("utf-8", "ignore").splitlines():
        line = line.strip()
        if line.startswith("oid sha256:"):
            oid = line.split(":", 1)[1].strip()
        elif line.startswith("size "):
            try:
                size = int(line.split()[1])
            except ValueError:
                size = 0
    if not oid:
        return None

    tok = lfs_token()
    auth = None
    if tok:
        auth = "Basic " + base64.b64encode(
            f"x-access-token:{tok}".encode()).decode()
    headers = {
        "Accept": "application/vnd.git-lfs+json",
        "Content-Type": "application/vnd.git-lfs+json",
        "User-Agent": "agent-physical-teardown",
    }
    if auth:
        headers["Authorization"] = auth
    body = json.dumps({
        "operation": "download", "transfers": ["basic"],
        "objects": [{"oid": oid, "size": size}],
    }).encode()
    try:
        req = urllib.request.Request(
            f"https://github.com/{repo}.git/info/lfs/objects/batch",
            data=body, headers=headers)
        with urllib.request.urlopen(req, timeout=60) as r:
            res = json.loads(r.read())
    except Exception:
        return None
    obj = (res.get("objects") or [{}])[0]
    href = ((obj.get("actions") or {}).get("download") or {}).get("href")
    if not href:
        return None
    dl = {"User-Agent": "agent-physical-teardown"}
    if auth:
        dl["Authorization"] = auth
    try:
        with urllib.request.urlopen(
                urllib.request.Request(href, headers=dl),
                timeout=max(timeout, 300)) as r:
            data = r.read()
    except Exception:
        return None
    # 取回来的还得是网格本身：有的仓库把指针的指针也放进来了。
    if not data or data.startswith(LFS_POINTER_MAGIC):
        return None
    return data


def fetch(repo: str, path: str, timeout: int = FETCH_TIMEOUT) -> bytes | None:
    """按路径抓取原始文件，带磁盘缓存。失败返回 None —— 不抛异常、不造假。

    Git LFS 指针会自动换成真实对象（见 lfs_fetch）。换不到时**返回指针原文**而不是
    None：调用方据此能把"文件不存在"和"文件是 LFS 指针但取不到实体"分开报。
    """
    safe = re.sub(r"[^A-Za-z0-9._-]", "_", f"{repo}__{path}")
    cached = WORK / "files" / safe
    data = None
    if cached.exists() and cached.stat().st_size > 0:
        data = cached.read_bytes()
    if data is None:
        url = f"{RAW}/{repo}/HEAD/{quote(path)}"
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "agent-physical-teardown"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read()
        except Exception:
            return None
        if not data:
            return None

    if data.startswith(LFS_POINTER_MAGIC) and not NO_LFS:
        real = lfs_fetch(repo, data, timeout)
        if real:
            cached.parent.mkdir(parents=True, exist_ok=True)
            cached.write_bytes(real)
            return real
        return data                      # 保留指针：让调用方如实分类
    if not cached.exists():
        cached.parent.mkdir(parents=True, exist_ok=True)
        cached.write_bytes(data)
    return data


# ---------------------------------------------------------------- URDF

def parse_floats(s: str | None) -> list[float]:
    if not s:
        return [0.0, 0.0, 0.0]
    try:
        v = [float(x) for x in s.replace(",", " ").split()]
    except ValueError:
        return [0.0, 0.0, 0.0]
    while len(v) < 3:
        v.append(0.0)
    return v[:3]


def rpy_matrix(rpy: list[float]) -> list[list[float]]:
    r, p, y = rpy
    cr, sr = math.cos(r), math.sin(r)
    cp, sp = math.cos(p), math.sin(p)
    cy, sy = math.cos(y), math.sin(y)
    return [
        [cy * cp, cy * sp * sr - sy * cr, cy * sp * cr + sy * sr],
        [sy * cp, sy * sp * sr + cy * cr, sy * sp * cr - cy * sr],
        [-sp, cp * sr, cp * cr],
    ]


def mat_mul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


def mat_vec(a, v):
    return [sum(a[i][k] * v[k] for k in range(3)) for i in range(3)]


def as_matrix(rot, trans):
    """4x4 (rot 3x3, trans 3) → (R, t) 对，够用就不引入 numpy 依赖。"""
    return rot, trans


def compose(a, b):
    (ra, ta), (rb, tb) = a, b
    return (mat_mul(ra, rb), [ta[i] + mat_vec(ra, tb)[i] for i in range(3)])


IDENT = ([[1.0, 0, 0], [0, 1.0, 0], [0, 0, 1.0]], [0.0, 0.0, 0.0])


class Urdf:
    def __init__(self, text: str, source_path: str):
        self.source_path = source_path
        self.root = ET.fromstring(text)
        self.links: dict[str, dict] = {}
        self.joints: list[dict] = []

        for link in self.root.findall("link"):
            name = link.get("name") or ""
            if not name:
                continue
            entry = {"name": name, "mass": None, "visuals": []}
            inert = link.find("inertial/mass")
            if inert is not None:
                try:
                    entry["mass"] = float(inert.get("value", ""))
                except ValueError:
                    entry["mass"] = None
            for vis in link.findall("visual"):
                mesh = vis.find("geometry/mesh")
                if mesh is None:
                    continue
                fn = mesh.get("filename") or ""
                if not fn:
                    continue
                scale = parse_floats(mesh.get("scale")) if mesh.get("scale") else [1.0, 1.0, 1.0]
                entry["visuals"].append({
                    "file": fn,
                    "origin": (parse_floats(vis.find("origin").get("xyz") if vis.find("origin") is not None else None),
                               parse_floats(vis.find("origin").get("rpy") if vis.find("origin") is not None else None)),
                    "scale": scale,
                })
            self.links[name] = entry

        for j in self.root.findall("joint"):
            name = j.get("name") or ""
            parent = j.find("parent")
            child = j.find("child")
            if not name or parent is None or child is None:
                continue
            origin = j.find("origin")
            axis = parse_floats(j.find("axis").get("xyz") if j.find("axis") is not None else None)
            lim = j.find("limit")
            lower = upper = None
            if lim is not None:
                try:
                    lower = float(lim.get("lower")) if lim.get("lower") is not None else None
                except ValueError:
                    lower = None
                try:
                    upper = float(lim.get("upper")) if lim.get("upper") is not None else None
                except ValueError:
                    upper = None
            self.joints.append({
                "name": name,
                "type": j.get("type") or "unknown",
                "parent": parent.get("link") or "",
                "child": child.get("link") or "",
                "origin": (parse_floats(origin.get("xyz") if origin is not None else None),
                           parse_floats(origin.get("rpy") if origin is not None else None)),
                "axis": axis,
                "lower": lower,
                "upper": upper,
            })

    def mesh_refs(self) -> list[str]:
        out = []
        for link in self.links.values():
            for v in link["visuals"]:
                out.append(v["file"])
        return out

    def link_transforms(self) -> dict[str, tuple]:
        """正运动学：零位下每个 link 的绝对位姿。无 URDF 关节链的 link 落在原点。"""
        children = {j["child"]: j for j in self.joints}
        roots = [n for n in self.links if n not in children]
        out: dict[str, tuple] = {}
        stack = [(r, IDENT) for r in roots]
        while stack:
            name, tf = stack.pop()
            if name in out:
                continue
            out[name] = tf
            for j in self.joints:
                if j["parent"] != name:
                    continue
                xyz, rpy = j["origin"]
                child_tf = compose(tf, (rpy_matrix(rpy), xyz))
                stack.append((j["child"], child_tf))
        return out

    def branches(self) -> dict[str, str]:
        """根 link 的第一层分支 → 每个 link 归到哪个分区（项目自身的结构，不是套人形模板）。"""
        roots = [n for n in self.links if n not in {j["child"] for j in self.joints}]
        root = roots[0] if roots else (next(iter(self.links), ""))
        out: dict[str, str] = {}
        frontier = [(root, root)]
        seen = set()
        while frontier:
            name, branch = frontier.pop()
            if name in seen:
                continue
            seen.add(name)
            out[name] = branch
            for j in self.joints:
                if j["parent"] == name:
                    nb = branch if name != root else j["child"]
                    frontier.append((j["child"], nb))
        return out


def resolve_mesh_path(ref: str, tree_paths: set[str], urdf_dir: str) -> str | None:
    """把 URDF 的 mesh 引用解析成仓库内的真实路径。

    依次尝试：直接路径 → 相对 URDF 目录 → package:// 去掉包名后按后缀唯一匹配。
    唯一匹配失败就返回 None（宁可缺，不猜）。
    """
    clean = ref.replace("\\", "/")
    pkg_root = os.path.dirname(urdf_dir.rstrip("/"))
    candidates: list[str] = []
    if clean.startswith("package://"):
        rest = clean[len("package://"):]
        parts = rest.split("/", 1)
        rel = parts[1] if len(parts) > 1 else ""
        candidates.append(rel)
        # 常见约定：包名就是目录名
        candidates.append(f"{parts[0]}/{rel}")
        candidates.append(f"src/{parts[0]}/{rel}")
        # 最可靠的一条：URDF 位于 <...>/<pkg>/urdf/x.urdf 时，
        # <...>/<pkg>/ 就是包根，网格在它下面。同名文件在不同变体里
        # 各有一份（本仓库有 5 份 chassis_link.STL），只有按包定位才不会认错。
        if pkg_root:
            candidates.append(f"{pkg_root}/{rel}".lstrip("/"))
    elif clean.startswith("file://"):
        candidates.append(clean[len("file://"):].lstrip("/"))
    else:
        candidates.append(clean)
        candidates.append(f"{urdf_dir}/{clean}".lstrip("/"))
        if pkg_root:
            candidates.append(f"{pkg_root}/{clean}".lstrip("/"))

    for c in candidates:
        if c in tree_paths:
            return c
    # 后缀唯一匹配
    tail = candidates[-1].lstrip("./")
    hits = [p for p in tree_paths if p.endswith("/" + tail) or p == tail]
    if len(hits) == 1:
        return hits[0]
    base = clean.rsplit("/", 1)[-1]
    hits = [p for p in tree_paths if p.rsplit("/", 1)[-1] == base]
    if len(hits) == 1:
        return hits[0]
    # 同名多份时按包目录收窄：同包下的那一份才是这个 URDF 的网格。
    if pkg_root:
        scoped = [p for p in hits if p.startswith(pkg_root + "/")]
        if len(scoped) == 1:
            return scoped[0]
    return None


# ---------------------------------------------------------------- 网格

def load_mesh_bytes(data: bytes, ext: str):
    """字节 → trimesh。网格格式直接读；实体 CAD 走已网格化好的 STL。"""
    import trimesh
    import io

    if ext in SOLID_EXT:
        raise ValueError("实体 CAD 必须先经 tessellate_solids() 网格化")

    try:
        m = trimesh.load(io.BytesIO(data), file_type=ext.lstrip("."), force="mesh")
    except Exception:
        try:
            m = trimesh.load(io.BytesIO(data), file_type=ext.lstrip("."))
            if hasattr(m, "dump"):
                m = m.dump(concatenate=True)
            else:
                return None
        except Exception:
            return None
    return m if m is not None and getattr(m, "faces", None) is not None and len(m.faces) else None


def tessellate_solids(repo: str, units: list[dict], sizes: dict[str, int],
                      max_solids: int = 10, max_solid_mb: float = 60.0,
                      step_timeout: int = 240,
                      retry_failed: bool = False
                      ) -> tuple[dict[str, bytes], list[str], list[str]]:
    """把项目里的 STEP/IGES 交给**一个子进程**网格化。

    返回 (路径 → STL 字节, 失败清单, 因超预算未取清单)。

    子进程隔离是必需的：gmsh 遇到残缺输入会 abort 进程（不是异常），
    放在主进程或线程池里会把整批 29 个项目一起带走。单个文件失败只记不炸。
    """
    import subprocess

    solids = [u for u in units if u["ext"] in SOLID_EXT]
    if not solids:
        return {}, [], []

    workdir = WORK / "step" / re.sub(r"[^A-Za-z0-9._-]", "_", repo)
    indir = workdir / "in"
    outdir = workdir / "out"
    indir.mkdir(parents=True, exist_ok=True)
    outdir.mkdir(parents=True, exist_ok=True)

    done: dict[str, bytes] = {}
    # 上次网格化失败的件也记下来：实体网格化失败的典型原因是"这个件本身就解不出网格"，
    # 每次重跑都重新等一遍超时（240 秒/项目）纯属浪费。要重试加 --retry-failed-solids。
    failed_log = workdir / "failed.json"
    known_failed: set[str] = set()
    if failed_log.exists() and not retry_failed:
        try:
            known_failed = set(json.loads(failed_log.read_text()))
        except Exception:
            known_failed = set()
    pairs: list[list] = []
    pair_units: list[str] = []          # pairs[i] 对应的仓库路径，用于把产物映射回去
    pair_dsts: list[str] = []
    total_bytes = 0
    # 按体量从小到大取，并且限制单项目的实体总字节数。
    # 实体网格化的代价随文件体量急剧上升：本语料里 barkour 的 PCB 导出件单个 17 MB，
    # 44 个全跑一小时都出不来，而画面上 10 个零件和 44 个零件看不出差别——
    # 「覆盖代表性零件 + 写明选取规则」比「跑到超时」诚实也更快。
    solids_sorted = sorted(solids, key=lambda u: sizes.get(u["path"], 0))
    skipped_solids: list[str] = []
    for u in solids_sorted:
        sz = sizes.get(u["path"], 0)
        # 产物按「路径 + 体量」的哈希命名并跨运行复用：一是重跑不必重算一小时，
        # 二是内容寻址的缓存不会像 s0.stl 那样把上一次的残留当成本次成功。
        key = hashlib.sha1(f"{u['path']}|{sz}".encode()).hexdigest()[:16]
        dst = outdir / f"{key}.stl"
        if dst.exists() and dst.stat().st_size > 0:
            done[u["path"]] = dst.read_bytes()
            continue
        if len(pairs) >= max_solids or total_bytes + sz > max_solid_mb * 1_000_000:
            skipped_solids.append(u["path"])
            continue
        if u["path"] in known_failed:
            skipped_solids.append(u["path"])
            continue
        data = fetch(repo, u["path"])
        if not data:
            skipped_solids.append(u["path"])
            continue
        src = indir / f"{key}{u['ext']}"
        src.write_bytes(data)
        pairs.append([str(src), str(dst), sz])
        pair_units.append(u["path"])
        pair_dsts.append(str(dst))
        total_bytes += len(data)

    if not pairs:
        failed = [u["path"] for u in solids
                  if u["path"] not in done and u["path"] not in skipped_solids]
        return done, failed, skipped_solids

    job = workdir / "job.json"
    job.write_text(json.dumps(pairs), encoding="utf-8")
    try:
        subprocess.run(
            [sys.executable, str(Path(__file__).with_name("_step_to_stl.py")), str(job)],
            capture_output=True, text=True, timeout=step_timeout,
        )
    except Exception:
        pass

    out = dict(done)
    # 产物路径按 solids 体量排序生成，与 solids 原始顺序不同 ——
    # 必须按 pair_units 一一映射回去，否则零件会张冠李戴。
    for i, upath in enumerate(pair_units):
        stl = Path(pair_dsts[i])
        if stl.exists() and stl.stat().st_size > 0:
            out[upath] = stl.read_bytes()
    failed = [u["path"] for u in solids if u["path"] not in out and u["path"] not in skipped_solids]
    if failed:
        failed_log.write_text(json.dumps(sorted(set(failed)), ensure_ascii=False))
    return out, failed, skipped_solids


def decimate(mesh, target_faces: int):
    n = len(mesh.faces)
    if n <= target_faces or target_faces <= 0:
        return mesh, n
    try:
        out = mesh.simplify_quadric_decimation(percent=1.0 - target_faces / n)
        return out, len(out.faces)
    except Exception:
        return mesh, n


def transformed(mesh, tf):
    """把网格从 link 局部坐标搬到世界坐标（URDF 零位位姿）。

    返回 None 表示这个网格的顶点本身有 inf/NaN 之类的坏值——
    变换后会变成一团垃圾坐标。宁可把它记为"未解析"，也不要把它混进 3D 视图。
    """
    import numpy as np

    rot, trans = tf
    mesh = mesh.copy()
    verts = np.asarray(mesh.vertices, dtype=float)
    with np.errstate(invalid="ignore", over="ignore", divide="ignore"):
        verts = verts @ np.asarray(rot, dtype=float).T + np.asarray(trans, dtype=float)
    if not np.all(np.isfinite(verts)):
        return None
    mesh.vertices = verts
    return mesh


# ---------------------------------------------------------------- 主流程

def build_one(pid: str, score: dict, tree: list[dict], bom: dict,
              args) -> tuple[dict | None, str]:
    import trimesh

    repo = score["repository"].replace("https://github.com/", "").rstrip("/")
    paths = {e["path"] for e in tree if e.get("type") == "blob"}
    sizes = {e["path"]: e.get("size", 0) for e in tree if e.get("type") == "blob"}

    def allowed(p: str) -> bool:
        return not B.VENDOR_PATH_RX.search(p)

    # ---- 1. 找 URDF（排除 vendored；取 mesh 引用最多的那个） ----
    urdfs = [p for p in paths if URDF_RX.search(p) and allowed(p)]
    urdf: Urdf | None = None
    urdf_text = ""
    for cand in sorted(urdfs, key=lambda p: -sizes.get(p, 0))[:6]:
        data = fetch(repo, cand)
        if not data:
            continue
        try:
            u = Urdf(data.decode("utf-8", "ignore"), cand)
        except ET.ParseError:
            continue
        if urdf is None or len(u.mesh_refs()) > len(urdf.mesh_refs()):
            urdf, urdf_text = u, cand
        if len(urdf.mesh_refs()) >= 20:
            break

    # ---- 2. 组装几何单元（每个网格文件一个零件） ----
    units: list[dict] = []          # {name, path, ext, tf, qty, link}
    missing: list[str] = []
    gaps: list[str] = []

    if urdf and urdf.mesh_refs():
        urdf_dir = os.path.dirname(urdf.source_path)
        ltf = urdf.link_transforms()
        occ: dict[str, dict] = {}
        for lname, link in urdf.links.items():
            for v in link["visuals"]:
                rp = resolve_mesh_path(v["file"], paths, urdf_dir)
                if not rp or not allowed(rp):
                    missing.append(v["file"])
                    continue
                ext = ("." + rp.rsplit(".", 1)[-1].lower()) if "." in rp else ""
                if ext not in WEB_EXT:
                    missing.append(v["file"])
                    continue
                base = occ.setdefault(rp, {"path": rp, "ext": ext, "links": [], "visuals": 0})
                base["links"].append(lname)
                base["visuals"] += 1
        for rp, info in occ.items():
            link = info["links"][0]
            units.append({
                "name": rp.rsplit("/", 1)[-1].rsplit(".", 1)[0],
                "path": rp,
                "ext": info["ext"],
                "tf": ltf.get(link, IDENT),
                "qty": len(info["links"]),
                "link": link,
            })
        if missing:
            gaps.append(
                f"URDF 引用的 {len(set(missing))} 个网格文件在仓库里找不到"
                f"（例：{sorted(set(missing))[0]}），这些零件在 3D 视图与零件表中缺席。"
            )
    else:
        meshes = [p for p in paths if ("." + p.rsplit(".", 1)[-1].lower()) in WEB_EXT and allowed(p)]
        meshes.sort()
        for p in meshes:
            ext = "." + p.rsplit(".", 1)[-1].lower()
            units.append({
                "name": p.rsplit("/", 1)[-1].rsplit(".", 1)[0],
                "path": p, "ext": ext, "tf": IDENT, "qty": 1, "link": None,
            })
        if urdf:
            gaps.append(
                "URDF 里引用的网格一个都没能在本仓库里定位到"
                "（引用的是外部包路径），因此改用仓库内的网格文件按目录摆放："
                "零件齐全，但不按关节装配，关节反查仍取自 URDF。"
            )
        else:
            gaps.append(
                "该仓库没有运动学定义（URDF/MJCF），零件按仓库原始目录摆放、不按关节装配，"
                "关节反查不可用。"
            )

    # URDF 分支可能一条都没解析出来（引用的是外部包路径）。仓库里有网格就不该跳过：
    # 退回按目录摆放，零件齐全、层级按目录，只是没有关节装配关系。
    if not units:
        meshes = sorted(p for p in paths
                        if ("." + p.rsplit(".", 1)[-1].lower()) in WEB_EXT and allowed(p))
        for p in meshes:
            ext = "." + p.rsplit(".", 1)[-1].lower()
            units.append({
                "name": p.rsplit("/", 1)[-1].rsplit(".", 1)[0],
                "path": p, "ext": ext, "tf": IDENT, "qty": 1, "link": None,
            })
        if units:
            gaps.append(
                f"URDF 引用的网格全部无法在仓库内定位，已回退为按目录摆放仓库内的 {len(units)} 个网格文件"
                "（零件齐全，但没有关节装配关系）。"
            )

    if not units:
        return None, f"仓库里没有任何可渲染的网格文件（共 {len(paths)} 个文件）"

    # 网格数超过预算时，按**目录轮取**而不是按路径截断：
    # 一个仓库里 6000 个网格往往是同一批件的多种导出，按路径截断会整目录丢失，
    # 轮取能保证每个目录都有代表，且选取规则写进 gaps 供人核对。
    all_unit_count = len(units)
    if all_unit_count > args.max_parts:
        by_dir: dict[str, list[dict]] = {}
        for u in units:
            by_dir.setdefault(u["path"].rsplit("/", 1)[0] if "/" in u["path"] else "", []).append(u)
        picked: list[dict] = []
        idx = 0
        while len(picked) < args.max_parts:
            progressed = False
            for d in sorted(by_dir):
                if idx < len(by_dir[d]):
                    picked.append(by_dir[d][idx])
                    progressed = True
                    if len(picked) >= args.max_parts:
                        break
            if not progressed:
                break
            idx += 1
        units = picked

    # ---- 3. 取网格 + 减面 + 组装 ----
    per_part = max(MIN_FACES_PER_PART, args.budget_faces // max(1, len(units)))
    parts_out: list[dict] = []
    scene = trimesh.Scene()
    unresolved: list[str] = []
    skipped_big = 0
    lfs_blocked: list[str] = []
    used_names: set[str] = set()
    total_faces = 0

    def one(u):
        import io as _io
        import numpy as np

        if sizes.get(u["path"], 0) > args.max_file_mb * 1_000_000:
            return u, "BIG", 0, 0
        if u["ext"] in SOLID_EXT:
            data = solid_stl.get(u["path"])
            if not data:
                return u, None, 0, 0
            try:
                m = trimesh.load(_io.BytesIO(data), file_type="stl", force="mesh")
            except Exception:
                return u, None, 0, 0
        else:
            data = fetch(repo, u["path"])
            if not data:
                return u, None, 0, 0
            if data.startswith(LFS_POINTER_MAGIC):
                # 文件在仓库里，但实体在 LFS 里且这次取不到 —— 与"文件不存在"不是一回事
                return u, "LFS", 0, 0
            m = load_mesh_bytes(data, u["ext"])
            if m is None:
                return u, None, 0, 0
        # 坏网格（顶点里有 NaN/inf）会让整条变换链产出垃圾坐标。
        # 与其渲染出一团乱码，不如如实记为未解析。
        if not np.all(np.isfinite(np.asarray(m.bounds, dtype=float))):
            return u, None, 0, 0
        raw = len(m.faces)
        m = transformed(m, u["tf"])
        if m is None:
            return u, None, 0, 0
        m, kept = decimate(m, per_part)
        return u, m, raw, kept

    # 实体 CAD 先在一个子进程里网格化（见 tessellate_solids 的说明）
    solid_stl, solid_failed, solid_skipped = tessellate_solids(
        repo, units, sizes,
        max_solids=args.max_solids, max_solid_mb=args.max_solid_mb,
        retry_failed=args.retry_failed_solids,
    )
    if solid_failed:
        gaps.append(
            f"{len(solid_failed)} 个 STEP/IGES 未能网格化（文件残缺或超时），未计入 3D 视图"
            f"（例：{solid_failed[0]}）。"
        )
    if solid_skipped:
        gaps.append(
            f"另有 {len(solid_skipped)} 个 STEP/IGES 因单项目体量预算未网格化，未计入 3D 视图"
            f"（优先取了体量较小、更容易出网格的件）。"
        )

    with ThreadPoolExecutor(max_workers=8) as pool:
        for u, m, raw, kept in pool.map(one, units):
            if m is None:
                unresolved.append(u["path"])
                continue
            if m == "BIG":
                skipped_big += 1
                continue
            if m == "LFS":
                lfs_blocked.append(u["path"])
                continue
            name = u["name"]
            i = 2
            while name in used_names:
                name = f"{u['name']}_{i}"
                i += 1
            used_names.add(name)
            scene.add_geometry(m, node_name=name, geom_name=name)
            total_faces += kept
            parts_out.append({
                "node": name, "path": u["path"], "ext": u["ext"],
                "faces": kept, "facesRaw": raw, "qty": u["qty"], "link": u["link"],
                "kind": "MAKE" if u["ext"] in SOLID_EXT else "PRINT",
            })

    if not parts_out:
        return None, (f"{len(units)} 个网格一个都没能解析"
                      f"（已排除超 {args.max_file_mb:.0f} MB 的 {skipped_big} 个；"
                      f"首例 {unresolved[0] if unresolved else '—'}）")

    if unresolved:
        gaps.append(f"{len(unresolved)} 个网格文件未能解析（格式或体量原因），未计入 3D 视图。")

    outdir = OUT_GLB / pid
    outdir.mkdir(parents=True, exist_ok=True)
    glb = outdir / "model.glb"

    # 归一化尺度：一律等比缩放到"最大边 ≈ 1 单位"。
    # 参照实现（0.83 m 的人形）与已验证可用的生成件（0.46 m 的四足）都是这个量级，
    # 而 CAD 常按毫米建模（本语料里有包围盒 258×404×248 的手部）——
    # 那种绝对尺寸在同一个查看器里**渲染不出来**（同一模型缩到同一比例就正常，已实测）。
    # 缩放不改变形状、相对位置与层级；原始包围盒如实写进 model.json 与 basis，不假装它是米。
    # 必须在导出 GLB 与算 link 包围盒**之前**做，否则两者会差一个比例。
    raw_extent = [float(x) for x in scene.extents]
    _mx = max(raw_extent) if raw_extent else 0.0
    k = 1.0 / _mx if _mx > 0 else 1.0
    if abs(k - 1.0) > 1e-9:
        import trimesh as _tm
        scene.apply_transform(_tm.transformations.scale_matrix(k))

    scene.export(glb)
    glb_mb = glb.stat().st_size / 1e6

    # ---- 4. link / joint 元数据 ----
    import numpy as np

    links_meta: dict[str, dict] = {}
    for p in parts_out:
        # 按**零件在 GLB 里的节点名**登记，而不是按 URDF 的 link 名。
        # 查看器是拿 GLB 节点名去找 link 元数据的：项目没有 URDF 时（零件按目录摆放）
        # link 名根本不存在，两边一个个都对不上 —— 结果是 3D 全黑、取景退回默认值，
        # 看着像"模型没加载"，其实是元数据表空着。GLB 节点名就是零件的 node 名，必然对得上。
        m = scene.geometry.get(p["node"])
        if m is None:
            continue
        # 包围盒必须按**场景图变换后**的世界坐标算：缩放可能落在节点变换上而不是顶点上
        # （trimesh 的 Scene.apply_transform 就是这么干的）。直接取 geometry.bounds 会与
        # 导出的 GLB 差一个比例，取景随之错到看不见。
        b = np.array(m.bounds, dtype=float)
        try:
            T, _ = scene.graph.get(p["node"])
            b = trimesh.transform_points(b, np.asarray(T, dtype=float))
        except Exception:
            pass
        links_meta[p["node"]] = {
            "mass": (urdf.links.get(p["link"], {}).get("mass") if urdf else None),
            "min": [round(float(x), 5) for x in b[0]],
            "max": [round(float(x), 5) for x in b[1]],
            "tris": p["faces"],
        }

    joints_meta = []
    if urdf:
        idx = 0
        for j in urdf.joints:
            child_mesh = next((p["node"] for p in parts_out if p["link"] == j["child"]), None)
            if child_mesh is None:
                continue
            idx += 1
            joints_meta.append({
                "name": j["name"], "type": j["type"],
                "parent": j["parent"], "child": j["child"],
                "origin": j["origin"][0], "axis": j["axis"],
                "limitLower": j["lower"], "limitUpper": j["upper"],
                "meshLink": child_mesh, "jointId": idx,
            })

    if not urdf:
        joints_meta = []

    # ---- 5. 装配树（URDF 分支 或 目录） ----
    def dir_parts(paths_in: list[str]):
        """去掉所有网格路径的公共前缀后，取"剩下的第一段目录"作分区、
        "文件所在目录末两级"作总成。

        为什么分两级：一个仓库里 6000 个网格常常全在同一个二级目录下，
        只用目录前两级会让所有零件挤进一个总成、一个分区（侧栏不成树、分区面板也没得筛）；
        用文件所在目录本身，层级才是真的。分区保留结构感（electronics / firmware / parts）。
        """
        segs_list = [p.split("/")[:-1] for p in paths_in]
        common = list(segs_list[0]) if segs_list else []
        for s in segs_list[1:]:
            i = 0
            while i < len(common) and i < len(s) and common[i] == s[i]:
                i += 1
            common = common[:i]
        reg, asm = {}, {}
        for p, segs in zip(paths_in, segs_list):
            rest = segs[len(common):]
            reg[p] = rest[0] if rest else "根目录"
            asm[p] = "/".join(segs[-2:]) if segs else "根目录"
        return reg, asm

    if urdf:
        br = urdf.branches()
        branch_of = {p["node"]: br.get(p["link"] or "", "root") for p in parts_out}
        asm_of = dict(branch_of)
        # 扁平的 URDF（一个 base_link 挂住全部）给不出总成信息 ——
        # 这时分区/总成退化成一个节点，侧栏失去意义。URDF 说不出来的，
        # 用仓库自身的目录说出来，并在 gaps 里讲明用的是哪种。
        if len(set(branch_of.values())) <= 1 and len(parts_out) > 12:
            reg, asm = dir_parts([p["path"] for p in parts_out])
            branch_of = {p["node"]: reg[p["path"]] for p in parts_out}
            asm_of = {p["node"]: asm[p["path"]] for p in parts_out}
    else:
        reg, asm = dir_parts([p["path"] for p in parts_out])
        branch_of = {p["node"]: reg[p["path"]] for p in parts_out}
        asm_of = {p["node"]: asm[p["path"]] for p in parts_out}

    groups: dict[str, list[dict]] = {}
    for p in parts_out:
        groups.setdefault(asm_of[p["node"]], []).append(p)

    # ---- 6. 零件表 ----
    parts_ts: list[dict] = []
    for p in sorted(parts_out, key=lambda x: x["node"]):
        blob = f"https://github.com/{repo}/blob/HEAD/{quote(p['path'])}"
        parts_ts.append({
            "id": f"mesh-{p['node']}",
            "name": p["node"],
            "nameZh": p["node"],
            # 类别按几何格式推断：打印网格格式 → 3D 打印件；实体 CAD → 需加工/装配。
            # 这是格式给出的线索，不是核实过的制造工艺 —— basis 里写明。
            "cls": "ASSEMBLE" if p["kind"] == "MAKE" else "PRINT",
            "spec": f"{p['ext'].lstrip('.').upper()} · {p['faces']} 面"
                    + (f"（原始 {p['facesRaw']} 面，已按体积预算简化）" if p["facesRaw"] > p["faces"] else ""),
            "qty": p["qty"],
            "availability": "missing",
            "evidence": ["CAD"],
            "link": {"us": blob},
            "note": f"仓库文件：{p['path']}",
            "printed": p["kind"] != "MAKE",
        })

    bom_rows_added = 0
    rows_by_repo = BOM_ROWS.get(repo, {})
    for f, items in rows_by_repo.items():
        info = bom.get(repo, {}).get(f, {})
        header = [str(c) for c in info.get("header", [])]
        blob = f"https://github.com/{repo}/blob/HEAD/{quote(f)}"

        def col_idx(*pats):
            for i, h in enumerate(header):
                if any(re.search(p, h, re.I) for p in pats):
                    return i
            return None

        qi = col_idx(r"^q'?ty", r"^quan", r"数量", r"^pcs", r"^amount")
        mi = col_idx(r"mpn", r"part\s*(number|#)", r"型号", r"器件", r"manufacturer", r"厂商", r"厂家")
        pi = col_idx(r"price", r"单价", r"cost", r"价格")

        for i, row in enumerate(items[: args.max_bom_rows_per_file]):
            cells = [str(c).strip() for c in row]
            nonempty = [c for c in cells if c]
            if len(nonempty) < 2:
                continue
            # 名称取第一个既不是数量也不是价格的单元格 —— 原表的行项描述
            name = next((c for j, c in enumerate(cells)
                         if c and j not in (qi, pi)), nonempty[0])
            qty = None
            if qi is not None and qi < len(cells):
                m = re.search(r"\d+", cells[qi])
                if m:
                    qty = int(m.group())
            mpn = cells[mi] if mi is not None and mi < len(cells) and cells[mi] else None
            price = None
            if pi is not None and pi < len(cells) and cells[pi]:
                m = re.search(r"\d+(?:[.,]\d+)?", cells[pi].replace(",", ""))
                if m:
                    try:
                        price = float(m.group())
                    except ValueError:
                        price = None

            part = {
                "id": f"bom-{abs(hash((f, i, name))) & 0xFFFFFFF}",
                "name": name[:120],
                "nameZh": name[:48],
                "cls": "BUY",
                "qty": qty if qty else 1,
                "availability": "missing",
                "evidence": ["BOM"],
                "link": {"us": blob},
                "note": (f"物料清单 {f} 第 {i + 1} 行"
                         + (f"：{mpn}" if mpn else "")
                         + ("" if qty else "；原表未标注数量，此处按 1 计并在界面注明")),
            }
            if mpn:
                part["mpn"] = mpn[:60]
            if price:
                # 原表给出的价格照录，并指明来源是仓库清单而不是我们查的价
                part["unitUsd"] = price
                part["priceUnit"] = "原表"
            parts_ts.append(part)
            bom_rows_added += 1

    # 去掉 spec 为 None 的键（TS 里 undefined 与 null 语义不同）
    for p in parts_ts:
        if p.get("spec") is None:
            p.pop("spec", None)

    def node(nid, label, label_en, kind, kids, mesh_links=None, summary=None, part_refs=None):
        return {
            "id": nid, "label": label, "labelEn": label_en, "kind": kind,
            "summary": summary, "meshLinks": mesh_links or [],
            "parts": part_refs or [], "actuators": [], "children": kids,
        }

    mesh_id = {}
    for p in parts_out:
        mesh_id[p["node"]] = f"mesh-{p['node']}"

    asm_nodes = []
    for gname in sorted(groups):
        members = groups[gname]
        refs = [{"partId": mesh_id[p["node"]], "qty": p["qty"]} for p in sorted(members, key=lambda x: x["node"])]
        asm_nodes.append(node(
            f"a-{abs(hash(gname)) & 0xFFFFFF}", gname, gname, "assembly", [],
            mesh_links=[p["node"] for p in members],
            summary=f"{len(members)} 件",
            part_refs=refs,
        ))

    bom_node = None
    if bom_rows_added:
        bom_refs = [{"partId": p["id"], "qty": p["qty"]} for p in parts_ts if p["cls"] == "BUY"]
        bom_node = node("bom-lines", "物料清单行项", "BOM lines", "group", [],
                        summary=f"{bom_rows_added} 行（外购件，来自仓库内的物料清单）",
                        part_refs=bom_refs)

    tree_root = node(
        f"t-{abs(hash(pid)) & 0xFFFFFF}", score["name"], score["name"], "root",
        asm_nodes + ([bom_node] if bom_node else []),
        # 根节点不重复登记 meshLinks：子总成已经各自持有，
        # 两边都写会让"整机 N 个 3D 部件"翻倍。
        mesh_links=[],
        summary=f"{len(parts_out)} 个几何零件 · {len(asm_nodes)} 个总成",
    )

    region_by_link = {p["node"]: branch_of[p["node"]] for p in parts_out}
    region_keys = sorted({branch_of[p["node"]] for p in parts_out})
    regions = [{"key": g, "label": g, "short": g if len(g) <= 10 else g[-10:], "bus": None, "side": 0}
               for g in region_keys]

    gaps.extend([
        f"零件行数 {len(parts_ts)}（几何零件 {len(parts_out)} + 物料清单行 {bom_rows_added}）。",
        "单价与供应商：本仓库没有给出可下单的价格字段，因此全部标为「资料缺失」，不代填价格。",
    ])
    if all_unit_count > args.max_parts:
        gaps.append(
            f"仓库内共有 {all_unit_count} 个网格文件，超出单项目渲染预算，"
            f"按目录轮取 {len(units)} 个（每个目录都有代表），其余未计入 3D 视图——"
            "这是选取规则，不代表这个项目只有这么多零件。"
        )
    if skipped_big:
        gaps.append(f"{skipped_big} 个网格单个文件超过 {args.max_file_mb} MB，未下载，未计入 3D 视图。")
    if lfs_blocked:
        gaps.append(
            f"{len(lfs_blocked)} 个网格存放在 Git LFS 里，本次未能取到实体"
            f"（raw 链接给出的是 130 字节的指针文本），未计入 3D 视图"
            f"（例：{lfs_blocked[0]}）。这不是仓库里没有几何，是存放方式需要 LFS 才能取到。"
        )

    spec = {
        "id": pid,
        "name": score["name"],
        "repository": score["repository"],
        "score": round(score["score"], 1),
        "meta": {"projectId": pid, "version": "HEAD", "embodiment": score.get("category") or "UNKNOWN"},
        "tree": tree_root,
        "parts": parts_ts,
        "modelUrl": f"/teardowns/{pid}/model.glb",
        "modelJsonUrl": f"/teardowns/{pid}/model.json",
        "regions": regions,
        "regionByLink": region_by_link,
        "basis": (
            ("几何取自仓库发布的 URDF：按关节链做零位正运动学装配，"
             f"网格按渲染预算简化；共 {len(parts_out)} 个零件、{total_faces:,} 个三角面"
             f"（GLB {glb_mb:.1f} MB）。")
            if urdf else
            ("该仓库没有运动学定义，几何按仓库原始目录结构摆放，"
             f"共 {len(parts_out)} 个零件、{total_faces:,} 个三角面（GLB {glb_mb:.1f} MB）。")
        ) + " 装配层级与零部件名称均取自仓库文件路径，未做人工重命名。"
            " 零件类别按几何文件格式推断（打印网格 → 3D 打印件；实体 CAD → 需加工或装配），"
            "不是核实过的制造工艺。"
            + (f" 几何为统一取景按 {k:.6g}:1 等比缩放（原始包围盒 "
               f"{raw_extent[0]:.4g} × {raw_extent[1]:.4g} × {raw_extent[2]:.4g}，"
               "单位沿用仓库文件自身的建模单位，本工作台不代为换算）。"
               if abs(k - 1.0) > 1e-9 else ""),
        "gaps": gaps,
        "generated": True,
    }

    # 归一化尺度已在上方（导出 GLB 之前）完成：raw_extent / k 在那时算好，
    # link 包围盒与 GLB 用的是同一套坐标。
    (outdir / "model.json").write_text(json.dumps({
        "source": f"https://github.com/{repo}/blob/HEAD/{quote(urdf.source_path if urdf else parts_out[0]['path'])}",
        "links": links_meta,
        "joints": joints_meta,
        "modelScale": round(k, 9),
        "originalExtent": [round(x, 4) for x in raw_extent],
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    return spec, ""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", action="append", default=[])
    ap.add_argument("--min-score", type=float, default=70.0)
    ap.add_argument("--max-parts", type=int, default=400)
    ap.add_argument("--max-file-mb", type=float, default=30.0)
    ap.add_argument("--max-solids", type=int, default=10)
    ap.add_argument("--max-solid-mb", type=float, default=60.0)
    ap.add_argument("--retry-failed-solids", action="store_true",
                    help="重试上次网格化失败的 STEP/IGES（默认跳过，省去重复超时等待）")
    ap.add_argument("--no-lfs", action="store_true",
                    help="不解析 Git LFS 指针（默认会换真实对象）")
    ap.add_argument("--max-bom-rows-per-file", type=int, default=60)
    ap.add_argument("--budget-faces", type=int, default=DEFAULT_BUDGET_FACES)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--out", default="lib/teardowns.generated.ts")
    args = ap.parse_args()
    global NO_LFS
    NO_LFS = args.no_lfs

    scores = json.loads((ROOT / "data" / "score-audit.json").read_text())["scores"]
    bom = json.loads((ROOT / "data" / "bom-content.json").read_text())
    global BOM_ROWS
    rows_path = ROOT / "data" / "bom-rows.json"
    if not rows_path.exists():
        print("!! 缺少 data/bom-rows.json —— 先跑 fetch_bom_content.py --force，"
              "否则物料清单行项会缺失（不会用行数反推代替）")
    else:
        BOM_ROWS = json.loads(rows_path.read_text())

    if args.only:
        targets = [(k, scores[k]) for k in args.only if k in scores]
        missing = [k for k in args.only if k not in scores]
        for m in missing:
            print(f"!! 未找到项目 {m}")
    else:
        targets = [(k, v) for k, v in scores.items()
                   if v.get("score") is not None and v["score"] >= args.min_score]
        targets.sort(key=lambda t: -t[1]["score"])

    print(f"目标 {len(targets)} 个项目\n")
    specs: dict[str, dict] = {}
    t0 = time.time()
    for pid, sc in targets:
        if pid == "HUM-BERKELEY-LITE":
            print("  --  Berkeley Humanoid Lite           参照实现：已有手工策展的深度工作台，不重复生成")
            continue
        repo = sc["repository"].replace("https://github.com/", "").rstrip("/")
        tree = B.load_tree(repo)
        if not tree:
            print(f"  --  {sc['name'][:30]:<32} 无缓存仓库树，跳过")
            continue
        t = time.time()
        try:
            spec, why = build_one(pid, sc, tree, bom, args)
        except Exception as e:
            print(f"  !!  {sc['name'][:30]:<32} 生成失败：{type(e).__name__}: {e}")
            continue
        if not spec:
            print(f"  --  {sc['name'][:30]:<32} 跳过：{why}")
            continue
        specs[pid] = spec
        print(f"  OK  {spec['name'][:30]:<32} {len(spec['parts']):>4} 零件 "
              f"{len(spec['regions']):>2} 分区 {len(spec['tree']['children']):>3} 总成 "
              f"{time.time() - t:>5.1f}s")

    print(f"\n完成 {len(specs)}/{len(targets)} 个项目，用时 {time.time() - t0:.0f}s")
    if args.dry_run:
        return

    body = json.dumps(specs, ensure_ascii=False, indent=1)
    header = (
        "/**\n"
        " * 生成的深 3D 拆解台 —— 由 pipeline/build_teardowns.py 写出，请勿手改。\n"
        " *\n"
        " * 每个条目对应一个 ≥ 门槛分的项目：几何、层级与零件行全部来自该仓库自身，\n"
        " * 缺什么写在 gaps 里。锚点 Berkeley Humanoid Lite 是手工策展的参照实现，\n"
        " * 不在此文件中（见 lib/teardown.ts 的 BERKELEY_SPEC）。\n"
        " */\n\n"
        'import type { GeneratedTeardown } from "./teardown";\n\n'
        "export const GENERATED_TEARDOWNS: Record<string, GeneratedTeardown> = "
    )
    (ROOT / args.out).write_text(header + body + ";\n", encoding="utf-8")
    print(f"写出 {args.out}（{len(body) / 1e6:.2f} MB）")


if __name__ == "__main__":
    main()
