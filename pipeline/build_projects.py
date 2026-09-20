#!/usr/bin/env python3
"""
evidence → WorkbenchProject generator
=====================================================================
把已缓存的真实仓库树 + robots.json 元数据编译成标杆同形的 `WorkbenchProject`。

设计原则（对齐 physical-ai 的 evidence-policy）：
  1. 装配层级优先取仓库的功能性目录；目录只有格式桶时退回按零件名聚类；
     两条路都走不通就显式说明"无可识别的功能分区"，不编。
  2. 每条零件行 = 一个真实文件，source 指向可点击的 blob URL。
  3. 没有的东西写进 gaps，不用看起来合理的值填充。
  4. 不产出任何"重现概率"——评分是 OPEN_REPRO_V2 的职责，这里只产出证据。

关于装配层级为什么这么绕：
  第一版直接取"离文件最近的目录名"，结果 88 个项目出现名为 `meshes` 的"总成"、
  53 个叫 `urdf`、40 个叫 `docs`。这些是资产格式桶，不是机器人的功能分区——
  它们在 UI 里排成一列毫无意义。所以现在分三层回退：
      功能性目录 → 文件名机器人部位聚类 → 显式声明无功能分区。

用法：
  python3 pipeline/build_projects.py --min-tier B --out lib/projects.generated.ts
"""

from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import quote

HOME = Path.home()
COURSE = HOME / "hermes-robot-course"
CACHE = COURSE / "pipeline" / ".cache"
ROBOTS = COURSE / "data" / "robots.json"
ROOT = Path(__file__).resolve().parent.parent
# 漏网项目的补充种子（pipeline/fetch_gap.py 产出）。与主采集共用同一条生成
# 路径和同一套证据判定，所以它不是"另一份数据"，只是另一个来源。
SEED_GAP = ROOT / "data" / "seed-gap.json"
# 仓库稳定标识映射（pipeline/resolve_repo_ids.py 产出）。有了它，生成器既能按
# 数字 id 去重，也能保持离线——解析结果单独落盘、可复核，生成时不发网络请求。
REPO_IDS = ROOT / "data" / "repo-ids.json"

# --- 文件分类：全部基于扩展名/文件名，不做语义猜测 -------------------------

PARAMETRIC_CAD = {".step", ".stp", ".iges", ".igs", ".f3d", ".f3z", ".sldprt",
                  ".sldasm", ".x_t", ".x_b", ".brep", ".fcstd", ".scad", ".3dm",
                  ".catpart", ".catproduct", ".ipt", ".iam",
                  # DXF/DWG 是激光切割与 CNC 件的**加工文件**（如
                  # `laser_cut_parts/dxf/back_plate_standoff.dxf`），一个件能不能
                  # 造出来就写在这些文件里。原先不收，19 个项目 175 个加工文件被漏掉。
                  ".dxf", ".dwg"}
PRINT_MESH = {".stl", ".3mf", ".obj", ".ply"}
ROBOT_DESC = {".urdf", ".xacro", ".mjcf", ".usd", ".usda", ".srdf"}
PCB_EDA = {".kicad_pcb", ".kicad_sch", ".brd", ".sch", ".gerber", ".gbr",
           ".drl", ".net", ".dsn",
           # Gerber 层的逐层文件。全量审计发现 `.gbl/.gtl/.gts/.gbs/.gko` 有
           # 105+105+104+104+61 个（12 个项目）被漏掉——同族的 `.gbr/.gerber`
           # 收了，逐层文件没收，属于同一件事写了两套判据。
           ".gtl", ".gbl", ".gts", ".gbs", ".gto", ".gbo", ".gko",
           ".gm1", ".gg1", ".g1", ".g2", ".g3", ".gbr", ".gerber"}
DOC_EXT = {".md", ".pdf", ".txt", ".rst"}
# 物料清单的识别。
#
# 这里曾有三个会让**真实 BOM 一个都认不出**的缺陷，抽检时才暴露：
#   1. `material` 没带可选的复数 s，而尾部边界是 `([^a-z]|$)`——
#      于是 `bill of materials.csv`（最常见的一种命名）永远失配。
#   2. `bom` 要求左右都是非字母，于是 `TotalBOM / 3DBOM / ibom / ZZEBOM`
#      这类前后紧邻字母的写法全部漏掉。
#   3. 完全没有中文模式，`机械采购清单 / 散件清单 / 物料表` 一个都不认。
# 修法：允许一段有限的字母数字前缀再跟 bom（右边界仍在，所以 bomb/bomber 不会中），
# 复数可选，并补上中文里**明确指零件**的写法。
BOM_RX = re.compile(
    r"(^|[^a-z])("
    r"[a-z0-9_\-]{0,12}bom"
    r"|bill[_\- ]?of[_\- ]?materials?"
    r"|parts?[_\- ]?list"
    r"|material[_\- ]?list"
    r"|shopping[_\- ]?list"
    r"|purchase[_\- ]?list"
    r"|bom[_\- ]?list"
    # 中文只收明确指零件的说法；裸「清单」不收——`训练前数据清单.md` 不是 BOM。
    r"|采购清单|散件清单|物料清单|物料表|零件清单|采购表"
    r")([^a-z]|$)", re.I)
DOCISH_RX = re.compile(r"(readme|assembly|build[_\- ]?guide|instruction|"
                       r"getting[_\- ]?started|manual|tutorial)", re.I)

# 软件物料清单（SBOM）不是硬件零件表。
# 放宽 bom 的匹配后，PX4 立刻借 `.github/workflows/sbom_license_check.yml`
# 混进了目录——"software bill of materials" 是许可证合规产物，与能否买到舵机无关。
SOFTWARE_BOM_RX = re.compile(r"sbom|software[_\- ]?bill[_\- ]?of[_\- ]?material", re.I)

# CI / 机器人配置目录不是装配文档。PX4 有 10 个 `.github/instructions/*.md`
# （GitHub Copilot 的提示词）会被 `instruction` 命中，算成"装配可理解性"的证据。
CI_PATH_RX = re.compile(r"(^|/)\.(github|gitlab|circleci)(/|$)", re.I)

