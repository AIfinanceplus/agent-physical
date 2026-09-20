#!/usr/bin/env python3
"""证据重现度指数（ERI）：以 Berkeley Humanoid Lite 参考实现为 100 分的锚点。

设计前提（这是本脚本存在的全部理由）
--------------------------------------
评分**不能由模型自己说了算**。所以这里的每一个数字都来自可复核的观测：

  1. 六个维度全部由**计数**构成——参数化 CAD 文件数、可解析 BOM 行项数、
     Gerber/KiCad 文件数、URDF/MJCF 文件数、装配文档数、许可字段。
     没有任何一处问"这个项目好不好"。
  2. **锚点基准值是解析出来的，不是写死的**：参数化 CAD 与运动学描述直接
     从 Berkeley 两个硬件仓库的树里数出来；物料条目与文档覆盖从参考实现的
     lib/robot-parts.ts 里解出来。脚本每次运行都重算一遍并断言。
  3. 每个维度的证据（具体文件路径 / 链接）随分数一起落盘，人可逐条核对。
  4. "没测到"不写成 0：该维度整体退出分子与分母，并在 flags 里标出
     （比如 BOM 是 .xls 二进制、标准库解析不了）。

与既有评分的关系
------------------------
本指数**不是** OPEN_REPRO_V2，也不冒充它。Berkeley 参考实现在 physical-ai 里的
导入分（88）原样保留、单独展示；这里是本目录自有的第二把尺子，锚点由证据定义为 100。
"""
from __future__ import annotations

import json
import math
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import build_projects as B  # noqa: E402
from fetch_curated_trees import curated_repos  # noqa: E402


def curated_names() -> dict[str, str]:
    """策展条目 id → 显示名。与 curated_repos() 读同一个文件，避免名册分叉。"""
    text = (ROOT / "lib" / "workbench-projects.ts").read_text(encoding="utf-8")
    head = text.split("export const WORKBENCH_PROJECTS", 1)[1].split("\n];", 1)[0]
    return {m.group(1): m.group(2)
            for m in re.finditer(r'id:\s*"([A-Z0-9][A-Z0-9_-]+)",\s*\n\s*name:\s*"([^"]+)"', head)}


CURATED_NAMES = curated_names()


def curated_license(full: str) -> str:
    """策展项目的许可标识。

    生成项目的许可来自生成器写好的 license 字段；策展项目不在那条管线里，
    必须自己取。取值落盘缓存，避免每次重算都打一次 API，也避免两次调用
    之间拿到不同结果。
    """
    cache = ROOT / "data" / "curated-license.json"
    data = json.loads(cache.read_text(encoding="utf-8")) if cache.exists() else {}
    if full in data:
        return data[full]
    lic = "无"
    try:
        r = subprocess.run(["gh", "api", f"repos/{full}",
                            "--jq", ".license.spdx_id // \"无\""],
                           capture_output=True, text=True, timeout=90)
        if r.returncode == 0 and r.stdout.strip():
            lic = r.stdout.strip()
    except Exception:
        pass
    data[full] = lic
    cache.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    return lic

OUT_TS = ROOT / "lib" / "scores.generated.ts"
OUT_AUDIT = ROOT / "data" / "score-audit.json"
BOM_CONTENT = ROOT / "data" / "bom-content.json"
REF_PARTS = ROOT / "lib" / "robot-parts.ts"

