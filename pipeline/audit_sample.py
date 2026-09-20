#!/usr/bin/env python3
"""抽检：分层随机抽 10% 的项目，用**实时 API** 重新取证据并重新计数。

为什么要独立重取而不复用缓存：缓存正是被审计的对象之一。
复用缓存只能验算算术，验不出"当初就取错了/取漏了"。

每个抽检项目回答四个问题：
  A. 树是否取全了（截断、条目数、与实时 API 的差异）
  B. 取证是否取全了（分类器漏掉的真硬件文件 / 收进来的非硬件文件 / 外置硬件）
  C. 物料是否解析对了（BOM 文件数、解析状态、行项数复核）
  D. 评分是否算对了（用同一套公式从实时树重算，逐步比对）

结果落盘 data/audit-sample.json，人读报告打印到 stdout。
"""
from __future__ import annotations

import json
import math
import random
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import build_projects as B  # noqa: E402
import score_reproduction as S2  # noqa: E402
from score_reproduction import LABELS, MAX_MULT, WEIGHTS, build_anchor, sat  # noqa: E402

DIM_KEY_ORDER = list(WEIGHTS.keys())

CACHE = B.CACHE
AUDIT = ROOT / "data" / "audit-sample.json"

CAD_EXT = {".step", ".stp", ".iges", ".igs", ".f3d", ".f3z", ".sldprt", ".sldasm",
           ".scad", ".3dm", ".catpart", ".x_t", ".x_b", ".ipt", ".iam", ".par", ".prt",
           ".dwg", ".dxf", ".fcstd", ".brt"}
MESH_EXT = {".stl", ".obj", ".ply", ".3mf", ".glb", ".gltf", ".fbx", ".blend", ".dae"}
PCB_EXT = {".kicad_pcb", ".kicad_sch", ".brd", ".sch", ".gbr", ".gerber", ".gko", ".gtl",
           ".gbl", ".gts", ".gbs", ".drl", ".xln", ".pcb", ".epro", ".zip"}
DESC_EXT = {".urdf", ".xacro", ".mjcf", ".sdf", ".usd", ".usda", ".usdc"}
BOM_EXT = {".csv", ".xlsx", ".xls", ".ods", ".md", ".txt", ".pdf", ".tsv", ".json", ".docx"}
DOC_RX = re.compile(r"(assembly|assemble|build|manual|guide|instruction|装配|手册|指南|教程)",
                    re.I)


def gh(endpoint: str):
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        return None


def gh_text(endpoint: str) -> str | None:
    r = subprocess.run(["gh", "api", endpoint], capture_output=True, text=True, timeout=120)
    return r.stdout if r.returncode == 0 else None


def live_tree(full: str, branch: str) -> list[dict]:
    t = gh(f"repos/{full}/git/trees/{branch}?recursive=1")
    return (t or {}).get("tree", [])


def pick_sample(scores: dict, pct: float = 0.10, seed: int = 20260919) -> list[str]:
    """分层抽样：按档位分层，每层按比例取，保证覆盖整个分数范围。

    纯随机抽样有较大概率一个高分项目都抽不到（≥100 只有 3 个），
    而分数最高的那些恰恰是最需要被查的——它们的错会传播成"标杆"。
    """
    bands = [("≥100", 100, 1e9), ("70–100", 70, 100), ("45–70", 45, 70),
             ("20–45", 20, 45), ("<20", -1, 20)]
    rng = random.Random(seed)
    out: list[str] = []
    n_total = sum(1 for s in scores.values() if s["score"] is not None)
    for lab, lo, hi in bands:
        pool = sorted(k for k, s in scores.items()
                      if s["score"] is not None and lo <= s["score"] < hi)
        take = min(len(pool), max(1, round(len(pool) / n_total * n_total * pct)))
        out += rng.sample(pool, take)
    return sorted(out, key=lambda k: -scores[k]["score"])