# 软件自带模板不是本项目的设计。
#
# 这里连着踩了两次坑，都值得记下来：
#
# 一、按目录名一刀切不行。`Hardware/Design Data/Body Assembly/*.ipt` 是某个项目的
#     **真实装配件**（79 个），而 Autodesk 的 `Design Data/` 通常只放标准件样式表。
#     同一个目录名下放的是真设计还是样式表，取决于项目怎么组织，不取决于目录叫什么。
#     所以目录规则只作用于**软件确实自带模板库的格式**（.dwg 图框、.xls 零件表样式）。
#
# 二、按文件名排除更不行。`Bottom_Cover (Template).FCStd`、`base_template.STEP`
#     是作者给自己零件起的名，它们是真设计——按名字排除会删掉 SpotMicroESP32 的
#     7 个 FreeCAD 零件。**规则要针对软件的行为，不要针对人会怎么命名。**
TEMPLATE_DIR_RX = re.compile(r"(^|/)(templates?|design[_\- ]?data|samples?)(/|$)", re.I)
TEMPLATE_DIR_EXTS = {".dwg", ".xls", ".xlsx", ".xlt"}

# 第三方 vendored 内容不是本项目的证据。
#
# `third_party/flexiv_rdk-main/resources/flexiv_rizon10_kinematics.urdf` 是商用机械臂
# Flexiv Rizon 10 的运动学描述；`ocs2_robotic_assets/.../kinova/meshes/arm.SLDPRT`
# 是 Kinova 的网格；`gs-render/third_party/glm/doc/manual.pdf` 是 GLM 库的文档。
# 它们躺在某个仓库里，但不属于那个项目。全量审计实测**1623 个文件 / 9 个项目**
# 因此被算成证据——最高分的那个项目靠 vendored 的第三方相机描述拿到了运动学维度的分。
#
# 这些都是**代码托管的约定目录**，按路径段排除是安全的。
# 但 `submodules/` 不收：`Mobile_Robot_URDF_Maker` 把自己写的 xacro 放在
# 名叫 `submodules` 的目录里——同一个名字放什么取决于作者，不取决于约定。
VENDOR_PATH_RX = re.compile(
    r"(^|/)(third[_\-]?party|thirdparty|vendor|vendored|node_modules"
    r"|site-packages|dist-packages|extern|external)(/|$)", re.I)

# Autodesk 自带库同理：`Blue/Inventor/Design Data/AIT/Mold Design/*.ipt`（100 个）、
# `Blue/Inventor/Design Data/Cable & Harness/de-DE/harness.iam`（59 个）都是
# Inventor 安装目录里的标准件，不是这个项目的设计。
#
# 判据是**软件自身的目录布局**——路径里既有 `Inventor/Autodesk` 段、又有
# 模板/设计数据段。不能只按"目录叫 Design Data"排除：
# `Hardware/Design Data/Body Assembly/*.ipt` 是另一个项目**自己的真实装配件**（79 个）。
_VENDOR_SEG_RX = re.compile(r"(^|/)(inventor|autodesk)(/|$)", re.I)
_TMPL_SEG_RX = re.compile(r"(^|/)(templates?|design[_\- ]?data)(/|$)", re.I)

# 物料清单必须是**能读出零件行**的表格或文档。只看文件名会出笑话：
# PX4 的 docs/assets/airframes/.../parts_list.jpg 是一张照片，证明不了任何零件。
BOM_EXT = {".csv", ".tsv", ".xlsx", ".xls", ".ods", ".numbers", ".md", ".txt",
           ".pdf", ".json", ".xml", ".yaml", ".yml", ".html", ".doc", ".docx"}

# 仿真器自带的显示网格不是硬件证据。ArduPilot 的 18 个 STL 全部位于
# libraries/SITL/examples/JSON/pybullet/models/ 下，是 SITL 测试模型，
# 与"这个机器人怎么造"无关；PHC 的网格里还混着 SMPL 人体模型。
# 只对 MESH 生效：URDF 即便放在 sim/ 下，仍可能是该机器人的真实运动学描述。
SIM_PATH_RX = re.compile(
    r"(^|/)(sitl|sim|sims|simulation|simulations|gazebo|pybullet|mujoco|"
    r"isaac|isaaclab|isaacsim|ignition|drake|webots|brax|genesis|sapien|"
    r"models?_household|smpl)(/|$)", re.I)

# 格式桶：这些目录名描述的是「文件是什么格式」，不是「机器人的哪个部分」。
# 它们绝不能当总成，否则界面会出现一列叫 meshes / urdf / docs 的"总成"。
FORMAT_BUCKET = {
    "mesh", "meshes", "stl", "stls", "step", "stp", "cad", "3d", "3dmodel",
    "3dmodels", "model", "models", "part", "parts", "asset", "assets",
    "visual", "collision", "collisions", "urdf", "urdfs", "xacro", "mjcf",
    "doc", "docs", "documentation", "image", "images", "img", "media",
    "gallery", "photo", "photos", "render", "renders", "preview", "stl_files",
    "step_files", "exported", "export", "output", "outputs", "generated",
    "files", "file", "data", "resource", "resources", "download", "downloads",
    "release", "releases", "old", "new", "backup", "archive", "final",
}

# 无意义的路径段
NOISE_SEG = {"", ".", "..", "main", "master", "src", "lib", "include",
             "static", "misc", "other", "tmp", "temp", "build", "dist", "out",
             "node_modules", ".github", "example", "examples", "demo", "demos",
             "test", "tests", "test_data", "bin", "obj", "cache"}