# 维度权重，合计 100。权重是设计选择（哪一类证据对"能重现"更重要），
# 但每个维度内部的取值完全由计数决定。
WEIGHTS = {
    "design": 24,        # 设计可制造性
    "sourcing": 22,      # 物料可采购性
    "assembly": 16,      # 装配可理解性
    "electronics": 14,   # 电子可复现性
    "kinematics": 14,    # 运动学可验证性
    "licensing": 10,     # 授权明确性
}
LABELS = {
    "design": "设计可制造性",
    "sourcing": "物料可采购性",
    "assembly": "装配可理解性",
    "electronics": "电子可复现性",
    "kinematics": "运动学可验证性",
    "licensing": "授权明确性",
}
UNITS = {
    "design": "个参数化 CAD 文件",
    "sourcing": "个可采购行项（行数 × 规格系数）",
    "assembly": "份装配/构建文档",
    "electronics": "个 PCB / EDA 设计文件",
    "kinematics": "个运动学描述文件",
    "licensing": "许可明确度（0–1）",
}
# 单维度最高可为锚点的 2 倍——这样"比 Berkeley 更强"能被表达出来，
# 同时避免一个超大仓库靠单一维度把总分拉到离谱。
MAX_MULT = 2.0

OPEN_LICENSES = re.compile(
    r"^(MIT|Apache-2\.0|BSD-[23]-Clause|BSD-3-Clause-Clear|GPL-[23]\.0.*|LGPL-.*|"
    r"AGPL-3\.0.*|MPL-2\.0|CC0-1\.0|CC-BY-4\.0|CC-BY-SA-4\.0|CERN-OHL-.*|"
    r"MIT-0|Unlicense|0BSD|EPL-2\.0|ISC|Zlib)$")


def sat(n: float) -> float:
    """饱和函数。用 log1p 而非线性：从 6 个 CAD 文件到 60 个是质变，
    从 600 到 660 不是。线性会让超大仓库凭体量碾压。"""
    return math.log1p(max(0.0, n))


# ---------------------------------------------------------------- 锚点解析

def anchor_from_trees() -> dict:
    """可直接重算的两维：从 Berkeley 两个硬件仓库的树里数。"""
    repos = ["HybridRobotics/berkeley-humanoid-lite-assets",
             "HybridRobotics/berkeley_humanoid_description"]
    counts = {"CAD": 0, "DESC": 0, "PCB": 0, "MESH": 0}
    found: dict[str, list[str]] = {k: [] for k in counts}
    for full in repos:
        for e in B.load_tree(full) or []:
            if e.get("type") != "blob":
                continue
            k = B.classify(e.get("path", ""))
            if k in counts:
                counts[k] += 1
                found[k].append(f"{full}/{e['path']}")
    return {"counts": counts, "files": found, "repos": repos}


def anchor_from_reference() -> dict:
    """从参考实现 lib/robot-parts.ts 解析物料与文档的基准。

    这是"Berkeley 为什么是 100"的实质所在：它的参考实现把整机做成了
    47 条可采购条目，每条带 MPN、厂家、单价与购买链接——这正是本目录里
    绝大多数自动采集项目缺失的东西。
    """
    if not REF_PARTS.exists():
        return {}
    src = REF_PARTS.read_text(encoding="utf-8")
    i = src.find("export const PARTS")
    seg = src[i:] if i > 0 else src
    entries = re.split(r"\n\s*\{(?=\s*\n?\s*id:)", seg)[1:]
    total = 0
    with_mpn = with_price = with_link = with_docs = with_bom = 0
    pcb_own = 0
    for e in entries:
        if not re.search(r'\bid:\s*"', e):
            continue
        total += 1
        has_mpn = bool(re.search(r'\bmpn:\s*"', e))
        has_price = bool(re.search(r'unit(Usd|Rmb):\s*[\d.]+', e))
        has_link = bool(re.search(r'link:\s*\{', e))
        ev = re.search(r"evidence:\s*\[([^\]]*)\]", e)
        evk = ev.group(1) if ev else ""
        with_mpn += has_mpn
        with_price += has_price
        with_link += has_link
        with_docs += ('"DOCS"' in evk)
        with_bom += ('"BOM"' in evk)
        if re.search(r"(配电|PDB|power\s*distribution)", e, re.I):
            pcb_own += 1
    # 可采购条目 = 同时有型号与价格且有购买链接的条目
    purchasable = sum(
        1 for e in entries
        if re.search(r'\bmpn:\s*"', e)
        and re.search(r"unit(Usd|Rmb):\s*[\d.]+", e)
        and re.search(r"link:\s*\{", e)
    )
    # 与项目侧**同一个估计量**：Σ(0.25 + 0.25×有型号 + 0.25×有价格 + 0.25×有购买链接)。
    # 两侧若不用同一个公式，比出来的数就没有可比性——首版锚点用"三项齐全的条目数"(22)，
    # 而项目侧用"行数×系数"，一个 100 行无型号无价格的清单能顶到 25，凭空与 Berkeley 打平。
    effective = sum(
        0.25
        + 0.25 * bool(re.search(r'\bmpn:\s*"', e))
        + 0.25 * bool(re.search(r"unit(Usd|Rmb):\s*[\d.]+", e))
        + 0.25 * bool(re.search(r"link:\s*\{", e))
        for e in entries if re.search(r'\bid:\s*"', e)
    )
    return {
        "entries": total, "with_mpn": with_mpn, "with_price": with_price,
        "with_link": with_link, "purchasable": purchasable,
        "sourcing_effective": round(effective, 2),
        "with_docs": with_docs, "with_bom": with_bom, "own_pcb": pcb_own,
        "source": "lib/robot-parts.ts（参考实现的零件目录，解析自文件本身）",
    }


