/**
 * Berkeley Humanoid Lite — parts catalogue.
 *
 * Scope: every part that can be identified from the publicly released BOM,
 * CAD, documentation and code for release HUM-BERKELEY-LITE.
 *
 * Evidence sources:
 *   BOM    Google Sheet "Berkeley Humanoid Lite BOM" (M6C12 / 5010 / Humanoid tabs)
 *   CAD    HybridRobotics/Berkeley-Humanoid-Lite-Assets (URDF + Onshape meshes)
 *   DOCS   berkeley-humanoid-lite.gitbook.io/docs
 *   CODE   Berkeley-Humanoid-Lite / -Lowlevel / Recoil-Motor-Controller-BESC
 *   PAPER  Demonstrating Berkeley Humanoid Lite (RSS 2025)
 */

export type PartClass = "BUY" | "PRINT" | "PCB" | "ASSEMBLE";

/** Procurement status derived from the public release. Not live stock data. */
export type Availability = "orderable" | "alternative" | "nosource" | "missing";

export type EvidenceKey = "BOM" | "CAD" | "DOCS" | "CODE" | "PAPER";

export interface Evidence {
  key: EvidenceKey;
  label: string;
  detail: string;
  url: string;
}

export const EVIDENCE: Record<EvidenceKey, Evidence> = {
  BOM: {
    key: "BOM",
    label: "BOM",
    detail: "Berkeley Humanoid Lite BOM 工作表（M6C12 / 5010 / 整机 三个页签）",
    url: "https://docs.google.com/spreadsheets/d/1AQEHcH_nPkXYfor2-h7bwNIUMmsePtAm53epnsWgZXc/edit",
  },
  CAD: {
    key: "CAD",
    label: "CAD",
    detail: "Berkeley-Humanoid-Lite-Assets 的 URDF 与 Onshape 导出网格",
    url: "https://github.com/HybridRobotics/Berkeley-Humanoid-Lite-Assets",
  },
  DOCS: {
    key: "DOCS",
    label: "文档",
    detail: "Berkeley Humanoid Lite 官方文档站",
    url: "https://berkeley-humanoid-lite.gitbook.io/docs",
  },
  CODE: {
    key: "CODE",
    label: "代码",
    detail: "主仓库、Lowlevel 控制代码与电机控制器固件",
    url: "https://github.com/HybridRobotics/Berkeley-Humanoid-Lite",
  },
  PAPER: {
    key: "PAPER",
    label: "论文",
    detail: "Demonstrating Berkeley Humanoid Lite (RSS 2025)",
    url: "https://lite.berkeley-humanoid.org/static/paper/demonstrating-berkeley-humanoid-lite.pdf",
  },
};

export interface Part {
  id: string;
  name: string;
  nameZh: string;
  cls: PartClass;
  mpn?: string;
  manufacturer?: string;
  /** Manufacturer resolved from the MPN rather than printed in the release text. */
  manufacturerFromMpn?: boolean;
  spec?: string;
  /** Quantity per one instance of the owning assembly. */
  qty: number;
  unitUsd?: number;
  unitRmb?: number;
  link?: { us?: string; cn?: string };
  availability: Availability;
  evidence: EvidenceKey[];
  note?: string;
  /** Printed part: cost carried by the PLA filament line. */
  printed?: boolean;
  /**
   * Listed in the release but carrying no subtotal in the BOM total
   * (e.g. an optional alternative). Kept visible, excluded from cost sums.
   */
  excludeFromTotal?: boolean;
  /** Unit meaning for `unitUsd` / `unitRmb`, shown next to the price. */
  priceUnit?: string;
}

/* ------------------------------------------------------------------ */
/* Actuator modules                                                    */
/* ------------------------------------------------------------------ */

export type ActuatorVariant = "6512" | "5010";

export interface ActuatorInfo {
  variant: ActuatorVariant;
  label: string;
  drivenBy: string;
  unitUsd: number;
  unitRmb: number;
  sourceLabel: string;
  url: string;
}