# 目录/文件名里的机器人功能部位 → 中文部位名。
# 用于第二层回退：当仓库只有格式桶目录时，按零件文件名聚类出真正的部位。
PART_WORDS: list[tuple[re.Pattern, str, str]] = [
    (re.compile(r"leg|thigh|shin", re.I), "leg", "腿部"),
    (re.compile(r"hip", re.I), "hip", "髋部"),
    (re.compile(r"knee", re.I), "knee", "膝部"),
    (re.compile(r"ankle", re.I), "ankle", "踝部"),
    (re.compile(r"foot|feet|toe", re.I), "foot", "足部"),
    (re.compile(r"arm|upper_?link|forearm", re.I), "arm", "手臂"),
    (re.compile(r"shoulder", re.I), "shoulder", "肩部"),
    (re.compile(r"elbow", re.I), "elbow", "肘部"),
    (re.compile(r"wrist", re.I), "wrist", "腕部"),
    (re.compile(r"hand|finger|thumb|palm|knuckle", re.I), "hand", "手部"),
    (re.compile(r"gripper|claw|jaw", re.I), "gripper", "夹爪"),
    (re.compile(r"head|neck", re.I), "head", "头部/颈部"),
    (re.compile(r"torso|trunk|chest|pelvis|waist|spine", re.I), "torso", "躯干"),
    (re.compile(r"body|chassis|frame|base|plate|shell|cover|casing", re.I),
     "body", "机身/结构件"),
    (re.compile(r"bracket|mount|adapter|holder|clamp|spacer|flange", re.I),
     "mount", "安装件/支架"),
    (re.compile(r"joint|pivot|hinge|coupling", re.I), "joint", "关节连接件"),
    (re.compile(r"motor|servo|actuator|gearbox|reducer|gear|pulley|belt", re.I),
     "drive", "驱动/传动"),
    (re.compile(r"bearing|bushing|shaft|axle|screw|bolt|nut|fastener", re.I),
     "fasten", "轴承/紧固件"),
    (re.compile(r"pcb|board|shield|controller|driver|electronics?", re.I),
     "pcb", "电路板/控制"),
    (re.compile(r"battery|power|supply|bms|charger", re.I), "power", "供电"),
    (re.compile(r"wheel|tire|track|caster", re.I), "wheel", "行走"),
    (re.compile(r"propeller|rotor|blade", re.I), "prop", "旋翼"),
    (re.compile(r"sensor|camera|lidar|imu|encoder|antenna", re.I),
     "sensor", "传感器"),
    (re.compile(r"harness|wiring|cable|connector", re.I), "harness", "线束"),
]

# 机器人相关性信号：仓库必须至少命中一个，否则不生成工作台。
# （text-to-cad 这类"生成 CAD 的 AI 工具"曾以 ★16147 排到榜首，就是缺这道闸。）
ROBOT_SIGNAL = re.compile(
    r"robot|humanoid|biped|quadruped|hexapod|manipulator|robotic arm|"
    r"gripper|dexterous|exoskeleton|drone|uav|rover|locomotion|teleop|"
    r"embodied|actuator|servo|leg|arm|android|\bbot\b|机械臂|机器人|四足|"
    r"人形|灵巧手|双足|仿生|舵机", re.I)
# 模拟器/模型库：按「仓库名」判定，不按描述。
# 理由：真机器人的描述里常写"支持 Gazebo / MuJoCo 仿真"，
# 拿描述匹配会把真项目误杀；而物理引擎和模型库的名字里一定带框架名。
SIM_NAME_RX = re.compile(
    r"mujoco|menagerie|pybullet|gazebo|isaac[-_ ]?(sim|lab|gym|rl)|sapien|"
    r"brax|genesis|drakesim|webots|gym[-_]|rl[-_]bench|bullet|ignition|"
    r"[-_](ctrl|control|mpc|ign|sim|rl|studio|viewer|driver|drivers|msgs|"
    r"bridge|api|sdk|server|client)\b|"
    r"[-_](ctrl|control|mpc|ign|studio|viewer|drivers|msgs|bridge)$", re.I)
# 描述里的强模拟信号。每条都要求」明确自述是仿真/学习框架」，
# 而不是仅仅提到某个仿真器——真机器人的描述经常会说"支持 Isaac 仿真"。
SIM_DESC_RX = re.compile(
    r"physics engine|simulator only|simulation framework|model zoo|"
    r"a collection of (robot )?models|simulation benchmark|"
    r"based on genesis|isaaclab|isaac lab|motion retargeting|"
    r"simulation and learning framework|gpu-accelerated simulation|"
    r"reinforcement learning of .* robots", re.I)

# 反信号：命中则直接排除（这些是工具/库/数据集/教程，不是机器人本体的公开设计）。
# 词边界必须写全 —— `llm` 不带 \b 会命中账号名 "Ange_lLM_/Thor"，
# 把一个 ★1596 的真机械臂误杀，与早先 `arm` 命中 `FPGAwars` 是同一类错误。
NEG_SIGNAL = re.compile(
    r"text-to-cad|text to cad|cad generator|\bllm\b|language model|benchmark|"
    r"\bdataset\b|awesome[- ]list|tutorial series|\bcourse\b|\blecture\b|"
    r"tutorials|simulator only|ros2 driver|sdk for|python api|client library",
    re.I)


def classify(path: str) -> str | None:
    """'CAD'|'MESH'|'DESC'|'PCB'|'BOM'|'DOC'，或 None（与硬件证据无关）。"""
    low = path.lower()
    name = low.rsplit("/", 1)[-1]
    ext = ("." + name.rsplit(".", 1)[-1]) if "." in name else ""
    templated = ext in TEMPLATE_DIR_EXTS and bool(TEMPLATE_DIR_RX.search(low))
    # vendored 代码与 Autodesk 自带库都是"不属于这个项目"的文件。
    # 这是**误计**（把别人的东西算成自己的），与"漏判"方向相反，
    # 但同样会让分数失真——而且偏袒的是把第三方仓库塞进自己目录的项目。
    vendored = bool(VENDOR_PATH_RX.search(low)) or (
        bool(_VENDOR_SEG_RX.search(low)) and bool(_TMPL_SEG_RX.search(low)))
    if vendored:
        return None
    # BOM 判定不能只看文件名。
    #
    # `BOM/Components.md`、`BOM/Screws.md`、`BOM/nuts_bolts.txt`、
    # `parts_list/extra_parts.md`、Altium 的 `BOM/Dragonflyte.xls`——文件名本身
    # 不含 bom/parts 字样，但它们就躺在明确的物料目录里。只测 basename 会把
    # 这一整类真实零件表漏掉（全量审计实测 20 个文件 / 11 个项目）。
    #
    # 但按目录判定会把目录里的一切都吸进来，所以还有三个例外——
    # 每一个都是实际撞出来的：
    #   · 目录里的 README 是目录说明，不是零件表；
    #   · `02 - BOM AND MANUAL/Assembly Manual PRIMO_1.1.pdf` 从**装配文档**
    #     被改判成 BOM，那一维直接掉分——名字明说是手册的，仍是文档；
    #   · `attest-sbom/action.yml` 让飞控地面站 qgroundcontrol 借道混进目录。
    #     **SBOM 是软件物料清单**，上一轮修了文件名这一路，目录这一路又漏了：
    #     同一个判据有两个入口时，两个入口都要堵。
    parent = low.rsplit("/", 2)[-2] if low.count("/") >= 1 else ""
    in_bom_dir = (bool(parent) and bool(BOM_RX.search(parent))
                  and not SOFTWARE_BOM_RX.search(parent)
                  and not name.startswith("readme")
                  # `_category_.json` 这类下划线开头的是工具链的元数据
                  # （Docusaurus 的分类配置），不是零件表。
                  and not name.startswith("_")
                  and not (ext in DOC_EXT and DOCISH_RX.search(name)))
    if ((BOM_RX.search(name) or in_bom_dir) and not SOFTWARE_BOM_RX.search(name)
            and (not ext or ext in BOM_EXT) and not templated
            and not name.startswith("readme")
            and not (in_bom_dir and ext in DOC_EXT and DOCISH_RX.search(name))):
        return "BOM"
    if ext in PARAMETRIC_CAD:
        return None if templated else "CAD"
    if ext in PRINT_MESH:
        return None if SIM_PATH_RX.search(low) else "MESH"
    if ext in ROBOT_DESC:
        return "DESC"
    if ext in PCB_EDA:
        return "PCB"
    if (ext in DOC_EXT and DOCISH_RX.search(low)
            and not re.search(r"readme", low) and not CI_PATH_RX.search(low)):
        return "DOC"
    return None