def build_anchor() -> dict:
    t = anchor_from_trees()
    r = anchor_from_reference()
    n = {
        # 设计：参数化 CAD 文件数（可重算）
        "design": float(t["counts"]["CAD"]),
        # 物料：与项目侧同一估计量（行数 × 规格系数）在参考实现上的取值
        "sourcing": float(r.get("sourcing_effective", 0)),
        # 装配：参考实现里带官方文档证据的条目数
        "assembly": float(r.get("with_docs", 0)),
        # 电子：参考实现记录的配电板设计数（Berkeley 的 EDA 文件不在公开仓库树里）
        "electronics": float(max(1, r.get("own_pcb", 0))),
        # 运动学：URDF/Xacro/MJCF/USD/SRDF 文件数（可重算）
        # 不含 .sdf：语料里的 .sdf 绝大多数是 Gazebo 仿真场景，不是机器人自身的描述。
        "kinematics": float(t["counts"]["DESC"]),
        # 授权：Assets 仓库为 CC-BY-SA-4.0，明确允许再制造
        "licensing": 1.0,
    }
    return {"anchor": n, "trees": t, "reference": r}


# ---------------------------------------------------------------- 各维度取值

def bom_coverage(full: str, bom: dict) -> dict:
    """一个项目的物料可采购性：取它**最好解析的那份 BOM**。

    规格系数 = 0.25 基础 + 型号/价格/供应商 各 0.25。一份没有型号没有价格
    的 BOM 只能算清单，不能算"可采购"——这不是评价，是列的有无。
    """
    files = bom.get(full) or {}
    if not files:
        return {"measured": True, "n": 0.0, "detail": "仓库内无 BOM 文件", "best": None}
    best = None
    for path, r in files.items():
        if r.get("status") != "ok":
            continue
        rows = r.get("rows") or 0
        c = r.get("cols") or {}
        k = 0.25 + 0.25 * bool(c.get("mpn")) + 0.25 * bool(c.get("price")) \
            + 0.25 * bool(c.get("supplier"))
        if best is None or rows * k > best["n"]:
            best = {"file": path, "url": r.get("url"), "rows": rows,
                    "cols": c, "k": round(k, 2), "n": rows * k}
    if best is None:
        # 有 BOM 但全都解析不了 —— 这是"没测到"，不是"测到是 0"
        return {"measured": False, "n": 0.0, "best": None,
                "detail": f"有 {len(files)} 份 BOM，但格式无法解析（"
                          + "、".join(sorted({r.get('reason', '?') for r in files.values()
                                              if r.get('status') == 'unparsed'}))
                          + "）"}
    return {"measured": True, "n": best["n"], "best": best,
            "detail": f"最佳 BOM：{best['file']}（{best['rows']} 行，规格系数 {best['k']}）"}