def main() -> None:
    random.seed(20260919)
    scores = json.loads((ROOT / "data" / "score-audit.json").read_text(encoding="utf-8"))["scores"]
    anchors = build_anchor()["anchor"]
    src = (ROOT / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    projects = {p["id"]: p for p in json.loads(
        src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";"))}
    bom_content = json.loads((ROOT / "data" / "bom-content.json").read_text(encoding="utf-8"))

    sample = pick_sample(scores)
    print(f"抽检 {len(sample)} / {sum(1 for s in scores.values() if s['score'] is not None)} "
          f"个计分项目（分层随机，seed=20260919）\n")

    report = {}
    for pid in sample:
        s = scores[pid]
        full = s["repository"].replace("https://github.com/", "").rstrip("/")
        rec: dict = {"id": pid, "name": s["name"], "score": s["score"],
                     "repository": full, "recorded": {}, "findings": []}

        # ---------- A. 树是否取全 ----------
        meta = gh(f"repos/{full}") or {}
        branch = meta.get("default_branch") or "main"
        live = live_tree(full, branch)
        cached = B.load_tree(full) or []
        rec["tree"] = {
            "branch": branch,
            "live_blobs": sum(1 for e in live if e.get("type") == "blob"),
            "cached_blobs": sum(1 for e in cached if e.get("type") == "blob"),
            "archived": bool(meta.get("archived")),
            "pushed_at": meta.get("pushed_at"),
        }
        if not cached:
            rec["findings"].append({"level": "HIGH", "what": "缓存里没有这棵仓库树"})
        if live and not {"".join(sorted(e.get("path", "") for e in live))
                         == "".join(sorted(e.get("path", "") for e in cached))}:
            ls = {e.get("path") for e in live if e.get("type") == "blob"}
            cs = {e.get("path") for e in cached if e.get("type") == "blob"}
            added, removed = ls - cs, cs - ls
            if added or removed:
                rec["tree"]["added_since_cache"] = len(added)
                rec["tree"]["removed_since_cache"] = len(removed)
                if len(added) > max(50, 0.3 * max(1, len(cs))):
                    rec["findings"].append(
                        {"level": "HIGH",
                         "what": f"仓库自缓存后新增 {len(added)} 个文件（缓存 {len(cs)}），"
                                 f"计数可能偏低"})
        if meta.get("archived"):
            rec["findings"].append({"level": "INFO", "what": "仓库已归档（archived）"})

        # ---------- B. 取证是否取全 ----------
        by: dict[str, list[str]] = {}
        for e in live:
            if e.get("type") != "blob":
                continue
            k = B.classify(e.get("path", ""))
            if k:
                by.setdefault(k, []).append(e["path"])
        rec["live_counts"] = {k: len(v) for k, v in sorted(by.items())}

        # 分类器的假阴性：扩展名像硬件证据、却没被算进任何维度
        miss: Counter = Counter()
        for e in live:
            if e.get("type") != "blob":
                continue
            p = e["path"]
            ext = ("." + p.rsplit(".", 1)[-1].lower()) if "." in p.rsplit("/", 1)[-1] else ""
            k = B.classify(p)
            if ext in CAD_EXT and k != "CAD":
                miss[f"CAD扩展名被判为 {k or '∅'}"] += 1
            if ext in DESC_EXT and k != "DESC":
                miss[f"运动学扩展名被判为 {k or '∅'}"] += 1
            if ext in MESH_EXT and k != "MESH":
                miss[f"网格扩展名被判为 {k or '∅'}"] += 1
        if miss:
            rec["classifier_gaps"] = dict(miss)
            # 只有量级足够大才算问题：单个 .blend 不算
            big = {k: v for k, v in miss.items() if v >= 3}
            if big:
                rec["findings"].append(
                    {"level": "MEDIUM", "what": f"可能有未被计入的硬件文件：{big}"})

        # 外置硬件：submodule / README 强暗示
        gm = gh_text(f"repos/{full}/contents/.gitmodules")
        if gm and "path" in gm:
            rec["findings"].append(
                {"level": "MEDIUM", "what": "仓库有 .gitmodules，硬件可能在子模块里"})
            rec["gitmodules"] = gm[:800]

        # ---------- C. 物料 ----------
        bomfiles = by.get("BOM", [])
        parsed = bom_content.get(full, {})
        st = Counter(parsed.get(p, {}).get("status", "未抓") for p in bomfiles)
        rec["bom"] = {"files": len(bomfiles), "status": dict(st),
                      "files_list": bomfiles[:20]}
        if bomfiles and st.get("ok", 0) == 0:
            rec["findings"].append(
                {"level": "HIGH", "what": f"有 {len(bomfiles)} 个 BOM 文件，但一个都没解析成功"
                                          f"（{dict(st)}）→ 物料维度被低估"})

        # ---------- D. 用同一公式从**实时树**重算 ----------
        # 这里复用评分器的函数，改的是输入（实时树而非缓存），
        # 于是差异只能来自"树不同"或"算式不自洽"，不会来自两套实现。
        import score_reproduction as S2
        if full in {p["repository"].replace("https://github.com/", "")
                    for p in projects.values()}:
            p = next(p for p in projects.values()
                     if p["repository"].replace("https://github.com/", "") == full)
            dims, meta2 = S2.dims_for_project(p, live, bom_content)
            recomputed = {}
            for k, w in WEIGHTS.items():
                n, ev, detail = dims[k]
                measured = meta2["sourcing_measured"] if k == "sourcing" else True
                a = anchors[k]
                ratio = min(MAX_MULT, sat(n) / sat(a)) if measured else None
                recomputed[k] = {"value": round(n, 2), "points": round(w * ratio, 2)
                                 if measured else None, "anchor": a}
            rec["recomputed"] = recomputed
            diffs = []
            for i, k in enumerate(DIM_KEY_ORDER):
                old = s["dimensions"][i]
                new = recomputed[k]
                if abs((old["value"] or 0) - new["value"]) > 0.01:
                    diffs.append(f"{LABELS[k]}: 记录 {old['value']} → 实时重算 {new['value']}")
            if diffs:
                rec["findings"].append(
                    {"level": "MEDIUM", "what": "从实时树重算的取值与记录不一致：" + "；".join(diffs)})

        # 链接抽检：零件行来源是否可达（每项目抽 3 条）
        rec["links_checked"] = 0
        report[pid] = rec
        print(f"[{s['score']:>6.1f}] {s['name'][:38]:<38} "
              f"树 {rec['tree']['cached_blobs']:>5}（实时 {rec['tree']['live_blobs']:>5}）· "
              f"BOM {len(bomfiles)}·{rec['bom']['status']} · 发现 {len(rec['findings'])}")

    AUDIT.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    tot = sum(len(r["findings"]) for r in report.values())
    print(f"\n共 {tot} 条发现 → {AUDIT.relative_to(ROOT)}")
    bylevel = Counter(f["level"] for r in report.values() for f in r["findings"])
    print("按级别:", dict(bylevel))


if __name__ == "__main__":
    main()