def is_readme(path: str) -> bool:
    """README 是仓库说明，不是零件；只作为证据链接出现，不占零件行。"""
    return bool(re.search(r"readme", path.rsplit("/", 1)[-1], re.I))


def segments(path: str) -> list[str]:
    return [s for s in path.split("/") if s]


def is_format_bucket(seg: str) -> bool:
    low = seg.lower()
    if low in FORMAT_BUCKET:
        return True
    # 形如 meshes_v2 / stl_export 也归为格式桶
    return any(low.startswith(b + "_") or low.startswith(b + "-")
               for b in FORMAT_BUCKET)


def functional_dir(parts: list[str]) -> str | None:
    """从文件往上找第一个「功能性」目录段，跳过格式桶、噪声段与版本号。"""
    for seg in reversed(parts[:-1]):
        low = seg.lower()
        if low in NOISE_SEG or is_format_bucket(seg):
            continue
        if re.fullmatch(r"v?\d+(\.\d+)*", low):
            continue
        if len(seg) > 40:
            continue
        return seg
    return None


def part_word(text: str) -> tuple[str, str] | None:
    """按零件名/路径里的部位词归类。返回 (key, 中文名)。"""
    for rx, key, zh in PART_WORDS:
        if rx.search(text):
            return key, zh
    return None


def blob_url(full: str, branch: str, path: str) -> str:
    # branch 一律传 HEAD：GitHub 的 /blob/HEAD/ 会解析到默认分支。
    # 曾经写死 main，于是默认分支为 master 的仓库（nasa-jpl/open-source-rover 等）
    # 整仓库的零件链接全是 404——抽查 3 条 URL 的验证方式发现不了这种成片失效。
    return f"https://github.com/{full}/blob/HEAD/{quote(path)}"


def tree_url(full: str, branch: str, path: str) -> str:
    return f"https://github.com/{full}/tree/HEAD/{quote(path)}"


def load_tree(full_name: str) -> list[dict] | None:
    f = CACHE / f"t_{full_name.replace('/', '__')}.json"
    if not f.exists():
        return None
    try:
        payload = json.load(open(f))
    except Exception:
        return None
    if isinstance(payload, list) and len(payload) == 2 and isinstance(payload[1], dict):
        return payload[1].get("tree")
    if isinstance(payload, dict):
        return payload.get("tree")
    return None


KIND_MAP = {"MESH": "PRINT", "CAD": "PRINT", "PCB": "PCB",
            "DESC": "SW", "BOM": "MAKE", "DOC": "MAKE"}
KIND_SPEC = {
    "BOM": "物料清单文件 · 数量与单价需人工核对",
    "DESC": "运动学描述 · 关节结构可验证",
    "PCB": "电路设计文件",
    "CAD": "参数化 CAD · 可再导出加工",
    "MESH": "网格文件 · 可直接打印",
    "DOC": "装配/构建文档",
}
COLORS = ["#d3ea5c", "#5aa9ff", "#35d0c8", "#ffb454",
          "#b98cff", "#ff7a7a", "#7affc4", "#ffd47a"]


def hardware_counts(tree: list[dict]) -> dict[str, int]:
    """按 classify() 统计文件树里的证据类型，口径与 build_project 完全一致。"""
    c: dict[str, int] = {}
    for e in tree:
        if e.get("type") == "blob":
            k = classify(e.get("path", ""))
            if k:
                c[k] = c.get(k, 0) + 1
    return c