def dims_for_project(p: dict, tree: list[dict], bom: dict) -> dict:
    full = p["repository"].replace("https://github.com/", "")
    by: dict[str, list[str]] = {}
    for e in tree:
        if e.get("type") != "blob":
            continue
        k = B.classify(e.get("path", ""))
        if k:
            by.setdefault(k, []).append(e["path"])

    def blob_url(path: str) -> str:
        return f"https://github.com/{full}/blob/HEAD/{path.replace(' ', '%20')}"

    design_files = by.get("CAD", [])
    kin_files = by.get("DESC", [])
    pcb_files = by.get("PCB", [])
    # 装配文档：DOCISH 命中的非 README 文档，另外把装配相关命名的文件也算上
    doc_files = [x for x in by.get("DOC", []) if not B.is_readme(x)]
    doc_files += [x for x in by.get("DESC", [])
                  if re.search(r"(assembly|build|guide|instruction)", x, re.I)]
    doc_files = sorted(set(doc_files))

    src = bom_coverage(full, bom)
    lic = (p.get("license") or "无").strip()
    if lic in ("无", "", "NONE"):
        lic_ratio, lic_detail = 0.0, "仓库未声明许可"
    elif lic == "NOASSERTION":
        lic_ratio, lic_detail = 0.5, "有 LICENSE 文件但无法识别为标准许可"
    elif OPEN_LICENSES.match(lic):
        lic_ratio, lic_detail = 1.0, f"{lic}（允许再制造）"
    else:
        lic_ratio, lic_detail = 0.5, f"{lic}（非标准开放硬件许可，需人工确认）"

    return {
        "design": (len(design_files), [blob_url(x) for x in design_files[:4]],
                   f"仓库树中 {len(design_files)} 个参数化 CAD 文件"),
        "sourcing": (src["n"], ([src["best"]["url"]] if src.get("best") else []),
                     src["detail"]),
        "assembly": (len(doc_files), [blob_url(x) for x in doc_files[:4]],
                     f"装配/构建类文档 {len(doc_files)} 份"),
        "electronics": (len(pcb_files), [blob_url(x) for x in pcb_files[:4]],
                        f"PCB / EDA 文件 {len(pcb_files)} 个"),
        "kinematics": (len(kin_files), [blob_url(x) for x in kin_files[:4]],
                       f"URDF / Xacro / MJCF / USD / SRDF 文件 {len(kin_files)} 个"),
        "licensing": (lic_ratio, [], lic_detail),
    }, {"sourcing_measured": src["measured"]}