export const ACTUATORS: Record<ActuatorVariant, ActuatorInfo> = {
  "6512": {
    variant: "6512",
    label: "6512 执行器",
    drivenBy: "MAD Components M6C12 150KV",
    unitUsd: 188.69,
    unitRmb: 1122.76,
    sourceLabel: "BOM「M6C12 Actuator」页签",
    url: "https://docs.google.com/spreadsheets/d/1AQEHcH_nPkXYfor2-h7bwNIUMmsePtAm53epnsWgZXc/edit#gid=0",
  },
  "5010": {
    variant: "5010",
    label: "5010 执行器",
    drivenBy: "MAD Components 5010 110KV",
    unitUsd: 136.36,
    unitRmb: 675.9,
    sourceLabel: "BOM「5010 Actuator」页签",
    url: "https://docs.google.com/spreadsheets/d/1AQEHcH_nPkXYfor2-h7bwNIUMmsePtAm53epnsWgZXc/edit#gid=125444430",
  },
};

/** Printable actuator components, named from the paper's exploded view and the printing doc. */
const PRINTED_ACTUATOR_PARTS: { key: string; name: string; nameZh: string; spec: string }[] = [
  { key: "housing", name: "Actuator housing", nameZh: "执行器壳体", spec: "壳体轮廓打印配置" },
  { key: "output", name: "Output shaft", nameZh: "输出轴", spec: "壳体轮廓打印配置" },
  { key: "motor-shell", name: "Motor shell", nameZh: "电机外壳", spec: "壳体轮廓打印配置" },
  { key: "cycloid", name: "Cycloidal disk", nameZh: "摆线轮", spec: "轴件轮廓打印配置" },
  { key: "input", name: "Input shaft", nameZh: "输入轴", spec: "轴件轮廓打印配置" },
  { key: "motor-shaft", name: "Motor shaft", nameZh: "电机轴", spec: "轴件轮廓打印配置" },
  { key: "spacer", name: "Spacers", nameZh: "垫片", spec: "轴件轮廓打印配置" },
];

const PRINT_NOTE = "无 MPN 与独立价格，成本计入 PLA 耗材行。模型来自 Onshape 装配体与 MakerWorld 3MF。";

