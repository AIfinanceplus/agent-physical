// 由 pipeline/score_reproduction.py 生成，勿手改。
// 证据重现度指数（ERI）：锚点 = Berkeley Humanoid Lite 参考实现 = 100。
// 每个维度的取值来自可复核的计数，锚点基准值由脚本解析得出，非人工填写。

export interface ScoreDimension {
  key: string; label: string; weight: number; unit: string;
  value: number; anchorValue: number; ratio: number | null;
  points: number | null; measured: boolean; detail: string;
  evidence: string[];
}
export interface EvidenceScore {
  score: number | null; anchorScore: number; measuredWeight: number;
  dimensions: ScoreDimension[]; flags: string[];
  repository: string; name: string;
}

export const EVIDENCE_SCORES: Record<string, EvidenceScore> = {
 "REPO-PENG-ZHIHUI-DUMMY-ROBOT": {
  "score": 12.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/peng-zhihui/Dummy-Robot/blob/HEAD/4.Model/Case%20v17.step",
     "https://github.com/peng-zhihui/Dummy-Robot/blob/HEAD/4.Model/Dummy%20v164.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/peng-zhihui/Dummy-Robot",
  "name": "Dummy-Robot"
 },
 "REPO-MAKERSPET-OOMWOO": {
  "score": 35.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 36.75,
    "anchorValue": 35.5,
    "ratio": 1.0094,
    "points": 22.21,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（49 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/makerspet/oomwoo/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/makerspet/oomwoo/blob/HEAD/docs/BUILD_INSTRUCTIONS.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/makerspet/oomwoo",
  "name": "oomwoo"
 },
 "REPO-NASA-JPL-OPEN-SOURCE-ROVER": {
  "score": 87.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 23,
    "anchorValue": 21.0,
    "ratio": 1.0281,
    "points": 24.68,
    "measured": true,
    "detail": "仓库树中 23 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/nasa-jpl/open-source-rover/blob/HEAD/electrical/pcb/control_board/3d_models/12_channel_servo_controller_headers.step",
     "https://github.com/nasa-jpl/open-source-rover/blob/HEAD/electrical/pcb/control_board/3d_models/1726750613.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 60.0,
    "anchorValue": 35.5,
    "ratio": 1.1428,
    "points": 25.14,
    "measured": true,
    "detail": "最佳 BOM：parts_list/parts_list.csv（60 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/nasa-jpl/open-source-rover/HEAD/parts_list/parts_list.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 7,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 7 个",
    "evidence": [
     "https://github.com/nasa-jpl/open-source-rover/blob/HEAD/electrical/pcb/control_board/Brain_Board.kicad_sch",
     "https://github.com/nasa-jpl/open-source-rover/blob/HEAD/electrical/pcb/control_board/Control_Boards.kicad_pcb"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/nasa-jpl/open-source-rover",
  "name": "open-source-rover"
 },
 "REPO-THEROBOTSTUDIO-SO-ARM100": {
  "score": 46.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 36,
    "anchorValue": 21.0,
    "ratio": 1.1682,
    "points": 28.04,
    "measured": true,
    "detail": "仓库树中 36 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/TheRobotStudio/SO-ARM100/blob/HEAD/Optional/4040_Base_Mount/step/4040_base_mount.step",
     "https://github.com/TheRobotStudio/SO-ARM100/blob/HEAD/Optional/SO101_Wrist_Cam_Hex-Nut_Mount_32x32_UVC_Module/stl/SO-ARM101_camera_wrist_mount.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 4,
    "anchorValue": 12.0,
    "ratio": 0.6275,
    "points": 8.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 4 个",
    "evidence": [
     "https://github.com/TheRobotStudio/SO-ARM100/blob/HEAD/Simulation/SO100/so100.urdf",
     "https://github.com/TheRobotStudio/SO-ARM100/blob/HEAD/Simulation/SO101/so101_new_calib.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/TheRobotStudio/SO-ARM100",
  "name": "SO-ARM100"
 },
 "REPO-VECTOR-WANGEL-XLEROBOT": {
  "score": 63.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 34,
    "anchorValue": 21.0,
    "ratio": 1.1502,
    "points": 27.61,
    "measured": true,
    "detail": "仓库树中 34 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/hardware/high_torque_robotics/ht_board_holder_corner.step",
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/hardware/high_torque_robotics/ht_gripper_cam_connector_original.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 45,
    "anchorValue": 26.0,
    "ratio": 1.1617,
    "points": 18.59,
    "measured": true,
    "detail": "装配/构建类文档 45 份",
    "evidence": [
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/docs/en/source/_build/html/_sources/hardware/getting_started/3d.md.txt",
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/docs/en/source/_build/html/_sources/hardware/getting_started/assemble.md.txt"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 3,
    "anchorValue": 12.0,
    "ratio": 0.5405,
    "points": 7.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 3 个",
    "evidence": [
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/simulation/Maniskill/assets/xlerobot/xlerobot.srdf",
     "https://github.com/Vector-Wangel/XLeRobot/blob/HEAD/simulation/Maniskill/assets/xlerobot/xlerobot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Vector-Wangel/XLeRobot",
  "name": "XLeRobot"
 },
 "REPO-DORIANBORIAN-SESAME-ROBOT": {
  "score": 40.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/dorianborian/sesame-robot/blob/HEAD/hardware/cad/Sesame-ESP32-v122.f3z",
     "https://github.com/dorianborian/sesame-robot/blob/HEAD/hardware/cad/Sesame-ESP32-v122.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 37.0,
    "anchorValue": 35.5,
    "ratio": 1.0112,
    "points": 22.25,
    "measured": true,
    "detail": "最佳 BOM：hardware/pcb/distro-v3.1/BOM_Sesame-Distro-Board-V3.1.csv（37 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/dorianborian/sesame-robot/HEAD/hardware/pcb/distro-v3.1/BOM_Sesame-Distro-Board-V3.1.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/dorianborian/sesame-robot",
  "name": "sesame-robot"
 },
 "REPO-SEEED-PROJECTS-REBOT-DEVARM": {
  "score": 52.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 106,
    "anchorValue": 21.0,
    "ratio": 1.5117,
    "points": 36.28,
    "measured": true,
    "detail": "仓库树中 106 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Seeed-Projects/reBot-DevArm/blob/HEAD/hardware/reBot_B601_DM/3D_Printed_Parts/01_Arm_Handle.step",
     "https://github.com/Seeed-Projects/reBot-DevArm/blob/HEAD/hardware/reBot_B601_DM/3D_Printed_Parts/01_BASE_Link.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/Seeed-Projects/reBot-DevArm/blob/HEAD/Rebot_Arm_description/DM/urdf/ReBot_Arm_DM.urdf",
     "https://github.com/Seeed-Projects/reBot-DevArm/blob/HEAD/Rebot_Arm_description/RS/urdf/ReBot_Arm_RS.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-W-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Seeed-Projects/reBot-DevArm",
  "name": "reBot-DevArm"
 },
 "REPO-APIRRONE-OPEN_DUCK_MINI": {
  "score": 31.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/apirrone/Open_Duck_Mini/blob/HEAD/print/mods/Justins_Park_Head_Mod/Open_Duck_Mini_ParkHead%20A1_MINI_VERSION%20v2%20v1.step",
     "https://github.com/apirrone/Open_Duck_Mini/blob/HEAD/print/mods/Justins_Park_Head_Mod/Open_Duck_Mini_ParkHead.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/apirrone/Open_Duck_Mini/blob/HEAD/docs/assembly_guide.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/apirrone/Open_Duck_Mini/blob/HEAD/mini_bdx/robots/bdx/robot.urdf",
     "https://github.com/apirrone/Open_Duck_Mini/blob/HEAD/mini_bdx/robots/open_duck_mini_v2/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/apirrone/Open_Duck_Mini",
  "name": "Open_Duck_Mini"
 },
 "REPO-OB-F-OPENBOT": {
  "score": 63.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 53,
    "anchorValue": 21.0,
    "ratio": 1.2905,
    "points": 30.97,
    "measured": true,
    "detail": "仓库树中 53 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ob-f/OpenBot/blob/HEAD/body/diy/cad/block_body/block_body_bottom.step",
     "https://github.com/ob-f/OpenBot/blob/HEAD/body/diy/cad/block_body/block_body_top.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 36.0,
    "anchorValue": 35.5,
    "ratio": 1.0038,
    "points": 22.08,
    "measured": true,
    "detail": "最佳 BOM：body/rtr/pcb/BOM_BaseBoard_Arduino_V1C.csv（36 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/ob-f/OpenBot/HEAD/body/rtr/pcb/BOM_BaseBoard_Arduino_V1C.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ob-f/OpenBot",
  "name": "OpenBot"
 },
 "REPO-ENACTIC-OPENARM": {
  "score": 16.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.75,
    "anchorValue": 35.5,
    "ratio": 0.1556,
    "points": 3.42,
    "measured": true,
    "detail": "最佳 BOM：website/static/file/hardware/bill-of-materials/electrical/bom-for-hub.csv（1 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/enactic/openarm/HEAD/website/static/file/hardware/bill-of-materials/electrical/bom-for-hub.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/enactic/openarm/blob/HEAD/website/versioned_docs/version-1.0/getting-started/contribute.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/enactic/openarm",
  "name": "openarm"
 },
 "REPO-ALEXANDERKOCH-KOCH-LOW_COST_ROBOT": {
  "score": 35.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 16,
    "anchorValue": 21.0,
    "ratio": 0.9166,
    "points": 22.0,
    "measured": true,
    "detail": "仓库树中 16 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AlexanderKoch-Koch/low_cost_robot/blob/HEAD/hardware/follower/follower_arm.f3z",
     "https://github.com/AlexanderKoch-Koch/low_cost_robot/blob/HEAD/hardware/follower/step/arm.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/AlexanderKoch-Koch/low_cost_robot/blob/HEAD/simulation/low_cost_robot/low-cost-arm.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AlexanderKoch-Koch/low_cost_robot",
  "name": "low_cost_robot"
 },
 "REPO-NVIDIA-AI-IOT-JETBOT": {
  "score": 28.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/NVIDIA-AI-IOT/jetbot/blob/HEAD/assets/camera_mount.iges",
     "https://github.com/NVIDIA-AI-IOT/jetbot/blob/HEAD/assets/camera_mount.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/NVIDIA-AI-IOT/jetbot/blob/HEAD/docs/getting_started.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/NVIDIA-AI-IOT/jetbot",
  "name": "jetbot"
 },
 "REPO-SOURCE-ROBOTICS-PAROL6-DESKTOP-ROBOT-ARM": {
  "score": 44.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm/blob/HEAD/STL/mounting%20plates/big_base.STEP",
     "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm/blob/HEAD/STL/mounting%20plates/small_base.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 12.0,
    "anchorValue": 35.5,
    "ratio": 0.713,
    "points": 15.69,
    "measured": true,
    "detail": "最佳 BOM：BOM/BOM.md（24 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/Source-Robotics/PAROL6-Desktop-robot-arm/HEAD/BOM/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm/blob/HEAD/Building%20instructions/PETG_printing.md",
     "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm/blob/HEAD/Building%20instructions/Parol%20building%20instructions.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm/blob/HEAD/PAROL6_URDF/PAROL6/urdf/PAROL6.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm",
  "name": "PAROL6-Desktop-robot-arm"
 },
 "REPO-ILIASAM-OPENSIMPLELIDAR": {
  "score": 63.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/iliasam/OpenSimpleLidar/blob/HEAD/Mechanics/3D_models/holder_v1.0.stp",
     "https://github.com/iliasam/OpenSimpleLidar/blob/HEAD/Mechanics/3D_models/laser_holder1_step.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 7.5,
    "anchorValue": 35.5,
    "ratio": 0.5949,
    "points": 13.09,
    "measured": true,
    "detail": "最佳 BOM：PCB/CommonPCB_v1.1M/PCB_BOM.xlsx（30 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/iliasam/OpenSimpleLidar/HEAD/PCB/CommonPCB_v1.1M/PCB_BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 4,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 4 个",
    "evidence": [
     "https://github.com/iliasam/OpenSimpleLidar/blob/HEAD/PCB/SplittedPCB_v1.0_and_v1.1/MotorPCB_v1.0/PCB/motor_pcb2_copper_bottom.gbr",
     "https://github.com/iliasam/OpenSimpleLidar/blob/HEAD/PCB/SplittedPCB_v1.0_and_v1.1/MotorPCB_v1.0/PCB/motor_pcb2_silkscreen_bottom.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/iliasam/OpenSimpleLidar",
  "name": "OpenSimpleLidar"
 },
 "REPO-ROBOPARTY-ROBOTO_ORIGIN": {
  "score": 102.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 375,
    "anchorValue": 21.0,
    "ratio": 1.9183,
    "points": 46.04,
    "measured": true,
    "detail": "仓库树中 375 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Roboparty/roboto_origin/blob/HEAD/modules/rpo_hardware/V1.0/atom01_mechanic/01_SW_Project/01总标定件/大腿后侧标定，数量1.STEP",
     "https://github.com/Roboparty/roboto_origin/blob/HEAD/modules/rpo_hardware/V1.0/atom01_mechanic/01_SW_Project/01总标定件/大腿定位块，数量2.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 52.5,
    "anchorValue": 35.5,
    "ratio": 1.1063,
    "points": 24.34,
    "measured": true,
    "detail": "最佳 BOM：modules/rpo_hardware/V2.0/roboto_origin_pcb/02_Assembly/BOM_三合一V2.1_RBE_PWR_HUB_V2.1_2026-04-09.xlsx（70 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/Roboparty/roboto_origin/HEAD/modules/rpo_hardware/V2.0/roboto_origin_pcb/02_Assembly/BOM_%E4%B8%89%E5%90%88%E4%B8%80V2.1_RBE_PWR_HUB_V2.1_2026-04-09.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/Roboparty/roboto_origin/blob/HEAD/modules/rpo_hardware/V1.0/atom01_mechanic/00_Docs/Assembly_Guide_v1.14.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 31,
    "anchorValue": 12.0,
    "ratio": 1.3512,
    "points": 18.92,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 31 个",
    "evidence": [
     "https://github.com/Roboparty/roboto_origin/blob/HEAD/modules/roboparty_deploy/src/camera/thirdparty/realsense-ros/realsense2_description/urdf/_d405.urdf.xacro",
     "https://github.com/Roboparty/roboto_origin/blob/HEAD/modules/roboparty_deploy/src/camera/thirdparty/realsense-ros/realsense2_description/urdf/_d415.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Roboparty/roboto_origin",
  "name": "roboto_origin"
 },
 "REPO-ZJU-FAST-LAB-FAST-DRONE-250": {
  "score": 25.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ZJU-FAST-Lab/Fast-Drone-250/blob/HEAD/carbon_board/底板.STEP",
     "https://github.com/ZJU-FAST-Lab/Fast-Drone-250/blob/HEAD/carbon_board/顶板.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 23,
    "anchorValue": 12.0,
    "ratio": 1.239,
    "points": 17.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 23 个",
    "evidence": [
     "https://github.com/ZJU-FAST-Lab/Fast-Drone-250/blob/HEAD/src/realflight_modules/realsense-ros/realsense2_description/tests/dual_d415.xacro",
     "https://github.com/ZJU-FAST-Lab/Fast-Drone-250/blob/HEAD/src/realflight_modules/realsense-ros/realsense2_description/tests/dual_d435.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ZJU-FAST-Lab/Fast-Drone-250",
  "name": "Fast-Drone-250"
 },
 "REPO-POLLEN-ROBOTICS-AMAZINGHAND": {
  "score": 37.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 20,
    "anchorValue": 21.0,
    "ratio": 0.985,
    "points": 23.64,
    "measured": true,
    "detail": "仓库树中 20 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/pollen-robotics/AmazingHand/blob/HEAD/cad/step/Amazing%20Hand%20Parts%20-%20Distal.step",
     "https://github.com/pollen-robotics/AmazingHand/blob/HEAD/cad/step/Amazing%20Hand%20Parts%20-%20Distal_Shell.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/pollen-robotics/AmazingHand/blob/HEAD/docs/AmazingHand_Assembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pollen-robotics/AmazingHand",
  "name": "AmazingHand"
 },
 "REPO-CHVMP-CHAMP": {
  "score": 21.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 7,
    "anchorValue": 12.0,
    "ratio": 0.8107,
    "points": 11.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 7 个",
    "evidence": [
     "https://github.com/chvmp/champ/blob/HEAD/champ_description/urdf/accessories.urdf.xacro",
     "https://github.com/chvmp/champ/blob/HEAD/champ_description/urdf/champ.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/chvmp/champ",
  "name": "champ"
 },
 "REPO-BCN3D-BCN3D-MOVEO": {
  "score": 49.9,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 110,
    "anchorValue": 21.0,
    "ratio": 1.5236,
    "points": 36.57,
    "measured": true,
    "detail": "仓库树中 110 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/BCN3D/BCN3D-Moveo/blob/HEAD/CAD%20files/1M1B.SLDPRT",
     "https://github.com/BCN3D/BCN3D-Moveo/blob/HEAD/CAD%20files/1M2A.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 1 份 BOM，但格式无法解析（PDF 二进制，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/BCN3D/BCN3D-Moveo/blob/HEAD/USER%20MANUAL/User%20Manual%20BCN3D%20Moveo.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/BCN3D/BCN3D-Moveo",
  "name": "BCN3D-Moveo"
 },
 "REPO-OKALACHEV-FLIX": {
  "score": 15.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/okalachev/flix/blob/HEAD/docs/assets/esp32-holder.step",
     "https://github.com/okalachev/flix/blob/HEAD/docs/assets/flix-frame-1.1.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/okalachev/flix/blob/HEAD/docs/assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/okalachev/flix",
  "name": "flix"
 },
 "REPO-SKYTHINKER616-FOC-WHEEL-LEGGED-ROBOT": {
  "score": 35.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 26,
    "anchorValue": 21.0,
    "ratio": 1.0663,
    "points": 25.59,
    "measured": true,
    "detail": "仓库树中 26 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Skythinker616/foc-wheel-legged-robot/blob/HEAD/solidworks/2804电机.SLDPRT",
     "https://github.com/Skythinker616/foc-wheel-legged-robot/blob/HEAD/solidworks/4010电机.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Skythinker616/foc-wheel-legged-robot",
  "name": "foc-wheel-legged-robot"
 },
 "REPO-STACK-CHAN-STACK-CHAN": {
  "score": 72.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 36,
    "anchorValue": 21.0,
    "ratio": 1.1682,
    "points": 28.04,
    "measured": true,
    "detail": "仓库树中 36 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/stack-chan/stack-chan/blob/HEAD/case/backpack/backpack_400mah.step",
     "https://github.com/stack-chan/stack-chan/blob/HEAD/case/backpack/backpack_640mah.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/stack-chan/stack-chan/blob/HEAD/firmware/docs/getting-started.md",
     "https://github.com/stack-chan/stack-chan/blob/HEAD/firmware/docs/getting-started_ja.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 4,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 4 个",
    "evidence": [
     "https://github.com/stack-chan/stack-chan/blob/HEAD/schematics/m5-pantilt/gerber/m5-pantilt-NPTH.drl",
     "https://github.com/stack-chan/stack-chan/blob/HEAD/schematics/m5-pantilt/gerber/m5-pantilt-PTH.drl"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/stack-chan/stack-chan",
  "name": "stack-chan"
 },
 "REPO-ROBIN-SHAUN-XTDRONE": {
  "score": 47.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/robin-shaun/XTDrone/blob/HEAD/sitl_config/ugv/catvehicle/meshes/sensors/HDL32E_Outline_Model.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/robin-shaun/XTDrone/blob/HEAD/sensing/slam/vslam/ORB_SLAM3/Calibration_Tutorial.pdf",
     "https://github.com/robin-shaun/XTDrone/blob/HEAD/sitl_config/ugv/sicktoolbox/manuals/sicktoolbox-RS-422.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 98,
    "anchorValue": 12.0,
    "ratio": 1.7915,
    "points": 25.08,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 98 个",
    "evidence": [
     "https://github.com/robin-shaun/XTDrone/blob/HEAD/sitl_config/gazebo_plugin/velodyne/velodyne_description/urdf/HDL-32E.urdf.xacro",
     "https://github.com/robin-shaun/XTDrone/blob/HEAD/sitl_config/gazebo_plugin/velodyne/velodyne_description/urdf/VLP-16.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/robin-shaun/XTDrone",
  "name": "XTDrone"
 },
 "REPO-VORONDESIGN-VORON-0": {
  "score": 40.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 30,
    "anchorValue": 21.0,
    "ratio": 1.1109,
    "points": 26.66,
    "measured": true,
    "detail": "仓库树中 30 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/VoronDesign/Voron-0/blob/HEAD/CAD/ADXL_Mounts/MiniSB_adxl_mount_adafruit_19mm_c_c.step",
     "https://github.com/VoronDesign/Voron-0/blob/HEAD/CAD/ADXL_Mounts/MiniSB_adxl_mount_adafruit_LIS3DH.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/VoronDesign/Voron-0/blob/HEAD/Manuals/VORON_V0.2r1_Assembly_Manual.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/VoronDesign/Voron-0",
  "name": "Voron-0"
 },
 "REPO-ANGELLM-THOR": {
  "score": 49.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 151,
    "anchorValue": 21.0,
    "ratio": 1.6253,
    "points": 39.01,
    "measured": true,
    "detail": "仓库树中 151 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AngelLM/Thor/blob/HEAD/freecad-src/Art1Body.fcstd",
     "https://github.com/AngelLM/Thor/blob/HEAD/freecad-src/Art1Bot.fcstd"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CC-BY-SA-4.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AngelLM/Thor",
  "name": "Thor"
 },
 "REPO-SKYENTIFICGIT-SMALLROBOTARM": {
  "score": 35.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 16,
    "anchorValue": 21.0,
    "ratio": 0.9166,
    "points": 22.0,
    "measured": true,
    "detail": "仓库树中 16 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/SkyentificGit/SmallRobotArm/blob/HEAD/Axis/Axis1tube.f3d",
     "https://github.com/SkyentificGit/SmallRobotArm/blob/HEAD/Axis/Axis1tube.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/SkyentificGit/SmallRobotArm/blob/HEAD/SmallRobotArmMechanicalAssembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/SkyentificGit/SmallRobotArm",
  "name": "SmallRobotArm"
 },
 "REPO-OPEN-DYNAMIC-ROBOT-INITIATIVE-OPEN_ROBOT_ACTUATOR_HARDWARE": {
  "score": 69.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 11,
    "anchorValue": 21.0,
    "ratio": 0.8039,
    "points": 19.29,
    "measured": true,
    "detail": "仓库树中 11 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/mechanics/actuator_module_v1/step_files/motor_antigravity_4004_custom_shaft.STEP",
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/mechanics/actuator_module_v1/step_files/transmission_pulley_at3_t10_center.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 6.5,
    "anchorValue": 35.5,
    "ratio": 0.5601,
    "points": 12.32,
    "measured": true,
    "detail": "最佳 BOM：mechanics/foot_contact_switch_v1/documentation/bom_foot_contact_switch_v1.xlsx（13 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/HEAD/mechanics/foot_contact_switch_v1/documentation/bom_foot_contact_switch_v1.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/mechanics/actuator_module_v1/details/details_actuator_module_assembly.md",
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/mechanics/actuator_module_v1/details/details_encoder_kit_disassembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/electronics/micro_driver_electronics/eagle_design_files/microDriver_v2.brd",
     "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware/blob/HEAD/electronics/micro_driver_electronics/eagle_design_files/microDriver_v2.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/open-dynamic-robot-initiative/open_robot_actuator_hardware",
  "name": "open_robot_actuator_hardware"
 },
 "REPO-SIGROBOTICS-UIUC-LEKIWI": {
  "score": 39.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/SIGRobotics-UIUC/LeKiwi/blob/HEAD/3DPrintMeshes/webcam_mount/webcam_mount.step",
     "https://github.com/SIGRobotics-UIUC/LeKiwi/blob/HEAD/3DPrintMeshes/webcam_mount/webcam_mount_wrist.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 6.0,
    "anchorValue": 35.5,
    "ratio": 0.5409,
    "points": 11.9,
    "measured": true,
    "detail": "最佳 BOM：DynamixelLeKiwi/BOM.md（6 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/SIGRobotics-UIUC/LeKiwi/HEAD/DynamixelLeKiwi/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/SIGRobotics-UIUC/LeKiwi/blob/HEAD/Assembly.md",
     "https://github.com/SIGRobotics-UIUC/LeKiwi/blob/HEAD/DynamixelLeKiwi/Assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/SIGRobotics-UIUC/LeKiwi/blob/HEAD/URDF/LeKiwi.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/SIGRobotics-UIUC/LeKiwi",
  "name": "LeKiwi"
 },
 "REPO-MENLORESEARCH-ASIMOV-1": {
  "score": 85.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 180,
    "anchorValue": 21.0,
    "ratio": 1.6818,
    "points": 40.36,
    "measured": true,
    "detail": "仓库树中 180 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/menloresearch/asimov-1/blob/HEAD/electrical/media/hat/board/lcsc_lib.3dshapes/BUZ-SMD_L9.6-W9.6-H5.0.step",
     "https://github.com/menloresearch/asimov-1/blob/HEAD/electrical/media/hat/board/lcsc_lib.3dshapes/HDR-TH_40P-P2.54-V-F-R2-C20-S2.54-2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/menloresearch/asimov-1/blob/HEAD/mechanical/ASV1/Docs/ASV1_Bearings_Assembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 15,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 15 个",
    "evidence": [
     "https://github.com/menloresearch/asimov-1/blob/HEAD/electrical/media/hat/board/board.kicad_pcb",
     "https://github.com/menloresearch/asimov-1/blob/HEAD/electrical/media/hat/board/board.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/menloresearch/asimov-1/blob/HEAD/sim-model/urdf/asimov_1.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-S-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/menloresearch/asimov-1",
  "name": "asimov-1"
 },
 "REPO-CHENGXUXIN-EXTREME-PARKOUR": {
  "score": 17.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 7,
    "anchorValue": 12.0,
    "ratio": 0.8107,
    "points": 11.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 7 个",
    "evidence": [
     "https://github.com/chengxuxin/extreme-parkour/blob/HEAD/legged_gym/resources/robots/a1/urdf/a1.urdf",
     "https://github.com/chengxuxin/extreme-parkour/blob/HEAD/legged_gym/resources/robots/a1/urdf/a1_old.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/chengxuxin/extreme-parkour",
  "name": "extreme-parkour"
 },
 "REPO-AGIBOTTECH-AGIBOT_X1_HARDWARE": {
  "score": 30.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 138.0,
    "anchorValue": 35.5,
    "ratio": 1.3717,
    "points": 30.18,
    "measured": true,
    "detail": "最佳 BOM：智元灵犀X1_20241024/智元灵犀X1_BOM清单_20241024.xlsx（184 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/AgibotTech/agibot_x1_hardware/HEAD/%E6%99%BA%E5%85%83%E7%81%B5%E7%8A%80X1_20241024/%E6%99%BA%E5%85%83%E7%81%B5%E7%8A%80X1_BOM%E6%B8%85%E5%8D%95_20241024.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AgibotTech/agibot_x1_hardware",
  "name": "agibot_x1_hardware"
 },
 "REPO-POPPY-PROJECT-POPPY-HUMANOID": {
  "score": 9.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/poppy-project/poppy-humanoid/blob/HEAD/hardware/Poppy_Humanoid.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/poppy-project/poppy-humanoid/blob/HEAD/hardware/URDF/robots/Poppy_Humanoid.URDF"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/poppy-project/poppy-humanoid",
  "name": "poppy-humanoid"
 },
 "REPO-LIYITENG-ALOHAMINI": {
  "score": 68.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 49,
    "anchorValue": 21.0,
    "ratio": 1.2656,
    "points": 30.37,
    "measured": true,
    "detail": "仓库树中 49 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini1/hardware/mobile_base/step/OB_Chassis_Bearing_Cover.stp",
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini1/hardware/mobile_base/step/OB_Chassis_Servo_Mount.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 11.0,
    "anchorValue": 35.5,
    "ratio": 0.6908,
    "points": 15.2,
    "measured": true,
    "detail": "最佳 BOM：AlohaMini2/docs/BOM.md（22 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/liyiteng/AlohaMini/HEAD/AlohaMini2/docs/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini1/docs/hardware_assembly.md",
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini2/docs/assembly_guide.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 3,
    "anchorValue": 12.0,
    "ratio": 0.5405,
    "points": 7.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 3 个",
    "evidence": [
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini1/simulation/src/Aloha/urdf/Aloha.urdf",
     "https://github.com/liyiteng/AlohaMini/blob/HEAD/AlohaMini2/urdf/alohamini2/urdf/alohamini2.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/liyiteng/AlohaMini",
  "name": "AlohaMini"
 },
 "REPO-AI-FANGE-MICRODUCK-BUILD-TUTORIAL": {
  "score": 32.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 10,
    "anchorValue": 21.0,
    "ratio": 0.7758,
    "points": 18.62,
    "measured": true,
    "detail": "仓库树中 10 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AI-FanGe/Microduck-build-tutorial/blob/HEAD/microduck/src/model/mjcf/assets/ankle_dbl_block__configuration_right.scad",
     "https://github.com/AI-FanGe/Microduck-build-tutorial/blob/HEAD/microduck/src/model/mjcf/assets/femur__configuration_left.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/AI-FanGe/Microduck-build-tutorial/blob/HEAD/microduck/src/model/urdf/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AI-FanGe/Microduck-build-tutorial",
  "name": "Microduck-build-tutorial"
 },
 "REPO-TIMQIAN-BAMBOT": {
  "score": 20.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 6,
    "anchorValue": 12.0,
    "ratio": 0.7587,
    "points": 10.62,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 6 个",
    "evidence": [
     "https://github.com/timqian/bambot/blob/HEAD/website/public/URDFs/bambot_v0.urdf",
     "https://github.com/timqian/bambot/blob/HEAD/website/public/URDFs/bambot_v0_base.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/timqian/bambot",
  "name": "bambot"
 },
 "REPO-CHESTNUT-ROBOTICS-AERO-HAND-OPEN": {
  "score": 94.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 28,
    "anchorValue": 21.0,
    "ratio": 1.0894,
    "points": 26.14,
    "measured": true,
    "detail": "仓库树中 28 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/CAD/Aero_Hand_Open_Left.stp",
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/CAD/Aero_Hand_Open_Right.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 40.5,
    "anchorValue": 35.5,
    "ratio": 1.0357,
    "points": 22.79,
    "measured": true,
    "detail": "最佳 BOM：hardware/Assembly/BOM.csv（54 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/Chestnut-Robotics/aero-hand-open/HEAD/hardware/Assembly/BOM.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/CAD/mount_adapters/Adapter_Assembly_Instructions.pdf",
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/Gen1_OPEN_Assembly_Guide.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 4,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 4 个",
    "evidence": [
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/PCB/Aero_hand_open_left/Aero-Hand-Open-Left.kicad_pcb",
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/hardware/PCB/Aero_hand_open_left/Aero-Hand-Open-Left.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/ros2/src/aero_hand_open_description/urdf/aero_hand_open_left.urdf",
     "https://github.com/Chestnut-Robotics/aero-hand-open/blob/HEAD/ros2/src/aero_hand_open_description/urdf/aero_hand_open_right.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Chestnut-Robotics/aero-hand-open",
  "name": "aero-hand-open"
 },
 "REPO-FANHAO375-MICRODUCK-REPLICA": {
  "score": 25.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/fanhao375/microduck-replica/blob/HEAD/hardware/imu_to_dxl/imu_to_dxl-PCB.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 8.5,
    "anchorValue": 35.5,
    "ratio": 0.6258,
    "points": 13.77,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（17 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/fanhao375/microduck-replica/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/fanhao375/microduck-replica",
  "name": "microduck-replica"
 },
 "REPO-SOURCE-ROBOTICS-FAZE4-ROBOTIC-ARM": {
  "score": 43.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Source-Robotics/Faze4-Robotic-arm/blob/HEAD/Faze4_DIST_board_v2_files/Faze4_dist_v2_STEP.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 20.0,
    "anchorValue": 35.5,
    "ratio": 0.8463,
    "points": 18.62,
    "measured": true,
    "detail": "最佳 BOM：BOM_7_11_2023.xlsx（40 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/Source-Robotics/Faze4-Robotic-arm/HEAD/BOM_7_11_2023.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/Source-Robotics/Faze4-Robotic-arm/blob/HEAD/Assembly%20instructions%203.1.pdf",
     "https://github.com/Source-Robotics/Faze4-Robotic-arm/blob/HEAD/URDF_FAZE4/urdf/Final_light_assembly_URDF.urdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/Source-Robotics/Faze4-Robotic-arm/blob/HEAD/URDF_FAZE4/urdf/Final_light_assembly_URDF.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-S-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Source-Robotics/Faze4-Robotic-arm",
  "name": "Faze4-Robotic-arm"
 },
 "REPO-THEROBOTSTUDIO-HOPEJR": {
  "score": 36.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/TheRobotStudio/HOPEJr/blob/HEAD/Arm/STEP/arm.step",
     "https://github.com/TheRobotStudio/HOPEJr/blob/HEAD/Arm/STEP/exoskeleton.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 17.5,
    "anchorValue": 35.5,
    "ratio": 0.8111,
    "points": 17.84,
    "measured": true,
    "detail": "最佳 BOM：Humanoid/3dprint files/Second_Arm_Draft/BOM（35 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/TheRobotStudio/HOPEJr/HEAD/Humanoid/3dprint%20files/Second_Arm_Draft/BOM"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/TheRobotStudio/HOPEJr/blob/HEAD/Humanoid/URDF/Right_Leg/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/TheRobotStudio/HOPEJr",
  "name": "HOPEJr"
 },
 "REPO-ROBOT-LEARNING-CO-TRLC-DK1": {
  "score": 22.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/robot-learning-co/trlc-dk1/blob/HEAD/hardware/TRLC-DK1-Follower_v0.3.0.step",
     "https://github.com/robot-learning-co/trlc-dk1/blob/HEAD/hardware/light_box/TRLC-Light-Box_v0.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/robot-learning-co/trlc-dk1/blob/HEAD/urdf/follower/TRLC-DK1-Follower.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/robot-learning-co/trlc-dk1",
  "name": "trlc-dk1"
 },
 "REPO-HSHI74-TODDLERBOT": {
  "score": 44.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 14.0,
    "anchorValue": 35.5,
    "ratio": 0.7528,
    "points": 16.56,
    "measured": true,
    "detail": "最佳 BOM：docs/_static/bom_v8.csv（28 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/hshi74/toddlerbot/HEAD/docs/_static/bom_v8.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/hshi74/toddlerbot/blob/HEAD/docs/_static/assembly_manual.pdf",
     "https://github.com/hshi74/toddlerbot/blob/HEAD/docs/hardware/04_assembly_manual.rst"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 9,
    "anchorValue": 12.0,
    "ratio": 0.8977,
    "points": 12.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 9 个",
    "evidence": [
     "https://github.com/hshi74/toddlerbot/blob/HEAD/toddlerbot/descriptions/sysID_2XC430/sysID_2XC430.urdf",
     "https://github.com/hshi74/toddlerbot/blob/HEAD/toddlerbot/descriptions/sysID_2XL430/sysID_2XL430.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/hshi74/toddlerbot",
  "name": "toddlerbot"
 },
 "REPO-PENG-ZHIHUI-ONE-ROBOT": {
  "score": 5.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/peng-zhihui/ONE-Robot/blob/HEAD/Hardware/3D-model.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/peng-zhihui/ONE-Robot",
  "name": "ONE-Robot"
 },
 "REPO-JESS-MOSS-KOCH-V1-1": {
  "score": 40.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 51,
    "anchorValue": 21.0,
    "ratio": 1.2783,
    "points": 30.68,
    "measured": true,
    "detail": "仓库树中 51 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jess-moss/koch-v1-1/blob/HEAD/hardware/extras/SolidWorks/HuggingFace_Block.SLDPRT",
     "https://github.com/jess-moss/koch-v1-1/blob/HEAD/hardware/extras/SolidWorks/LeRobot_Block.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jess-moss/koch-v1-1",
  "name": "koch-v1-1"
 },
 "REPO-AAEDMUSA-CAPSTAN-DRIVE": {
  "score": 35.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 9,
    "anchorValue": 21.0,
    "ratio": 0.7449,
    "points": 17.88,
    "measured": true,
    "detail": "仓库树中 9 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/aaedmusa/Capstan-Drive/blob/HEAD/STEP%20Files/Assembly_Jig.stp",
     "https://github.com/aaedmusa/Capstan-Drive/blob/HEAD/STEP%20Files/Base_Plate.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 16.5,
    "anchorValue": 35.5,
    "ratio": 0.7956,
    "points": 17.5,
    "measured": true,
    "detail": "最佳 BOM：Capstan Drive Test Stand BOM.xlsx（22 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/aaedmusa/Capstan-Drive/HEAD/Capstan%20Drive%20Test%20Stand%20BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/aaedmusa/Capstan-Drive",
  "name": "Capstan-Drive"
 },
 "REPO-NORMA-CORE-NORMA-CORE": {
  "score": 52.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 39,
    "anchorValue": 21.0,
    "ratio": 1.1934,
    "points": 28.64,
    "measured": true,
    "detail": "仓库树中 39 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/norma-core/norma-core/blob/HEAD/hardware/elrobot/STEP/ElRobot.stp",
     "https://github.com/norma-core/norma-core/blob/HEAD/hardware/elrobot/STEP/case_for_seedstudio/ss_enclosure_case.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/norma-core/norma-core/blob/HEAD/hardware/elrobot/manual-follower.pdf",
     "https://github.com/norma-core/norma-core/blob/HEAD/hardware/elrobot/manual-leader.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 4,
    "anchorValue": 12.0,
    "ratio": 0.6275,
    "points": 8.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 4 个",
    "evidence": [
     "https://github.com/norma-core/norma-core/blob/HEAD/hardware/elrobot/simulation/elrobot_follower.urdf",
     "https://github.com/norma-core/norma-core/blob/HEAD/software/station/clients/station-viewer/public/devices/elrobot/elrobot_follower.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/norma-core/norma-core",
  "name": "norma-core"
 },
 "REPO-HUMANCOMPUTERLAB-LELAMP": {
  "score": 27.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/humancomputerlab/LeLamp/blob/HEAD/docs/assets/step/PiZero2W.STEP",
     "https://github.com/humancomputerlab/LeLamp/blob/HEAD/docs/assets/step/ST3215.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/humancomputerlab/LeLamp/blob/HEAD/docs/3.%20LeLamp%20Assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/humancomputerlab/LeLamp/blob/HEAD/simulation/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/humancomputerlab/LeLamp",
  "name": "LeLamp"
 },
 "REPO-ROBOTDOLY-DOLY-DIY": {
  "score": 63.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 36,
    "anchorValue": 21.0,
    "ratio": 1.1682,
    "points": 28.04,
    "measured": true,
    "detail": "仓库树中 36 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/robotdoly/DOLY-DIY/blob/HEAD/Add-ons/helpers/base_template/step/base_template.STEP",
     "https://github.com/robotdoly/DOLY-DIY/blob/HEAD/Add-ons/helpers/servo/step/servo.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 49.5,
    "anchorValue": 35.5,
    "ratio": 1.0903,
    "points": 23.99,
    "measured": true,
    "detail": "最佳 BOM：Electronics/BOM/BOM_MainBoard.csv（66 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/robotdoly/DOLY-DIY/HEAD/Electronics/BOM/BOM_MainBoard.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/robotdoly/DOLY-DIY/blob/HEAD/SDK/docs/python/docs/getting-started/install.md",
     "https://github.com/robotdoly/DOLY-DIY/blob/HEAD/SDK/docs/python/docs/getting-started/quickstart.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/robotdoly/DOLY-DIY",
  "name": "DOLY-DIY"
 },
 "REPO-ADHAM-ELARABAWY-OPEN-QUADRUPED": {
  "score": 42.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 28,
    "anchorValue": 21.0,
    "ratio": 1.0894,
    "points": 26.14,
    "measured": true,
    "detail": "仓库树中 28 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/adham-elarabawy/open-quadruped/blob/HEAD/hardware/3d-printing/Body/step/Adapter_Plate.step",
     "https://github.com/adham-elarabawy/open-quadruped/blob/HEAD/hardware/3d-printing/Body/step/Back_Inner_Shoulder.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 6,
    "anchorValue": 12.0,
    "ratio": 0.7587,
    "points": 10.62,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 6 个",
    "evidence": [
     "https://github.com/adham-elarabawy/open-quadruped/blob/HEAD/ros-workspace/src/open_quadruped/urdf/accessories.urdf.xacro",
     "https://github.com/adham-elarabawy/open-quadruped/blob/HEAD/ros-workspace/src/open_quadruped/urdf/spot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/adham-elarabawy/open-quadruped",
  "name": "open-quadruped"
 },
 "REPO-MAKERFORGETECH-MODULAR-BIPED": {
  "score": 38.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 15,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 15 个",
    "evidence": [
     "https://github.com/makerforgetech/modular-biped/blob/HEAD/circuits/v4/Head/v4head/Gerber/v4head-B_Cu.gbr",
     "https://github.com/makerforgetech/modular-biped/blob/HEAD/circuits/v4/Head/v4head/Gerber/v4head-B_Mask.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/makerforgetech/modular-biped",
  "name": "modular-biped"
 },
 "REPO-SWARM-SUBNET-LANGOSTINO": {
  "score": 21.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 2.5,
    "anchorValue": 35.5,
    "ratio": 0.3482,
    "points": 7.66,
    "measured": true,
    "detail": "最佳 BOM：docs/assembly/BOM.md（5 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/swarm-subnet/Langostino/HEAD/docs/assembly/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/swarm-subnet/Langostino/blob/HEAD/docs/assembly/3D_PARTS.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/swarm-subnet/Langostino",
  "name": "Langostino"
 },
 "REPO-AUTONOMOUS-AI-OPENHARNESS": {
  "score": 76.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 9,
    "anchorValue": 21.0,
    "ratio": 0.7449,
    "points": 17.88,
    "measured": true,
    "detail": "仓库树中 9 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/autonomous-ai/openharness/blob/HEAD/devices/harness-device/hardware/3d/step/Button.step",
     "https://github.com/autonomous-ai/openharness/blob/HEAD/devices/harness-device/hardware/3d/step/Harness_assembly.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 30.0,
    "anchorValue": 35.5,
    "ratio": 0.9546,
    "points": 21.0,
    "measured": true,
    "detail": "最佳 BOM：devices/harness-device/hardware/pcb/production/BOM_Harness_1.75_AMOLED_PCB_Harness_1.75.xlsx（40 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/autonomous-ai/openharness/HEAD/devices/harness-device/hardware/pcb/production/BOM_Harness_1.75_AMOLED_PCB_Harness_1.75.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 3,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 3 个",
    "evidence": [
     "https://github.com/autonomous-ai/openharness/blob/HEAD/devices/harness-device/hardware/pcb/production/Gerber_PCB_Harness/Drill_NPTH_Through.DRL",
     "https://github.com/autonomous-ai/openharness/blob/HEAD/devices/harness-device/hardware/pcb/production/Gerber_PCB_Harness/Drill_PTH_Through.DRL"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/autonomous-ai/openharness",
  "name": "openharness"
 },
 "REPO-RHOBAN-MICROBAN": {
  "score": 57.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 34,
    "anchorValue": 21.0,
    "ratio": 1.1502,
    "points": 27.61,
    "measured": true,
    "detail": "仓库树中 34 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Rhoban/microban/blob/HEAD/cad/microban.step",
     "https://github.com/Rhoban/microban/blob/HEAD/cad/step/ankle_dbl_block.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 14.0,
    "anchorValue": 35.5,
    "ratio": 0.7528,
    "points": 16.56,
    "measured": true,
    "detail": "最佳 BOM：docs/bom.md（14 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/Rhoban/microban/HEAD/docs/bom.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/Rhoban/microban/blob/HEAD/docs/assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/Rhoban/microban/blob/HEAD/src/model/urdf/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Rhoban/microban",
  "name": "microban"
 },
 "REPO-G-LEVINE-OPENTORQUE-ACTUATOR": {
  "score": 17.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/G-Levine/OpenTorque-Actuator/blob/HEAD/STEP/low_backlash_gears.step",
     "https://github.com/G-Levine/OpenTorque-Actuator/blob/HEAD/STEP/opentorque.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/G-Levine/OpenTorque-Actuator/blob/HEAD/Print%20Instructions.txt"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/G-Levine/OpenTorque-Actuator",
  "name": "OpenTorque-Actuator"
 },
 "REPO-HADDINGTONDYNAMICS-DEXTER": {
  "score": 65.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 72.75,
    "anchorValue": 35.5,
    "ratio": 1.1955,
    "points": 26.3,
    "measured": true,
    "detail": "最佳 BOM：Hardware/Motor PCB/09051-00135-0_BOM.xlsx（97 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/HaddingtonDynamics/Dexter/HEAD/Hardware/Motor%20PCB/09051-00135-0_BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/HaddingtonDynamics/Dexter/blob/HEAD/DDE/InitialCalibration/HDI%20CAL%20INSTRUCTIONS-%20STEP%201.pdf",
     "https://github.com/HaddingtonDynamics/Dexter/blob/HEAD/DDE/InitialCalibration/HDI%20CAL%20INSTRUCTIONS-%20STEP%202.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/HaddingtonDynamics/Dexter/blob/HEAD/Hardware/Motor%20PCB/09011-00135-A.DSN",
     "https://github.com/HaddingtonDynamics/Dexter/blob/HEAD/Hardware/Motor%20PCB/09051-00135-02_NCD.drl"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/HaddingtonDynamics/Dexter",
  "name": "Dexter"
 },
 "REPO-UPSIDEDOWNLABS-BIOAMP-EXG-PILL": {
  "score": 49.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/upsidedownlabs/BioAmp-EXG-Pill/blob/HEAD/graphics/3d/BioAmp-EXG-Pill-v1.0a.stp",
     "https://github.com/upsidedownlabs/BioAmp-EXG-Pill/blob/HEAD/hardware/component/BioAmp-EXG-Pill.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 3,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 3 个",
    "evidence": [
     "https://github.com/upsidedownlabs/BioAmp-EXG-Pill/blob/HEAD/hardware/BioAmp-EXG-Pill.kicad_pcb",
     "https://github.com/upsidedownlabs/BioAmp-EXG-Pill/blob/HEAD/hardware/BioAmp-EXG-Pill.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/upsidedownlabs/BioAmp-EXG-Pill",
  "name": "BioAmp-EXG-Pill"
 },
 "REPO-MICHAELKUBINA-SPOTMICROESP32": {
  "score": 43.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 74,
    "anchorValue": 21.0,
    "ratio": 1.3968,
    "points": 33.52,
    "measured": true,
    "detail": "仓库树中 74 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/michaelkubina/SpotMicroESP32/blob/HEAD/assembly/spotmicroesp32_assembled_quick_and_dirty.FCStd",
     "https://github.com/michaelkubina/SpotMicroESP32/blob/HEAD/electronics/parts/0_96_inch_I2C_OLED.FCStd"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/michaelkubina/SpotMicroESP32",
  "name": "SpotMicroESP32"
 },
 "REPO-ORCAHAND-ORCAHAND_DESCRIPTION": {
  "score": 24.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 12,
    "anchorValue": 12.0,
    "ratio": 1.0,
    "points": 14.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 12 个",
    "evidence": [
     "https://github.com/orcahand/orcahand_description/blob/HEAD/v1/models/mjcf/orcahand_left.mjcf",
     "https://github.com/orcahand/orcahand_description/blob/HEAD/v1/models/mjcf/orcahand_left_extended.mjcf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/orcahand/orcahand_description",
  "name": "orcahand_description"
 },
 "REPO-DEEPLOCAL-MOCKTAILSMIXER": {
  "score": 15.4,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Deeplocal/mocktailsmixer/blob/HEAD/hardware/cad/mocktails-mixer.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 1 份 BOM，但格式无法解析（PDF 二进制，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/Deeplocal/mocktailsmixer",
  "name": "mocktailsmixer"
 },
 "REPO-4NDREAS-BETABOTS-ROBOT-ARM-PROJECT": {
  "score": 101.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 605,
    "anchorValue": 21.0,
    "ratio": 2.0,
    "points": 48.0,
    "measured": true,
    "detail": "仓库树中 605 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/4ndreas/BetaBots-Robot-Arm-Project/blob/HEAD/Blue/Inventor/Design%20Data/AIT/Mold%20Design/mold%20design%20stop%20pin.ipt",
     "https://github.com/4ndreas/BetaBots-Robot-Arm-Project/blob/HEAD/Blue/Inventor/Design%20Data/Cable%20&%20Harness/de-DE/harness.iam"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 1125.0,
    "anchorValue": 35.5,
    "ratio": 1.9532,
    "points": 42.97,
    "measured": true,
    "detail": "最佳 BOM：Blue/Inventor/Design Data/partslist.xml（2250 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/4ndreas/BetaBots-Robot-Arm-Project/HEAD/Blue/Inventor/Design%20Data/partslist.xml"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/4ndreas/BetaBots-Robot-Arm-Project",
  "name": "BetaBots-Robot-Arm-Project"
 },
 "REPO-GOOGLE-DEEPMIND-BARKOUR_ROBOT": {
  "score": 39.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 11,
    "anchorValue": 21.0,
    "ratio": 0.8039,
    "points": 19.29,
    "measured": true,
    "detail": "仓库树中 11 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/google-deepmind/barkour_robot/blob/HEAD/hardware/electronics/ada/Project%20Outputs%20for%20Ada/ExportSTEP/Ada.step",
     "https://github.com/google-deepmind/barkour_robot/blob/HEAD/hardware/electronics/cortes/Project%20Outputs%20for%20Cortes/ExportSTEP/Cortes.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 18,
    "anchorValue": 26.0,
    "ratio": 0.8934,
    "points": 14.29,
    "measured": true,
    "detail": "装配/构建类文档 18 份",
    "evidence": [
     "https://github.com/google-deepmind/barkour_robot/blob/HEAD/docs/actuated_head_assembly.md",
     "https://github.com/google-deepmind/barkour_robot/blob/HEAD/docs/actuator_assembly_and_setup.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/google-deepmind/barkour_robot",
  "name": "barkour_robot"
 },
 "REPO-SOURCE-ROBOTICS-DIFFERENTIAL-ROBOT-WRIST": {
  "score": 25.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 12.5,
    "anchorValue": 35.5,
    "ratio": 0.7235,
    "points": 15.92,
    "measured": true,
    "detail": "最佳 BOM：BOM/Differential bom update.xlsx（25 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/Source-Robotics/Differential-robot-wrist/HEAD/BOM/Differential%20bom%20update.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Source-Robotics/Differential-robot-wrist",
  "name": "Differential-robot-wrist"
 },
 "REPO-JAMRO-TINY-ENGINEER": {
  "score": 45.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 85,
    "anchorValue": 21.0,
    "ratio": 1.4411,
    "points": 34.59,
    "measured": true,
    "detail": "仓库树中 85 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jamro/tiny-engineer/blob/HEAD/3d_models/cad/TinyEngineer.f3d",
     "https://github.com/jamro/tiny-engineer/blob/HEAD/3d_models/parts/fs0307/step/AiEmblem.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/jamro/tiny-engineer/blob/HEAD/docs/3d/assembly.md",
     "https://github.com/jamro/tiny-engineer/blob/HEAD/docs/getting-started.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jamro/tiny-engineer",
  "name": "tiny-engineer"
 },
 "REPO-HACKCLUB-BLOT": {
  "score": 42.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/hackclub/blot/blob/HEAD/hardware/mechanical/blot-v6/1x_CarriagePlate.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/hackclub/blot/blob/HEAD/docs/assembly/ASSEMBLY.md",
     "https://github.com/hackclub/blot/blob/HEAD/public/getting-started/index.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/hackclub/blot/blob/HEAD/hardware/motor-control-board/circuit/power-delivery/CYPD-3177%20Breakout.kicad_pcb",
     "https://github.com/hackclub/blot/blob/HEAD/hardware/motor-control-board/circuit/power-delivery/CYPD-3177%20Breakout.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/hackclub/blot",
  "name": "blot"
 },
 "REPO-BOTBOTROBOTICS-BOTBRAIN": {
  "score": 38.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 5,
    "anchorValue": 21.0,
    "ratio": 0.5797,
    "points": 13.91,
    "measured": true,
    "detail": "仓库树中 5 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/botbotrobotics/BotBrain/blob/HEAD/hardware/BotBrain/bottom_case.step",
     "https://github.com/botbotrobotics/BotBrain/blob/HEAD/hardware/BotBrain/top_case.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 14,
    "anchorValue": 12.0,
    "ratio": 1.0558,
    "points": 14.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 14 个",
    "evidence": [
     "https://github.com/botbotrobotics/BotBrain/blob/HEAD/botbrain_ws/src/bot_description/xacro/botbrain.xacro",
     "https://github.com/botbotrobotics/BotBrain/blob/HEAD/botbrain_ws/src/g1_pkg/urdf/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/botbotrobotics/BotBrain",
  "name": "BotBrain"
 },
 "REPO-EPFLXPLORE-XRE_LEGGEDROBOT_HW": {
  "score": 95.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 44,
    "anchorValue": 21.0,
    "ratio": 1.2315,
    "points": 29.56,
    "measured": true,
    "detail": "仓库树中 44 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/EPFLXplore/XRE_LeggedRobot_HW/blob/HEAD/amulet_controller/STEP_Blender/amulet_controller.step",
     "https://github.com/EPFLXplore/XRE_LeggedRobot_HW/blob/HEAD/amulet_controller/lib/3d_models/105430-1203.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 53.25,
    "anchorValue": 35.5,
    "ratio": 1.1102,
    "points": 24.42,
    "measured": true,
    "detail": "最佳 BOM：amulet_controller/Manufacturing/Assembly/amulet_controller-BOM.csv（71 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/EPFLXplore/XRE_LeggedRobot_HW/HEAD/amulet_controller/Manufacturing/Assembly/amulet_controller-BOM.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/EPFLXplore/XRE_LeggedRobot_HW/blob/HEAD/amulet_controller/Manufacturing/Assembly/amulet_controller_assembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 53,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 53 个",
    "evidence": [
     "https://github.com/EPFLXplore/XRE_LeggedRobot_HW/blob/HEAD/amulet_controller/Block%20Diagram.kicad_sch",
     "https://github.com/EPFLXplore/XRE_LeggedRobot_HW/blob/HEAD/amulet_controller/Interface%20-%20FD-CAN.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/EPFLXplore/XRE_LeggedRobot_HW",
  "name": "XRE_LeggedRobot_HW"
 },
 "REPO-WUPHILIPP-GELLO_MECHANICAL": {
  "score": 26.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 7,
    "anchorValue": 21.0,
    "ratio": 0.6727,
    "points": 16.15,
    "measured": true,
    "detail": "仓库树中 7 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/wuphilipp/gello_mechanical/blob/HEAD/ar4/arm1.scad",
     "https://github.com/wuphilipp/gello_mechanical/blob/HEAD/ar4/arm2.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/wuphilipp/gello_mechanical",
  "name": "gello_mechanical"
 },
 "REPO-JINDADU00-LEGGED_ROBOT_COMPETITION": {
  "score": 27.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jindadu00/legged_robot_competition/blob/HEAD/isaacgym/assets/urdf/kinova_description/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 58,
    "anchorValue": 12.0,
    "ratio": 1.5897,
    "points": 22.26,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 58 个",
    "evidence": [
     "https://github.com/jindadu00/legged_robot_competition/blob/HEAD/isaacgym/assets/urdf/anymal_b_simple_description/urdf/anymal.urdf",
     "https://github.com/jindadu00/legged_robot_competition/blob/HEAD/isaacgym/assets/urdf/ball.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jindadu00/legged_robot_competition",
  "name": "legged_robot_competition"
 },
 "REPO-STEPHENCARLSON-MINIHAWK-VTOL": {
  "score": 5.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/StephenCarlson/MiniHawk-VTOL/blob/HEAD/stl-SourceFiles/MH7_Hatch_RELEASED.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/StephenCarlson/MiniHawk-VTOL",
  "name": "MiniHawk-VTOL"
 },
 "REPO-TNY-ROBOTICS-TNY-360": {
  "score": 52.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 30,
    "anchorValue": 21.0,
    "ratio": 1.1109,
    "points": 26.66,
    "measured": true,
    "detail": "仓库树中 30 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/TNY-Robotics/TNY-360/blob/HEAD/CAD/00_Assemblies/Ear_L.FCStd",
     "https://github.com/TNY-Robotics/TNY-360/blob/HEAD/CAD/00_Assemblies/Ear_R.FCStd"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 23.25,
    "anchorValue": 35.5,
    "ratio": 0.8863,
    "points": 19.5,
    "measured": true,
    "detail": "最佳 BOM：PCBs/Buck Converter/Buck Converter - BOM.csv（31 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/TNY-Robotics/TNY-360/HEAD/PCBs/Buck%20Converter/Buck%20Converter%20-%20BOM.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/TNY-Robotics/TNY-360",
  "name": "TNY-360"
 },
 "REPO-ESA-PRL-EXOMY": {
  "score": 43.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 78,
    "anchorValue": 21.0,
    "ratio": 1.4136,
    "points": 33.93,
    "measured": true,
    "detail": "仓库树中 78 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/esa-prl/ExoMy/blob/HEAD/Mechanical%20Design/A01_ExoMy.SLDASM",
     "https://github.com/esa-prl/ExoMy/blob/HEAD/Mechanical%20Design/A04_Wheel_Assembly.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/esa-prl/ExoMy",
  "name": "ExoMy"
 },
 "REPO-FUWEI007-NAVBOT-EN01": {
  "score": 28.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/fuwei007/Navbot-EN01/blob/HEAD/Hardware/RebotModel/CNC/BodyBasc-Aluminum6061.stp",
     "https://github.com/fuwei007/Navbot-EN01/blob/HEAD/Hardware/RebotModel/CNC/MotorBase-Aluminum6061.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 16.5,
    "anchorValue": 35.5,
    "ratio": 0.7956,
    "points": 17.5,
    "measured": true,
    "detail": "最佳 BOM：Hardware/RebotModel/BOM.xlsx（22 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/fuwei007/Navbot-EN01/HEAD/Hardware/RebotModel/BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/fuwei007/Navbot-EN01",
  "name": "Navbot-EN01"
 },
 "REPO-CKRAFT11-IRONLESS-QDD-ACTUATOR": {
  "score": 38.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 17,
    "anchorValue": 21.0,
    "ratio": 0.9351,
    "points": 22.44,
    "measured": true,
    "detail": "仓库树中 17 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/CKraft11/Ironless-QDD-Actuator/blob/HEAD/CAD/Print_Files/1x_carrier_bottom_output.STEP",
     "https://github.com/CKraft11/Ironless-QDD-Actuator/blob/HEAD/CAD/Print_Files/1x_carrier_top_cover.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 13.5,
    "anchorValue": 35.5,
    "ratio": 0.7434,
    "points": 16.35,
    "measured": true,
    "detail": "最佳 BOM：BOM.xlsx（18 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/CKraft11/Ironless-QDD-Actuator/HEAD/BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/CKraft11/Ironless-QDD-Actuator",
  "name": "Ironless-QDD-Actuator"
 },
 "REPO-IWIN-FINS-FINSROV-AN-UNDERWATER-CAMERA-BASED-MULTI-ROBOT-PLATFORM": {
  "score": 60.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 40,
    "anchorValue": 21.0,
    "ratio": 1.2014,
    "points": 28.83,
    "measured": true,
    "detail": "仓库树中 40 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform/blob/HEAD/Structure/Configuration.STEP",
     "https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform/blob/HEAD/Structure/En/3DPrinting/Pressure_Sensor_Mount.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 33.0,
    "anchorValue": 35.5,
    "ratio": 0.9803,
    "points": 21.57,
    "measured": true,
    "detail": "最佳 BOM：Structure/zh-CN/bom表.xlsx（33 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform/HEAD/Structure/zh-CN/bom%E8%A1%A8.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform",
  "name": "FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform"
 },
 "REPO-MED-AIR-SURROL": {
  "score": 45.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/med-air/SurRoL/blob/HEAD/Data_driven_scene_simulation/reconstruction/submodules/gs-render/third_party/glm/doc/manual.pdf",
     "https://github.com/med-air/SurRoL/blob/HEAD/Data_driven_scene_simulation/reconstruction/submodules/gs-render/third_party/glm/manual.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 424,
    "anchorValue": 12.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 424 个",
    "evidence": [
     "https://github.com/med-air/SurRoL/blob/HEAD/Benchmark/state_based/surrol/assets/CH4/CH4.urdf",
     "https://github.com/med-air/SurRoL/blob/HEAD/Benchmark/state_based/surrol/assets/CH4/CH4_waypoints.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/med-air/SurRoL",
  "name": "SurRoL"
 },
 "REPO-FACEBOOKRESEARCH-DIFFERENTIABLE-ROBOT-MODEL": {
  "score": 30.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/facebookresearch/differentiable-robot-model/blob/HEAD/diff_robot_data/kinova_description/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 14,
    "anchorValue": 12.0,
    "ratio": 1.0558,
    "points": 14.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 14 个",
    "evidence": [
     "https://github.com/facebookresearch/differentiable-robot-model/blob/HEAD/diff_robot_data/2link_robot.urdf",
     "https://github.com/facebookresearch/differentiable-robot-model/blob/HEAD/diff_robot_data/allegro/urdf/allegro_hand_description_left.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/facebookresearch/differentiable-robot-model",
  "name": "differentiable-robot-model"
 },
 "REPO-ROBERTOROBOTICS-NEXTIS-AIRA-3D": {
  "score": 49.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 30,
    "anchorValue": 21.0,
    "ratio": 1.1109,
    "points": 26.66,
    "measured": true,
    "detail": "仓库树中 30 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/robertorobotics/Nextis-AIRA-3D/blob/HEAD/hardware/step/follower/Adapter%20Gripper.step",
     "https://github.com/robertorobotics/Nextis-AIRA-3D/blob/HEAD/hardware/step/follower/Base.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 4.0,
    "anchorValue": 35.5,
    "ratio": 0.4474,
    "points": 9.84,
    "measured": true,
    "detail": "最佳 BOM：hardware/BOM.md（16 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/robertorobotics/Nextis-AIRA-3D/HEAD/hardware/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/robertorobotics/Nextis-AIRA-3D/blob/HEAD/hardware/ASSEMBLY.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/robertorobotics/Nextis-AIRA-3D",
  "name": "Nextis-AIRA-3D"
 },
 "REPO-WENGMISTER-BIDEXHAND": {
  "score": 45.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/wengmister/BiDexHand/blob/HEAD/cad_asset/_stp/bidexhand%20v4.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 27.5,
    "anchorValue": 35.5,
    "ratio": 0.9312,
    "points": 20.49,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（55 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/wengmister/BiDexHand/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 5,
    "anchorValue": 12.0,
    "ratio": 0.6986,
    "points": 9.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 5 个",
    "evidence": [
     "https://github.com/wengmister/BiDexHand/blob/HEAD/src/combined_fer_moveit_config/srdf/combined_arm.srdf.xacro",
     "https://github.com/wengmister/BiDexHand/blob/HEAD/src/combined_fer_moveit_config/srdf/combined_arm.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/wengmister/BiDexHand",
  "name": "BiDexHand"
 },
 "REPO-HARADUKA-MEVIUS": {
  "score": 13.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/haraduka/mevius/blob/HEAD/models/mevius.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/haraduka/mevius",
  "name": "mevius"
 },
 "REPO-BRITCRUISE9-GROWBOT": {
  "score": 15.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 3.5,
    "anchorValue": 35.5,
    "ratio": 0.4181,
    "points": 9.2,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（7 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/britcruise9/GrowBot/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/britcruise9/GrowBot",
  "name": "GrowBot"
 },
 "REPO-ALEXHUGE1-ALEXBOT": {
  "score": 35.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 95,
    "anchorValue": 21.0,
    "ratio": 1.4766,
    "points": 35.44,
    "measured": true,
    "detail": "仓库树中 95 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Alexhuge1/Alexbot/blob/HEAD/4-ModelsV1/AlexbotV1/DM-J6006电机连接件.SLDPRT",
     "https://github.com/Alexhuge1/Alexbot/blob/HEAD/4-ModelsV1/AlexbotV1/DM-J8006电机延长件短.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Alexhuge1/Alexbot",
  "name": "Alexbot"
 },
 "REPO-ELEPHANTROBOTICS-MYCOBOT_ROS": {
  "score": 45.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/elephantrobotics/mycobot_ros/blob/HEAD/mycobot_description/urdf/mycobot_280_arduino/mycobot_step.STEP",
     "https://github.com/elephantrobotics/mycobot_ros/blob/HEAD/mycobot_description/urdf/mycobot_280_m5/mycobot_step.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 135,
    "anchorValue": 12.0,
    "ratio": 1.9153,
    "points": 26.81,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 135 个",
    "evidence": [
     "https://github.com/elephantrobotics/mycobot_ros/blob/HEAD/Mybuddy/mybuddy_moveit/config/firefighter.srdf",
     "https://github.com/elephantrobotics/mycobot_ros/blob/HEAD/Mybuddy/mybuddy_socket_moveit/config/firefighter.srdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/elephantrobotics/mycobot_ros",
  "name": "mycobot_ros"
 },
 "REPO-REUBENSTR-ELECTROPUP": {
  "score": 39.9,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/reubenstr/ElectroPup/blob/HEAD/cad/3D/assembly-v20.step",
     "https://github.com/reubenstr/ElectroPup/blob/HEAD/cad/3D/v1/assembly-v20.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 1 份 BOM，但格式无法解析（OpenDocument 表格，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/reubenstr/ElectroPup/blob/HEAD/docs/motors/lingkong-motor-manual.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 15,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 15 个",
    "evidence": [
     "https://github.com/reubenstr/ElectroPup/blob/HEAD/pcbs/auxiliary-board/auxiliary-board.kicad_pcb",
     "https://github.com/reubenstr/ElectroPup/blob/HEAD/pcbs/auxiliary-board/auxiliary-board.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/reubenstr/ElectroPup",
  "name": "ElectroPup"
 },
 "REPO-POPPY-PROJECT-POPPY-ERGO-JR": {
  "score": 31.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/poppy-project/poppy-ergo-jr/blob/HEAD/hardware/STEP/U_parts.step",
     "https://github.com/poppy-project/poppy-ergo-jr/blob/HEAD/hardware/STEP/base.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 7.0,
    "anchorValue": 35.5,
    "ratio": 0.5781,
    "points": 12.72,
    "measured": true,
    "detail": "最佳 BOM：doc/bom.md（28 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/poppy-project/poppy-ergo-jr/HEAD/doc/bom.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/poppy-project/poppy-ergo-jr/blob/HEAD/software/poppy_ergo_jr/poppy_ergo_jr.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/poppy-project/poppy-ergo-jr",
  "name": "poppy-ergo-jr"
 },
 "REPO-JELATINE-MOCKWAY_ROBOTICS": {
  "score": 29.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 4.25,
    "anchorValue": 35.5,
    "ratio": 0.461,
    "points": 10.14,
    "measured": true,
    "detail": "最佳 BOM：doc/BOM.md（17 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/Jelatine/mockway_robotics/HEAD/doc/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 5,
    "anchorValue": 12.0,
    "ratio": 0.6986,
    "points": 9.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 5 个",
    "evidence": [
     "https://github.com/Jelatine/mockway_robotics/blob/HEAD/mockway_description/urdf/mockway_description.urdf",
     "https://github.com/Jelatine/mockway_robotics/blob/HEAD/mockway_lua_moveit/ui/public/urdf/mockway_description.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Jelatine/mockway_robotics",
  "name": "mockway_robotics"
 },
 "REPO-KALLASPRIIT-ROSBOT": {
  "score": 54.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 148,
    "anchorValue": 21.0,
    "ratio": 1.6189,
    "points": 38.85,
    "measured": true,
    "detail": "仓库树中 148 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/kallaspriit/rosbot/blob/HEAD/solidworks/50w-resistor/50w-resistor.SLDPRT",
     "https://github.com/kallaspriit/rosbot/blob/HEAD/solidworks/M12-connector/M12-connector-nut.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/kallaspriit/rosbot/blob/HEAD/experiments/test_cpp/src/tutorial_interfaces/CMakeLists.txt"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/kallaspriit/rosbot/blob/HEAD/experiments/test_odrive_ros2_control/src/odrive_description/urdf/odrive.ros2_control.xacro",
     "https://github.com/kallaspriit/rosbot/blob/HEAD/experiments/test_odrive_ros2_control/src/odrive_description/urdf/odrive.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/kallaspriit/rosbot",
  "name": "rosbot"
 },
 "REPO-ORCAHAND-ORCAHAND_HARDWARE": {
  "score": 70.2,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 69,
    "anchorValue": 21.0,
    "ratio": 1.3745,
    "points": 32.99,
    "measured": true,
    "detail": "仓库树中 69 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/orcahand/orcahand_hardware/blob/HEAD/orca_v1/ORCA_Assembly/ORCA_v1.step",
     "https://github.com/orcahand/orcahand_hardware/blob/HEAD/orca_v2/base/04_ForeArm/FrankaConnector.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 2 份 BOM，但格式无法解析（旧版 Excel 二进制格式，标准库不支持）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/orcahand/orcahand_hardware/blob/HEAD/orca_v2/base/ASSEMBLY_ADDENDUM.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 6,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 6 个",
    "evidence": [
     "https://github.com/orcahand/orcahand_hardware/blob/HEAD/orca_v1/ORCA_Electronics/ORCA_Motor_Connectors_Gerber/Drill_NPTH_Through.DRL",
     "https://github.com/orcahand/orcahand_hardware/blob/HEAD/orca_v1/ORCA_Electronics/ORCA_Motor_Connectors_Gerber/Drill_PTH_Through.DRL"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/orcahand/orcahand_hardware",
  "name": "orcahand_hardware"
 },
 "REPO-GOLACED-OMNIBOTSERIES-TINKER": {
  "score": 68.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 62,
    "anchorValue": 21.0,
    "ratio": 1.3404,
    "points": 32.17,
    "measured": true,
    "detail": "仓库树中 62 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotSeries/TinkerV2_URDF_Head.STEP",
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotSeries/切割/主控支撑.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 5,
    "anchorValue": 26.0,
    "ratio": 0.5436,
    "points": 8.7,
    "measured": true,
    "detail": "装配/构建类文档 5 份",
    "evidence": [
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotHub/Linux/control_task2/qpOASES/doc/manual.pdf",
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotHub/Linux/control_task2/yaml-cpp/docs/Tutorial.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 26,
    "anchorValue": 12.0,
    "ratio": 1.285,
    "points": 17.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 26 个",
    "evidence": [
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotCtrl/OmniBotCtrl/resources/TinkerV2_URDF/urdf/TinkerV2_URDF%20copy.urdf",
     "https://github.com/golaced/OmniBotSeries-Tinker/blob/HEAD/OmniBotCtrl/OmniBotCtrl/resources/TinkerV2_URDF/urdf/TinkerV2_URDF.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/golaced/OmniBotSeries-Tinker",
  "name": "OmniBotSeries-Tinker"
 },
 "REPO-OPENBIONICS-PROSTHETIC-HANDS": {
  "score": 77.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 391,
    "anchorValue": 21.0,
    "ratio": 1.9318,
    "points": 46.36,
    "measured": true,
    "detail": "仓库树中 391 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/OpenBionics/Prosthetic-Hands/blob/HEAD/CAD/2D%20Design/LeftHand/Assembly/AnthropomorphicHandAssembly.SLDASM",
     "https://github.com/OpenBionics/Prosthetic-Hands/blob/HEAD/CAD/2D%20Design/LeftHand/Button/src/Button.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/OpenBionics/Prosthetic-Hands/blob/HEAD/Assembly%20Guide/tex/OpenBionics_ProstheticHandsGuide2015.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/OpenBionics/Prosthetic-Hands/blob/HEAD/Electronics/uC_Board.brd",
     "https://github.com/OpenBionics/Prosthetic-Hands/blob/HEAD/Electronics/uC_Board.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/OpenBionics/Prosthetic-Hands",
  "name": "Prosthetic-Hands"
 },
 "REPO-PRL-MUSHR-MUSHR": {
  "score": 22.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/prl-mushr/mushr/blob/HEAD/mushr_description/robots/color.urdf.xacro",
     "https://github.com/prl-mushr/mushr/blob/HEAD/mushr_description/robots/mushr_base_nano.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/prl-mushr/mushr",
  "name": "mushr"
 },
 "REPO-RASPIBOTICS-MABEL": {
  "score": 18.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/raspibotics/MABEL/blob/HEAD/CAD/Project%20Files/MABEL.f3z",
     "https://github.com/raspibotics/MABEL/blob/HEAD/CAD/Project%20Files/MABEL.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/raspibotics/MABEL",
  "name": "MABEL"
 },
 "REPO-ASHISHA26-ORION-QUADRUPED": {
  "score": 95.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 132,
    "anchorValue": 21.0,
    "ratio": 1.5821,
    "points": 37.97,
    "measured": true,
    "detail": "仓库树中 132 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/models/Bearing-tests/BearingTest_10x15mm_Inner.SLDPRT",
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/models/Bearing-tests/BearingTest_10x15mm_Outer.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 8.0,
    "anchorValue": 35.5,
    "ratio": 0.6108,
    "points": 13.44,
    "measured": true,
    "detail": "最佳 BOM：pcb/Orion-Control-Board/production/Orion_-_Control_Board_1.0_bom.csv（16 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/AshishA26/Orion-Quadruped/HEAD/pcb/Orion-Control-Board/production/Orion_-_Control_Board_1.0_bom.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 5,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 5 个",
    "evidence": [
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/pcb/Orion-Control-Board/Compute.kicad_sch",
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/pcb/Orion-Control-Board/Orion-Control-Board.kicad_pcb"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 17,
    "anchorValue": 12.0,
    "ratio": 1.1269,
    "points": 15.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 17 个",
    "evidence": [
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/Software/Jetson/workspace/isaac_ros-dev/src/orion_urdf/urdf/robot_description.urdf",
     "https://github.com/AshishA26/Orion-Quadruped/blob/HEAD/Software/kinematics_sim/pybullet_sim/leg.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AshishA26/Orion-Quadruped",
  "name": "Orion-Quadruped"
 },
 "REPO-ROBONINECOM-SO-ARM100-101-PARALLEL-GRIPPER": {
  "score": 46.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/community/histology-slide-gripper/cad/the-parallel-microscope-slide-gripper.step",
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/models/RB9.01.062.000%20Gripper.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 5.25,
    "anchorValue": 35.5,
    "ratio": 0.5094,
    "points": 11.21,
    "measured": true,
    "detail": "最佳 BOM：docs/bom.md（7 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/roboninecom/SO-ARM100-101-Parallel-Gripper/HEAD/docs/bom.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/docs/Assembly%20Guide%20Follower%20Gripper.pdf",
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/docs/Assembly%20Guide%20SO-ARM101.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 5,
    "anchorValue": 12.0,
    "ratio": 0.6986,
    "points": 9.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 5 个",
    "evidence": [
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/community/histology-slide-gripper/mujoco/so_101.urdf.xacro",
     "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper/blob/HEAD/community/histology-slide-gripper/mujoco/so_101_arm.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CC-BY-4.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/roboninecom/SO-ARM100-101-Parallel-Gripper",
  "name": "SO-ARM100-101-Parallel-Gripper"
 },
 "REPO-JIACHENGLIU3-OPENWBC": {
  "score": 25.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jiachengliu3/OpenWBC/blob/HEAD/avp_teleoperate/hardware/head_stereo_camera_mount.STEP",
     "https://github.com/jiachengliu3/OpenWBC/blob/HEAD/avp_teleoperate/hardware/left_wrist_D405_camera_mount.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 9,
    "anchorValue": 12.0,
    "ratio": 0.8977,
    "points": 12.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 9 个",
    "evidence": [
     "https://github.com/jiachengliu3/OpenWBC/blob/HEAD/OpenHomie/HomieRL/legged_gym/resources/robots/g1_description/g1.urdf",
     "https://github.com/jiachengliu3/OpenWBC/blob/HEAD/avp_teleoperate/assets/g1/g1_body23.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jiachengliu3/OpenWBC",
  "name": "OpenWBC"
 },
 "REPO-RACK-ROBOTICS-POWERCORE-V1.0-HARDWARE": {
  "score": 41.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 5,
    "anchorValue": 21.0,
    "ratio": 0.5797,
    "points": 13.91,
    "measured": true,
    "detail": "仓库树中 5 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Rack-Robotics/Powercore-V1.0-Hardware/blob/HEAD/Back%20Panel%20Assembly%20v3.step",
     "https://github.com/Rack-Robotics/Powercore-V1.0-Hardware/blob/HEAD/Bottom%20Panel%20Assembly%20v2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 3,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 3 个",
    "evidence": [
     "https://github.com/Rack-Robotics/Powercore-V1.0-Hardware/blob/HEAD/EDM%20Motherboard%20[23.04.20]/EDM%20Motherboard%20[23.04.20].kicad_pcb",
     "https://github.com/Rack-Robotics/Powercore-V1.0-Hardware/blob/HEAD/EDM%20Motherboard%20[23.04.20]/EDM%20Motherboard%20[23.04.20].kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Rack-Robotics/Powercore-V1.0-Hardware",
  "name": "Powercore-V1.0-Hardware"
 },
 "REPO-ROBSTRIDE-EDULITE_A3": {
  "score": 32.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/RobStride/EDULITE_A3/blob/HEAD/hardware/step/Edulite_A3.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/RobStride/EDULITE_A3/blob/HEAD/hardware/assembly_sop/A3_Assembly_SOP.pdf",
     "https://github.com/RobStride/EDULITE_A3/blob/HEAD/hardware/assembly_sop/A3_Assembly_SOP_CN%20.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/RobStride/EDULITE_A3/blob/HEAD/el_a3_ros/EDULITE-A3/EDULITE-A3.urdf",
     "https://github.com/RobStride/EDULITE_A3/blob/HEAD/el_a3_ros/el_a3_description/urdf/el_a3.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/RobStride/EDULITE_A3",
  "name": "EDULITE_A3"
 },
 "REPO-TOYOTA-YUBI-HW": {
  "score": 64.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 41,
    "anchorValue": 21.0,
    "ratio": 1.2092,
    "points": 29.02,
    "measured": true,
    "detail": "仓库树中 41 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Toyota/yubi-hw/blob/HEAD/STEP/flange/FRANKA_FLANGE.STEP",
     "https://github.com/Toyota/yubi-hw/blob/HEAD/STEP/flange/OPENARM_FLANGE.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 24.5,
    "anchorValue": 35.5,
    "ratio": 0.9003,
    "points": 19.81,
    "measured": true,
    "detail": "最佳 BOM：docs/BOM/YUBI Glove Assy_BOM.csv（49 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/Toyota/yubi-hw/HEAD/docs/BOM/YUBI%20Glove%20Assy_BOM.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/Toyota/yubi-hw/blob/HEAD/docs/AssemblyInstruction/YUBI%20Glove%20Assy_AssemblyGuide.pdf",
     "https://github.com/Toyota/yubi-hw/blob/HEAD/docs/AssemblyInstruction/YUBI%20Gripper_DYNAMIXEL_AssemblyGuide.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-W-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Toyota/yubi-hw",
  "name": "yubi-hw"
 },
 "REPO-OPENAMROBOT-OPENAMR": {
  "score": 70.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 55,
    "anchorValue": 21.0,
    "ratio": 1.3023,
    "points": 31.25,
    "measured": true,
    "detail": "仓库树中 55 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/openAMRobot/openamr/blob/HEAD/docs/hardware/CAD_files/Full_assembly_STEP/MMP.00.00.00.000_full_assembly.STEP",
     "https://github.com/openAMRobot/openamr/blob/HEAD/docs/hardware/CAD_files/production_files/MMP.00.00.00.001%20Front%20panel.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 10.5,
    "anchorValue": 35.5,
    "ratio": 0.6789,
    "points": 14.94,
    "measured": true,
    "detail": "最佳 BOM：docs/hardware/BOM/BOM_specs_MMP.xlsx（42 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/openAMRobot/openamr/HEAD/docs/hardware/BOM/BOM_specs_MMP.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 17,
    "anchorValue": 26.0,
    "ratio": 0.877,
    "points": 14.03,
    "measured": true,
    "detail": "装配/构建类文档 17 份",
    "evidence": [
     "https://github.com/openAMRobot/openamr/blob/HEAD/docs/hardware/CAD_files/production_files/MMP.01.00.00.000%20Cover%20assembly.PDF",
     "https://github.com/openAMRobot/openamr/blob/HEAD/docs/hardware/CAD_files/production_files/MMP.02.00.00.000%20Base%20assembly.PDF"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/openAMRobot/openamr",
  "name": "openamr"
 },
 "REPO-JEROME-GRAVES-YERTLE": {
  "score": 19.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Jerome-Graves/yertle/blob/HEAD/design/CAD/Yertle_Single_v2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/Jerome-Graves/yertle/blob/HEAD/simulation/yertle.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Jerome-Graves/yertle",
  "name": "yertle"
 },
 "REPO-AJAYRE-JACKTHERIPPERBOT": {
  "score": 36.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 30,
    "anchorValue": 21.0,
    "ratio": 1.1109,
    "points": 26.66,
    "measured": true,
    "detail": "仓库树中 30 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ajayre/JacktheRipperBot/blob/HEAD/Parts/STEP/Core-Servo.stp",
     "https://github.com/ajayre/JacktheRipperBot/blob/HEAD/Parts/STEP/Core-ServoGear.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ajayre/JacktheRipperBot",
  "name": "JacktheRipperBot"
 },
 "REPO-ANDREGEIST-WHEELBOT": {
  "score": 35.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/AndReGeist/wheelbot/blob/HEAD/CAD%20files/wheelbot%20v2.5%20assembly%20view.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/AndReGeist/wheelbot/blob/HEAD/motherboard%20circuitry/unicycle_v2.3.brd",
     "https://github.com/AndReGeist/wheelbot/blob/HEAD/motherboard%20circuitry/unicycle_v2.3.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AndReGeist/wheelbot",
  "name": "wheelbot"
 },
 "REPO-EAI-YESLAB-OPENEAI-ARM": {
  "score": 61.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 36,
    "anchorValue": 21.0,
    "ratio": 1.1682,
    "points": 28.04,
    "measured": true,
    "detail": "仓库树中 36 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/eai-yeslab/OpenEAI-Arm/blob/HEAD/hardware/STEP/DM-J4310-2EC-V1_1__3D_20240822__ASM-1.STEP-1-1.STEP",
     "https://github.com/eai-yeslab/OpenEAI-Arm/blob/HEAD/hardware/STEP/DM_4340__3D20240822_1_2_1__ASM__ASM-2.STEP-1.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 22.0,
    "anchorValue": 35.5,
    "ratio": 0.8716,
    "points": 19.18,
    "measured": true,
    "detail": "最佳 BOM：hardware/bom/BOM.xlsx（44 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/eai-yeslab/OpenEAI-Arm/HEAD/hardware/bom/BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/eai-yeslab/OpenEAI-Arm/blob/HEAD/software/ros2/src/openeai_arm_urdf_ros2/urdf/STEP.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/eai-yeslab/OpenEAI-Arm",
  "name": "OpenEAI-Arm"
 },
 "REPO-AAEDMUSA-OPENQDD-V1": {
  "score": 17.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 16.5,
    "anchorValue": 35.5,
    "ratio": 0.7956,
    "points": 17.5,
    "measured": true,
    "detail": "最佳 BOM：OpenQDD V1 BOM.xlsx（22 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/aaedmusa/OpenQDD-V1/HEAD/OpenQDD%20V1%20BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/aaedmusa/OpenQDD-V1",
  "name": "OpenQDD-V1"
 },
 "REPO-JUSTLOVESCIENCE-MKS-XDRIVE-MINI": {
  "score": 10.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/justlovescience/MKS-XDRIVE-MINI/blob/HEAD/3Dmodels/LA8308%20motor%20mount%20and%20driver%20assembly.step",
     "https://github.com/justlovescience/MKS-XDRIVE-MINI/blob/HEAD/3Dmodels/mks%20xdrive%20mini%20xt60.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/justlovescience/MKS-XDRIVE-MINI",
  "name": "MKS-XDRIVE-MINI"
 },
 "REPO-PKOOIJ-OPEN-ARMS-MINI": {
  "score": 29.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 20,
    "anchorValue": 21.0,
    "ratio": 0.985,
    "points": 23.64,
    "measured": true,
    "detail": "仓库树中 20 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/pkooij/open-arms-mini/blob/HEAD/STEP/J%20Handle.step",
     "https://github.com/pkooij/open-arms-mini/blob/HEAD/STEP/J%20trigger%20L.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 1.5,
    "anchorValue": 35.5,
    "ratio": 0.2547,
    "points": 5.6,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（6 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/pkooij/open-arms-mini/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pkooij/open-arms-mini",
  "name": "open-arms-mini"
 },
 "REPO-XROBOTS-ROBOTX": {
  "score": 20.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/XRobots/RobotX/blob/HEAD/CAD/13_ArmsNeck.stp",
     "https://github.com/XRobots/RobotX/blob/HEAD/CAD/13_LegsBody.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "LGPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/XRobots/RobotX",
  "name": "RobotX"
 },
 "REPO-VIOLINLEE-NODEQUAD12-MICROPYTHON": {
  "score": 19.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 24.75,
    "anchorValue": 35.5,
    "ratio": 0.903,
    "points": 19.87,
    "measured": true,
    "detail": "最佳 BOM：resource/BOM.xlsx（33 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/ViolinLee/NodeQuad12-MicroPython/HEAD/resource/BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ViolinLee/NodeQuad12-MicroPython",
  "name": "NodeQuad12-MicroPython"
 },
 "REPO-LOONGOPEN-OPENLOONG-HARDWARE": {
  "score": 53.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 226,
    "anchorValue": 21.0,
    "ratio": 1.7551,
    "points": 42.12,
    "measured": true,
    "detail": "仓库树中 226 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/loongOpen/OpenLoong-Hardware/blob/HEAD/QingLoong%20V2.5/en/QingLoong%20V2.5%20-%203D%20File/TA00-03-00-Waist%20Component%20-%203D%20File/TA00-03-0001-Waist%20Bracket1.STEP",
     "https://github.com/loongOpen/OpenLoong-Hardware/blob/HEAD/QingLoong%20V2.5/en/QingLoong%20V2.5%20-%203D%20File/TA00-03-00-Waist%20Component%20-%203D%20File/TA00-03-0002-Front%20Blind-Spot%20Camera%20Bracket1.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/loongOpen/OpenLoong-Hardware/blob/HEAD/QingLoong%20V2.5/en/QingLoong%20V2.5%20-%202D%20Drawing/TA00-12-00-Leg%20and%20Foot%20System%20-%202D%20Drawing/TA00-12-06%20Foot%20Assembly.pdf",
     "https://github.com/loongOpen/OpenLoong-Hardware/blob/HEAD/TA00-12-00-Leg%20and%20Foot%20System/TA00-12-06%20Foot%20Assembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/loongOpen/OpenLoong-Hardware",
  "name": "OpenLoong-Hardware"
 },
 "REPO-TOANTECH-PY-APPLE-BLDC-QUADRUPED-ROBOT": {
  "score": 15.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ToanTech/py-apple-bldc-quadruped-robot/blob/HEAD/3D%20model/Py-apple%20BLDC%20quadruped%20robot%20V1.0.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ToanTech/py-apple-bldc-quadruped-robot",
  "name": "py-apple-bldc-quadruped-robot"
 },
 "REPO-GOLACED-QUADRUPED-ROBOT-MOCO-12-": {
  "score": 37.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 76,
    "anchorValue": 21.0,
    "ratio": 1.4053,
    "points": 33.73,
    "measured": true,
    "detail": "仓库树中 76 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/golaced/Quadruped-Robot-Moco-12-/blob/HEAD/教程2-主机架设计/1.0%20SW文件/5%2010%204%20法兰.SLDPRT",
     "https://github.com/golaced/Quadruped-Robot-Moco-12-/blob/HEAD/教程2-主机架设计/1.0%20SW文件/9g舵机.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/golaced/Quadruped-Robot-Moco-12-/blob/HEAD/教程5-步态控制算法/py_robot/4leggedRobot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/golaced/Quadruped-Robot-Moco-12-",
  "name": "Quadruped-Robot-Moco-12-"
 },
 "REPO-MATHESHWARANPITCHAI-OPEN-SOURCE-LEADER-ARM": {
  "score": 33.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 20,
    "anchorValue": 21.0,
    "ratio": 0.985,
    "points": 23.64,
    "measured": true,
    "detail": "仓库树中 20 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Matheshwaranpitchai/open-source-leader-arm/blob/HEAD/cad_files/assembly.step",
     "https://github.com/Matheshwaranpitchai/open-source-leader-arm/blob/HEAD/cad_files/step/base.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Matheshwaranpitchai/open-source-leader-arm",
  "name": "open-source-leader-arm"
 },
 "REPO-POPI-MKX3-POPI_PROJECT": {
  "score": 63.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 95,
    "anchorValue": 21.0,
    "ratio": 1.4766,
    "points": 35.44,
    "measured": true,
    "detail": "仓库树中 95 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/popi-mkx3/popi_project/blob/HEAD/popi_mechanics/CATIA/07330-201200.CATPart",
     "https://github.com/popi-mkx3/popi_project/blob/HEAD/popi_mechanics/CATIA/10_37_0505_0250_001.CATPart"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/popi-mkx3/popi_project/blob/HEAD/popi_reports/POPI_user_manual.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 15,
    "anchorValue": 12.0,
    "ratio": 1.081,
    "points": 15.13,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 15 个",
    "evidence": [
     "https://github.com/popi-mkx3/popi_project/blob/HEAD/popi_software/popi/popi_code/models/popi.urdf",
     "https://github.com/popi-mkx3/popi_project/blob/HEAD/popi_software/popi/popi_description/xacro/const.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/popi-mkx3/popi_project",
  "name": "popi_project"
 },
 "REPO-POLLEN-ROBOTICS-GRABETTE": {
  "score": 58.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 44,
    "anchorValue": 21.0,
    "ratio": 1.2315,
    "points": 29.56,
    "measured": true,
    "detail": "仓库树中 44 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/pollen-robotics/grabette/blob/HEAD/packages/grabette/assembly/CAD_files/Left/STEP/Button.step",
     "https://github.com/pollen-robotics/grabette/blob/HEAD/packages/grabette/assembly/CAD_files/Left/STEP/Cameras_Holder_L.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/pollen-robotics/grabette/blob/HEAD/packages/grabette/assembly/Grabette_3DPrint_Guide.pdf",
     "https://github.com/pollen-robotics/grabette/blob/HEAD/packages/grabette/assembly/Grabette_Assembly.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 7,
    "anchorValue": 12.0,
    "ratio": 0.8107,
    "points": 11.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 7 个",
    "evidence": [
     "https://github.com/pollen-robotics/grabette/blob/HEAD/integrations/openarm/openarm_gripette_model/openarm_gripette_model/openarm_right/config.json.urdf",
     "https://github.com/pollen-robotics/grabette/blob/HEAD/integrations/openarm/openarm_gripette_model/openarm_gripette_model/openarm_right/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pollen-robotics/grabette",
  "name": "grabette"
 },
 "REPO-RUNTIMEROBOTICS-FUSION360-URDF-ROS2": {
  "score": 27.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/runtimerobotics/fusion360-urdf-ros2/blob/HEAD/demos/basic_robot.f3d",
     "https://github.com/runtimerobotics/fusion360-urdf-ros2/blob/HEAD/demos/rosbot/rosbot.f3d"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 4,
    "anchorValue": 12.0,
    "ratio": 0.6275,
    "points": 8.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 4 个",
    "evidence": [
     "https://github.com/runtimerobotics/fusion360-urdf-ros2/blob/HEAD/demos/rosbot/generated_pkg/rosbot_description/urdf/materials.xacro",
     "https://github.com/runtimerobotics/fusion360-urdf-ros2/blob/HEAD/demos/rosbot/generated_pkg/rosbot_description/urdf/rosbot.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/runtimerobotics/fusion360-urdf-ros2",
  "name": "fusion360-urdf-ros2"
 },
 "REPO-HARADUKA-MEVITA": {
  "score": 20.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 6,
    "anchorValue": 12.0,
    "ratio": 0.7587,
    "points": 10.62,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 6 个",
    "evidence": [
     "https://github.com/haraduka/mevita/blob/HEAD/models/meshes/mevita_long_mujoco.urdf",
     "https://github.com/haraduka/mevita/blob/HEAD/models/meshes/mevita_mujoco.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/haraduka/mevita",
  "name": "mevita"
 },
 "REPO-UWROBOTICS-MARSROVERHARDWARE": {
  "score": 87.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 22,
    "anchorValue": 21.0,
    "ratio": 1.0144,
    "points": 24.35,
    "measured": true,
    "detail": "仓库树中 22 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/uwrobotics/MarsRoverHardware/blob/HEAD/Projects/Arm/Rev1/Arm-PCB-Rev1.SLDPRT",
     "https://github.com/uwrobotics/MarsRoverHardware/blob/HEAD/Projects/Arm/Rev1/Arm-PCB-Rev1.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 59.25,
    "anchorValue": 35.5,
    "ratio": 1.1393,
    "points": 25.07,
    "measured": true,
    "detail": "最佳 BOM：Projects/Power Distribution Board/Rev2/Power Distribution Board BOM.xlsx（79 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/uwrobotics/MarsRoverHardware/HEAD/Projects/Power%20Distribution%20Board/Rev2/Power%20Distribution%20Board%20BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 58,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 58 个",
    "evidence": [
     "https://github.com/uwrobotics/MarsRoverHardware/blob/HEAD/Projects/48V-5V%20Buck/Rev%203/Project%20Outputs%20for%2048V-5V%20Buck/48V-5V%20Buck_Copper_Signal_1.gbr",
     "https://github.com/uwrobotics/MarsRoverHardware/blob/HEAD/Projects/48V-5V%20Buck/Rev%203/Project%20Outputs%20for%2048V-5V%20Buck/48V-5V%20Buck_Copper_Signal_2.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CC-BY-SA-4.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/uwrobotics/MarsRoverHardware",
  "name": "MarsRoverHardware"
 },
 "REPO-FERROLHO-ROTARY-INVERTED-PENDULUM": {
  "score": 30.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 8.25,
    "anchorValue": 35.5,
    "ratio": 0.6184,
    "points": 13.61,
    "measured": true,
    "detail": "最佳 BOM：website/src/content/docs/build/bom.md（11 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/ferrolho/rotary-inverted-pendulum/HEAD/website/src/content/docs/build/bom.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/ferrolho/rotary-inverted-pendulum/blob/HEAD/website/src/content/docs/build/assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/ferrolho/rotary-inverted-pendulum/blob/HEAD/model/model.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ferrolho/rotary-inverted-pendulum",
  "name": "rotary-inverted-pendulum"
 },
 "REPO-CREAROBOTICS-PRIMO": {
  "score": 27.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 19.0,
    "anchorValue": 35.5,
    "ratio": 0.8328,
    "points": 18.32,
    "measured": true,
    "detail": "最佳 BOM：02 - BOM AND MANUAL/PRIMO_1.1_Mechanical_BOM.xlsx（76 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/CreaRobotics/Primo/HEAD/02%20-%20BOM%20AND%20MANUAL/PRIMO_1.1_Mechanical_BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/CreaRobotics/Primo/blob/HEAD/02%20-%20BOM%20AND%20MANUAL/Assembly%20Manual%20PRIMO_1.1.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/CreaRobotics/Primo",
  "name": "Primo"
 },
 "REPO-LOONGOPEN-OPENLOONG-GYMLOONG": {
  "score": 37.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/loongOpen/OpenLoong-Gymloong/blob/HEAD/isaacgym/assets/urdf/kinova_description/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 56,
    "anchorValue": 12.0,
    "ratio": 1.5763,
    "points": 22.07,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 56 个",
    "evidence": [
     "https://github.com/loongOpen/OpenLoong-Gymloong/blob/HEAD/AzureLoong/resources/robots/OGHR/urdf/OGHR_wholeBody.urdf",
     "https://github.com/loongOpen/OpenLoong-Gymloong/blob/HEAD/AzureLoong/resources/robots/OGHR/urdf/OGHR_wholeBody_Simplified(12dof).urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/loongOpen/OpenLoong-Gymloong",
  "name": "OpenLoong-Gymloong"
 },
 "REPO-GUIDOSCHILLACI-UNDERWATER-DRONE": {
  "score": 33.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 36,
    "anchorValue": 21.0,
    "ratio": 1.1682,
    "points": 28.04,
    "measured": true,
    "detail": "仓库树中 36 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/guidoschillaci/underwater-drone/blob/HEAD/models/adapter_90.igs",
     "https://github.com/guidoschillaci/underwater-drone/blob/HEAD/models/adapter_90.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/guidoschillaci/underwater-drone",
  "name": "underwater-drone"
 },
 "REPO-MUROBOTICS-AI-HANDUMI-HW": {
  "score": 39.2,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 42,
    "anchorValue": 21.0,
    "ratio": 1.2168,
    "points": 29.2,
    "measured": true,
    "detail": "仓库树中 42 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/murobotics-ai/handumi-hw/blob/HEAD/hardware/STEP/gripper_tips/ARX-X5-2023/ARX-X5-2023-LEFT-Gripper.step",
     "https://github.com/murobotics-ai/handumi-hw/blob/HEAD/hardware/STEP/gripper_tips/ARX-X5-2023/ARX-X5-2023-RIGHT-Gripper.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 2 份 BOM，但格式无法解析（PDF 二进制，需专门解析器、Word 文档，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/murobotics-ai/handumi-hw",
  "name": "handumi-hw"
 },
 "REPO-CYPYPCCPY-ISAAC-MANIPULARL": {
  "score": 43.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/cypypccpy/Isaac-ManipulaRL/blob/HEAD/assets/urdf/kinova_description/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/cypypccpy/Isaac-ManipulaRL/blob/HEAD/assets/ur_robotics/ur5_gripper/ur5_gripper_assembly.urdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 98,
    "anchorValue": 12.0,
    "ratio": 1.7915,
    "points": 25.08,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 98 个",
    "evidence": [
     "https://github.com/cypypccpy/Isaac-ManipulaRL/blob/HEAD/assets/baxter/baxter_description/urdf/baxter.urdf",
     "https://github.com/cypypccpy/Isaac-ManipulaRL/blob/HEAD/assets/baxter/baxter_description/urdf/baxter.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/cypypccpy/Isaac-ManipulaRL",
  "name": "Isaac-ManipulaRL"
 },
 "REPO-CBEDIO-OPENSCOUT": {
  "score": 26.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/cbedio/OpenScout/blob/HEAD/Documentation/CAD_Files/STEP/Final%20Model.step",
     "https://github.com/cbedio/OpenScout/blob/HEAD/Documentation/CAD_Files/STEP/Model%20no%20Wheels.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/cbedio/OpenScout/blob/HEAD/Documentation/CAD_Files/Instruction_Manual/InstructionManual.pdf",
     "https://github.com/cbedio/OpenScout/blob/HEAD/Hardware/robot_with_lazy_susan_bearing/circuit_assembly_instructions.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/cbedio/OpenScout",
  "name": "OpenScout"
 },
 "REPO-SRA-VJTI-SRA-BOARD-HARDWARE-DESIGN": {
  "score": 64.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 29,
    "anchorValue": 21.0,
    "ratio": 1.1003,
    "points": 26.41,
    "measured": true,
    "detail": "仓库树中 29 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/SRA-VJTI/sra-board-hardware-design/blob/HEAD/3d_models/lsa_model/lsa-2024.step",
     "https://github.com/SRA-VJTI/sra-board-hardware-design/blob/HEAD/3d_models/lsa_model/lsa-2025.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 48,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 48 个",
    "evidence": [
     "https://github.com/SRA-VJTI/sra-board-hardware-design/blob/HEAD/LSA_board/gerber_lsa/lsa-B_Cu.gbr",
     "https://github.com/SRA-VJTI/sra-board-hardware-design/blob/HEAD/LSA_board/gerber_lsa/lsa-B_Mask.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/SRA-VJTI/sra-board-hardware-design",
  "name": "sra-board-hardware-design"
 },
 "REPO-NRDRGZ-JUST1": {
  "score": 29.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/NRdrgz/Just1/blob/HEAD/Bot/Hardware/CAD/Just1Assembly.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 8.25,
    "anchorValue": 35.5,
    "ratio": 0.6184,
    "points": 13.61,
    "measured": true,
    "detail": "最佳 BOM：Bot/Hardware/Bill_of_material.md（11 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/NRdrgz/Just1/HEAD/Bot/Hardware/Bill_of_material.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/NRdrgz/Just1",
  "name": "Just1"
 },
 "REPO-JANGTRINH-DESIGN-OS-3D-BLENDER": {
  "score": 66.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 29.25,
    "anchorValue": 35.5,
    "ratio": 0.9478,
    "points": 20.85,
    "measured": true,
    "detail": "最佳 BOM：builds/reference-keyboard/manufacturing/electrical/bom.json（39 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/jangtrinh/design-os-3d-blender/HEAD/builds/reference-keyboard/manufacturing/electrical/bom.json"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/jangtrinh/design-os-3d-blender/blob/HEAD/.agents/skills/blender-agent-core/references/assembly-sequences.md",
     "https://github.com/jangtrinh/design-os-3d-blender/blob/HEAD/.claude/skills/blender-agent-core/references/assembly-sequences.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 6,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 6 个",
    "evidence": [
     "https://github.com/jangtrinh/design-os-3d-blender/blob/HEAD/docs/reviews/dc-01/r02/cad/desktop-companion.kicad_pcb",
     "https://github.com/jangtrinh/design-os-3d-blender/blob/HEAD/docs/reviews/dc-01/r02/cad/desktop-companion.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jangtrinh/design-os-3d-blender",
  "name": "design-os-3d-blender"
 },
 "REPO-ALEXHUGE1-ALEXBOTMINI_HARDWARE": {
  "score": 70.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 339,
    "anchorValue": 21.0,
    "ratio": 1.8858,
    "points": 45.26,
    "measured": true,
    "detail": "仓库树中 339 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Alexhuge1/Alexbotmini_hardware/blob/HEAD/1_Mechanic/Alexbotmini(SW2URDF)/1_Lowerbody/Alexbotmini_lowerbody.SLDASM",
     "https://github.com/Alexhuge1/Alexbotmini_hardware/blob/HEAD/1_Mechanic/Alexbotmini(SW2URDF)/1_Lowerbody/GR1-06-2-048,右脚包胶足撑_copy.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 10.5,
    "anchorValue": 35.5,
    "ratio": 0.6789,
    "points": 14.94,
    "measured": true,
    "detail": "最佳 BOM：1_Mechanic/Alexbotmini(SW2URDF)/2_Wholebody/BOM.xlsx（42 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/Alexhuge1/Alexbotmini_hardware/HEAD/1_Mechanic/Alexbotmini%28SW2URDF%29/2_Wholebody/BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Alexhuge1/Alexbotmini_hardware",
  "name": "Alexbotmini_hardware"
 },
 "REPO-LIYITENG-AM-ARM": {
  "score": 55.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 27,
    "anchorValue": 21.0,
    "ratio": 1.078,
    "points": 25.87,
    "measured": true,
    "detail": "仓库树中 27 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/liyiteng/AM-ARM/blob/HEAD/am-arm200/stp/follower/OB_F_Camera.stp",
     "https://github.com/liyiteng/AM-ARM/blob/HEAD/am-arm200/stp/follower/OB_F_J3_Shoulder.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 4.5,
    "anchorValue": 35.5,
    "ratio": 0.4739,
    "points": 10.43,
    "measured": true,
    "detail": "最佳 BOM：am-arm200/bom.md（9 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/liyiteng/AM-ARM/HEAD/am-arm200/bom.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/liyiteng/AM-ARM/blob/HEAD/am-arm200/hardware_assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/liyiteng/AM-ARM/blob/HEAD/am-arm200-pro/urdf/urdf/am-arm200pro.urdf",
     "https://github.com/liyiteng/AM-ARM/blob/HEAD/am-arm200/urdf/urdf/am-arm200.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/liyiteng/AM-ARM",
  "name": "AM-ARM"
 },
 "REPO-DELTAXROBOT-DELTA-X-3D-PRINTED-PARTS": {
  "score": 26.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 13,
    "anchorValue": 21.0,
    "ratio": 0.8538,
    "points": 20.49,
    "measured": true,
    "detail": "仓库树中 13 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/deltaxrobot/Delta-X-3D-Printed-Parts/blob/HEAD/Delta%20X%201%20-%20v2.STEP",
     "https://github.com/deltaxrobot/Delta-X-3D-Printed-Parts/blob/HEAD/Delta-X-End-Effectors/Axis4%20-%20Gripper/Axis4%20Gripper.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/deltaxrobot/Delta-X-3D-Printed-Parts",
  "name": "Delta-X-3D-Printed-Parts"
 },
 "REPO-POLLEN-ROBOTICS-ELEC_RPI_ROBOT_HAT": {
  "score": 57.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 23.5,
    "anchorValue": 35.5,
    "ratio": 0.8892,
    "points": 19.56,
    "measured": true,
    "detail": "最佳 BOM：production/ASE01187-C1_elec_RPI_Robot_HAT_BOM.csv（47 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/pollen-robotics/elec_RPI_Robot_HAT/HEAD/production/ASE01187-C1_elec_RPI_Robot_HAT_BOM.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 8,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 8 个",
    "evidence": [
     "https://github.com/pollen-robotics/elec_RPI_Robot_HAT/blob/HEAD/audio.kicad_sch",
     "https://github.com/pollen-robotics/elec_RPI_Robot_HAT/blob/HEAD/dynamixel.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pollen-robotics/elec_RPI_Robot_HAT",
  "name": "elec_RPI_Robot_HAT"
 },
 "REPO-RED-RABBIT-ROBOTICS-RX1_BOM": {
  "score": 31.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 30.75,
    "anchorValue": 35.5,
    "ratio": 0.9612,
    "points": 21.15,
    "measured": true,
    "detail": "最佳 BOM：Red Rabbit Robotics RX1 Humanoid preliminary BOM V0.1 - 2024 07 26.xlsx（41 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/Red-Rabbit-Robotics/rx1_bom/HEAD/Red%20Rabbit%20Robotics%20RX1%20Humanoid%20preliminary%20BOM%20V0.1%20-%202024%2007%2026.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Red-Rabbit-Robotics/rx1_bom",
  "name": "rx1_bom"
 },
 "REPO-RHOBAN-ONSHAPE-TO-ROBOT-EXAMPLES": {
  "score": 62.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 128,
    "anchorValue": 21.0,
    "ratio": 1.5722,
    "points": 37.73,
    "measured": true,
    "detail": "仓库树中 128 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Rhoban/onshape-to-robot-examples/blob/HEAD/quadruped_mujoco/assets/body.scad",
     "https://github.com/Rhoban/onshape-to-robot-examples/blob/HEAD/quadruped_mujoco/assets/horn.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 14,
    "anchorValue": 12.0,
    "ratio": 1.0558,
    "points": 14.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 14 个",
    "evidence": [
     "https://github.com/Rhoban/onshape-to-robot-examples/blob/HEAD/2wheels_mujoco/robot.urdf",
     "https://github.com/Rhoban/onshape-to-robot-examples/blob/HEAD/2wheels_urdf/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Rhoban/onshape-to-robot-examples",
  "name": "onshape-to-robot-examples"
 },
 "REPO-MR-C4T-AB-SO-BOT": {
  "score": 8.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Mr-C4T/AB-SO-BOT/blob/HEAD/STEP/ABSO-EAR-Basic.step",
     "https://github.com/Mr-C4T/AB-SO-BOT/blob/HEAD/STEP/SOARM100-4040-Adapter-V2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Mr-C4T/AB-SO-BOT",
  "name": "AB-SO-BOT"
 },
 "REPO-DARRENLEVINE-TIPTAP": {
  "score": 13.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/DarrenLevine/TipTap/blob/HEAD/software/tiptap.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/DarrenLevine/TipTap",
  "name": "TipTap"
 },
 "REPO-MJBOTS-HOVERBOT": {
  "score": 49.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 11.5,
    "anchorValue": 35.5,
    "ratio": 0.7021,
    "points": 15.45,
    "measured": true,
    "detail": "最佳 BOM：BOM.md（46 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/mjbots/hoverbot/HEAD/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 13,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 13 个",
    "evidence": [
     "https://github.com/mjbots/hoverbot/blob/HEAD/hw/battery_pcb/bosch_pcb.kicad_pcb",
     "https://github.com/mjbots/hoverbot/blob/HEAD/hw/battery_pcb/bosch_pcb.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/mjbots/hoverbot",
  "name": "hoverbot"
 },
 "REPO-MANUFACTUREDMOTION-HEX": {
  "score": 75.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/Hex1_resources/CAD/Full_Assembly_V2%20v12.f3z",
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/Hex2_resources/CAD/2025-07-22_assembly.f3z"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 10.0,
    "anchorValue": 35.5,
    "ratio": 0.6666,
    "points": 14.66,
    "measured": true,
    "detail": "最佳 BOM：Hex3_resources/electronics/leg_board/V2.0/HEX3_leg_board_v2.0 v69_top_bom.csv（20 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/ManufacturedMotion/Hex/HEAD/Hex3_resources/electronics/leg_board/V2.0/HEX3_leg_board_v2.0%20v69_top_bom.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/docs/Hex2/getting-started.md",
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/docs/Hex3/assembly-instructions.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 8,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 8 个",
    "evidence": [
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/Hex1_resources/electronics/Hexapod_Controller_Rev1.brd",
     "https://github.com/ManufacturedMotion/Hex/blob/HEAD/Hex1_resources/electronics/Hexapod_Controller_Rev1.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ManufacturedMotion/Hex",
  "name": "Hex"
 },
 "REPO-LXLIAM-LEGGED_MPC_AMP": {
  "score": 47.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Lxliam/legged_mpc_amp/blob/HEAD/src/third_party/ocs2_robotic_assets/resources/mobile_manipulator/kinova/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/Lxliam/legged_mpc_amp/blob/HEAD/docs/build_guide.md",
     "https://github.com/Lxliam/legged_mpc_amp/blob/HEAD/docs/build_guide_EN.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 353,
    "anchorValue": 12.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 353 个",
    "evidence": [
     "https://github.com/Lxliam/legged_mpc_amp/blob/HEAD/src/legged_robot_description/urdf/Lite3/const.xacro",
     "https://github.com/Lxliam/legged_mpc_amp/blob/HEAD/src/legged_robot_description/urdf/a1/const.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Lxliam/legged_mpc_amp",
  "name": "legged_mpc_amp"
 },
 "REPO-NIMBRO-NIMBRO-OP2": {
  "score": 33.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 69,
    "anchorValue": 21.0,
    "ratio": 1.3745,
    "points": 32.99,
    "measured": true,
    "detail": "仓库树中 69 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/NimbRo/nimbro-op2/blob/HEAD/NimbRo-OP2/CAD/Gear1035machined.STEP",
     "https://github.com/NimbRo/nimbro-op2/blob/HEAD/NimbRo-OP2/CAD/Gear1035printed.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/NimbRo/nimbro-op2",
  "name": "nimbro-op2"
 },
 "REPO-ANTOBRANDI-BUMPER-BOT": {
  "score": 40.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 19,
    "anchorValue": 21.0,
    "ratio": 0.9692,
    "points": 23.26,
    "measured": true,
    "detail": "仓库树中 19 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AntoBrandi/Bumper-Bot/blob/HEAD/bumperbot_hardware/CAD/Arduino%20Nano.SLDPRT",
     "https://github.com/AntoBrandi/Bumper-Bot/blob/HEAD/bumperbot_hardware/CAD/BumperBotLaser.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 3,
    "anchorValue": 12.0,
    "ratio": 0.5405,
    "points": 7.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 3 个",
    "evidence": [
     "https://github.com/AntoBrandi/Bumper-Bot/blob/HEAD/bumperbot_description/urdf/bumperbot.urdf.xacro",
     "https://github.com/AntoBrandi/Bumper-Bot/blob/HEAD/bumperbot_description/urdf/bumperbot_gazebo.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AntoBrandi/Bumper-Bot",
  "name": "Bumper-Bot"
 },
 "REPO-ASSADOLLAHI-KAYRA": {
  "score": 42.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 63,
    "anchorValue": 21.0,
    "ratio": 1.3455,
    "points": 32.29,
    "measured": true,
    "detail": "仓库树中 63 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/assadollahi/kayra/blob/HEAD/FCStd/10L_lower_arm.FCStd",
     "https://github.com/assadollahi/kayra/blob/HEAD/FCStd/10R_lower_arm.FCStd"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/assadollahi/kayra",
  "name": "kayra"
 },
 "REPO-UWARG-HARDWARE": {
  "score": 94.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 76,
    "anchorValue": 21.0,
    "ratio": 1.4053,
    "points": 33.73,
    "measured": true,
    "detail": "仓库树中 76 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/UWARG/hardware/blob/HEAD/Projects/12-5V%20Protected%20Buck/PCB.step",
     "https://github.com/UWARG/hardware/blob/HEAD/Projects/12-5V%20Protected%20Buck/Project%20Outputs%20for%2012V-5V%20@%205A%20Buck%20Converter/PCB.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 52.0,
    "anchorValue": 35.5,
    "ratio": 1.1037,
    "points": 24.28,
    "measured": true,
    "detail": "最佳 BOM：Projects/Zeropilot 3.0 Primary/BOM_[No Variations].csv（52 行，规格系数 1.0）",
    "evidence": [
     "https://raw.githubusercontent.com/UWARG/hardware/HEAD/Projects/Zeropilot%203.0%20Primary/BOM_%5BNo%20Variations%5D.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 5,
    "anchorValue": 26.0,
    "ratio": 0.5436,
    "points": 8.7,
    "measured": true,
    "detail": "装配/构建类文档 5 份",
    "evidence": [
     "https://github.com/UWARG/hardware/blob/HEAD/Projects/12V-5V%20Buck%20Converter/Assembly%20Drawings_[No%20Variations].pdf",
     "https://github.com/UWARG/hardware/blob/HEAD/Projects/24V-12V,5V%20Buck%20Converter/Assembly%20Drawings_[No%20Variations].pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 57,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 57 个",
    "evidence": [
     "https://github.com/UWARG/hardware/blob/HEAD/Harness/Eclipse/Eclipse%20Harness.dsn",
     "https://github.com/UWARG/hardware/blob/HEAD/Harness/Examples/Battery%20splitter%20example.dsn"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/UWARG/hardware",
  "name": "hardware"
 },
 "REPO-IOTDESIGNSHOP-DEXHAND-MECHANICAL-BUILD": {
  "score": 18.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 10,
    "anchorValue": 21.0,
    "ratio": 0.7758,
    "points": 18.62,
    "measured": true,
    "detail": "仓库树中 10 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/iotdesignshop/dexhand-mechanical-build/blob/HEAD/printable-files/fingers-thumb/index/Index-Finger-Assembly%20v21.step",
     "https://github.com/iotdesignshop/dexhand-mechanical-build/blob/HEAD/printable-files/fingers-thumb/middle/Middle-Finger-Assembly%20v10.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/iotdesignshop/dexhand-mechanical-build",
  "name": "dexhand-mechanical-build"
 },
 "REPO-DFKI-RIC-UNDERACTUATED-LAB-ACROMONK": {
  "score": 19.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/dfki-ric-underactuated-lab/acromonk/blob/HEAD/hardware/CAD/acromonk.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/dfki-ric-underactuated-lab/acromonk/blob/HEAD/data/simulation_models/acromonk.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/dfki-ric-underactuated-lab/acromonk",
  "name": "acromonk"
 },
 "REPO-NIMICURTIS-SO101_ROS2": {
  "score": 49.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 16,
    "anchorValue": 21.0,
    "ratio": 0.9166,
    "points": 22.0,
    "measured": true,
    "detail": "仓库树中 16 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/so101_description/assets/step/Base_SO101.step",
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/so101_description/assets/step/Base_motor_holder_SO101.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/docs/_build/_sources/getting_started.rst.txt",
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/docs/getting_started.rst"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 9,
    "anchorValue": 12.0,
    "ratio": 0.8977,
    "points": 12.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 9 个",
    "evidence": [
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/so101_description/urdf/so101_new_calib.ros2_control.xacro",
     "https://github.com/nimiCurtis/so101_ros2/blob/HEAD/so101_description/urdf/so101_new_calib.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/nimiCurtis/so101_ros2",
  "name": "so101_ros2"
 },
 "REPO-WUPHILIPP-ROBOT_PARTS": {
  "score": 22.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/wuphilipp/robot_parts/blob/HEAD/a1_turtle_shell/a1_turtle_shell_v0.STEP",
     "https://github.com/wuphilipp/robot_parts/blob/HEAD/a1_turtle_shell/a1_turtle_shell_v0.X_T"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/wuphilipp/robot_parts",
  "name": "robot_parts"
 },
 "REPO-SYSU-ROBOTICSLAB-RAPID-HAND": {
  "score": 60.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidHandHardware/mechanical_structure/Model/Finger.STEP",
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidHandHardware/mechanical_structure/Model/rapidhand.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 18.75,
    "anchorValue": 35.5,
    "ratio": 0.8293,
    "points": 18.24,
    "measured": true,
    "detail": "最佳 BOM：RapidHandHardware/pcb_sync_module/pcb_sourcing/BOM_Board1_PCB1.xlsx（25 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/SYSU-RoboticsLab/RAPID-Hand/HEAD/RapidHandHardware/pcb_sync_module/pcb_sourcing/BOM_Board1_PCB1.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidTeleop/assets/robots/assembly/ur10e_allegro/ur10e_allegro_right_hand.urdf",
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidTeleop/assets/robots/assembly/ur10e_leap/ur10e_leap_right_hand.urdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 24,
    "anchorValue": 12.0,
    "ratio": 1.2549,
    "points": 17.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 24 个",
    "evidence": [
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidHandHardware/mechanical_structure/rapidhand_description/urdf/rapidhand.urdf",
     "https://github.com/SYSU-RoboticsLab/RAPID-Hand/blob/HEAD/RapidTeleop/assets/robots/arms/ur10e/ur10e.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/SYSU-RoboticsLab/RAPID-Hand",
  "name": "RAPID-Hand"
 },
 "REPO-IMINTHEMIDDLE-EMLOCO": {
  "score": 36.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ImIntheMiddle/EmLoco/blob/HEAD/isaacgym/assets/urdf/kinova_description/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 44,
    "anchorValue": 12.0,
    "ratio": 1.4841,
    "points": 20.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 44 个",
    "evidence": [
     "https://github.com/ImIntheMiddle/EmLoco/blob/HEAD/isaacgym/assets/urdf/anymal_b_simple_description/urdf/anymal.urdf",
     "https://github.com/ImIntheMiddle/EmLoco/blob/HEAD/isaacgym/assets/urdf/ball.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ImIntheMiddle/EmLoco",
  "name": "EmLoco"
 },
 "REPO-ZHICHENGSONG6-FLORES": {
  "score": 51.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 44,
    "anchorValue": 21.0,
    "ratio": 1.2315,
    "points": 29.56,
    "measured": true,
    "detail": "仓库树中 44 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ZhichengSong6/FLORES/blob/HEAD/Mechanical/body/batteryandcomputerholder.STEP",
     "https://github.com/ZhichengSong6/FLORES/blob/HEAD/Mechanical/body/batteryholder1.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 55,
    "anchorValue": 12.0,
    "ratio": 1.5694,
    "points": 21.97,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 55 个",
    "evidence": [
     "https://github.com/ZhichengSong6/FLORES/blob/HEAD/code/Mdog/descriptions/mdog/mdog_description/urdf/mdog.urdf",
     "https://github.com/ZhichengSong6/FLORES/blob/HEAD/code/Mdog/descriptions/mdog/mdog_description/xacro/gazebo_classic.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ZhichengSong6/FLORES",
  "name": "FLORES"
 },
 "REPO-HYBRIDROBOTICS-BERKELEY_HUMANOID_DESCRIPTION": {
  "score": 26.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 13,
    "anchorValue": 21.0,
    "ratio": 0.8538,
    "points": 20.49,
    "measured": true,
    "detail": "仓库树中 13 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/HybridRobotics/berkeley_humanoid_description/blob/HEAD/urdf/ll_faa.scad",
     "https://github.com/HybridRobotics/berkeley_humanoid_description/blob/HEAD/urdf/ll_ffe.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/HybridRobotics/berkeley_humanoid_description/blob/HEAD/urdf/gazebo.urdf",
     "https://github.com/HybridRobotics/berkeley_humanoid_description/blob/HEAD/urdf/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/HybridRobotics/berkeley_humanoid_description",
  "name": "berkeley_humanoid_description"
 },
 "REPO-AHADJAWAID-LATTICE": {
  "score": 33.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 12,
    "anchorValue": 21.0,
    "ratio": 0.8298,
    "points": 19.92,
    "measured": true,
    "detail": "仓库树中 12 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ahadjawaid/lattice/blob/HEAD/hardware/Camera%20Accessories/CameraAttachment.step",
     "https://github.com/ahadjawaid/lattice/blob/HEAD/hardware/Camera%20Accessories/CameraAttachment2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/ahadjawaid/lattice/blob/HEAD/simulation/lattice.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ahadjawaid/lattice",
  "name": "lattice"
 },
 "REPO-RED-RABBIT-ROBOTICS-RX1_ARM_HARDWARE": {
  "score": 18.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Red-Rabbit-Robotics/rx1_arm_hardware/blob/HEAD/assem_arm_v1.2.f3z",
     "https://github.com/Red-Rabbit-Robotics/rx1_arm_hardware/blob/HEAD/assem_arm_v1.2.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Red-Rabbit-Robotics/rx1_arm_hardware",
  "name": "rx1_arm_hardware"
 },
 "REPO-POPPY-PROJECT-POPPY-TORSO": {
  "score": 14.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/poppy-project/poppy-torso/blob/HEAD/hardware/Poppy_Torso.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "最佳 BOM：hardware/doc/BOM.md（0 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/poppy-project/poppy-torso/HEAD/hardware/doc/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/poppy-project/poppy-torso/blob/HEAD/hardware/doc/Poppy_Torso_assembly_instructions.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/poppy-project/poppy-torso/blob/HEAD/hardware/URDF/robots/Poppy_Torso.URDF",
     "https://github.com/poppy-project/poppy-torso/blob/HEAD/software/poppy_torso/poppy_torso.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/poppy-project/poppy-torso",
  "name": "poppy-torso"
 },
 "REPO-SIMONEPRI-ROBOPRIME": {
  "score": 24.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 1,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 14.0,
    "measured": true,
    "detail": "PCB / EDA 文件 1 个",
    "evidence": [
     "https://github.com/simonepri/roboprime/blob/HEAD/schematics/orcad/ROBOT.DSN"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/simonepri/roboprime",
  "name": "roboprime"
 },
 "REPO-OPENPODCAR-OPENPODCAR": {
  "score": 61.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 6,
    "anchorValue": 21.0,
    "ratio": 0.6295,
    "points": 15.11,
    "measured": true,
    "detail": "仓库树中 6 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/physicalVehicleNonRos/3D_parts/LCD_support.FCStd",
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/physicalVehicleNonRos/3D_parts/PCB_enclosure/pod%20car%20electronics%20case.FCStd"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 5,
    "anchorValue": 26.0,
    "ratio": 0.5436,
    "points": 8.7,
    "measured": true,
    "detail": "装配/构建类文档 5 份",
    "evidence": [
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/catkin_ws/src/csm/csm_manual.pdf",
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/docs/components/1212-12P_manual_en.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 18,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 18 个",
    "evidence": [
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/physicalVehicleNonRos/PCB/Podcar_PCB.kicad_pcb",
     "https://github.com/OpenPodcar/OpenPodcar/blob/HEAD/physicalVehicleNonRos/PCB/Podcar_PCB.net"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/OpenPodcar/OpenPodcar",
  "name": "OpenPodcar"
 },
 "REPO-RHOBAN-MJLAB_MICROBAN": {
  "score": 28.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 10,
    "anchorValue": 21.0,
    "ratio": 0.7758,
    "points": 18.62,
    "measured": true,
    "detail": "仓库树中 10 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Rhoban/mjlab_microban/blob/HEAD/src/mjlab_microban/robot/microban/assets/ankle_dbl_block__configuration_right.scad",
     "https://github.com/Rhoban/mjlab_microban/blob/HEAD/src/mjlab_microban/robot/microban/assets/femur__configuration_left.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Rhoban/mjlab_microban",
  "name": "mjlab_microban"
 },
 "REPO-CARPIT680-GIRAFFE": {
  "score": 39.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 8,
    "anchorValue": 21.0,
    "ratio": 0.7108,
    "points": 17.06,
    "measured": true,
    "detail": "仓库树中 8 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/carpit680/giraffe/blob/HEAD/CAD/STEP/Giraffe%20v1.1.step",
     "https://github.com/carpit680/giraffe/blob/HEAD/CAD/STEP/as5600_servo_1.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/carpit680/giraffe/blob/HEAD/giraffe_ws/src/giraffe_description/urdf/Giraffe.urdf",
     "https://github.com/carpit680/giraffe/blob/HEAD/giraffe_ws/src/giraffe_description/urdf/giraffe.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/carpit680/giraffe",
  "name": "giraffe"
 },
 "REPO-SERVODEVELOP-STAR-ARM-102": {
  "score": 47.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 9,
    "anchorValue": 21.0,
    "ratio": 0.7449,
    "points": 17.88,
    "measured": true,
    "detail": "仓库树中 9 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/servodevelop/Star-Arm-102/blob/HEAD/Hardware/parts/First-Person_Camera_Mount_Base.STEP",
     "https://github.com/servodevelop/Star-Arm-102/blob/HEAD/Hardware/parts/First-Person_Camera_Mount_Top_Cover.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 18.5,
    "anchorValue": 35.5,
    "ratio": 0.8257,
    "points": 18.17,
    "measured": true,
    "detail": "最佳 BOM：Hardware/parts/Star Arm 102-LD_BOM.xlsx（37 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/servodevelop/Star-Arm-102/HEAD/Hardware/parts/Star%20Arm%20102-LD_BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 7,
    "anchorValue": 12.0,
    "ratio": 0.8107,
    "points": 11.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 7 个",
    "evidence": [
     "https://github.com/servodevelop/Star-Arm-102/blob/HEAD/ROS2_HUMBLE/src/stararm102_description/urdf/stararm102_description.urdf",
     "https://github.com/servodevelop/Star-Arm-102/blob/HEAD/ROS2_HUMBLE/src/stararm102_gazebo/config/stararm102_gazebo.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/servodevelop/Star-Arm-102",
  "name": "Star-Arm-102"
 },
 "REPO-UIUCKIMLAB-CHILD": {
  "score": 38.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 18.0,
    "anchorValue": 35.5,
    "ratio": 0.8185,
    "points": 18.01,
    "measured": true,
    "detail": "最佳 BOM：hardware/BOM.md（24 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/uiuckimlab/CHILD/HEAD/hardware/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/uiuckimlab/CHILD/blob/HEAD/Teleop_Instruction.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 20,
    "anchorValue": 12.0,
    "ratio": 1.187,
    "points": 16.62,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 20 个",
    "evidence": [
     "https://github.com/uiuckimlab/CHILD/blob/HEAD/hw_interface/teleop_leaders/description/urdf/child_leaders/g1_child.urdf",
     "https://github.com/uiuckimlab/CHILD/blob/HEAD/hw_interface/teleop_leaders/description/urdf/child_leaders/g1_child.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/uiuckimlab/CHILD",
  "name": "CHILD"
 },
 "REPO-HYBRIDROBOTICS-BERKELEY-HUMANOID-LITE-ASSETS": {
  "score": 40.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 8,
    "anchorValue": 21.0,
    "ratio": 0.7108,
    "points": 17.06,
    "measured": true,
    "detail": "仓库树中 8 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/HybridRobotics/berkeley-humanoid-lite-assets/blob/HEAD/data/robots/berkeley_humanoid/berkeley_humanoid_lite/scad/aluminum_extrusion_100mm_center.scad",
     "https://github.com/HybridRobotics/berkeley-humanoid-lite-assets/blob/HEAD/data/robots/berkeley_humanoid/berkeley_humanoid_lite/scad/flat_foot.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 10,
    "anchorValue": 12.0,
    "ratio": 0.9349,
    "points": 13.09,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 10 个",
    "evidence": [
     "https://github.com/HybridRobotics/berkeley-humanoid-lite-assets/blob/HEAD/data/robots/berkeley_humanoid/berkeley_humanoid_lite/urdf/berkeley_humanoid_lite.urdf",
     "https://github.com/HybridRobotics/berkeley-humanoid-lite-assets/blob/HEAD/data/robots/berkeley_humanoid/berkeley_humanoid_lite/urdf/berkeley_humanoid_lite_biped.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CC-BY-SA-4.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/HybridRobotics/berkeley-humanoid-lite-assets",
  "name": "berkeley-humanoid-lite-assets"
 },
 "REPO-AIREXO-AIREXO-2": {
  "score": 51.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 72,
    "anchorValue": 21.0,
    "ratio": 1.388,
    "points": 33.31,
    "measured": true,
    "detail": "仓库树中 72 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AirExo/AirExo-2/blob/HEAD/assets/models/AirExo-2/AirExo2.SLDASM",
     "https://github.com/AirExo/AirExo-2/blob/HEAD/assets/models/AirExo-2/AirExo2.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/AirExo/AirExo-2/blob/HEAD/airexo/urdf_models/airexo/airexo.urdf",
     "https://github.com/AirExo/AirExo-2/blob/HEAD/airexo/urdf_models/airexo/airexo_no_handle.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AirExo/AirExo-2",
  "name": "AirExo-2"
 },
 "REPO-THECOGNIFLY-COGNIFLY-STL": {
  "score": 26.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 30,
    "anchorValue": 21.0,
    "ratio": 1.1109,
    "points": 26.66,
    "measured": true,
    "detail": "仓库树中 30 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/thecognifly/CogniFly-STL/blob/HEAD/CogniFly_v0/Base%20v17.step",
     "https://github.com/thecognifly/CogniFly-STL/blob/HEAD/CogniFly_v1/New%20New%20Frame%20v87.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/thecognifly/CogniFly-STL",
  "name": "CogniFly-STL"
 },
 "REPO-INTERNROBOTICS-TAG": {
  "score": 52.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 68,
    "anchorValue": 21.0,
    "ratio": 1.3698,
    "points": 32.88,
    "measured": true,
    "detail": "仓库树中 68 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/InternRobotics/TAG/blob/HEAD/Hardware/3D_Models/0_palm/Palm.step",
     "https://github.com/InternRobotics/TAG/blob/HEAD/Hardware/3D_Models/0_palm/palm1.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 11,
    "anchorValue": 12.0,
    "ratio": 0.9688,
    "points": 13.56,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 11 个",
    "evidence": [
     "https://github.com/InternRobotics/TAG/blob/HEAD/Retargeting/Hand_Retargeting/robot_source/Glove_v2.0/21DoF_Glove.urdf",
     "https://github.com/InternRobotics/TAG/blob/HEAD/Retargeting/Hand_Retargeting/robot_source/XHAND1_URDF_ver1.3/xhand1_left/urdf/xhand_left.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/InternRobotics/TAG",
  "name": "TAG"
 },
 "REPO-WELL-ROBOTICS-STRIDE": {
  "score": 37.5,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 124,
    "anchorValue": 21.0,
    "ratio": 1.562,
    "points": 37.49,
    "measured": true,
    "detail": "仓库树中 124 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/well-robotics/STRIDE/blob/HEAD/Mechanical%20Design/bipedal%20robot/1112-0001-0048.SLDPRT",
     "https://github.com/well-robotics/STRIDE/blob/HEAD/Mechanical%20Design/bipedal%20robot/1201-0043-0002.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 1 份 BOM，但格式无法解析（旧版 Excel 二进制格式，标准库不支持）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/well-robotics/STRIDE",
  "name": "STRIDE"
 },
 "REPO-HUGGINGFACE-LEROBOT-HUMANOID-HARDWARE": {
  "score": 39.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 32.0,
    "anchorValue": 35.5,
    "ratio": 0.972,
    "points": 21.38,
    "measured": true,
    "detail": "最佳 BOM：hardware/bom/bom.csv（128 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/huggingface/lerobot-humanoid-hardware/HEAD/hardware/bom/bom.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 4,
    "anchorValue": 26.0,
    "ratio": 0.4883,
    "points": 7.81,
    "measured": true,
    "detail": "装配/构建类文档 4 份",
    "evidence": [
     "https://github.com/huggingface/lerobot-humanoid-hardware/blob/HEAD/docs/assembly/assembly_guide.md",
     "https://github.com/huggingface/lerobot-humanoid-hardware/blob/HEAD/docs/assembly/assembly_guide_outline.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/huggingface/lerobot-humanoid-hardware",
  "name": "lerobot-humanoid-hardware"
 },
 "REPO-SSLOY-PENNY": {
  "score": 19.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "最佳 BOM：hardware/motherboard/BOM.html（0 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/ssloy/penny/HEAD/hardware/motherboard/BOM.html"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 1,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 14.0,
    "measured": true,
    "detail": "PCB / EDA 文件 1 个",
    "evidence": [
     "https://github.com/ssloy/penny/blob/HEAD/hardware/motherboard/gerber/penny.DRL"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "WTFPL（非标准开放硬件许可，需人工确认）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ssloy/penny",
  "name": "penny"
 },
 "REPO-LIAOCHIKON-ALTO-3D-PRINTED-6-AXIS-ROBOTIC-ARM": {
  "score": 37.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/liaochikon/ALTO-3D-Printed-6-Axis-Robotic-Arm/blob/HEAD/hardware/alto_t_3%20v108.f3z",
     "https://github.com/liaochikon/ALTO-3D-Printed-6-Axis-Robotic-Arm/blob/HEAD/hardware/alto_t_3%20v108.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 10.25,
    "anchorValue": 35.5,
    "ratio": 0.6728,
    "points": 14.8,
    "measured": true,
    "detail": "最佳 BOM：hardware/alto_bom.xlsx（41 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/liaochikon/ALTO-3D-Printed-6-Axis-Robotic-Arm/HEAD/hardware/alto_bom.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/liaochikon/ALTO-3D-Printed-6-Axis-Robotic-Arm",
  "name": "ALTO-3D-Printed-6-Axis-Robotic-Arm"
 },
 "REPO-NEWDEXTERITY-OPEN-BIOMANUAL-MANIPULATION-SYSTEM": {
  "score": 61.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 248,
    "anchorValue": 21.0,
    "ratio": 1.785,
    "points": 42.84,
    "measured": true,
    "detail": "仓库树中 248 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/newdexterity/Open-Biomanual-Manipulation-System/blob/HEAD/CAD/Back_Transmission_Pulley/16004-zz-20x42x8_bearing.stp",
     "https://github.com/newdexterity/Open-Biomanual-Manipulation-System/blob/HEAD/CAD/Back_Transmission_Pulley/6804_zz_bearing_20x32x7.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 9,
    "anchorValue": 12.0,
    "ratio": 0.8977,
    "points": 12.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 9 个",
    "evidence": [
     "https://github.com/newdexterity/Open-Biomanual-Manipulation-System/blob/HEAD/Software/moah_src/moa_description/urdf/dual_arm.xacro",
     "https://github.com/newdexterity/Open-Biomanual-Manipulation-System/blob/HEAD/Software/moah_src/moa_description/urdf/left_arm_moa_transmission.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/newdexterity/Open-Biomanual-Manipulation-System",
  "name": "Open-Biomanual-Manipulation-System"
 },
 "REPO-BOOSTERROBOTICS-BOOSTER_ASSETS": {
  "score": 23.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 10,
    "anchorValue": 12.0,
    "ratio": 0.9349,
    "points": 13.09,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 10 个",
    "evidence": [
     "https://github.com/BoosterRobotics/booster_assets/blob/HEAD/robots/K1/K1_22dof.urdf",
     "https://github.com/BoosterRobotics/booster_assets/blob/HEAD/robots/K1/K1_locomotion.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/BoosterRobotics/booster_assets",
  "name": "booster_assets"
 },
 "REPO-HYPERSPAWN-DROPBEAR": {
  "score": 94.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 153,
    "anchorValue": 21.0,
    "ratio": 1.6295,
    "points": 39.11,
    "measured": true,
    "detail": "仓库树中 153 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Arm%20&%20Hand/Arm/DropbearRightArm.step",
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Arm%20&%20Hand/Arm/Fusion%20360/DropbearRightArm.f3d"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 82,
    "anchorValue": 26.0,
    "ratio": 1.3407,
    "points": 21.45,
    "measured": true,
    "detail": "装配/构建类文档 82 份",
    "evidence": [
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Full_Body/URDF/dropbear_detailed_urdf/CMakeLists.txt",
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Full_Body/URDF/dropbear_detailed_urdf/urdf/gazebo/arm.xacro"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 6794,
    "anchorValue": 12.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 6794 个",
    "evidence": [
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Full_Body/URDF/dropbear_detailed_urdf/urdf/gazebo/arm.xacro",
     "https://github.com/Hyperspawn/Dropbear/blob/HEAD/CAD_Files/Assembly/Full_Body/URDF/dropbear_detailed_urdf/urdf/gazebo/battery.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Hyperspawn/Dropbear",
  "name": "Dropbear"
 },
 "REPO-TORK-A-RTMROS_NEXTAGE": {
  "score": 23.2,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 2 份 BOM，但格式无法解析（PDF 二进制，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 9,
    "anchorValue": 26.0,
    "ratio": 0.6986,
    "points": 11.18,
    "measured": true,
    "detail": "装配/构建类文档 9 份",
    "evidence": [
     "https://github.com/tork-a/rtmros_nextage/blob/HEAD/doc/manual_ja_development-pc-setup.md",
     "https://github.com/tork-a/rtmros_nextage/blob/HEAD/doc/manual_ja_reference.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/tork-a/rtmros_nextage/blob/HEAD/nextage_calibration/models/checkerboard_horizontal.urdf",
     "https://github.com/tork-a/rtmros_nextage/blob/HEAD/nextage_calibration/models/checkerboard_waist.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/tork-a/rtmros_nextage",
  "name": "rtmros_nextage"
 },
 "REPO-ARTFULBYTES-NSUMO_HARDWARE": {
  "score": 75.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 8,
    "anchorValue": 21.0,
    "ratio": 0.7108,
    "points": 17.06,
    "measured": true,
    "detail": "仓库树中 8 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/artfulbytes/nsumo_hardware/blob/HEAD/libs/3dmodels/530480310.stp",
     "https://github.com/artfulbytes/nsumo_hardware/blob/HEAD/libs/3dmodels/530480510.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 27.5,
    "anchorValue": 35.5,
    "ratio": 0.9312,
    "points": 20.49,
    "measured": true,
    "detail": "最佳 BOM：manufacture/rev1/assembly/nsumo_bom_2021-06-13.csv（55 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/artfulbytes/nsumo_hardware/HEAD/manufacture/rev1/assembly/nsumo_bom_2021-06-13.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 24,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 24 个",
    "evidence": [
     "https://github.com/artfulbytes/nsumo_hardware/blob/HEAD/manufacture/rev1/gerber/nsumo-B_Cu.gbr",
     "https://github.com/artfulbytes/nsumo_hardware/blob/HEAD/manufacture/rev1/gerber/nsumo-B_Mask.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/artfulbytes/nsumo_hardware",
  "name": "nsumo_hardware"
 },
 "REPO-ZITEH-LEAP": {
  "score": 73.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 215,
    "anchorValue": 21.0,
    "ratio": 1.739,
    "points": 41.74,
    "measured": true,
    "detail": "仓库树中 215 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ziteh/LEAP/blob/HEAD/3D_models/Inventor/機械/HarmonicDrive/25%20WG%20BEARING%20DS.ipt",
     "https://github.com/ziteh/LEAP/blob/HEAD/3D_models/Inventor/機械/HarmonicDrive/SHD-25-2SH-CS.ipt"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/ziteh/LEAP/blob/HEAD/pcb/LEAP.kicad_pcb",
     "https://github.com/ziteh/LEAP/blob/HEAD/pcb/LEAP.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MPL-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ziteh/LEAP",
  "name": "LEAP"
 },
 "REPO-MAKERSPET-MAKERSPET_SNOOPY": {
  "score": 13.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/makerspet/makerspet_snoopy/blob/HEAD/urdf/robot.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/makerspet/makerspet_snoopy",
  "name": "makerspet_snoopy"
 },
 "REPO-LEGGEDROBOTICS-OCS2_ROBOTIC_ASSETS": {
  "score": 28.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/leggedrobotics/ocs2_robotic_assets/blob/HEAD/resources/mobile_manipulator/kinova/meshes/arm.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 11,
    "anchorValue": 12.0,
    "ratio": 0.9688,
    "points": 13.56,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 11 个",
    "evidence": [
     "https://github.com/leggedrobotics/ocs2_robotic_assets/blob/HEAD/resources/anymal_c/urdf/anymal.urdf",
     "https://github.com/leggedrobotics/ocs2_robotic_assets/blob/HEAD/resources/ballbot/urdf/ballbot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/leggedrobotics/ocs2_robotic_assets",
  "name": "ocs2_robotic_assets"
 },
 "REPO-TOKIROBOT-PSI1_HARDWARE": {
  "score": 56.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 10,
    "anchorValue": 21.0,
    "ratio": 0.7758,
    "points": 18.62,
    "measured": true,
    "detail": "仓库树中 10 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/tokirobot/PSI1_Hardware/blob/HEAD/PSI1_STEP/Xaxisdrive/X-axis_cybergear_helical.step",
     "https://github.com/tokirobot/PSI1_Hardware/blob/HEAD/PSI1_STEP/Yaxisdrive/Y-axis_cybergear_helical.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 22,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 22 个",
    "evidence": [
     "https://github.com/tokirobot/PSI1_Hardware/blob/HEAD/connector_gerber/imu_led_connect-B_Cu.gbr",
     "https://github.com/tokirobot/PSI1_Hardware/blob/HEAD/connector_gerber/imu_led_connect-B_Mask.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/tokirobot/PSI1_Hardware",
  "name": "PSI1_Hardware"
 },
 "REPO-MR-C4T-LECYBORG": {
  "score": 38.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 10,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 10 个",
    "evidence": [
     "https://github.com/Mr-C4T/LeCyborg/blob/HEAD/pcb/myoesp32-b_cu.gbr",
     "https://github.com/Mr-C4T/LeCyborg/blob/HEAD/pcb/myoesp32-b_mask.gbr"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Mr-C4T/LeCyborg",
  "name": "LeCyborg"
 },
 "REPO-GONZACERV-NOAH-HARDWARE": {
  "score": 91.3,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 594,
    "anchorValue": 21.0,
    "ratio": 2.0,
    "points": 48.0,
    "measured": true,
    "detail": "仓库树中 594 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/3D_model/assembly_base.SLDASM",
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/3D_model/assembly_button.SLDASM"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 1 份 BOM，但格式无法解析（OpenDocument 表格，需专门解析器）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/Doc/assembly_generic.md",
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/Doc/assembly_noah.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 18,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 18 个",
    "evidence": [
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/PCB/MC34063.sch",
     "https://github.com/GonzaCerv/noah-hardware/blob/HEAD/PCB/Microcontroller.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/GonzaCerv/noah-hardware",
  "name": "noah-hardware"
 },
 "REPO-VULCAN-FORGE-SOURCCEY-HARDWARE": {
  "score": 47.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 111,
    "anchorValue": 21.0,
    "ratio": 1.5265,
    "points": 36.64,
    "measured": true,
    "detail": "仓库树中 111 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/vulcan-forge/sourccey-hardware/blob/HEAD/Robot/Accessories/Breastplate.step",
     "https://github.com/vulcan-forge/sourccey-hardware/blob/HEAD/Robot/Accessories/Circle%20Accessory%20Base.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/vulcan-forge/sourccey-hardware/blob/HEAD/Sourccey%20Assembly%20Manual%20Draft%201.0.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 3,
    "anchorValue": 12.0,
    "ratio": 0.5405,
    "points": 7.57,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 3 个",
    "evidence": [
     "https://github.com/vulcan-forge/sourccey-hardware/blob/HEAD/URDF/Arm.urdf",
     "https://github.com/vulcan-forge/sourccey-hardware/blob/HEAD/URDF/ArmLeft/ArmLeft.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/vulcan-forge/sourccey-hardware",
  "name": "sourccey-hardware"
 },
 "REPO-SHEKIT-PEEQO-ROBOT-HARDWARE": {
  "score": 43.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/shekit/peeqo-robot-hardware/blob/HEAD/3d_design/peeqo_design.iges"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 8,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 8 个",
    "evidence": [
     "https://github.com/shekit/peeqo-robot-hardware/blob/HEAD/eagle_files/arduino-breakout/mini_breakout_with_chip_100kx2.brd",
     "https://github.com/shekit/peeqo-robot-hardware/blob/HEAD/eagle_files/arduino-breakout/mini_breakout_with_chip_100kx2.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/shekit/peeqo-robot-hardware",
  "name": "peeqo-robot-hardware"
 },
 "REPO-ANTDROID-HEXAPOD-ANTDROID-HARDWARE": {
  "score": 47.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 76,
    "anchorValue": 21.0,
    "ratio": 1.4053,
    "points": 33.73,
    "measured": true,
    "detail": "仓库树中 76 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/antdroid-hexapod/antdroid-hardware/blob/HEAD/src/Antdroid.CATProduct",
     "https://github.com/antdroid-hexapod/antdroid-hardware/blob/HEAD/src/Electronica/Arduino%20Mega%202560/Arduino%20Mega.CATPart"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/antdroid-hexapod/antdroid-hardware/blob/HEAD/assembly/Assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/antdroid-hexapod/antdroid-hardware",
  "name": "antdroid-hardware"
 },
 "REPO-RED-RABBIT-ROBOTICS-RX1_HAND_HARDWARE": {
  "score": 18.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Red-Rabbit-Robotics/rx1_hand_hardware/blob/HEAD/Assem_hand.f3z",
     "https://github.com/Red-Rabbit-Robotics/rx1_hand_hardware/blob/HEAD/Assem_hand.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Red-Rabbit-Robotics/rx1_hand_hardware",
  "name": "rx1_hand_hardware"
 },
 "REPO-MARCDCLS-COCONUTS": {
  "score": 13.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.75,
    "anchorValue": 35.5,
    "ratio": 0.1556,
    "points": 3.42,
    "measured": true,
    "detail": "最佳 BOM：hardware/BOM.md（3 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/MarcDcls/coconuts/HEAD/hardware/BOM.md"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/MarcDcls/coconuts/blob/HEAD/hardware/benchmark/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/MarcDcls/coconuts",
  "name": "coconuts"
 },
 "REPO-HIDRO-IRI-BORINOT": {
  "score": 45.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 29,
    "anchorValue": 21.0,
    "ratio": 1.1003,
    "points": 26.41,
    "measured": true,
    "detail": "仓库树中 29 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/hidro-iri/Borinot/blob/HEAD/hardware/cad_files/legs/rod_cap_shock_absorber.STEP",
     "https://github.com/hidro-iri/Borinot/blob/HEAD/hardware/cad_files/legs/rod_connector_cross_block_a.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 5,
    "anchorValue": 26.0,
    "ratio": 0.5436,
    "points": 8.7,
    "measured": true,
    "detail": "装配/构建类文档 5 份",
    "evidence": [
     "https://github.com/hidro-iri/Borinot/blob/HEAD/hardware/2_airframe_assembly.md",
     "https://github.com/hidro-iri/Borinot/blob/HEAD/hardware/3_main_body_assembly.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/hidro-iri/Borinot",
  "name": "Borinot"
 },
 "REPO-MILOSRASIC98-OPENMOBILEROBOTICMANIPULATOR": {
  "score": 18.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/MilosRasic98/OpenMobileRoboticManipulator/blob/HEAD/CAD/NXP%20Robot%20Platform%20V2.step",
     "https://github.com/MilosRasic98/OpenMobileRoboticManipulator/blob/HEAD/CAD/NXP%20Robot%20Platform.f3d"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/MilosRasic98/OpenMobileRoboticManipulator",
  "name": "OpenMobileRoboticManipulator"
 },
 "REPO-MARGINALLYCLEVER-SIXI": {
  "score": 32.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 2,
    "anchorValue": 1.0,
    "ratio": 1.585,
    "points": 22.19,
    "measured": true,
    "detail": "PCB / EDA 文件 2 个",
    "evidence": [
     "https://github.com/MarginallyClever/sixi/blob/HEAD/sixi%20schematic/sixi%20schematic.kicad_pcb",
     "https://github.com/MarginallyClever/sixi/blob/HEAD/sixi%20schematic/sixi%20schematic.sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/MarginallyClever/sixi",
  "name": "sixi"
 },
 "REPO-INTROLAB-SECURBOT": {
  "score": 47.0,
  "anchorScore": 100.0,
  "measuredWeight": 78,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 117,
    "anchorValue": 21.0,
    "ratio": 1.5434,
    "points": 37.04,
    "measured": true,
    "detail": "仓库树中 117 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/introlab/securbot/blob/HEAD/hardware/96%20-%20Mechanical/Charge%20Station/AprilTagHolder.SLDPRT",
     "https://github.com/introlab/securbot/blob/HEAD/hardware/96%20-%20Mechanical/Charge%20Station/Bolts_Nuts_Misc/90592A095_STEEL%20HEX%20NUT.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": null,
    "points": null,
    "measured": false,
    "detail": "有 2 份 BOM，但格式无法解析（旧版 Excel 二进制格式，标准库不支持）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "有 22 分权重的维度未能测量，已按 0 计入；总分为下界，实际不低于此值"
  ],
  "repository": "https://github.com/introlab/securbot",
  "name": "securbot"
 },
 "REPO-OPENBRUSHOGRAPH-OPENBRUSHOGRAPH_HARDWARE": {
  "score": 18.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/openBrushograph/openBrushograph_hardware/blob/HEAD/Extras/colourContainers.scad",
     "https://github.com/openBrushograph/openBrushograph_hardware/blob/HEAD/Extras/petri_ColourContainers/petriDishes_openBrushograph.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/openBrushograph/openBrushograph_hardware",
  "name": "openBrushograph_hardware"
 },
 "REPO-EM0SH-ONDROID": {
  "score": 43.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 32,
    "anchorValue": 21.0,
    "ratio": 1.1312,
    "points": 27.15,
    "measured": true,
    "detail": "仓库树中 32 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/em0sh/ondroid/blob/HEAD/CAD/ondroid-00/Archive/A1.FCStd",
     "https://github.com/em0sh/ondroid/blob/HEAD/CAD/ondroid-00/Archive/A1.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 3,
    "anchorValue": 26.0,
    "ratio": 0.4206,
    "points": 6.73,
    "measured": true,
    "detail": "装配/构建类文档 3 份",
    "evidence": [
     "https://github.com/em0sh/ondroid/blob/HEAD/docs/gettingStarted/TODO.md",
     "https://github.com/em0sh/ondroid/blob/HEAD/docs/gettingStarted/index.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-P-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/em0sh/ondroid",
  "name": "ondroid"
 },
 "REPO-PERSEUS784-SELF-ORGANIZING-BOTS": {
  "score": 27.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 8,
    "anchorValue": 21.0,
    "ratio": 0.7108,
    "points": 17.06,
    "measured": true,
    "detail": "仓库树中 8 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/perseus784/Self-organizing-bots/blob/HEAD/3D%20files/Version1(Coreless%20motors)/Raw%20Solidworks%20files/base.SLDPRT",
     "https://github.com/perseus784/Self-organizing-bots/blob/HEAD/3D%20files/Version1(Coreless%20motors)/Raw%20Solidworks%20files/castor.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "GPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/perseus784/Self-organizing-bots",
  "name": "Self-organizing-bots"
 },
 "REPO-ZUBAIR-IRSHAD-MANIPULATOR_PARAMETER_IDENTIFICATION": {
  "score": 31.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/zubair-irshad/manipulator_parameter_identification/blob/HEAD/09-URDF/scenes/objects/box.SLDPRT",
     "https://github.com/zubair-irshad/manipulator_parameter_identification/blob/HEAD/09-URDF/scenes/objects/fulcrum.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 44,
    "anchorValue": 12.0,
    "ratio": 1.4841,
    "points": 20.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 44 个",
    "evidence": [
     "https://github.com/zubair-irshad/manipulator_parameter_identification/blob/HEAD/09-URDF/3DOF-WIP/3dof.urdf",
     "https://github.com/zubair-irshad/manipulator_parameter_identification/blob/HEAD/09-URDF/7DOFArm/singlearm.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/zubair-irshad/manipulator_parameter_identification",
  "name": "manipulator_parameter_identification"
 },
 "REPO-SOURCE-ROBOTICS-PAROL6-ROS2-MOVEIT": {
  "score": 24.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 14,
    "anchorValue": 12.0,
    "ratio": 1.0558,
    "points": 14.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 14 个",
    "evidence": [
     "https://github.com/Source-Robotics/PAROL6-ROS2-MOVEIT/blob/HEAD/ros_parol/src/install/parol6/share/parol6/urdf/PAROL6%20(copy).urdf",
     "https://github.com/Source-Robotics/PAROL6-ROS2-MOVEIT/blob/HEAD/ros_parol/src/install/parol6/share/parol6/urdf/parol6.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Source-Robotics/PAROL6-ROS2-MOVEIT",
  "name": "PAROL6-ROS2-MOVEIT"
 },
 "REPO-RED-RABBIT-ROBOTICS-RX2_ARM_HARDWARE_BETA": {
  "score": 18.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Red-Rabbit-Robotics/rx2_arm_hardware_beta/blob/HEAD/rx2_arm_hardware_beta.f3z",
     "https://github.com/Red-Rabbit-Robotics/rx2_arm_hardware_beta/blob/HEAD/rx2_arm_hardware_beta.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Red-Rabbit-Robotics/rx2_arm_hardware_beta",
  "name": "rx2_arm_hardware_beta"
 },
 "REPO-RAPHAELCHANG-DRAGONFLYTE-HARDWARE": {
  "score": 26.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 7,
    "anchorValue": 21.0,
    "ratio": 0.6727,
    "points": 16.15,
    "measured": true,
    "detail": "仓库树中 7 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/raphaelchang/dragonflyte-hardware/blob/HEAD/Dragonflyte/Boards/Dragonfleye/CAD/CameraSketch.SLDPRT",
     "https://github.com/raphaelchang/dragonflyte-hardware/blob/HEAD/Dragonflyte/Boards/Dragonfleye/CAD/LensMount.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "LGPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/raphaelchang/dragonflyte-hardware",
  "name": "dragonflyte-hardware"
 },
 "REPO-JACKVIAL-ASSEMBLER0": {
  "score": 33.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 8,
    "anchorValue": 21.0,
    "ratio": 0.7108,
    "points": 17.06,
    "measured": true,
    "detail": "仓库树中 8 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jackvial/assembler0/blob/HEAD/packages/assembler0-hardware/scad/SO101_screwdriver_bit_holder.scad",
     "https://github.com/jackvial/assembler0/blob/HEAD/packages/assembler0-hardware/scad/SO101_screwdriver_leader_parts.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 2,
    "anchorValue": 12.0,
    "ratio": 0.4283,
    "points": 6.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 2 个",
    "evidence": [
     "https://github.com/jackvial/assembler0/blob/HEAD/packages/assembler0-simulator/src/assembler0_simulator/low_cost_robot/low-cost-arm.urdf",
     "https://github.com/jackvial/assembler0/blob/HEAD/packages/assembler0-simulator/src/assembler0_simulator/low_cost_robot_6dof_screwdriver/low_cost_robot_screwdriver.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jackvial/assembler0",
  "name": "assembler0"
 },
 "REPO-ADRIAEIK-FUSION2URDF": {
  "score": 33.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 2,
    "anchorValue": 21.0,
    "ratio": 0.3554,
    "points": 8.53,
    "measured": true,
    "detail": "仓库树中 2 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Adriaeik/fusion2URDF/blob/HEAD/examples/Assem1_description/Assem1.f3z",
     "https://github.com/Adriaeik/fusion2URDF/blob/HEAD/examples/Panther_description/Panther.f3d"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/Adriaeik/fusion2URDF/blob/HEAD/docs/GETTING_STARTED.md"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 7,
    "anchorValue": 12.0,
    "ratio": 0.8107,
    "points": 11.35,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 7 个",
    "evidence": [
     "https://github.com/Adriaeik/fusion2URDF/blob/HEAD/examples/Assem1_description/urdf/Assem1.urdf",
     "https://github.com/Adriaeik/fusion2URDF/blob/HEAD/examples/Assem1_description/urdf/Assem1.urdf.xacro"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Adriaeik/fusion2URDF",
  "name": "fusion2URDF"
 },
 "REPO-VITRANI-SHADOWTAC": {
  "score": 18.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Vitrani/ShadowTac/blob/HEAD/CADs/sensor_base.step",
     "https://github.com/Vitrani/ShadowTac/blob/HEAD/CADs/sensor_casing.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Vitrani/ShadowTac",
  "name": "ShadowTac"
 },
 "REPO-PLIAM1105-3D-PRINTED-ROS-SLAM-ROBOT": {
  "score": 24.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/pliam1105/3D-Printed-ROS-SLAM-Robot/blob/HEAD/Fusion360/Drive.step",
     "https://github.com/pliam1105/3D-Printed-ROS-SLAM-Robot/blob/HEAD/Fusion360/Motor.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/pliam1105/3D-Printed-ROS-SLAM-Robot/blob/HEAD/ROS%20Codes/slam_bot/src/description/slam_bot_description.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pliam1105/3D-Printed-ROS-SLAM-Robot",
  "name": "3D-Printed-ROS-SLAM-Robot"
 },
 "REPO-ZEROTH-ROBOTICS-HARDWARE": {
  "score": 53.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 3,
    "anchorValue": 21.0,
    "ratio": 0.4485,
    "points": 10.76,
    "measured": true,
    "detail": "仓库树中 3 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/zeroth-robotics/hardware/blob/HEAD/Custom%20Electronics%20/IMU%20Mount,%20Rev%20A/IMU%20Mount.step",
     "https://github.com/zeroth-robotics/hardware/blob/HEAD/Custom%20Electronics%20/Milk%20V%20Hat,%20Rev%20A/MilkVHat.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 10.0,
    "anchorValue": 35.5,
    "ratio": 0.6666,
    "points": 14.66,
    "measured": true,
    "detail": "最佳 BOM：Custom Electronics /Milk V Hat, Rev B/REVB_BOM_MilkVHat.csv（20 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/zeroth-robotics/hardware/HEAD/Custom%20Electronics%20/Milk%20V%20Hat%2C%20Rev%20B/REVB_BOM_MilkVHat.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 6,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 6 个",
    "evidence": [
     "https://github.com/zeroth-robotics/hardware/blob/HEAD/Custom%20Electronics%20/IMU%20Mount,%20Rev%20A/Gerbers/IMU%20Mount-NPTH.drl",
     "https://github.com/zeroth-robotics/hardware/blob/HEAD/Custom%20Electronics%20/IMU%20Mount,%20Rev%20A/Gerbers/IMU%20Mount-PTH.drl"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/zeroth-robotics/hardware",
  "name": "hardware"
 },
 "REPO-RT-NET-CRANE_X7_HARDWARE": {
  "score": 18.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 4,
    "anchorValue": 21.0,
    "ratio": 0.5207,
    "points": 12.5,
    "measured": true,
    "detail": "仓库树中 4 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/rt-net/crane_x7_Hardware/blob/HEAD/3d_cad_data/v1.0/CRANE-X7_HandA_RealSenseD435mount.stp",
     "https://github.com/rt-net/crane_x7_Hardware/blob/HEAD/3d_cad_data/v1.0/CRANE-X7v20180626.stp"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/rt-net/crane_x7_Hardware",
  "name": "crane_x7_Hardware"
 },
 "REPO-INTELLIGENT-SOFT-ROBOTS-BALL_LAUNCHER_HARDWARE": {
  "score": 45.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 13,
    "anchorValue": 21.0,
    "ratio": 0.8538,
    "points": 20.49,
    "measured": true,
    "detail": "仓库树中 13 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/intelligent-soft-robots/ball_launcher_hardware/blob/HEAD/3d_models/aimy.STEP",
     "https://github.com/intelligent-soft-robots/ball_launcher_hardware/blob/HEAD/3d_models/aimy_without_screws.STEP"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 22,
    "anchorValue": 26.0,
    "ratio": 0.9513,
    "points": 15.22,
    "measured": true,
    "detail": "装配/构建类文档 22 份",
    "evidence": [
     "https://github.com/intelligent-soft-robots/ball_launcher_hardware/blob/HEAD/technical_drawings/assembly_aimy.pdf",
     "https://github.com/intelligent-soft-robots/ball_launcher_hardware/blob/HEAD/technical_drawings/assembly_aimy_3D.PDF"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "BSD-3-Clause（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/intelligent-soft-robots/ball_launcher_hardware",
  "name": "ball_launcher_hardware"
 },
 "REPO-PIB-ROCKS-PIB-BACKEND": {
  "score": 13.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/pib-rocks/pib-backend/blob/HEAD/ros_packages/pibsim_webots/resource/pib.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "AGPL-3.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/pib-rocks/pib-backend",
  "name": "pib-backend"
 },
 "REPO-RIPL-HAPCOMPASS": {
  "score": 15.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/ripl/HapCompass/blob/HEAD/hardware/fusion/HapCompass.f3z"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/ripl/HapCompass",
  "name": "HapCompass"
 },
 "REPO-HIBISCUS22-OPENHARDWAREAGV": {
  "score": 11.2,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/hibiscus22/OpenHardwareAGV/blob/HEAD/3D-model/OH_AGV.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/hibiscus22/OpenHardwareAGV",
  "name": "OpenHardwareAGV"
 },
 "REPO-ALYONAMININA-SPIRO.HARDWARE": {
  "score": 29.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 12,
    "anchorValue": 21.0,
    "ratio": 0.8298,
    "points": 19.92,
    "measured": true,
    "detail": "仓库树中 12 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/AlyonaMinina/SPIRO.Hardware/blob/HEAD/3.%20Files%20for%20SPIRO%203D%20printable%20hardware/SPIRO%20hardware%20component%20sets/Autodesk%20Fusion%20360%20files/Set%2001.%20Alyona%20Minina.%202019.%20UHEI.f3d",
     "https://github.com/AlyonaMinina/SPIRO.Hardware/blob/HEAD/3.%20Files%20for%20SPIRO%203D%20printable%20hardware/SPIRO%20hardware%20component%20sets/Autodesk%20Fusion%20360%20files/Set%2002.%20Alyona%20Minina.%202019.%20UHEI.f3d"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/AlyonaMinina/SPIRO.Hardware/blob/HEAD/1.%20Assembly%20Instructions/SPIRO%20assembly%20instructions.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/AlyonaMinina/SPIRO.Hardware",
  "name": "SPIRO.Hardware"
 },
 "REPO-OPEN-RDC-BIPEDAL_ROBOT_HARDWARE": {
  "score": 93.3,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 217,
    "anchorValue": 21.0,
    "ratio": 1.742,
    "points": 41.81,
    "measured": true,
    "detail": "仓库树中 217 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/open-rdc/Bipedal_Robot_Hardware/blob/HEAD/Circuit/Kicad/Libraries/G7EB-1A-E2_DC12/G7EB_1A_E2.step",
     "https://github.com/open-rdc/Bipedal_Robot_Hardware/blob/HEAD/Circuit/Kicad/Libraries/XT30UPB-M/XT30UPB-M.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 24.0,
    "anchorValue": 35.5,
    "ratio": 0.8948,
    "points": 19.69,
    "measured": true,
    "detail": "最佳 BOM：Circuit/Doc/V2/250317_logic_circuit_v2_parts_list.csv（48 行，规格系数 0.5）",
    "evidence": [
     "https://raw.githubusercontent.com/open-rdc/Bipedal_Robot_Hardware/HEAD/Circuit/Doc/V2/250317_logic_circuit_v2_parts_list.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 66,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 66 个",
    "evidence": [
     "https://github.com/open-rdc/Bipedal_Robot_Hardware/blob/HEAD/Circuit/Kicad/V1/logic/logic/logic.kicad_pcb",
     "https://github.com/open-rdc/Bipedal_Robot_Hardware/blob/HEAD/Circuit/Kicad/V1/logic/logic/logic.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/open-rdc/Bipedal_Robot_Hardware/blob/HEAD/Robot_Models/URDF/urdf_simple-model/simple_model.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/open-rdc/Bipedal_Robot_Hardware",
  "name": "Bipedal_Robot_Hardware"
 },
 "REPO-RHOBAN-SIGMABAN_URDF": {
  "score": 38.1,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 22,
    "anchorValue": 21.0,
    "ratio": 1.0144,
    "points": 24.35,
    "measured": true,
    "detail": "仓库树中 22 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/Rhoban/sigmaban_urdf/blob/HEAD/cleat.scad",
     "https://github.com/Rhoban/sigmaban_urdf/blob/HEAD/foot_plate.scad"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/Rhoban/sigmaban_urdf/blob/HEAD/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Rhoban/sigmaban_urdf",
  "name": "sigmaban_urdf"
 },
 "REPO-AUTOMATICDAI-ARDUINO-YAOJI": {
  "score": 7.7,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 2.5,
    "anchorValue": 35.5,
    "ratio": 0.3482,
    "points": 7.66,
    "measured": true,
    "detail": "最佳 BOM：documents/BOM List.txt（10 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/automaticdai/arduino-yaoji/HEAD/documents/BOM%20List.txt"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/automaticdai/arduino-yaoji",
  "name": "arduino-yaoji"
 },
 "REPO-KSCALELABS-KBOT-MODELS": {
  "score": 22.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 8,
    "anchorValue": 12.0,
    "ratio": 0.8566,
    "points": 11.99,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 8 个",
    "evidence": [
     "https://github.com/kscalelabs/kbot-models/blob/HEAD/kbot-full-collisions/robot.mjcf",
     "https://github.com/kscalelabs/kbot-models/blob/HEAD/kbot-full-collisions/robot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/kscalelabs/kbot-models",
  "name": "kbot-models"
 },
 "REPO-JHU-LCSR-ATTIC-BHAND_MODEL": {
  "score": 22.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 10,
    "anchorValue": 21.0,
    "ratio": 0.7758,
    "points": 18.62,
    "measured": true,
    "detail": "仓库树中 10 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/jhu-lcsr-attic/bhand_model/blob/HEAD/cad/BarrettHand280-SolidWorks/B4157.SLDPRT",
     "https://github.com/jhu-lcsr-attic/bhand_model/blob/HEAD/cad/BarrettHand280-SolidWorks/B4158.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/jhu-lcsr-attic/bhand_model/blob/HEAD/robots/bhand_model.URDF"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/jhu-lcsr-attic/bhand_model",
  "name": "bhand_model"
 },
 "REPO-TC-HUANG-LOW_COST_ROBOT": {
  "score": 35.8,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 16,
    "anchorValue": 21.0,
    "ratio": 0.9166,
    "points": 22.0,
    "measured": true,
    "detail": "仓库树中 16 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/tc-huang/low_cost_robot/blob/HEAD/hardware/follower/follower_arm.f3z",
     "https://github.com/tc-huang/low_cost_robot/blob/HEAD/hardware/follower/step/arm.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/tc-huang/low_cost_robot/blob/HEAD/simulation/low_cost_robot/low-cost-arm.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/tc-huang/low_cost_robot",
  "name": "low_cost_robot"
 },
 "REPO-GH0STLYKN1GHT-PRIMO": {
  "score": 27.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 19.0,
    "anchorValue": 35.5,
    "ratio": 0.8328,
    "points": 18.32,
    "measured": true,
    "detail": "最佳 BOM：02 - BOM AND MANUAL/PRIMO_1.1_Mechanical_BOM.xlsx（76 行，规格系数 0.25）",
    "evidence": [
     "https://raw.githubusercontent.com/Gh0stlyKn1ght/Primo/HEAD/02%20-%20BOM%20AND%20MANUAL/PRIMO_1.1_Mechanical_BOM.xlsx"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/Gh0stlyKn1ght/Primo/blob/HEAD/02%20-%20BOM%20AND%20MANUAL/Assembly%20Manual%20PRIMO_1.1.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/Gh0stlyKn1ght/Primo",
  "name": "Primo"
 },
 "REPO-REGULAR030-SATURNARM": {
  "score": 83.9,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 87,
    "anchorValue": 21.0,
    "ratio": 1.4485,
    "points": 34.76,
    "measured": true,
    "detail": "仓库树中 87 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/regular030/SaturnArm/blob/HEAD/Chassis/Full-Arm.f3z",
     "https://github.com/regular030/SaturnArm/blob/HEAD/Chassis/arm_pcb.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 17.25,
    "anchorValue": 35.5,
    "ratio": 0.8073,
    "points": 17.76,
    "measured": true,
    "detail": "最佳 BOM：BOM - Arm.csv（23 行，规格系数 0.75）",
    "evidence": [
     "https://raw.githubusercontent.com/regular030/SaturnArm/HEAD/BOM%20-%20Arm.csv"
    ]
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/regular030/SaturnArm/blob/HEAD/Unity/arm/Library/Bee/artifacts/1900b0aE.dag/Assembly-CSharp.UnityAdditionalFile.txt"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 15,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 15 个",
    "evidence": [
     "https://github.com/regular030/SaturnArm/blob/HEAD/Kicad/arm.kicad_pcb",
     "https://github.com/regular030/SaturnArm/blob/HEAD/Kicad/arm.kicad_sch"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库未声明许可",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/regular030/SaturnArm",
  "name": "SaturnArm"
 },
 "REPO-S1LENT4GNT-KOCH-V1-1": {
  "score": 44.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 51,
    "anchorValue": 21.0,
    "ratio": 1.2783,
    "points": 30.68,
    "measured": true,
    "detail": "仓库树中 51 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/s1lent4gnt/koch-v1-1/blob/HEAD/hardware/extras/SolidWorks/HuggingFace_Block.SLDPRT",
     "https://github.com/s1lent4gnt/koch-v1-1/blob/HEAD/hardware/extras/SolidWorks/LeRobot_Block.SLDPRT"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/s1lent4gnt/koch-v1-1/blob/HEAD/simulation/follower.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/s1lent4gnt/koch-v1-1",
  "name": "koch-v1-1"
 },
 "ARM-FAZE4": {
  "score": 24.5,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 1,
    "anchorValue": 21.0,
    "ratio": 0.2242,
    "points": 5.38,
    "measured": true,
    "detail": "仓库树中 1 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/PCrnjak/Faze4-Robotic-arm/blob/HEAD/Faze4_DIST_board_v2_files/Faze4_dist_v2_STEP.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 2,
    "anchorValue": 26.0,
    "ratio": 0.3333,
    "points": 5.33,
    "measured": true,
    "detail": "装配/构建类文档 2 份",
    "evidence": [
     "https://github.com/PCrnjak/Faze4-Robotic-arm/blob/HEAD/Assembly%20instructions%203.1.pdf",
     "https://github.com/PCrnjak/Faze4-Robotic-arm/blob/HEAD/URDF_FAZE4/urdf/Final_light_assembly_URDF.urdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 1,
    "anchorValue": 12.0,
    "ratio": 0.2702,
    "points": 3.78,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 1 个",
    "evidence": [
     "https://github.com/PCrnjak/Faze4-Robotic-arm/blob/HEAD/URDF_FAZE4/urdf/Final_light_assembly_URDF.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "CERN-OHL-S-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "人工策展条目：其证据包含仓库之外的资源（官方站点 / EasyEDA / OSF 等）。本指数只统计仓库内文件，故此分数会低于项目实际证据水平。"
  ],
  "repository": "https://github.com/PCrnjak/Faze4-Robotic-arm",
  "name": "Faze4 Robotic Arm"
 },
 "EDU-OLIMEX-MINIBOT": {
  "score": 41.4,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 1,
    "anchorValue": 26.0,
    "ratio": 0.2103,
    "points": 3.36,
    "measured": true,
    "detail": "装配/构建类文档 1 份",
    "evidence": [
     "https://github.com/OLIMEX/Minibot/blob/HEAD/ASSEMBLY/Minibot.pdf"
    ]
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 14,
    "anchorValue": 1.0,
    "ratio": 2.0,
    "points": 28.0,
    "measured": true,
    "detail": "PCB / EDA 文件 14 个",
    "evidence": [
     "https://github.com/OLIMEX/Minibot/blob/HEAD/HARDWARE/MiniBot_RevA.kicad_pcb",
     "https://github.com/OLIMEX/Minibot/blob/HEAD/HARDWARE/MiniBot_RevA.net"
    ]
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "Apache-2.0（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "人工策展条目：其证据包含仓库之外的资源（官方站点 / EasyEDA / OSF 等）。本指数只统计仓库内文件，故此分数会低于项目实际证据水平。"
  ],
  "repository": "https://github.com/OLIMEX/Minibot",
  "name": "Olimex MINIBOT"
 },
 "EDU-ROSMO": {
  "score": 10.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 0,
    "anchorValue": 21.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库树中 0 个参数化 CAD 文件",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 0,
    "anchorValue": 12.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 0 个",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "MIT（允许再制造）",
    "evidence": []
   }
  ],
  "flags": [
   "人工策展条目：其证据包含仓库之外的资源（官方站点 / EasyEDA / OSF 等）。本指数只统计仓库内文件，故此分数会低于项目实际证据水平。"
  ],
  "repository": "https://github.com/rosmo-robot/rosmo-robot.github.io",
  "name": "ROSMO"
 },
 "QUAD-OPENQUADRUPED": {
  "score": 42.6,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 28,
    "anchorValue": 21.0,
    "ratio": 1.0894,
    "points": 26.14,
    "measured": true,
    "detail": "仓库树中 28 个参数化 CAD 文件",
    "evidence": [
     "https://github.com/adham-elarabawy/OpenQuadruped/blob/HEAD/hardware/3d-printing/Body/step/Adapter_Plate.step",
     "https://github.com/adham-elarabawy/OpenQuadruped/blob/HEAD/hardware/3d-printing/Body/step/Back_Inner_Shoulder.step"
    ]
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 0.0,
    "anchorValue": 35.5,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "仓库内无 BOM 文件",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 0,
    "anchorValue": 26.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "装配/构建类文档 0 份",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 0,
    "anchorValue": 1.0,
    "ratio": 0.0,
    "points": 0.0,
    "measured": true,
    "detail": "PCB / EDA 文件 0 个",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 6,
    "anchorValue": 12.0,
    "ratio": 0.7587,
    "points": 10.62,
    "measured": true,
    "detail": "URDF / MJCF / SDF / USD 文件 6 个",
    "evidence": [
     "https://github.com/adham-elarabawy/OpenQuadruped/blob/HEAD/ros-workspace/src/open_quadruped/urdf/accessories.urdf.xacro",
     "https://github.com/adham-elarabawy/OpenQuadruped/blob/HEAD/ros-workspace/src/open_quadruped/urdf/spot.urdf"
    ]
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 0.5,
    "anchorValue": 1.0,
    "ratio": 0.585,
    "points": 5.85,
    "measured": true,
    "detail": "有 LICENSE 文件但无法识别为标准许可",
    "evidence": []
   }
  ],
  "flags": [
   "人工策展条目：其证据包含仓库之外的资源（官方站点 / EasyEDA / OSF 等）。本指数只统计仓库内文件，故此分数会低于项目实际证据水平。"
  ],
  "repository": "https://github.com/adham-elarabawy/OpenQuadruped",
  "name": "OpenQuadruped"
 },
 "HUM-BERKELEY-LITE": {
  "score": 100.0,
  "anchorScore": 100.0,
  "measuredWeight": 100,
  "dimensions": [
   {
    "key": "design",
    "label": "设计可制造性",
    "weight": 24,
    "unit": "个参数化 CAD 文件",
    "value": 21.0,
    "anchorValue": 21.0,
    "ratio": 1.0,
    "points": 24.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   },
   {
    "key": "sourcing",
    "label": "物料可采购性",
    "weight": 22,
    "unit": "个可采购行项（行数 × 规格系数）",
    "value": 35.5,
    "anchorValue": 35.5,
    "ratio": 1.0,
    "points": 22.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   },
   {
    "key": "assembly",
    "label": "装配可理解性",
    "weight": 16,
    "unit": "份装配/构建文档",
    "value": 26.0,
    "anchorValue": 26.0,
    "ratio": 1.0,
    "points": 16.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   },
   {
    "key": "electronics",
    "label": "电子可复现性",
    "weight": 14,
    "unit": "个 PCB / EDA 设计文件",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 14.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   },
   {
    "key": "kinematics",
    "label": "运动学可验证性",
    "weight": 14,
    "unit": "个运动学描述文件",
    "value": 12.0,
    "anchorValue": 12.0,
    "ratio": 1.0,
    "points": 14.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   },
   {
    "key": "licensing",
    "label": "授权明确性",
    "weight": 10,
    "unit": "许可明确度（0–1）",
    "value": 1.0,
    "anchorValue": 1.0,
    "ratio": 1.0,
    "points": 10.0,
    "measured": true,
    "detail": "锚点基准值（由脚本从参考实现与硬件仓库树解析）",
    "evidence": []
   }
  ],
  "flags": [],
  "repository": "https://github.com/HybridRobotics/Berkeley-Humanoid-Lite",
  "name": "Berkeley Humanoid Lite"
 }
};