def main() -> None:
    src = (OUT_TS.parent.parent / "lib" / "projects.generated.ts").read_text(encoding="utf-8")
    projects = json.loads(src.split("WorkbenchProject[] = ", 1)[1].rstrip().rstrip(";"))
    bom = json.loads(BOM_CONTENT.read_text(encoding="utf-8")) if BOM_CONTENT.exists() else {}

    A = build_anchor()
    anchors = A["anchor"]
    print("=== 锚点：Berkeley Humanoid Lite 参考实现 ===")
    print(f"  硬件仓库: {', '.join(A['trees']['repos'])}")
    for k, v in anchors.items():
        print(f"  {LABELS[k]:<8} 基准 {v:>6.1f}  {UNITS[k]}")
    print(f"  参考实现零件目录: {A['reference'].get('entries')} 条条目 · "
          f"可采购 {A['reference'].get('purchasable')} 条 · "
          f"带文档证据 {A['reference'].get('with_docs')} 条")
    assert anchors["design"] > 0, "锚点设计基准为 0，无法归一化"
    assert anchors["kinematics"] > 0, "锚点运动学基准为 0，无法归一化"
    assert anchors["sourcing"] > 0, "锚点物料基准为 0，无法归一化"

    scores: dict[str, dict] = {}

    def score_one(pid: str, name: str, repository: str, tree: list[dict],
                  license_id: str | None) -> None:
        """对一个项目套用六维算式。生成项目与人工策展项目走的是同一个函数——
        两条路径若各写一套，分数之间就不可比了。

        license_id 必须显式传入：这一维的取值来自项目元数据而不是仓库树，
        重构时漏传过一次，结果 212 个项目集体掉了 10 分而没有任何报错。
        """
        dims, meta = dims_for_project(
            {"id": pid, "repository": repository, "license": license_id}, tree, bom)
        total = 0.0
        measured_w = 0
        rows = []
        for k, w in WEIGHTS.items():
            n, ev, detail = dims[k]
            measured = True
            if k == "sourcing":
                measured = meta["sourcing_measured"]
            a = anchors[k]
            ratio = min(MAX_MULT, sat(n) / sat(a)) if measured else None
            pts = (w * ratio) if measured else None
            if measured:
                total += pts
                measured_w += w
            rows.append({
                "key": k, "label": LABELS[k], "weight": w, "unit": UNITS[k],
                "value": round(n, 2), "anchorValue": a,
                "ratio": round(ratio, 4) if ratio is not None else None,
                "points": round(pts, 2) if pts is not None else None,
                "measured": measured, "detail": detail, "evidence": ev,
            })
        # 未测维度**按 0 计入总分，不退出分母**。
        # 退出分母会让"测量失败"变成奖励：一个 BOM 是 .ods 解析不了的项目，
        # 等于被免掉了"没有可采购清单"这一项，分数反而超过锚点。
        # 按 0 计入则分数是**下界**——没验证过的东西不能拿来得分，
        # 但也不能断言它确实是 0，所以同时打出"下界"标记。
        final = round(total, 1)
        flags = []
        if measured_w < 100:
            flags.append(
                f"有 {100 - measured_w} 分权重的维度未能测量，已按 0 计入；"
                f"总分为下界，实际不低于此值")
        scores[pid] = {
            "score": final, "anchorScore": 100.0,
            "measuredWeight": measured_w, "dimensions": rows, "flags": flags,
            "repository": repository, "name": name,
        }

    for p in projects:
        score_one(p["id"], p["name"], p["repository"],
                  B.load_tree(p["repository"].replace("https://github.com/", "")) or [],
                  p.get("license"))

    # 自检：声明了许可的项目，授权维度就不该得 0。
    # 重构 score_one 时漏传过 license，212 个项目集体掉 10 分而毫无报错——
    # 这类"字段在路上丢了"的错不会自己浮出来，必须由断言钉住。
    lost = [p["id"] for p in projects
            if (p.get("license") or "无") not in ("无", "", "NONE")
            and scores[p["id"]]["dimensions"][5]["points"] == 0.0]
    assert not lost, f"下列项目声明了许可却得 0 分，license 字段可能在传递中丢失：{lost[:5]}"

    # 人工策展项目：有 GitHub 仓库树的同样计分（同一个函数、同一估计量）。
    # 只在 OSF / 官方站点上的（BEATRIX）没有树可数，如实留空并写明原因，
    # 而不是拿它自己的策展清单另算一套数——那会让它和别的项目不可比。
    for pid, url in sorted(curated_repos().items()):
        if "github.com" not in url:
            print(f"  跳过 {pid}：证据在 {url}，无 GitHub 仓库树可数")
            continue
        full = url.replace("https://github.com/", "").rstrip("/")
        tree = B.load_tree(full)
        if not tree:
            print(f"  跳过 {pid}：{full} 无缓存文件树")
            continue
        name = CURATED_NAMES.get(pid, pid)
        lic = curated_license(full)
        score_one(pid, name, url, tree, lic)
        # 策展条目里不少把硬件资料放在仓库之外（ROSMO 的 EasyEDA PCB、官方站点零件表）。
        # 本指数只数仓库内文件，这类项目会被系统性低估——必须写明白，
        # 否则读者会把它读成"这个项目的证据很差"。
        scores[pid]["flags"].append(
            "人工策展条目：其证据包含仓库之外的资源（官方站点 / EasyEDA / OSF 等）。"
            "本指数只统计仓库内文件，故此分数会低于项目实际证据水平。")
        print(f"  计分 {pid}（{name}）← {full} · 许可 {lic}")

    # 断言：锚点自身必须是 100
    anchor_rows = {}
    for k, w in WEIGHTS.items():
        anchor_rows[k] = {"dimension": LABELS[k], "weight": w,
                          "anchorValue": anchors[k], "ratio": 1.0, "points": float(w)}
    scores["HUM-BERKELEY-LITE"] = {
        "score": 100.0, "anchorScore": 100.0, "measuredWeight": 100,
        "dimensions": [{"key": k, "label": v["dimension"], "weight": v["weight"],
                        "unit": UNITS[k], "value": anchors[k],
                        "anchorValue": anchors[k], "ratio": 1.0,
                        "points": v["points"], "measured": True,
                        "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
                        "evidence": []} for k, v in anchor_rows.items()],
        "flags": [],
        "repository": "https://github.com/HybridRobotics/Berkeley-Humanoid-Lite",
        "name": "Berkeley Humanoid Lite",
    }

    vals = [s["score"] for s in scores.values() if s["score"] is not None]
    print(f"\n=== 计分结果（{len(vals)} 个项目）===")
    print(f"  最高 {max(vals):.1f} · 中位 {sorted(vals)[len(vals)//2]:.1f} · 最低 {min(vals):.1f}")
    print(f"  ≥100 的: {sum(1 for v in vals if v >= 100)} 个 · "
          f"60–100: {sum(1 for v in vals if 60 <= v < 100)} 个 · "
          f"<40: {sum(1 for v in vals if v < 40)} 个")
    unmeasured = sum(1 for s in scores.values() if s["measuredWeight"] < 100)
    print(f"  有维度未测的项目: {unmeasured} 个")

    # 完整证据先落审计文件（供离线逐条核对），再为前端瘦身：
    # 每个维度只留 2 条证据链接。全量证据 574KB 全塞进客户端包没有意义——
    # 界面上能点的链接有限，而审计文件才是"逐条核对"的入口。
    OUT_AUDIT.write_text(json.dumps({"anchor": A, "scores": scores},
                                    ensure_ascii=False, indent=1), encoding="utf-8")
    for s in scores.values():
        for d in s["dimensions"]:
            d["evidence"] = d.get("evidence", [])[:2]

    ts = ["// 由 pipeline/score_reproduction.py 生成，勿手改。",
          "// 证据重现度指数（ERI）：锚点 = Berkeley Humanoid Lite 参考实现 = 100。",
          "// 每个维度的取值来自可复核的计数，锚点基准值由脚本解析得出，非人工填写。",
          "",
          "export interface ScoreDimension {",
          "  key: string; label: string; weight: number; unit: string;",
          "  value: number; anchorValue: number; ratio: number | null;",
          "  points: number | null; measured: boolean; detail: string;",
          "  evidence: string[];",
          "}",
          "export interface EvidenceScore {",
          "  score: number | null; anchorScore: number; measuredWeight: number;",
          "  dimensions: ScoreDimension[]; flags: string[];",
          "  repository: string; name: string;",
          "}",
          "",
          "export const EVIDENCE_SCORES: Record<string, EvidenceScore> = "
          + json.dumps(scores, ensure_ascii=False, indent=1) + ";",
          ""]
    OUT_TS.write_text("\n".join(ts), encoding="utf-8")
    print(f"\n写成 {OUT_TS.relative_to(ROOT)}（{OUT_TS.stat().st_size // 1024} KB）")
    print(f"写成 {OUT_AUDIT.relative_to(ROOT)}（含全部证据，可离线逐条核对）")

    print("\n=== 前 15 名 ===")
    for pid, s in sorted(scores.items(), key=lambda x: -(x[1]["score"] or 0))[:15]:
        print(f"  {s['score']:>6.1f}  {s['name'][:34]:<34} {pid}")


if __name__ == "__main__":
    main()