function actuatorParts(variant: ActuatorVariant): Part[] {
  const isBig = variant === "6512";

  const printed: Part[] = PRINTED_ACTUATOR_PARTS.map((p) => ({
    id: `${variant}-print-${p.key}`,
    name: p.name,
    nameZh: p.nameZh,
    cls: "PRINT",
    spec: p.spec,
    qty: 1,
    availability: "missing",
    evidence: ["CAD", "DOCS"],
    printed: true,
    note: PRINT_NOTE,
  }));

  const common: Part[] = [
    {
      id: "esc",
      name: "B-G431B-ESC1 motor controller",
      nameZh: "电机控制器（驱动板）",
      cls: "PCB",
      mpn: "B-G431B-ESC1",
      manufacturer: "STMicroelectronics",
      spec: "STM32G431 三相 FOC 驱动板，固件为 Recoil-Motor-Controller-BESC",
      qty: 1,
      unitUsd: 18.97,
      unitRmb: 165,
      link: {
        us: "https://www.digikey.com/en/products/detail/stmicroelectronics/B-G431B-ESC1/10321670",
        cn: "https://item.taobao.com/item.htm?abbucket=8&id=656153143517",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS", "CODE", "PAPER"],
      note: "两种执行器共用同一驱动板；CAN 焊盘很脆弱，焊接与走线需格外小心。",
    },
    {
      id: "as5600",
      name: "AS5600 I2C magnetic encoder",
      nameZh: "AS5600 磁编码器",
      cls: "BUY",
      mpn: "AS5600",
      manufacturer: "ams OSRAM",
      manufacturerFromMpn: true,
      spec: "I2C 位置编码器，需先改板载电阻配置",
      qty: 1,
      unitUsd: 3.3,
      unitRmb: 5.4,
      link: {
        us: "https://www.amazon.com/gp/product/B09LMB3PTZ",
        cn: "https://item.taobao.com/item.htm?abbucket=8&id=828546819482",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
      note: "随编码器附带的径向充磁磁铁需用热熔胶固定到电机轴；必须搬移板上电阻并焊出 SDA/SCL。",
    },
    {
      id: "mr106",
      name: "MR106-2RS bearing",
      nameZh: "MR106-2RS 轴承",
      cls: "BUY",
      mpn: "MR106-2RS",
      spec: "输入轴–摆线轮、输入轴–输出轴之间",
      qty: 13,
      unitUsd: 0.87,
      unitRmb: 0.9,
      link: {
        us: "https://www.amazon.com/dp/B082PSCNKB",
        cn: "https://detail.tmall.com/item.htm?abbucket=9&id=728753970557&skuId=5050168324949",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
    },
    {
      id: "6701",
      name: "6701-2RS bearing",
      nameZh: "6701-2RS 轴承",
      cls: "BUY",
      mpn: "6701-2RS",
      spec: "摆线轮–输出轴之间",
      qty: 2,
      unitUsd: 0.94,
      unitRmb: 2.3,
      link: {
        us: "https://www.amazon.com/gp/product/B082PQ8DC2",
        cn: "https://detail.tmall.com/item.htm?abbucket=9&id=672836796497&skuId=5017505094887",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
    },
    {
      id: "insert-m2",
      name: "M2 × 3 × 3.5 mm heat insert",
      nameZh: "M2 铜螺母（编码器固定）",
      cls: "BUY",
      mpn: "M2 × 3 × 3.5 mm",
      spec: "M2 螺纹嵌件",
      qty: 4,
      unitUsd: 0.07,
      unitRmb: 0.08,
      link: {
        us: "https://www.amazon.com/dp/B0B8GN63S2",
        cn: "https://detail.tmall.com/item.htm?abbucket=15&id=782342751792&skuId=5345071429845",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
    },
    {
      id: "insert-m3",
      name: "M3 × 4 × 5 mm heat insert",
      nameZh: "M3 铜螺母",
      cls: "BUY",
      mpn: "M3 × 4 × 5 mm insert",
      spec: "M3 螺纹嵌件，用于打印件层间补强",
      qty: 24,
      unitUsd: 0.08,
      unitRmb: 0.13,
      link: {
        us: "https://www.amazon.com/gp/product/B0BTYF2MMD",
        cn: "https://item.taobao.com/item.htm?id=593581996419&skuId=4189077672129",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
    },
    {
      id: `${variant}-pla`,
      name: "PLA filament",
      nameZh: "PLA 耗材（执行器用量）",
      cls: "PRINT",
      mpn: "PLA Basic Filament",
      manufacturer: "Bambu Lab / Hatchbox",
      spec: isBig ? "0.12 kg / 台" : "0.10 kg / 台",
      qty: isBig ? 0.12 : 0.1,
      unitUsd: 25.99,
      unitRmb: 79,
      priceUnit: "kg",
      link: {
        us: "https://www.amazon.com/gp/product/B00J0GMMP6",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=693972799714",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS"],
      note: isBig ? "按 0.12 kg 计，BOM 行计 3.12 美元 / 9.48 元。" : "按 0.10 kg 计，BOM 行计 2.60 美元 / 7.90 元。",
    },
    {
      id: `${variant}-misc`,
      name: "Cables & connectors (actuator)",
      nameZh: "线材与接插件（执行器）",
      cls: "BUY",
      spec: "14 AWG 电源线、30 AWG CAN 线、热缩管",
      qty: 1,
      unitUsd: 5,
      unitRmb: 20,
      availability: "nosource",
      evidence: ["BOM", "DOCS"],
      note: "BOM 该行未提供采购链接；线规与配色约定在装配文档中给出。",
    },
    {
      id: `${variant}-assemble`,
      name: "Actuator assembly steps",
      nameZh: "执行器装配工序",
      cls: "ASSEMBLE",
      spec: "编码器改板 → 磁铁固定 → 摆线组装配 → 焊接 → 固件烧录 → 电角度标定",
      qty: 1,
      availability: "missing",
      evidence: ["DOCS", "CODE"],
      note: "无采购价格。工序来自「Building the Actuator」与「Flashing the Motor Controllers」。",
    },
  ];

  const bigOnly: Part[] = [
    {
      id: "6512-motor",
      name: "M6C12 150KV BLDC motor",
      nameZh: "M6C12 无刷电机（150KV）",
      cls: "BUY",
      mpn: "M6C12 150KV",
      manufacturer: "MAD Components",
      spec: "14 对极，力矩常数 0.0919 N·m/A，相电阻 0.1886 Ω",
      qty: 1,
      unitUsd: 129,
      unitRmb: 888,
      link: {
        us: "https://www.amazon.com/MAD-COMPONENTS-Antimatter-Multirotor-Quadcopter/dp/B08GQ6Q464",
        cn: "https://item.taobao.com/item.htm?abbucket=8&id=650930600496",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS", "PAPER"],
      note: "论文指明 6512 执行器由 MAD Components 的 M6C12 150KV 驱动。",
    },
    {
      id: "6811zz",
      name: "6811ZZ bearing",
      nameZh: "6811ZZ 轴承",
      cls: "BUY",
      mpn: "6811ZZ",
      spec: "输出轴–壳体之间；论文以它定义整体执行器尺寸",
      qty: 2,
      unitUsd: 5,
      unitRmb: 5.83,
      link: {
        us: "https://www.amazon.com/gp/product/B082PW8F3S",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=695287603935&ns=1&skuId=5102438922487",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS", "PAPER"],
    },
    {
      id: "m3-55",
      name: "M3 × 55 mm screw",
      nameZh: "M3 × 55 mm 螺丝（壳体）",
      cls: "BUY",
      mpn: "M3 × 55 mm",
      spec: "壳体紧固",
      qty: 8,
      unitUsd: 0.26,
      unitRmb: 0.35,
      link: {
        us: "https://www.amazon.com/gp/product/B01N68JLPE/",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=654819932601&skuId=5014407101270",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
    {
      id: "m3-30",
      name: "M3 × 30 mm screw",
      nameZh: "M3 × 30 mm 螺丝（输出轴）",
      cls: "BUY",
      mpn: "M3 × 30 mm",
      spec: "输出轴紧固",
      qty: 6,
      unitUsd: 0.19,
      unitRmb: 0.07,
      link: {
        us: "https://www.amazon.com/gp/product/B0968155BV",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=654819932601&skuId=5014407101253",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
    {
      id: "6512-stand",
      name: "M4 × 15 mm hex standoff",
      nameZh: "M4 × 15 mm 六角铜柱",
      cls: "BUY",
      mpn: "M4 × 15 mm hex stand",
      spec: "输入轴加强",
      qty: 1,
      unitUsd: 0.69,
      unitRmb: 0.26,
      link: {
        us: "https://www.amazon.com/dp/B07DRGBZTH",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=645528391157",
      },
      availability: "orderable",
      evidence: ["BOM", "PAPER"],
      note: "论文说明输入轴内嵌黄铜六角柱以提升刚度与扭矩传递。",
    },
  ];

  const smallOnly: Part[] = [
    {
      id: "5010-motor",
      name: "5010 110KV BLDC motor",
      nameZh: "5010 无刷电机（110KV）",
      cls: "BUY",
      mpn: "5010 110KV",
      manufacturer: "MAD Components",
      manufacturerFromMpn: true,
      spec: "力矩常数 0.1176 N·m/A，相电阻 0.6193 Ω",
      qty: 1,
      unitUsd: 84,
      unitRmb: 448,
      link: {
        us: "https://www.amazon.com/gp/product/B082W5B5LZ",
        cn: "https://item.taobao.com/item.htm?abbucket=8&id=534590842464",
      },
      availability: "orderable",
      evidence: ["BOM", "DOCS", "PAPER"],
      note: "固件另提供 310KV / 370KV 电机配置档，可作为替换选型。",
    },
    {
      id: "6809zz",
      name: "6809ZZ bearing",
      nameZh: "6809ZZ 轴承",
      cls: "BUY",
      mpn: "6809ZZ",
      spec: "输出轴–壳体之间",
      qty: 2,
      unitUsd: 2.26,
      unitRmb: 3.89,
      link: {
        us: "https://www.amazon.com/gp/product/B082PQQP7W",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=695287603935&ns=1&skuId=5102438922481",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
    {
      id: "m3-55",
      name: "M3 × 55 mm screw",
      nameZh: "M3 × 55 mm 螺丝（壳体）",
      cls: "BUY",
      mpn: "M3 × 55 mm",
      spec: "壳体紧固",
      qty: 4,
      unitUsd: 0.26,
      unitRmb: 0.35,
      link: {
        us: "https://www.amazon.com/gp/product/B01N68JLPE/",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=654819932601&skuId=5014407101270",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
    {
      id: "m3-25",
      name: "M3 × 25 mm screw",
      nameZh: "M3 × 25 mm 螺丝（输出轴）",
      cls: "BUY",
      mpn: "M3 × 25 mm",
      spec: "输出轴紧固",
      qty: 6,
      unitUsd: 0.19,
      unitRmb: 0.07,
      link: {
        us: "https://www.amazon.com/gp/product/B0967ZWJMM",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=654819932601&skuId=5014407101291",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
    {
      id: "5010-stand",
      name: "M4 × 12 mm hex standoff",
      nameZh: "M4 × 12 mm 六角铜柱",
      cls: "BUY",
      mpn: "M4 × 12 mm hex stand",
      spec: "输入轴加强",
      qty: 1,
      unitUsd: 0.4,
      unitRmb: 0.26,
      link: {
        us: "https://www.amazon.com/dp/B018RSONJK",
        cn: "https://detail.tmall.com/item.htm?abbucket=8&id=645528391157",
      },
      availability: "orderable",
      evidence: ["BOM"],
    },
  ];

  return [...(isBig ? bigOnly : smallOnly), ...common, ...printed];
}

export const ACTUATOR_PARTS: Record<ActuatorVariant, Part[]> = {
  "6512": actuatorParts("6512"),
  "5010": actuatorParts("5010"),
};

/* ------------------------------------------------------------------ */
/* Torso / robot-level parts                                           */
/* ------------------------------------------------------------------ */

export const ROBOT_PARTS: Part[] = [
  {
    id: "minipc",
    name: "Mini PC (on-board computer)",
    nameZh: "机载迷你主机",
    cls: "BUY",
    manufacturer: "Beelink",
    spec: "N95 NUC，安装 Ubuntu 22.04 作为机器人机载计算机",
    qty: 1,
    unitUsd: 129,
    unitRmb: 1599,
    link: {
      us: "https://www.amazon.com/gp/product/B0BVLPCDVW",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=717966676915",
    },
    availability: "orderable",
    evidence: ["BOM", "DOCS"],
  },
  {
    id: "lipo",
    name: "LiPo battery 6S",
    nameZh: "6S 锂电池",
    cls: "BUY",
    spec: "主电源电池",
    qty: 1,
    unitUsd: 70.2,
    unitRmb: 578,
    link: {
      us: "https://www.amazon.com/dp/B0DGPMD46S",
      cn: "https://item.taobao.com/item.htm?id=554987950181&skuId=4800836808256",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "usbcan",
    name: "USB-CAN adapter",
    nameZh: "USB-CAN 适配器",
    cls: "PCB",
    spec: "每条总线一个，共 4 条 CAN 总线",
    qty: 4,
    unitUsd: 16.99,
    unitRmb: 77,
    link: {
      us: "https://www.amazon.com/gp/product/B0BPY5HY6C",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=694755138362",
    },
    availability: "orderable",
    evidence: ["BOM", "DOCS"],
    note: "接线端子顺序为 CAN-L、CAN-H、GND；板背有丝印标注。",
  },
  {
    id: "usbhub",
    name: "USB hub",
    nameZh: "USB 集线器",
    cls: "BUY",
    qty: 2,
    unitUsd: 17.99,
    unitRmb: 39.9,
    link: {
      us: "https://www.amazon.com/gp/product/B07L32B9C2",
      cn: "https://detail.tmall.com/item.htm?abbucket=8&id=630445232755",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "bno085",
    name: "BNO085 IMU",
    nameZh: "BNO085 惯性测量单元",
    cls: "BUY",
    mpn: "BNO085",
    manufacturer: "Hillcrest Labs",
    manufacturerFromMpn: true,
    spec: "原始版本，经 Arduino Nano 转接",
    qty: 1,
    unitUsd: 12.76,
    unitRmb: 84,
    link: {
      us: "https://www.amazon.com/dp/B0DP4KXZQM",
      cn: "https://detail.tmall.com/item.htm?abbucket=8&id=658253576279&skuId=5473425713581",
    },
    availability: "orderable",
    evidence: ["BOM", "DOCS"],
    note: "原始版本通过 Arduino Nano 接入计算机；后来推荐改用 IM10A。",
  },
  {
    id: "im10a",
    name: "IM10A IMU",
    nameZh: "IM10A 惯性测量单元",
    cls: "BUY",
    mpn: "IM10A",
    manufacturer: "Hiwonder",
    spec: "替代 IMU，直接支持 USB 连接，省去手工焊接信号线",
    qty: 1,
    unitUsd: 89.99,
    unitRmb: 248,
    excludeFromTotal: true,
    link: {
      us: "https://www.hiwonder.com/products/imu-module?variant=40375875338327",
      cn: "https://detail.tmall.com/item.htm?id=741320971641&skuId=5109856880564",
    },
    availability: "alternative",
    evidence: ["BOM", "DOCS"],
    note: "BOM 中「替代 IMU 传感器」行，无小计；官方建议用它替代 BNO085 + Arduino Nano 方案。",
  },
  {
    id: "ext-250",
    name: "Aluminum extrusion 250 mm",
    nameZh: "铝型材 250 mm",
    cls: "BUY",
    spec: "2020 欧标铝型材",
    qty: 2,
    unitUsd: 4.25,
    unitRmb: 2.83,
    link: {
      us: "https://www.amazon.com/dp/B08Y8L11ZP",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=690128619754",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "ext-200",
    name: "Aluminum extrusion 200 mm",
    nameZh: "铝型材 200 mm",
    cls: "BUY",
    spec: "2020 欧标铝型材",
    qty: 4,
    unitUsd: 3.75,
    unitRmb: 2.26,
    link: {
      us: "https://www.amazon.com/dp/B08Y8KL79L",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=690128619754",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "ext-150",
    name: "Aluminum extrusion 150 mm",
    nameZh: "铝型材 150 mm",
    cls: "BUY",
    spec: "2020 欧标铝型材",
    qty: 2,
    unitUsd: 3,
    unitRmb: 1.7,
    link: {
      us: "https://www.amazon.com/dp/B08Y8KTZ2Z",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=690128619754",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "ext-100",
    name: "Aluminum extrusion 100 mm",
    nameZh: "铝型材 100 mm",
    cls: "BUY",
    spec: "2020 欧标铝型材；CAD 中为 aluminum_extrusion_100mm_center",
    qty: 3,
    unitUsd: 3.25,
    unitRmb: 1.2,
    link: {
      us: "https://www.amazon.com/dp/B09JSN97Y9",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=690128619754",
    },
    availability: "orderable",
    evidence: ["BOM", "CAD"],
  },
  {
    id: "bracket",
    name: "Aluminum inner bracket",
    nameZh: "铝型材内置角件",
    cls: "BUY",
    qty: 24,
    unitUsd: 0.65,
    unitRmb: 0.7,
    link: {
      us: "https://www.amazon.com/gp/product/B07872XFWF",
      cn: "https://item.taobao.com/item.htm?id=819016158292&skuId=5692325483198",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "reg-24-12",
    name: "24V to 12V regulator",
    nameZh: "24V 转 12V 稳压模块",
    cls: "BUY",
    mpn: "DROK 24V→12V",
    spec: "防水降压模块",
    qty: 1,
    unitUsd: 16.99,
    unitRmb: 14,
    link: {
      us: "https://www.amazon.com/dp/B081RG8XP5",
      cn: "https://item.taobao.com/item.htm?id=626418952771&skuId=4619768987075",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "reg-12-5",
    name: "12V to 5V regulator",
    nameZh: "12V 转 5V 稳压模块",
    cls: "BUY",
    qty: 1,
    unitUsd: 4.49,
    unitRmb: 10.79,
    link: {
      us: "https://www.amazon.com/dp/B08FHYK1PB",
      cn: "https://detail.tmall.com/item.htm?id=694380052817",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "voltage-monitor",
    name: "Voltage monitor",
    nameZh: "电压监测模块",
    cls: "BUY",
    qty: 1,
    unitUsd: 14.99,
    unitRmb: 3.6,
    link: {
      us: "https://www.amazon.com/gp/product/B09G6QHPPJ/",
      cn: "https://detail.tmall.com/item.htm?abbucket=8&id=647059163846&skuId=4830044502772",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "current-monitor",
    name: "Current monitor",
    nameZh: "电流监测模块",
    cls: "BUY",
    qty: 1,
    unitUsd: 20.98,
    unitRmb: 13.9,
    link: {
      us: "https://www.amazon.com/gp/product/B01DDQM6Z4",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=43511429194&skuId=3106569940562",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "breaker",
    name: "Circuit breaker",
    nameZh: "断路器",
    cls: "BUY",
    qty: 1,
    unitUsd: 19.99,
    unitRmb: 66,
    link: {
      us: "https://www.amazon.com/gp/product/B07SHB3TS5",
      cn: "https://item.taobao.com/item.htm?abbucket=8&id=708760411946&skuId=5147276763391",
    },
    availability: "orderable",
    evidence: ["BOM"],
  },
  {
    id: "misc-fasteners",
    name: "Misc fasteners",
    nameZh: "杂项紧固件",
    cls: "BUY",
    spec: "结构件通用螺丝与螺母",
    qty: 1,
    unitUsd: 40,
    unitRmb: 85,
    availability: "nosource",
    evidence: ["BOM"],
    note: "BOM 该行未提供采购链接，只有预算金额。",
  },
  {
    id: "misc-cables",
    name: "Misc cables & connectors",
    nameZh: "杂项线材与接插件",
    cls: "BUY",
    spec: "整机线束与接插件预算",
    qty: 1,
    unitUsd: 50,
    unitRmb: 100,
    availability: "nosource",
    evidence: ["BOM"],
    note: "BOM 该行未提供采购链接，只有预算金额。",
  },
  {
    id: "bearing-6803",
    name: "6803-2RS bearing",
    nameZh: "6803-2RS 轴承",
    cls: "BUY",
    mpn: "6803-2RS",
    spec: "腿部俯仰执行器连杆之间的轴承",
    qty: 6,
    unitUsd: 2.87,
    unitRmb: 1.2,
    link: {
      us: "https://www.amazon.com/dp/B09P21T5QV",
      cn: "https://item.taobao.com/item.htm?id=611641987734&skuId=4305314537774",
    },
    availability: "orderable",
    evidence: ["BOM", "DOCS"],
    note: "2025-05-29 发布记录补充的漏项。",
  },
  {
    id: "filament-legs",
    name: "PLA filament (legs)",
    nameZh: "PLA 耗材（腿部结构件）",
    cls: "PRINT",
    mpn: "PLA Basic Filament",
    manufacturer: "Bambu Lab / Hatchbox",
    spec: "腿部结构件打印耗材预算",
    qty: 1,
    unitUsd: 100,
    unitRmb: 300,
    availability: "missing",
    evidence: ["BOM", "DOCS"],
    note: "BOM 以整包预算计入，未拆到单件。",
  },
  {
    id: "filament-arms",
    name: "PLA filament (arms)",
    nameZh: "PLA 耗材（手臂结构件）",
    cls: "PRINT",
    mpn: "PLA Basic Filament",
    manufacturer: "Bambu Lab / Hatchbox",
    spec: "手臂结构件打印耗材预算",
    qty: 1,
    unitUsd: 100,
    unitRmb: 300,
    availability: "missing",
    evidence: ["BOM", "DOCS"],
    note: "BOM 以整包预算计入，未拆到单件。",
  },
  {
    id: "gripper",
    name: "Servo motor claw (gripper)",
    nameZh: "舵机机械爪",
    cls: "BUY",
    mpn: "LewanSoul BigClaw",
    manufacturer: "LewanSoul",
    spec: "每只手 1 个",
    qty: 2,
    unitUsd: 35.99,
    unitRmb: 159,
    link: {
      us: "https://www.amazon.com/LewanSoul-Mechanical-BigClaw-Gripper-Without/dp/B0CMHV5DZ3",
      cn: "https://detail.tmall.com/item.htm?abbucket=8&id=600961750206&skuId=4202414349841",
    },
    availability: "orderable",
    evidence: ["BOM", "DOCS", "PAPER"],
    note: "论文 BOM 表中列为 Grippers (2x)。",
  },
  /* ---- identified from docs / CAD / code, but absent from the BOM ---- */
  {
    id: "xt60",
    name: "XT60 connector",
    nameZh: "XT60 电源接插件",
    cls: "BUY",
    spec: "主电源总线连接器",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "仅出现在「Building the Robot」装配说明中，BOM 未单列。",
  },
  {
    id: "xt30",
    name: "XT30 connector",
    nameZh: "XT30 电源接插件",
    cls: "BUY",
    spec: "每个执行器接到主电源总线",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "仅出现在装配说明中，BOM 未单列；数量按执行器个数计。",
  },
  {
    id: "wago",
    name: "WAGO connector",
    nameZh: "WAGO 免焊端子",
    cls: "BUY",
    spec: "2 / 3 / 5 位，用于调试期快速接驳电源线",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "仅出现在装配说明中，BOM 未单列。",
  },
  {
    id: "wire-power",
    name: "14 AWG stranded silicone wire",
    nameZh: "14 AWG 硅胶电源线",
    cls: "BUY",
    spec: "白色/红色为正极，黑色为地",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "线规与配色在装配文档中给出，BOM 未单列。",
  },
  {
    id: "wire-can",
    name: "30 AWG stranded silicone wire",
    nameZh: "30 AWG 硅胶信号线",
    cls: "BUY",
    spec: "黄色为 CAN-H / SDA，绿色为 CAN-L / SCL",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "线规与配色在装配文档中给出，BOM 未单列。",
  },
  {
    id: "heatshrink",
    name: "Heat shrink tubing",
    nameZh: "热缩管",
    cls: "BUY",
    spec: "保护信号线焊接点",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS"],
    note: "仅出现在装配说明中，BOM 未单列。",
  },
  {
    id: "arduino-nano",
    name: "Arduino Nano (IMU bridge)",
    nameZh: "Arduino Nano（IMU 转接）",
    cls: "BUY",
    spec: "原始版本用于把 IMU 接到计算机",
    qty: 1,
    availability: "missing",
    evidence: ["DOCS", "CODE"],
    note: "已被 IM10A 方案取代，BOM 现有版本未列出。",
  },
  {
    id: "usbcan-case",
    name: "USB-CAN adapter case",
    nameZh: "USB-CAN 适配器外壳",
    cls: "PRINT",
    spec: "3D 打印外壳",
    qty: 4,
    availability: "missing",
    evidence: ["CAD", "DOCS"],
    printed: true,
    note: "Releases 页给出了独立 Onshape 文档，但 BOM 未列出，无 MPN 与价格。",
  },
  {
    id: "structure-print",
    name: "Structural 3D printed parts",
    nameZh: "结构 3D 打印件",
    cls: "PRINT",
    spec: "上/下机身板、大臂、小臂、大腿、小腿、鞋底与平足等，需镜像打印两份",
    qty: 1,
    availability: "missing",
    evidence: ["CAD", "DOCS"],
    printed: true,
    note: "CAD 中可见 geometry_stud_upperleg / lowerleg / upperarm / lowerarm、left_shoe、right_shoe、flat_foot 等；BOM 以 PLA 预算整包计入。",
  },
];

export const ALL_PARTS: Part[] = [
  ...ROBOT_PARTS,
  ...ACTUATOR_PARTS["6512"],
  ...ACTUATOR_PARTS["5010"],
];

export const AVAILABILITY: Record<
  Availability,
  { label: string; hint: string; color: string; dash: boolean }
> = {
  orderable: {
    label: "有公开货源",
    hint: "公开 BOM 提供了厂商采购链接",
    color: "#45d68a",
    dash: false,
  },
  alternative: {
    label: "替代选型",
    hint: "发布资料给出了可替换方案",
    color: "#ffd166",
    dash: false,
  },
  nosource: {
    label: "无公开货源",
    hint: "BOM 有该行，但没有提供采购链接",
    color: "#ff6b6b",
    dash: false,
  },
  missing: {
    label: "资料缺失",
    hint: "可从 CAD / 文档 / 代码识别，但发布资料未给 MPN 或价格",
    color: "#7c8797",
    dash: true,
  },
};

export const PART_CLASS: Record<PartClass, { label: string; hint: string; color: string }> = {
  BUY: { label: "BUY", hint: "直接采购的标准件", color: "#5aa9ff" },
  PRINT: { label: "3D_PRINT", hint: "自行 3D 打印的零件", color: "#ffb454" },
  PCB: { label: "PCB", hint: "电路板 / 驱动板", color: "#35d0c8" },
  ASSEMBLE: { label: "ASSEMBLE", hint: "需要装配或加工工序", color: "#b98cff" },
};

export const CAN_BUS_COLOR: Record<string, string> = {
  CAN0: "#5aa9ff",
  CAN1: "#35d0c8",
  CAN2: "#ffb454",
  CAN3: "#b98cff",
  TORSO: "#7f8b9c",
};

export const CAN_BUS_LABEL: Record<string, string> = {
  CAN0: "CAN0 · 左臂",
  CAN1: "CAN1 · 右臂",
  CAN2: "CAN2 · 左腿",
  CAN3: "CAN3 · 右腿",
  TORSO: "躯干 / 无关节",
};