def build_project(repo: dict, tree: list[dict], max_parts: int) -> dict | None:
    full = repo["full_name"]
    branch = "main"
    blobs = [e for e in tree if e.get("type") == "blob" and e.get("path")]

    buckets: dict[str, list[tuple[dict, str]]] = defaultdict(list)
    for e in blobs:
        k = classify(e["path"])
        if k:
            buckets[k].append((e, e["path"]))

    # 只认网格和 CAD 的早期守卫会漏掉"只发 BOM"的项目（makerspet/oomwoo ★11K
    # 就是这样被挡了很久）。它与下面那道明确接受 BOM/PCB 的硬件闸互相矛盾，
    # 而真正决定要不要收的是那道闸——这里只负责排除"完全没有任何硬件证据"的仓库。
    if not any(buckets.get(k) for k in ("MESH", "CAD", "PCB", "BOM")):
        return None

    # --- 硬件证据硬闸 -----------------------------------------------------
    # 仿真/控制/可视化包会发网格文件（用于显示），但几乎不会发参数化 CAD、
    # BOM 或 Gerber —— 后者只有在真的要造东西时才需要。URDF-Studio、
    # go2-convex-mpc、LeggedRobotsForBullet 这类就是靠网格混过 CAD 检查的。
    # 纯 3D 打印项目（只有 STL）仍然保留，条件是网格数量够多且有运动学描述。
    has_parametric = bool(buckets.get("CAD"))
    has_bom = bool(buckets.get("BOM"))
    has_pcb = bool(buckets.get("PCB"))
    mesh_count = len(buckets.get("MESH", []))
    has_desc = bool(buckets.get("DESC"))
    # 参数化 CAD / BOM / PCB 任意一项 = 有可制造证据，直接通过。
    # 只有网格（STL）+ URDF 的，需要外部担保：必须是"收录范围本身即
    # 可复现开放硬件"的清单收录的项目。
    # 为什么不能只凭"有 URDF"放行：URDF 描述运动学，不能据以制造。商用机器人
    # （发那科、Unitree）和强化学习训练仓库都发 URDF + 显示网格，仅凭 URDF
    # 会把它们当成可造机器人——这恰恰把"可复现"这个前提弄丢了。
    # 而纯 3D 打印项目确实可能只发 STL，那类项目由策展清单背书。
    voucher = repo.get("_trust") == "hardware"
    if not (has_parametric or has_bom or has_pcb
            or (mesh_count >= 8 and has_desc and voucher)):
        return None

    hardware = [(k, e, p) for k in ("MESH", "CAD", "PCB", "BOM")
                for e, p in buckets.get(k, [])]
    software = [(k, e, p) for k in ("DESC", "DOC")
                for e, p in buckets.get(k, [])]

    # --- 第 1 层：功能性目录 ---------------------------------------------
    groups: dict[tuple[str, str], list] = defaultdict(list)
    for k, e, p in hardware:
        d = functional_dir(segments(p))
        if d:
            groups[("dir", d)].append((k, e, p))

    # --- 第 2 层：对落在格式桶里的文件，按文件名部位词聚类 ----------------
    fallback_used = False
    unassigned: list = []
    if groups:
        # 已有功能目录时，把无名文件按部位词并进去；部位词也命中不了就并入最大组
        for k, e, p in hardware:
            if functional_dir(segments(p)):
                continue
            pw = part_word(p.rsplit("/", 1)[-1])
            if pw:
                groups[("part", pw[0])].append((k, e, p))
            else:
                unassigned.append((k, e, p))
    else:
        # 整个仓库只有格式桶：全部按零件名部位词聚类
        fallback_used = True
        for k, e, p in hardware:
            pw = part_word(p.rsplit("/", 1)[-1])
            groups[("part", pw[0] if pw else "asset")].append((k, e, p))

    if unassigned:
        biggest = max(groups, key=lambda k: len(groups[k]))
        groups[biggest].extend(unassigned)

    no_structure = fallback_used and set(groups) == {("part", "asset")}

    # 合并碎组（<2 文件的组并入最大组）
    if len(groups) > 1:
        biggest = max(groups, key=lambda k: len(groups[k]))
        for key in [k for k, v in groups.items() if len(v) < 2 and k != biggest]:
            groups[biggest].extend(groups.pop(key))

    # 最多 7 个硬件总成 + 1 个软件文档组
    ordered = sorted(groups.items(), key=lambda kv: -len(kv[1]))[:7]
    if len(groups) > 7:
        keep = dict(ordered)
        merged = [x for k, v in groups.items() if k not in keep for x in v]
        ordered[0][1].extend(merged)

    # --- 组装总成定义 -----------------------------------------------------
    def asm_label(key: tuple[str, str], items: list) -> tuple[str, str]:
        kind, val = key
        if kind == "dir":
            return val, ""
        # part 聚类：用中文部位名
        zh = next((z for _, k, z in PART_WORDS if k == val), None)
        if val == "asset":
            return "整机资产", "仓库未按功能分区组织，本组按文件类型聚合"
        return (zh or val), "按零件文件名中的部位词聚类"

    assemblies = []
    asm_paths: dict[str, list[str]] = {}
    for i, (key, items) in enumerate(ordered):
        name, note = asm_label(key, items)
        aid = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or f"asm{i}"
        if aid in asm_paths:  # 目录名与部位名撞车时去重
            aid = f"{aid}-{i}"
        ang = (2 * math.pi * i / max(len(ordered), 1)) - math.pi / 2
        kinds = Counter(k for k, _, _ in items)
        comp = " · ".join(f"{v} 个 {k}" for k, v in
                          sorted(kinds.items(), key=lambda kv: -kv[1]))
        desc = f"{note}｜{comp}" if note else comp
        assemblies.append({
            "id": aid, "name": name, "description": desc,
            "x": round(50 + 30 * math.cos(ang), 1),
            "y": round(48 + 28 * math.sin(ang), 1),
            "color": COLORS[i % len(COLORS)],
        })
        for _, _, p in items:
            asm_paths.setdefault(aid, []).append(p)

    # 软件与文档单列一组，明确标注非硬件
    if software:
        ang = (2 * math.pi * len(assemblies) / max(len(ordered) + 1, 1)) - math.pi / 2
        assemblies.append({
            "id": "software-docs", "name": "软件与文档",
            "description": "非硬件件｜运动学描述与控制/装配文档",
            "x": round(50 + 30 * math.cos(ang), 1),
            "y": round(48 + 28 * math.sin(ang), 1),
            "color": "#8894a6",
        })

    path_to_asm: dict[str, str] = {}
    for aid, paths in asm_paths.items():
        for p in paths:
            path_to_asm[p] = aid
    for _, _, p in software:
        path_to_asm[p] = "software-docs"

    # --- 零件行 -----------------------------------------------------------
    rows = []
    for kind in ("MESH", "CAD", "PCB", "BOM", "DESC", "DOC"):
        for e, path in buckets.get(kind, []):
            fname = path.rsplit("/", 1)[-1]
            stem = fname.rsplit(".", 1)[0] if "." in fname else fname
            ext = ("." + fname.rsplit(".", 1)[-1]) if "." in fname else ""
            size = e.get("size") or 0
            spec = KIND_SPEC[kind]
            if kind in ("MESH", "CAD", "PCB", "DESC", "DOC"):
                spec = f"{spec} {ext} · {size:,} B"
            rows.append({
                "id": re.sub(r"[^a-z0-9]+", "-",
                             f"{full}-{path}".lower()).strip("-")[:80],
                "assembly": path_to_asm.get(path, assemblies[0]["id"]),
                "name": stem,
                "specification": spec,
                "quantity": "1",
                "kind": KIND_MAP[kind],
                "state": "verified",
                "source": blob_url(full, branch, path),
            })

    rows.sort(key=lambda r: (r["assembly"], r["kind"], r["name"]))
    if len(rows) > max_parts:
        per = max(1, max_parts // max(len(assemblies), 1))
        trimmed, seen = [], Counter()
        for r in rows:
            if seen[r["assembly"]] < per:
                trimmed.append(r)
                seen[r["assembly"]] += 1
        rows = trimmed

    # --- 证据 -------------------------------------------------------------
    dirs: dict[str, set[str]] = defaultdict(set)
    for k, _, p in hardware + software:
        parts = segments(p)
        if len(parts) > 1:
            dirs[k].add("/".join(parts[:-1]))

    evidence = []
    for k, label, detail in (
        ("MESH", "CAD 网格", "3D 打印件网格目录"),
        ("CAD", "参数化 CAD", "可再导出的参数化设计目录"),
        ("PCB", "电路设计", "PCB / 原理图目录"),
        ("DESC", "运动学模型", "URDF / MJCF 机器人描述目录"),
    ):
        if dirs.get(k):
            d = sorted(dirs[k])[0]
            evidence.append({"label": label, "url": tree_url(full, branch, d),
                             "state": "verified", "detail": f"{detail}：{d}"})
    if buckets.get("BOM"):
        evidence.append({"label": "BOM", "state": "verified",
                         "url": blob_url(full, branch, buckets["BOM"][0][1]),
                         "detail": f"仓库内物料清单：{buckets['BOM'][0][1]}"})
    evidence.append({"label": "上游仓库", "state": "verified",
                     "url": f"https://github.com/{full}",
                     "detail": repo.get("description") or "仓库主页"})

    # --- 缺口：只写真实缺的东西 -------------------------------------------
    gaps = []
    if no_structure:
        gaps.append(
            "仓库未按功能分区组织文件，装配层级由零件文件名中的部位词聚类推导，"
            "与官方装配顺序可能有出入。"
        )
    else:
        gaps.append("装配层级由仓库发布的目录结构推导，可能与官方装配顺序不完全一致。")
    if not buckets.get("BOM"):
        gaps.append("仓库内未提供 BOM 清单文件，零件数量与单价未在公开资料中标注。")
    if not buckets.get("DESC"):
        gaps.append("未发现 URDF / MJCF 等运动学描述文件，关节自由度与限位未能验证。")
    if not dirs.get("PCB"):
        gaps.append("未发现 PCB / 原理图文件，电子部分的具体设计不可复核。")
    gaps.append("零件单价与供应商信息未在本仓库结构中体现；本工作台不代填价格，"
                "采购成本需以供应商实时报价为准。")

    return {
        "id": f"REPO-{full.replace('/', '-').upper()}",
        "name": repo["name"],
        "category": repo.get("_class") or "ROBOT",
        "version": (repo.get("pushed_at") or "")[:10] or "UNKNOWN",
        "embodiment": repo.get("_embodiment") or "UNKNOWN",
        "summary": repo.get("description") or f"{full} 的公开仓库证据工作台。",
        "repository": f"https://github.com/{full}",
        "releaseBasis": (
            f"仓库 {full} 的公开文件树快照（{len(blobs)} 个文件）；"
            f"装配层级由目录结构或零件文件名推导，零件行逐条对应真实文件。"
        ),
        "stars": repo.get("stars", 0),
        "license": repo.get("license") or "无",
        "assemblies": assemblies,
        "parts": rows,
        "evidence": evidence,
        "gaps": gaps,
        "reproduction": {
            "state": "UNSCORED",
            "reason": "NOT_YET_MODELED",
            "note": "本项目已生成证据工作台，但尚未提交 OPEN_REPRO_V2 评分。",
        },
    }


def classify_form(r: dict) -> tuple[str, str]:
    text = f"{r.get('name','')} {r.get('description','') or ''} " \
           f"{' '.join(r.get('topics') or [])}".lower()
    if any(w in text for w in ("humanoid", "biped", "双足", "人形")):
        return ("HUMANOID_FULL", "FULL_22_DOF 级")
    if any(w in text for w in ("quadruped", "四足")):
        return ("QUADRUPED", "12-DOF 级")
    if any(w in text for w in ("hexapod", "六足")):
        return ("HEXAPOD", "18-DOF 级")
    if any(w in text for w in ("dexterous hand", "robot hand", "灵巧手")):
        return ("DEXTEROUS_HAND", "多指")
    if re.search(r"gripper|夹爪", text):
        return ("ROBOT_GRIPPER", "夹持器")
    if re.search(r"\barm\b|manipulator|机械臂", text):
        return ("ROBOT_ARM", "6-DOF 级")
    if re.search(r"exoskeleton|外骨骼", text):
        return ("HYBRID_ROBOT", "穿戴式")
    if re.search(r"drone|uav|aerial|四旋翼", text):
        return ("AERIAL_ROBOT", "飞行平台")
    if re.search(r"rover|wheeled|mobile robot|轮式", text):
        return ("WHEELED_ROBOT", "轮式底盘")
    if re.search(r"robot|robotic|机械|机器人", text):
        return ("ROBOT", "通用机器人")
    return ("ROBOT", "未归类")


def format_ts(projects: list[dict]) -> str:
    header = f'''/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by `pipeline/build_projects.py` from cached public repository trees.
 * Every assembly is either a real functional directory or a cluster of part
 * filenames; every part row points at a real blob URL. Absent facts are listed
 * in `gaps` rather than filled in, and no reproduction probability is emitted
 * here — scoring belongs to OPEN_REPRO_V2 alone.
 *
 * Projects: {len(projects)}
 */

import type {{ WorkbenchProject }} from "./workbench-types";

export const GENERATED_PROJECTS: WorkbenchProject[] = '''
    return header + json.dumps(projects, ensure_ascii=False, indent=2) + ";\n"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-tier", default="B")
    ap.add_argument("--max-projects", type=int, default=0)
    ap.add_argument("--max-parts", type=int, default=26)
    ap.add_argument("--out", default="lib/projects.generated.ts")
    args = ap.parse_args()

    order = {"A": 0, "B": 1, "C": 2, "D": 3}
    cutoff = order[args.min_tier]
    raw = [r for r in json.load(open(ROBOTS))
           if order.get(r.get("tier"), 9) <= cutoff]

    # 按小写去重：GitHub 的 owner/repo 大小写不敏感，同一个仓库可能以
    # `ROBOTIS-GIT/open_manipulator` 和 `robotis-git/open_manipulator` 两种写法
    # 各收一份。上游按精确字符串去重，拦不住。漏掉的后果不只是多一行——
    # 两条记录会生成同一个 React key，导致筛选后残留错误行。
    seen_casefold: dict[str, dict] = {}
    case_dupes: list[str] = []
    for r in raw:
        key = r["full_name"].lower()
        prev = seen_casefold.get(key)
        if prev is None:
            seen_casefold[key] = r
            continue
        case_dupes.append(f"{prev['full_name']} / {r['full_name']}")
        # 保留大写字母更多的那一份——通常是官方写法（ROBOTIS-GIT 而非 robotis-git）
        if sum(c.isupper() for c in r["full_name"]) > sum(
            c.isupper() for c in prev["full_name"]
        ):
            seen_casefold[key] = r
    repos = list(seen_casefold.values())

    if SEED_GAP.exists():
        for r in json.loads(SEED_GAP.read_text(encoding="utf-8")):
            k = r["full_name"].lower()
            cur = seen_casefold.get(k)
            if cur is None:
                seen_casefold[k] = r
                continue
            # 同一个仓库常常既在 robots.json（带 tier 与采集证据）又在种子里
            # （带 _trust/_gap 这类来源元数据）。整条丢弃任一份都会丢字段：
            # 丢掉种子那份，_trust 就没了，条目随即被关键词闸误杀——
            # gello_mechanical 与 Navbot-EN01 就是这样消失的（两者 tier 都是 B，
            # 本来就该进目录，却因为"已存在"而只留下了没有 _trust 的那份）。
            # 正确做法是补字段，而不是二选一。
            if r.get("_trust"):
                cur["_trust"] = r["_trust"]
            if r.get("_gap"):
                cur["_gap"] = r["_gap"]
            for f in ("bom_files", "urdf_files", "evidence", "file_count"):
                if not cur.get(f) and r.get(f):
                    cur[f] = r[f]
        repos = list(seen_casefold.values())

    # --- 按 GitHub 数字 id 去重 -------------------------------------------
    # 仓库改名或换组织后，同一仓库会以两个完全不同的名字出现：
    #   menloresearch/asimov-1 ≡ asimovinc/asimov-1
    #   Source-Robotics/Faze4-Robotic-arm ≡ PCrnjak/Faze4-Robotic-arm
    # 按名字去重——哪怕小写化之后——都拦不住这类重复，因为名字毫无共同点。
    # 稳定的身份是数字 id。顺带把 full_name 改写成规范名，引用不再指向已改名的地址。
    id_map: dict[str, dict] = {}
    if REPO_IDS.exists():
        id_map = json.loads(REPO_IDS.read_text(encoding="utf-8"))
    by_id: dict[str | int, dict] = {}
    rename_dupes: list[str] = []
    renamed: list[str] = []
    for r in repos:
        meta = id_map.get(r["full_name"].lower())
        if meta:
            if meta["canonical"] != r["full_name"]:
                renamed.append(f"{r['full_name']} → {meta['canonical']}")
            r["full_name"] = meta["canonical"]
            key: str | int = meta["id"]
        else:
            key = r["full_name"].lower()
        prev = by_id.get(key)
        if prev is None:
            by_id[key] = r
            continue
        rename_dupes.append(f"{prev['full_name']} / {r['full_name']}")
        # 保留证据更全的那一份（文件数 + BOM 条目数）
        score = lambda x: (x.get("file_count") or 0) + 10 * len(x.get("bom_files") or [])  # noqa: E731
        if score(r) > score(prev):
            by_id[key] = r
    repos = list(by_id.values())

    out, stats = [], Counter()
    dropped_neg: list[str] = []
    dropped_nosig: list[str] = []
    dropped_sim: list[str] = []
    dropped_nocad: list[str] = []
    rescued: list[str] = []

    # 人工复核后的排除清单——与 candidates-manual.json 相对的"拒绝出口"。
    # 结构闸只按可观测特征判定，识别不了「BOM 里写的是买两台商用机器人」
    # 这类语义问题。被逐条核对后拒绝的仓库写在这里并带上理由，
    # 好让"为什么这个项目没进来"在界面上有答案，而不是只有模型知道。
    reviewed: dict[str, dict] = {}
    rp = ROOT / "data" / "excluded-reviewed.json"
    if rp.exists():
        for e in json.loads(rp.read_text(encoding="utf-8")):
            reviewed[e["full_name"].lower()] = e
    dropped_reviewed: list[str] = []

    for r in repos:
        if r["full_name"].lower() in reviewed:
            dropped_reviewed.append(r["full_name"])
            continue
        blob_text = f"{r.get('name','')} {r.get('description','') or ''} " \
                    f"{' '.join(r.get('topics') or [])} {r.get('full_name','')}"
        tree = load_tree(r["full_name"])

        # 结构证据：机器人描述文件是"这是个机器人"的决定性证据。
        # 光靠名字/描述关键词会误杀真机器人——Open_Duck_Mini（★4115 双足）
        # 和 AngelLM/Thor（真机械臂）都因为没有命中词表而被排除过。
        has_desc = False
        if tree:
            has_desc = any(
                e.get("type") == "blob"
                and classify(e.get("path", "")) == "DESC"
                for e in tree
            )

        # 模拟器 / 模型库：名字里带框架名，或自述是引擎/模型库。
        # 这类仓库有 mesh 文件（可视化用），能骗过 CAD 存在性检查，
        # 但它们不是可制造机器人的设计——mujoco（★15229）曾因此排到榜首。
        desc = r.get("description") or ""
        if SIM_NAME_RX.search(r.get("name", "")) or SIM_DESC_RX.search(desc):
            stats["drop_simulator"] += 1
            dropped_sim.append(r["full_name"])
            continue

        # NEG_SIGNAL 是硬闸，不设 URDF 豁免：text-to-cad 会生成 .urdf 文件，
        # 但它是个 CAD 生成工具库，不是机器人。豁免只能用在"漏判真机器人"上。
        if NEG_SIGNAL.search(blob_text):
            stats["drop_neg_signal"] += 1
            dropped_neg.append(r["full_name"])
            continue
        if not ROBOT_SIGNAL.search(blob_text):
            # 兜底按「来源可信度」分档，不按证据强度：
            #   收录范围本身就是"可复现开放硬件"的清单（_trust=hardware）——
            #     被收录这件事就是人工判断"它是个能造的机器人"，不必再问关键词。
            #   其他来源——只有 URDF/MJCF 这类结构证据才能推翻关键词判断。
            # 为什么不能按证据强度放宽：那样 NopSCADlib（SCAD 库）、kicad-happy
            # （KiCad 工具）、DIY-CNC-machine（数控机床）会全部涌入。
            # 为什么不能"是清单就信任"：awesome-robot-descriptions 收录的是 URDF
            # 描述（含 Unitree、发那科等商用机器人），一并信任会让 ArduPilot、
            # PX4、kinpy、scikit-robot 这类飞控与库借道进来——清单的范围必须跟着来源看。
            curated = r.get("_trust") == "hardware"
            if curated or has_desc:
                stats["rescued_by_structure"] += 1
                rescued.append(r["full_name"])
            else:
                stats["drop_no_robot_signal"] += 1
                dropped_nosig.append(r["full_name"])
                continue
        if not tree:
            stats["drop_no_tree"] += 1
            continue
        cls, emb = classify_form(r)
        r["_class"], r["_embodiment"] = cls, emb
        proj = build_project(r, tree, args.max_parts)
        if not proj:
            stats["drop_no_cad"] += 1
            dropped_nocad.append(r["full_name"])
            continue
        out.append(proj)

    out.sort(key=lambda p: -p["stars"])
    if args.max_projects:
        out = out[: args.max_projects]

    # 断言唯一性。重复 id 会变成重复的 React key，让筛选后的表格残留错误行——
    # 症状看起来像"筛选坏了"，根因却在数据层，所以在这一层拦住。
    dup_ids = [k for k, v in Counter(p["id"] for p in out).items() if v > 1]
    dup_urls = [k for k, v in Counter(p["repository"] for p in out).items() if v > 1]
    if dup_ids or dup_urls:
        raise SystemExit(
            f"生成中止：id 重复 {dup_ids}，repository 重复 {dup_urls}。"
            f"唯一性不变量被破坏，产物不可用。"
        )

    dest = Path(args.out)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(format_ts(out), encoding="utf-8")

    # 排除清单落成数据，供审看页展示——启发式规则必须可复核，
    # 否则"为什么这个项目没进来"只能去翻终端日志。
    audit = {
        "generatedAt": __import__("datetime").date.today().isoformat(),
        "minTier": args.min_tier,
        "candidates": len(repos),
        "kept": len(out),
        "excluded": [
            *([{
                "reason": "REVIEWED_AND_REJECTED",
                "label": "人工逐条核对后排除（附理由）",
                "repos": sorted(dropped_reviewed),
                "details": [reviewed[f.lower()] for f in sorted(dropped_reviewed)
                            if f.lower() in reviewed],
            }] if dropped_reviewed else []),
            {"reason": "TOOL_OR_LIBRARY_OR_DATASET",
             "label": "工具 / 库 / 数据集 / 教程",
             "repos": sorted(dropped_neg)},
            {"reason": "NO_ROBOT_SIGNAL",
             "label": "无机器人信号且无任何结构证据",
             "repos": sorted(dropped_nosig)},
            {"reason": "SIMULATOR_OR_MODEL_ZOO",
             "label": "仿真器 / 模型库（不可制造）",
             "repos": sorted(dropped_sim)},
            {"reason": "NO_HARDWARE_EVIDENCE",
             "label": "无硬件证据（无参数化 CAD / BOM / PCB，网格也不足）",
             "repos": sorted(dropped_nocad)},
        ],
        "rescuedByStructure": sorted(rescued),
    }
    audit_path = dest.parent / "pipeline-audit.ts"
    audit_path.write_text(
        "/**\n"
        " * GENERATED FILE — do not edit by hand.\n"
        " *\n"
        " * Which repositories the pipeline rejected, and why. Written because a\n"
        " * heuristic filter that cannot be audited is indistinguishable from a bug:\n"
        " * 'why is this project missing' should be answerable from the UI, not from\n"
        " * a scrolling terminal log.\n"
        " */\n\n"
        "export const PIPELINE_AUDIT = "
        + json.dumps(audit, ensure_ascii=False, indent=2)
        + " as const;\n",
        encoding="utf-8",
    )

    print(f"候选仓库（tier ≤ {args.min_tier}）: {len(raw)}")
    if case_dupes:
        print(f"  大小写重复已合并      : {len(case_dupes)}")
        for d in case_dupes:
            print(f"      - {d}")
    if rename_dupes:
        print(f"  改名重复已合并（按 id）: {len(rename_dupes)}")
        for d in rename_dupes:
            print(f"      - {d}")
    if renamed:
        print(f"  已改用规范仓库名      : {len(renamed)}")
        for d in renamed:
            print(f"      - {d}")
    for k in ("drop_neg_signal", "drop_no_robot_signal", "drop_no_tree", "drop_no_cad"):
        if stats[k]:
            print(f"  {k:<22}: {stats[k]}")
    if dropped_neg:
        print(f"  被反信号排除（工具/数据集/教程，非机器人本体）:")
        for name in dropped_neg:
            print(f"      - {name}")
    if dropped_nosig:
        print(f"  机器人信号不足排除:")
        for name in dropped_nosig:
            print(f"      - {name}")
    if rescued:
        print(f"  关键词未命中但凭结构证据收录（URDF 或参数化 CAD/BOM/PCB）:")
        for name in rescued:
            print(f"      - {name}")
    if dropped_sim:
        print(f"  模拟器/模型库排除（不可制造）：")
        for name in dropped_sim:
            print(f"      - {name}")
    print(f"  生成工作台            : {len(out)}")
    print(f"  总零件行              : {sum(len(p['parts']) for p in out)}")
    print(f"  总成总数              : {sum(len(p['assemblies']) for p in out)}")
    print(f"  形态分布              : {dict(Counter(p['category'] for p in out))}")
    allasm = Counter(a["name"] for p in out for a in p["assemblies"])
    print(f"  最高频总成名（应为人名或部位名，不应是 meshes/urdf/docs）:")
    for name, cnt in allasm.most_common(8):
        print(f"      {name:<20} {cnt}")
    print(f"  评分状态              : "
          f"{dict(Counter(p['reproduction']['state'] for p in out))}")
    print(f"写成                  : {dest}  ({dest.stat().st_size/1024:.0f} KB)")


if __name__ == "__main__":
    main()
