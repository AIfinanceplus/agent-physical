import { importedScore, unscored, type ReproductionScore } from "./reproduction";
import { GENERATED_PROJECTS } from "./projects.generated";
import type {
  Assembly,
  EvidenceState,
  WorkbenchEvidence,
  WorkbenchPart,
  WorkbenchProject,
} from "./workbench-types";

export type { Assembly, EvidenceState, WorkbenchPart, WorkbenchProject };

const rosmoSource = "https://github.com/rosmo-robot/rosmo-robot.github.io";
const quadSource = "https://github.com/adham-elarabawy/OpenQuadruped";
const beatrixSource = "https://osf.io/t8egc/overview";
const minibotSource = "https://github.com/OLIMEX/Minibot";
const fazeSource = "https://github.com/PCrnjak/Faze4-Robotic-arm";

export const WORKBENCH_PROJECTS: WorkbenchProject[] = [
  {
    id: "EDU-ROSMO",
    name: "ROSMO",
    category: "EDUCATIONAL_ROBOT",
    version: "V1",
    embodiment: "2WD / 4WD",
    // 这些项目此前继承了一个硬编码的 88（实为 Berkeley 的形态封顶值）。
    // 它们从未进过 OPEN_REPRO_V2，因此如实标注未评分，而不是借用别人的数字。
    reproduction: unscored(
      "NOT_YET_MODELED",
      "本条目为人工策展的证据工作台，尚未提交 OPEN_REPRO_V2 评分。",
    ),
    summary: "无需焊接或 3D 打印的模块化 ROS 2 / MicroBlocks 微型移动机器人。",
    repository: rosmoSource,
    releaseBasis: "官方站点 V1 零件表、装配页、EasyEDA PCB 与软件仓库",
    assemblies: [
      { id: "chassis", name: "PCB 底盘", description: "承载、电气连接与扩展接口", x: 50, y: 48, color: "#d3ea5c" },
      { id: "drive", name: "驱动组", description: "2WD/4WD 电机、编码器、轮组", x: 16, y: 48, color: "#5aa9ff" },
      { id: "control", name: "控制组", description: "ESP32-S3 与 ROS 2/MicroBlocks", x: 50, y: 18, color: "#35d0c8" },
      { id: "power", name: "供电组", description: "移动电源与 USB 转接", x: 50, y: 78, color: "#ffb454" },
      { id: "expansion", name: "扩展组", description: "Qwiic / MikroBUS 可选传感器", x: 84, y: 48, color: "#b98cff" },
    ],
    parts: [
      { id: "rosmo-chassis", assembly: "chassis", name: "ROSMO Custom PCB Chassis", specification: "V1 · EasyEDA design", quantity: "1", kind: "PCB", state: "verified", source: "https://easyeda.com/editor#id=d247ef6dfe8843e298bc970c2c421022" },
      { id: "rosmo-motor", assembly: "drive", name: "6 V 150 RPM 编码减速电机 + 轮", specification: "Bringsmart / Adafruit 4639 alternative", quantity: "2 或 4", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-cable", assembly: "drive", name: "反向 6-pin 电机线", specification: "80 mm", quantity: "4", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-mcu", assembly: "control", name: "ESP32-S3-C1 N16R8", specification: "Olimex open-hardware board recommended", quantity: "1", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-spacer", assembly: "chassis", name: "M3 六角隔离柱", specification: "15 mm", quantity: "1 套", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-bank", assembly: "power", name: "移动电源", specification: "2 A output", quantity: "1", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-usb", assembly: "power", name: "USB 转排针适配器", specification: "Type 3 DIP-4P", quantity: "1", kind: "BUY", state: "verified", source: rosmoSource },
      { id: "rosmo-sensors", assembly: "expansion", name: "传感器扩展", specification: "MPU6050 / BNO055 / ToF / ultrasonic", quantity: "可选", kind: "BUY", state: "partial", source: rosmoSource, note: "不同软件栈支持度不一致，不计入基础版。" },
    ],
    evidence: [
      { label: "零件表", url: "https://rosmo-robot.github.io/", state: "verified", detail: "基础 2WD/4WD 数量与参考价格" },
      { label: "装配指南", url: "https://rosmo-robot.github.io/build", state: "verified", detail: "底盘、驱动、供电和传感器安装步骤" },
      { label: "PCB", url: "https://easyeda.com/editor#id=d247ef6dfe8843e298bc970c2c421022", state: "verified", detail: "V1 PCB chassis 设计入口" },
      { label: "软件", url: "https://github.com/rosmo-robot", state: "verified", detail: "ROS 2、MicroPython 与 MicroBlocks 相关仓库" },
    ],
    gaps: ["官方零件表允许 2WD/4WD 两种数量，本工作台不强行合并为单一 BOM。", "部分采购链接为渠道链接而非稳定 MPN。", "扩展传感器为可选项，兼容状态随软件栈变化。"],
  },
  {
    id: "QUAD-OPENQUADRUPED",
    name: "OpenQuadruped",
    category: "QUADRUPED",
    version: "master snapshot",
    embodiment: "12-DOF",
    // 这些项目此前继承了一个硬编码的 88（实为 Berkeley 的形态封顶值）。
    // 它们从未进过 OPEN_REPRO_V2，因此如实标注未评分，而不是借用别人的数字。
    reproduction: unscored(
      "NOT_YET_MODELED",
      "本条目为人工策展的证据工作台，尚未提交 OPEN_REPRO_V2 评分。",
    ),
    summary: "带完整 STEP/STL、URDF、12 轴控制板 Gerber 与控制软件的 3D 打印四足机器人。",
    repository: quadSource,
    releaseBasis: "官方仓库 master：hardware/3d-printing、URDF、Gerber 与 README",
    assemblies: [
      { id: "body", name: "机身", description: "左右侧板、肩座、电子托盘、外罩", x: 50, y: 48, color: "#d3ea5c" },
      { id: "front", name: "前腿组", description: "左右 3-DOF 腿", x: 18, y: 24, color: "#5aa9ff" },
      { id: "rear", name: "后腿组", description: "左右 3-DOF 腿", x: 18, y: 74, color: "#5aa9ff" },
      { id: "control", name: "控制 PCB", description: "12 伺服位置/速度控制", x: 82, y: 30, color: "#35d0c8" },
      { id: "software", name: "ROS / URDF", description: "IK、步态与仿真", x: 82, y: 68, color: "#b98cff" },
    ],
    parts: [
      { id: "oq-servo", assembly: "front", name: "关节伺服器", specification: "仓库定义的 12 轴执行器系统", quantity: "12", kind: "BUY", state: "verified", source: quadSource },
      { id: "oq-upper", assembly: "front", name: "Upper Leg", specification: "STEP + STL · 左右版本", quantity: "4", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Legs` },
      { id: "oq-lower", assembly: "rear", name: "Lower Leg", specification: "STEP + STL · 左右版本", quantity: "4", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Legs` },
      { id: "oq-foot", assembly: "rear", name: "Foot", specification: "STEP + STL · 左右版本", quantity: "4", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Legs` },
      { id: "oq-hip", assembly: "front", name: "Hip Joint", specification: "Left / Right", quantity: "4", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Legs` },
      { id: "oq-chassis", assembly: "body", name: "Chassis Side", specification: "Left / Right STEP + STL", quantity: "2", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Body` },
      { id: "oq-shoulder", assembly: "body", name: "Shoulder brackets", specification: "front/back · inner/outer", quantity: "8", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Body` },
      { id: "oq-cover", assembly: "body", name: "Body covers", specification: "Top / Bottom / Front / Rear", quantity: "4", kind: "PRINT", state: "verified", source: `${quadSource}/tree/master/hardware/3d-printing/Covers` },
      { id: "oq-pcb", assembly: "control", name: "12-servo controller PCB", specification: "MainPCB + DoublePCB Gerber archives", quantity: "1 套", kind: "PCB", state: "verified", source: `${quadSource}/tree/master/hardware/pcb` },
      { id: "oq-urdf", assembly: "software", name: "Robot description", specification: "URDF + meshes", quantity: "1", kind: "SW", state: "verified", source: `${quadSource}/tree/master/ros-workspace/src/open_quadruped/urdf` },
      { id: "oq-fasteners", assembly: "body", name: "紧固件、轴承、皮带与电源", specification: "完整采购数量需核对外部 Google Sheet", quantity: "UNKNOWN", kind: "BUY", state: "partial", source: quadSource },
    ],
    evidence: [
      { label: "CAD", url: `${quadSource}/tree/master/hardware/3d-printing`, state: "verified", detail: "机身、腿与外罩的 STEP/STL" },
      { label: "控制板", url: `${quadSource}/tree/master/hardware/pcb`, state: "verified", detail: "MainPCB 与 DoublePCB Gerber" },
      { label: "URDF", url: `${quadSource}/tree/master/ros-workspace/src/open_quadruped/urdf`, state: "verified", detail: "可视模型与关节结构" },
      { label: "BOM", url: "https://docs.google.com/spreadsheets/d/12QX1ca9LHZEThukprlz0DARR9_lmf6FJI8Tg-O4qcdc/edit", state: "partial", detail: "官方链接在外部表格；精确 MPN 尚未冻结" },
    ],
    gaps: ["外部 Google Sheet 尚未形成仓库内不可变版本。", "部分指南在 README 中标注 in progress。", "当前工作台只把仓库内可验证 CAD 件计为确定项。"],
  },
  {
    id: "HEAD-BEATRIX",
    name: "BEATRIX Humanoid Head",
    category: "ROBOT_HEAD",
    version: "HardwareX 2024",
    embodiment: "3-DOF neck",
    // 这些项目此前继承了一个硬编码的 88（实为 Berkeley 的形态封顶值）。
    // 它们从未进过 OPEN_REPRO_V2，因此如实标注未评分，而不是借用别人的数字。
    reproduction: unscored(
      "NOT_YET_MODELED",
      "本条目为人工策展的证据工作台，尚未提交 OPEN_REPRO_V2 评分。",
    ),
    summary: "面向教学与研究的开源人形头部：三轴颈部、双相机、双麦克风与公开 CAD/软件。",
    repository: beatrixSource,
    releaseBasis: "HardwareX 2024 论文与 OSF 项目 t8egc",
    assemblies: [
      { id: "head", name: "头壳与内部件", description: "Skull、Base 与公开 STL", x: 50, y: 25, color: "#d3ea5c" },
      { id: "neck", name: "三轴颈部", description: "3 × stepper motor mechanism", x: 50, y: 68, color: "#5aa9ff" },
      { id: "vision", name: "视觉", description: "2 × cameras", x: 18, y: 34, color: "#35d0c8" },
      { id: "audio", name: "音频", description: "2 × microphones", x: 82, y: 34, color: "#b98cff" },
      { id: "control", name: "控制与软件", description: "电子 BOM、代码和操作说明", x: 82, y: 72, color: "#ffb454" },
    ],
    parts: [
      { id: "bx-skull", assembly: "head", name: "Skull", specification: "OSF STL", quantity: "1", kind: "PRINT", state: "verified", source: "https://osf.io/t8egc/files/gzehu" },
      { id: "bx-base", assembly: "head", name: "Base", specification: "OSF STL", quantity: "1", kind: "PRINT", state: "verified", source: "https://osf.io/msk4a" },
      { id: "bx-stepper", assembly: "neck", name: "颈部步进电机", specification: "论文确认 3 轴驱动", quantity: "3", kind: "BUY", state: "verified", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11293982/" },
      { id: "bx-camera", assembly: "vision", name: "相机", specification: "双目采集", quantity: "2", kind: "BUY", state: "verified", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11293982/" },
      { id: "bx-mic", assembly: "audio", name: "麦克风", specification: "双通道音频采集", quantity: "2", kind: "BUY", state: "verified", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11293982/" },
      { id: "bx-electronics", assembly: "control", name: "电子元器件 BOM", specification: "BoM_Electronic_Components.xlsx", quantity: "见源表", kind: "PCB", state: "verified", source: "https://osf.io/t8egc/files/osfstorage/66d08813858a4c55238c92c0/?pid=t8egc" },
      { id: "bx-fasteners", assembly: "neck", name: "紧固件与传动细项", specification: "需逐文件归并", quantity: "UNKNOWN", kind: "BUY", state: "partial", source: beatrixSource },
    ],
    evidence: [
      { label: "论文", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11293982/", state: "verified", detail: "设计、装配、操作与验证" },
      { label: "OSF 项目", url: beatrixSource, state: "verified", detail: "CAD、BOM 与代码发布入口" },
      { label: "CAD", url: "https://osf.io/t8egc/files/gzehu", state: "verified", detail: "Skull 等 STL 文件" },
      { label: "电子 BOM", url: "https://osf.io/t8egc/files/osfstorage/66d08813858a4c55238c92c0/?pid=t8egc", state: "verified", detail: "公开电子元件工作簿" },
    ],
    gaps: ["OSF 文件没有仓库式 release tag，版本以论文与文件时间冻结。", "电子 BOM 与机械 CAD 分散，exact MPN 仍需逐表归一。", "未发布完整装配体 GLB，因此本页展示证据化装配拓扑而非伪造 3D。"],
  },
  {
    id: "EDU-OLIMEX-MINIBOT",
    name: "Olimex MINIBOT",
    category: "EDUCATIONAL_ROBOT",
    version: "Rev A / Rev B schematic",
    embodiment: "2-motor mobile",
    // 这些项目此前继承了一个硬编码的 88（实为 Berkeley 的形态封顶值）。
    // 它们从未进过 OPEN_REPRO_V2，因此如实标注未评分，而不是借用别人的数字。
    reproduction: unscored(
      "NOT_YET_MODELED",
      "本条目为人工策展的证据工作台，尚未提交 OPEN_REPRO_V2 评分。",
    ),
    summary: "ATtiny85 教育机器人，公开 KiCad PCB、装配文档、固件与 Rev A BOM。",
    repository: minibotSource,
    releaseBasis: "官方 Olimex/Minibot 仓库 HEAD 与 MiniBot_RevA_BOM.ods",
    assemblies: [
      { id: "pcb", name: "主 PCB", description: "底盘、控制与传感器合一", x: 50, y: 48, color: "#d3ea5c" },
      { id: "drive", name: "双电机", description: "2 × 10 mm 3 V motor", x: 18, y: 48, color: "#5aa9ff" },
      { id: "sense", name: "光学传感", description: "4 × IR phototransistor", x: 50, y: 18, color: "#35d0c8" },
      { id: "power", name: "供电", description: "CR2032 / LiPo connector", x: 50, y: 78, color: "#ffb454" },
      { id: "firmware", name: "固件", description: "Arduino/GPL3 hex + source", x: 82, y: 48, color: "#b98cff" },
    ],
    parts: [
      { id: "mb-pcb", assembly: "pcb", name: "MiniBot Rev A PCB", specification: "KiCad schematic + PCB + netlist", quantity: "1", kind: "PCB", state: "verified", source: `${minibotSource}/tree/master/HARDWARE` },
      { id: "mb-attiny", assembly: "pcb", name: "ATTINY85-20PU", specification: "U1 · SO-8 208 mil footprint in source BOM", quantity: "1", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-motor", assembly: "drive", name: "VIBRATING-MOTOR 10MM 3V", specification: "CON1, CON2", quantity: "2", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-photo", assembly: "sense", name: "IR phototransistor L932P3BT", specification: "Q1–Q4", quantity: "4", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-led", assembly: "sense", name: "RED LED 3 mm", specification: "LED1–LED3", quantity: "3", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-battery", assembly: "power", name: "CR2032H holder", specification: "BAT1 · PTH", quantity: "1", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-lipo", assembly: "power", name: "DW02S LiPo connector", specification: "BAT_CON2", quantity: "1", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-fet", assembly: "drive", name: "WNM2016-3/TR", specification: "FET1, FET2 · SOT23", quantity: "2", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-r", assembly: "pcb", name: "1206 resistors", specification: "4.7 kΩ ×2; 180 Ω ×3", quantity: "5", kind: "BUY", state: "verified", source: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods` },
      { id: "mb-fw", assembly: "firmware", name: "MINIBOT firmware", specification: "source + minibot.hex + flash script", quantity: "1", kind: "SW", state: "verified", source: `${minibotSource}/tree/master/SOFTWARE` },
    ],
    evidence: [
      { label: "PCB", url: `${minibotSource}/tree/master/HARDWARE`, state: "verified", detail: "KiCad board、schematic、netlist 与 PDF" },
      { label: "BOM", url: `${minibotSource}/blob/master/HARDWARE/MiniBot_RevA_BOM.ods`, state: "verified", detail: "Rev A 设计位号与数量" },
      { label: "装配", url: `${minibotSource}/tree/master/ASSEMBLY`, state: "verified", detail: "ODT 与 PDF 装配说明" },
      { label: "软件", url: `${minibotSource}/tree/master/SOFTWARE`, state: "verified", detail: "GPL3 源码、hex 与烧录脚本" },
    ],
    gaps: ["Rev A BOM 没有供应商 SKU/MPN 列，designation 不能全部等同 exact MPN。", "Rev B 只见 schematic，未混入 Rev A BOM。", "PCB 即机体，项目没有独立机械 CAD 装配体。"],
  },
  {
    id: "ARM-FAZE4",
    name: "Faze4 Robotic Arm",
    category: "ROBOT_ARM",
    version: "BOM 2023-11-07",
    embodiment: "6-axis + gripper",
    // 这些项目此前继承了一个硬编码的 88（实为 Berkeley 的形态封顶值）。
    // 它们从未进过 OPEN_REPRO_V2，因此如实标注未评分，而不是借用别人的数字。
    reproduction: unscored(
      "NOT_YET_MODELED",
      "本条目为人工策展的证据工作台，尚未提交 OPEN_REPRO_V2 评分。",
    ),
    summary: "六轴 3D 打印机械臂，公开 961 件 BOM、URDF/STL、装配手册、电子接线与配电板文件。",
    repository: fazeSource,
    releaseBasis: "官方 BOM_7_11_2023.xlsx + Assembly instructions 3.1 + URDF",
    assemblies: [
      { id: "base", name: "J1 底座", description: "旋转底座与 NEMA 23", x: 50, y: 82, color: "#d3ea5c" },
      { id: "shoulder", name: "J2 / J3", description: "肩部、上臂与摆线减速", x: 46, y: 58, color: "#5aa9ff" },
      { id: "elbow", name: "J4", description: "肘部与同步带", x: 58, y: 39, color: "#35d0c8" },
      { id: "wrist", name: "J5 / J6", description: "腕部与末端轴", x: 72, y: 23, color: "#b98cff" },
      { id: "control", name: "控制柜", description: "驱动、配电 PCB、限位与线束", x: 18, y: 65, color: "#ffb454" },
    ],
    parts: [
      { id: "fz-print", assembly: "shoulder", name: "3D 打印件总计", specification: "官方 BOM 汇总", quantity: "197", kind: "PRINT", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-other", assembly: "base", name: "非打印件总计", specification: "螺钉、轴承、传动、电机等", quantity: "764", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-bearing", assembly: "shoulder", name: "Ball bearing 3×8×4", specification: "官方 BOM 最大单项", quantity: "200", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-nema23a", assembly: "base", name: "NEMA 23 stepper", specification: "0.9° · 2.8 A · 57×57×56 mm", quantity: "1", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-nema23b", assembly: "base", name: "NEMA 23 stepper", specification: "4 A · 57×57×84 mm", quantity: "1", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-nema23c", assembly: "shoulder", name: "NEMA 23 stepper", specification: "1.5 A · 57×57×56 mm", quantity: "1", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-nema17", assembly: "elbow", name: "NEMA 17 stepper", specification: "12 V · 42×42×40 mm", quantity: "2", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-nema14", assembly: "wrist", name: "NEMA 14 geared stepper", specification: "L=33 mm · 19:1 gearbox", quantity: "1", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-limit", assembly: "control", name: "Limit switches", specification: "micro ×3; roller ×2; inductive ×2", quantity: "7", kind: "BUY", state: "verified", source: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx` },
      { id: "fz-pcb", assembly: "control", name: "Faze4 distribution board V2", specification: "schematic + dimensions + STEP", quantity: "1", kind: "PCB", state: "verified", source: `${fazeSource}/tree/master/Faze4_DIST_board_v2_files` },
      { id: "fz-urdf", assembly: "wrist", name: "Faze4 URDF", specification: "7 STL link meshes + joint model", quantity: "1", kind: "SW", state: "verified", source: `${fazeSource}/tree/master/URDF_FAZE4` },
    ],
    evidence: [
      { label: "BOM", url: `${fazeSource}/blob/master/BOM_7_11_2023.xlsx`, state: "verified", detail: "961 件：197 打印件 + 764 非打印件" },
      { label: "装配手册", url: `${fazeSource}/blob/master/Assembly%20instructions%203.1.pdf`, state: "verified", detail: "版本 3.1 PDF" },
      { label: "URDF / STL", url: `${fazeSource}/tree/master/URDF_FAZE4`, state: "verified", detail: "七个 link mesh 与关节模型" },
      { label: "配电 PCB", url: `${fazeSource}/tree/master/Faze4_DIST_board_v2_files`, state: "verified", detail: "schematic、板尺寸与 STEP" },
    ],
    gaps: ["BOM 多数通用件只有规格和渠道链接，缺少制造商 exact MPN。", "3D 打印件在 BOM 中按实体数量计数，不能直接当作唯一文件数。", "采购价格与供应可用性未在冻结版本中统一维护。"],
  },
];

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

/**
 * Berkeley Humanoid Lite — the reference implementation. It has a dedicated
 * deep 3D explorer (`components/build-explorer/*`), so it is not part of the
 * generic list; `findProject` returns null for it and the shell renders the
 * deep workbench instead.
 *
 * Its 88 is *imported* from physical-ai, not re-derived here. 88 is also
 * `CLASS_CEILING.HUMANOID_FULL`, so the score sits exactly at its class
 * ceiling — which is why the basis is transcribed rather than recomputed.
 */
export const REFERENCE_PROJECT = {
  id: "HUM-BERKELEY-LITE",
  name: "Berkeley Humanoid Lite",
  category: "HUMANOID_FULL",
  embodiment: "FULL_22_DOF",
  reproduction: importedScore(
    88,
    "HIGH",
    "physical-ai · data/universe/projects-v0.1.json（HUM-BERKELEY-LITE）",
    [
      { dimension: "class_ceiling", points: 88, max: 88,
        detail: "HUMANOID_FULL 封顶 88；该项目达到其形态上限，故最终分等于封顶值。" },
      { dimension: "fabrication_design", points: 0, max: 22,
        detail: "逐维得分未在本仓库发布，此处不重构，避免与发布值产生分歧。" },
    ],
    { ceilingClass: "HUMANOID_FULL", gradedAt: "2026-09-18", model: "OPEN_REPRO_V2" },
  ),
} as const;

/** Hand-curated entries carried over from the reference workbench. */
export const CURATED_PROJECTS: WorkbenchProject[] = WORKBENCH_PROJECTS.map((p) => ({
  ...p,
  curated: true,
}));

/** Metadata for the switcher: enough to list and group, nothing more. */
export interface ProjectIndexEntry {
  id: string;
  name: string;
  category: string;
  reproduction: ReproductionScore;
  curated: boolean;
  deep: boolean;
  stars?: number;
}

export const ALL_PROJECTS: ProjectIndexEntry[] = [
  {
    id: REFERENCE_PROJECT.id,
    name: REFERENCE_PROJECT.name,
    category: REFERENCE_PROJECT.category,
    reproduction: REFERENCE_PROJECT.reproduction,
    curated: true,
    deep: true,
  },
  ...CURATED_PROJECTS.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    reproduction: p.reproduction,
    curated: true,
    deep: false,
    stars: p.stars,
  })),
  ...GENERATED_PROJECTS.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    reproduction: p.reproduction,
    curated: false,
    deep: false,
    stars: p.stars,
  })),
];

/** Returns the generic workbench data, or null when the project has a deep explorer. */
export function findProject(id: string): WorkbenchProject | null {
  return (
    CURATED_PROJECTS.find((p) => p.id === id) ??
    GENERATED_PROJECTS.find((p) => p.id === id) ??
    null
  );
}

/**
 * Counts computed from the registry rather than hard-coded, so the nav header
 * cannot claim "6 / 6" after the list changes.
 */
export const PROJECT_STATS = {
  total: ALL_PROJECTS.length,
  curated: ALL_PROJECTS.filter((p) => p.curated).length,
  generated: ALL_PROJECTS.filter((p) => !p.curated).length,
  deep: ALL_PROJECTS.filter((p) => p.deep).length,
  scored: ALL_PROJECTS.filter((p) => p.reproduction.state === "SCORED").length,
  unscored: ALL_PROJECTS.filter((p) => p.reproduction.state === "UNSCORED").length,
} as const;
