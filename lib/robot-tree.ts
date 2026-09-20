/**
 * Assembly hierarchy for Berkeley Humanoid Lite.
 *
 * Levels follow the site's drill-down: 总成 (assembly) → 子总成 (sub-assembly)
 * → 单件 (part). 3D meshes come from the released URDF link names.
 */

import {
  ACTUATOR_PARTS,
  ACTUATORS,
  ROBOT_PARTS,
  type ActuatorVariant,
  type Part,
} from "./robot-parts";

export type NodeKind = "root" | "assembly" | "sub" | "joint" | "group";

export interface JointRecord {
  /** Name used in the Joint ID Mapping documentation. */
  docName: string;
  /** Chinese joint name derived from limb + axis, for UI labels. */
  zhName: string;
  /** Global joint index from the documentation. For generated teardowns this is
   *  the joint's position in the released URDF, not a CAN id. */
  jointId: number;
  /** NULL when the release publishes no bus mapping (most repositories do not). */
  canBus?: "CAN0" | "CAN1" | "CAN2" | "CAN3" | null;
  canId?: number | null;
  range: [number, number];
  motion: string;
  /** URDF joint name in the released CAD assets. */
  urdfJoint: string;
  /** URDF link containing the actuator. */
  meshLink: string;
}

export interface PartRef {
  partId: string;
  qty: number;
}

export interface ActuatorRef {
  variant: ActuatorVariant;
  count: number;
}

export interface TreeNode {
  id: string;
  label: string;
  labelEn: string;
  kind: NodeKind;
  summary?: string;
  /** 3D link names owned by this node. */
  meshLinks: string[];
  joint?: JointRecord;
  parts: PartRef[];
  actuators: ActuatorRef[];
  children: TreeNode[];
}

const ROBOT_PART_INDEX = new Map<string, Part>(ROBOT_PARTS.map((p) => [p.id, p]));

/**
 * Part-id → part lookup for any spec. Generated teardowns carry their own part
 * list, so the index can no longer be a single module-level table.
 */
export function partIndex(parts: Part[]): Map<string, Part> {
  return new Map(parts.map((p) => [p.id, p]));
}

/** Limb prefix → Chinese limb name, matching the released URDF link naming. */
const LIMB_ZH: Record<"arm_left" | "arm_right" | "leg_left" | "leg_right", string> = {
  arm_left: "左臂",
  arm_right: "右臂",
  leg_left: "左腿",
  leg_right: "右腿",
};

/** URDF joint suffix → Chinese axis name. Mirrors how the release names each axis. */
const JOINT_ZH: Record<string, string> = {
  shoulder_pitch: "肩部俯仰",
  shoulder_roll: "肩部横滚",
  shoulder_yaw: "肩部偏航",
  elbow_pitch: "肘部屈伸",
  elbow_roll: "前臂旋转",
  hip_roll: "髋部横滚",
  hip_yaw: "髋部偏航",
  hip_pitch: "髋部俯仰",
  knee_pitch: "膝部屈伸",
  ankle_pitch: "踝部俯仰",
  ankle_roll: "踝部翻转",
};

export function robotPart(id: string): Part {
  const p = ROBOT_PART_INDEX.get(id);
  if (!p) throw new Error(`unknown robot part: ${id}`);
  return p;
}

function joint(
  docName: string,
  jointId: number,
  canBus: JointRecord["canBus"],
  canId: number,
  range: [number, number],
  motion: string,
  meshPrefix: "arm_left" | "arm_right" | "leg_left" | "leg_right",
  urdfSuffix: string,
): TreeNode {
  const meshLink = `${meshPrefix}_${urdfSuffix}`;
  const zhName = `${LIMB_ZH[meshPrefix]}·${JOINT_ZH[urdfSuffix] ?? urdfSuffix}`;
  return {
    id: `joint-${docName}`,
    label: zhName,
    labelEn: meshLink,
    kind: "joint",
    summary: motion,
    meshLinks: [meshLink],
    joint: {
      docName,
      zhName,
      jointId,
      canBus,
      canId,
      range,
      motion,
      urdfJoint: `${meshLink}_joint`,
      meshLink,
    },
    parts: [],
    actuators: [],
    children: [],
  };
}

function limbHarness(prefix: string, actuatorCount: number): TreeNode {
  return {
    id: `${prefix}-harness`,
    label: "线束与紧固",
    labelEn: "Harness & fasteners",
    kind: "sub",
    summary: "总线线材、接插件与整机紧固预算",
    meshLinks: [],
    parts: [
      { partId: "wire-can", qty: 1 },
      { partId: "xt30", qty: actuatorCount },
      { partId: "heatshrink", qty: 1 },
    ],
    actuators: [],
    children: [],
  };
}

function actuatorModule(prefix: string, big: number, small: number): TreeNode {
  return {
    id: `${prefix}-actuators`,
    label: "执行器模组",
    labelEn: "Actuator modules",
    kind: "sub",
    summary: `${big} × 6512${small ? ` + ${small} × 5010` : ""}，发布资料未逐关节标注型号`,
    meshLinks: [],
    parts: [],
    actuators: [
      { variant: "6512", count: big },
      { variant: "5010", count: small },
    ],
    children: [],
  };
}

function arm(side: "left" | "right"): TreeNode {
  const prefix = `arm_${side}` as const;
  const bus = side === "left" ? "CAN0" : "CAN1";
  const base = side === "left" ? 0 : 5;
  const label = side === "left" ? "左臂总成" : "右臂总成";
  const sideZh = side === "left" ? "左" : "右";

  return {
    id: `${prefix}-assembly`,
    label,
    labelEn: `${side} arm assembly`,
    kind: "assembly",
    summary: "5 自由度：肩部 3 + 肘与前臂 2，使用 1 × 6512 + 4 × 5010 执行器",
    meshLinks: [],
    parts: [],
    actuators: [],
    children: [
      {
        id: `${prefix}-shoulder`,
        label: "肩部子总成",
        labelEn: "Shoulder sub-assembly",
        kind: "sub",
        summary: "肩俯仰 / 肩外摆 / 肩旋转",
        meshLinks: [],
        parts: [],
        actuators: [],
        children: [
          joint(
            `${side}_shoulder_pitch`,
            base + 0,
            bus,
            1,
            [-90, 45],
            "上臂屈伸（pitch），正向为屈曲",
            prefix,
            "shoulder_pitch",
          ),
          joint(
            `${side}_shoulder_roll`,
            base + 1,
            bus,
            3,
            side === "left" ? [-90, 0] : [0, 90],
            "上臂外展/内收，左臂正向为内收，右臂正向为外展",
            prefix,
            "shoulder_roll",
          ),
          joint(
            `${side}_shoulder_yaw`,
            base + 2,
            bus,
            5,
            [-45, 45],
            "上臂旋转，正向为外旋",
            prefix,
            "shoulder_yaw",
          ),
        ],
      },
      {
        id: `${prefix}-elbow`,
        label: "肘与前臂子总成",
        labelEn: "Elbow & forearm sub-assembly",
        kind: "sub",
        summary: "肘屈伸 + 前臂旋转",
        meshLinks: [],
        parts: [],
        actuators: [],
        children: [
          joint(
            `${side}_elbow_pitch`,
            base + 3,
            bus,
            7,
            [-90, 0],
            "前臂屈伸，左臂正向为伸展，右臂正向为屈曲",
            prefix,
            "elbow_pitch",
          ),
          joint(
            `${side}_elbow_yaw`,
            base + 4,
            bus,
            9,
            [-45, 45],
            "前臂旋转（文档称 yaw，URDF 中为 elbow_roll）",
            prefix,
            "elbow_roll",
          ),
        ],
      },
      {
        id: `${prefix}-hand`,
        label: "手爪子总成",
        labelEn: "Gripper sub-assembly",
        kind: "sub",
        summary: "连杆手爪 + 打印手部结构件",
        meshLinks: [`${prefix}_hand_link`],
        parts: [
          { partId: "gripper", qty: 1 },
          { partId: "structure-print", qty: 1 },
        ],
        actuators: [],
        children: [],
      },
      actuatorModule(`${prefix}`, 1, 4),
      limbHarness(prefix, 5),
      {
        id: `${prefix}-assemble`,
        label: "臂部装配工序",
        labelEn: "Arm assembly steps",
        kind: "group",
        summary: `打印件需镜像打印两份以装配${sideZh}右两臂`,
        meshLinks: [],
        parts: [],
        actuators: [],
        children: [],
      },
    ],
  };
}

function leg(side: "left" | "right"): TreeNode {
  const prefix = `leg_${side}` as const;
  const bus = side === "left" ? "CAN2" : "CAN3";
  const base = side === "left" ? 10 : 16;
  const label = side === "left" ? "左腿总成" : "右腿总成";

  return {
    id: `${prefix}-assembly`,
    label,
    labelEn: `${side} leg assembly`,
    kind: "assembly",
    summary: "6 自由度：髋部 3 + 膝 1 + 踝与足 2，使用 4 × 6512 + 2 × 5010 执行器",
    meshLinks: [],
    parts: [],
    actuators: [],
    children: [
      {
        id: `${prefix}-hip`,
        label: "髋部子总成",
        labelEn: "Hip sub-assembly",
        kind: "sub",
        summary: "髋外摆 / 髋旋转 / 髋俯仰",
        meshLinks: [],
        parts: [],
        actuators: [],
        children: [
          joint(
            `${side}_hip_roll`,
            base + 0,
            bus,
            1,
            side === "left" ? [-10, 90] : [-10, 90],
            "大腿屈伸，正向为屈曲",
            prefix,
            "hip_roll",
          ),
          joint(
            `${side}_hip_yaw`,
            base + 1,
            bus,
            3,
            side === "left" ? [-56.25, 33.75] : [-33.75, 56.25],
            "大腿外展/内收",
            prefix,
            "hip_yaw",
          ),
          joint(
            `${side}_hip_pitch`,
            base + 2,
            bus,
            5,
            [-108.75, 56.25],
            "大腿旋转",
            prefix,
            "hip_pitch",
          ),
        ],
      },
      {
        id: `${prefix}-knee`,
        label: "膝部子总成",
        labelEn: "Knee sub-assembly",
        kind: "sub",
        summary: "小腿屈伸，行程 0…140°",
        meshLinks: [],
        parts: [{ partId: "bearing-6803", qty: 3 }],
        actuators: [],
        children: [
          joint(
            `${side}_knee_pitch`,
            base + 3,
            bus,
            7,
            [0, 140],
            "小腿屈伸，正向为伸展",
            prefix,
            "knee_pitch",
          ),
        ],
      },
      {
        id: `${prefix}-ankle`,
        label: "踝与足子总成",
        labelEn: "Ankle & foot sub-assembly",
        kind: "sub",
        summary: "踝俯仰 / 踝翻转 + 足底打印件",
        meshLinks: [],
        parts: [{ partId: "structure-print", qty: 1 }],
        actuators: [],
        children: [
          joint(
            `${side}_ankle_pitch`,
            base + 4,
            bus,
            11,
            [-45, 45],
            "足部背屈/跖屈，正向为背屈",
            prefix,
            "ankle_pitch",
          ),
          joint(
            `${side}_ankle_roll`,
            base + 5,
            bus,
            13,
            [-15, 15],
            "足部内翻/外翻，正向为外翻",
            prefix,
            "ankle_roll",
          ),
        ],
      },
      actuatorModule(`${prefix}`, 4, 2),
      limbHarness(prefix, 6),
      {
        id: `${prefix}-assemble`,
        label: "腿部装配工序",
        labelEn: "Leg assembly steps",
        kind: "group",
        summary: "打印件需镜像打印两份以装配左右两腿",
        meshLinks: [],
        parts: [],
        actuators: [],
        children: [],
      },
    ],
  };
}

export const ROBOT_TREE: TreeNode = {
  id: "root",
  label: "HUM-BERKELEY-LITE",
  labelEn: "Berkeley Humanoid Lite",
  kind: "root",
  summary: "22 自由度全尺寸人形机器人 · 10 × 6512 + 12 × 5010 执行器",
  meshLinks: [],
  parts: [],
  actuators: [],
  children: [
    {
      id: "torso",
      label: "躯干总成",
      labelEn: "Torso assembly",
      kind: "assembly",
      summary: "机身结构 + 机载计算、电池配电与 IMU",
      meshLinks: ["base", "imu_2"],
      parts: [],
      actuators: [],
      children: [
        {
          id: "torso-compute",
          label: "计算与通信子总成",
          labelEn: "Compute & comms",
          kind: "sub",
          summary: "机载主机、4 条 CAN 总线与 IMU",
          meshLinks: [],
          parts: [
            { partId: "minipc", qty: 1 },
            { partId: "usbcan", qty: 4 },
            { partId: "usbhub", qty: 2 },
            { partId: "bno085", qty: 1 },
            { partId: "im10a", qty: 1 },
            { partId: "arduino-nano", qty: 1 },
          ],
          actuators: [],
          children: [],
        },
        {
          id: "torso-power",
          label: "电池与配电子总成",
          labelEn: "Battery & power",
          kind: "sub",
          summary: "6S 电池、断路保护、电压电流监测与两级稳压",
          meshLinks: [],
          parts: [
            { partId: "lipo", qty: 1 },
            { partId: "breaker", qty: 1 },
            { partId: "voltage-monitor", qty: 1 },
            { partId: "current-monitor", qty: 1 },
            { partId: "reg-24-12", qty: 1 },
            { partId: "reg-12-5", qty: 1 },
          ],
          actuators: [],
          children: [],
        },
        {
          id: "torso-frame",
          label: "结构框架子总成",
          labelEn: "Frame",
          kind: "sub",
          summary: "铝型材骨架与角件",
          meshLinks: [],
          parts: [
            { partId: "ext-250", qty: 2 },
            { partId: "ext-200", qty: 4 },
            { partId: "ext-150", qty: 2 },
            { partId: "ext-100", qty: 3 },
            { partId: "bracket", qty: 24 },
          ],
          actuators: [],
          children: [],
        },
        {
          id: "torso-harness",
          label: "线束与紧固",
          labelEn: "Harness & fasteners",
          kind: "sub",
          summary: "主电源总线与整机线束预算",
          meshLinks: [],
          parts: [
            { partId: "wire-power", qty: 1 },
            { partId: "xt60", qty: 1 },
            { partId: "wago", qty: 1 },
            { partId: "misc-cables", qty: 1 },
            { partId: "misc-fasteners", qty: 1 },
          ],
          actuators: [],
          children: [],
        },
      ],
    },
    arm("left"),
    arm("right"),
    leg("left"),
    leg("right"),
    {
      id: "consumables",
      label: "耗材与待打印件",
      labelEn: "Consumables & printed parts",
      kind: "assembly",
      summary: "整机结构件的 PLA 预算与无 MPN 的打印件",
      meshLinks: [],
      parts: [
        { partId: "filament-legs", qty: 1 },
        { partId: "filament-arms", qty: 1 },
        { partId: "structure-print", qty: 1 },
        { partId: "usbcan-case", qty: 4 },
      ],
      actuators: [],
      children: [],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

export interface BomLine {
  part: Part;
  qty: number;
  usd: number | null;
  rmb: number | null;
  /** Assembly path, deepest label last. */
  path: string[];
}

export interface Rollup {
  lines: BomLine[];
  usd: number;
  rmb: number;
  actuatorCounts: Record<ActuatorVariant, number>;
  byClass: Record<string, { usd: number; count: number }>;
  byAvailability: Record<string, number>;
  byEvidence: Record<string, number>;
}

/** Parts belonging to one actuator instance, with its own quantity. */
export function actuatorPartsFor(variant: ActuatorVariant, count: number): BomLine[] {
  return ACTUATOR_PARTS[variant]
    .filter((p) => !p.printed || p.mpn)
    .map((part) => ({
      part,
      qty: part.qty * count,
      usd: part.unitUsd != null ? part.unitUsd * part.qty * count : null,
      rmb: part.unitRmb != null ? part.unitRmb * part.qty * count : null,
      path: [ACTUATORS[variant].label],
    }));
}

export function rollup(node: TreeNode = ROBOT_TREE, parts?: Part[]): Rollup {
  const index = parts ? partIndex(parts) : ROBOT_PART_INDEX;
  const acc = new Map<string, BomLine>();
  const actuatorCounts: Record<ActuatorVariant, number> = { "6512": 0, "5010": 0 };

  const add = (line: BomLine) => {
    const prev = acc.get(line.part.id);
    if (prev) {
      prev.qty += line.qty;
      prev.usd = prev.usd != null && line.usd != null ? prev.usd + line.usd : (prev.usd ?? line.usd);
      prev.rmb = prev.rmb != null && line.rmb != null ? prev.rmb + line.rmb : (prev.rmb ?? line.rmb);
    } else {
      acc.set(line.part.id, { ...line });
    }
  };

  const walk = (n: TreeNode, path: string[]) => {
    const here = [...path, n.label];
    for (const ref of n.parts) {
      const part = ROBOT_PART_INDEX.get(ref.partId);
      if (!part) continue;
      add({
        part,
        qty: ref.qty,
        usd: part.unitUsd != null ? part.unitUsd * ref.qty : null,
        rmb: part.unitRmb != null ? part.unitRmb * ref.qty : null,
        path: here,
      });
    }
    for (const ref of n.actuators) {
      if (ref.count <= 0) continue;
      actuatorCounts[ref.variant] += ref.count;
      for (const line of actuatorPartsFor(ref.variant, ref.count)) add({ ...line, path: here });
    }
    n.children.forEach((c) => walk(c, here));
  };

  walk(node, []);

  const lines = [...acc.values()];
  const counted = lines.filter((l) => !l.part.excludeFromTotal);
  const usd = counted.reduce((s, l) => s + (l.usd ?? 0), 0);
  const rmb = counted.reduce((s, l) => s + (l.rmb ?? 0), 0);

  const byClass: Record<string, { usd: number; count: number }> = {};
  const byAvailability: Record<string, number> = {};
  const byEvidence: Record<string, number> = {};

  for (const line of lines) {
    const c = (byClass[line.part.cls] ??= { usd: 0, count: 0 });
    c.usd += line.usd ?? 0;
    c.count += 1;
    byAvailability[line.part.availability] = (byAvailability[line.part.availability] ?? 0) + 1;
    for (const e of line.part.evidence) byEvidence[e] = (byEvidence[e] ?? 0) + 1;
  }

  return { lines, usd, rmb, actuatorCounts, byClass, byAvailability, byEvidence };
}

export const PUBLISHED_TOTAL = { usd: 4350.59, rmb: 23244.19 };

export function findNode(id: string, node: TreeNode = ROBOT_TREE): TreeNode | null {
  if (node.id === id) return node;
  for (const c of node.children) {
    const hit = findNode(id, c);
    if (hit) return hit;
  }
  return null;
}

export function nodePath(id: string, node: TreeNode = ROBOT_TREE, trail: string[] = []): string[] {
  const here = [...trail, node.id];
  if (node.id === id) return here;
  for (const c of node.children) {
    const hit = nodePath(id, c, here);
    if (hit.length) return hit;
  }
  return [];
}

/** Human-readable ancestor labels, root excluded. */
export function nodeLabelPath(id: string, root: TreeNode = ROBOT_TREE): string[] {
  const found: string[] = [];
  const walk = (node: TreeNode, trail: string[]): boolean => {
    const here = node.kind === "root" ? trail : [...trail, node.label];
    if (node.id === id) {
      found.push(...here);
      return true;
    }
    for (const c of node.children) if (walk(c, here)) return true;
    return false;
  };
  walk(root, []);
  return found;
}

/** Map every 3D link name to the node that owns it. */
export function buildMeshIndex(node: TreeNode = ROBOT_TREE): Map<string, string> {
  const index = new Map<string, string>();
  const walk = (n: TreeNode) => {
    for (const m of n.meshLinks) index.set(m, n.id);
    n.children.forEach(walk);
  };
  walk(node);
  return index;
}

export function flattenJoints(node: TreeNode = ROBOT_TREE): TreeNode[] {
  const out: TreeNode[] = [];
  const walk = (n: TreeNode) => {
    if (n.joint) out.push(n);
    n.children.forEach(walk);
  };
  walk(node);
  return out.sort((a, b) => (a.joint!.jointId ?? 0) - (b.joint!.jointId ?? 0));
}

export function collectPartsFor(node: TreeNode, parts?: Part[]): BomLine[] {
  const index = parts ? partIndex(parts) : ROBOT_PART_INDEX;
  const lines: BomLine[] = [];
  const walk = (n: TreeNode, path: string[]) => {
    const here = [...path, n.label];
    for (const ref of n.parts) {
      const part = index.get(ref.partId);
      if (!part) continue;
      lines.push({
        part,
        qty: ref.qty,
        usd: part.unitUsd != null ? part.unitUsd * ref.qty : null,
        rmb: part.unitRmb != null ? part.unitRmb * ref.qty : null,
        path: here,
      });
    }
    for (const ref of n.actuators) {
      if (ref.count <= 0) continue;
      for (const line of actuatorPartsFor(ref.variant, ref.count)) lines.push({ ...line, path: here });
    }
    n.children.forEach((c) => walk(c, here));
  };
  walk(node, []);
  return lines;
}

/** Collapse repeated part lines (same part id) into one row, summing quantities and cost. */
export function aggregateLines(lines: BomLine[]): BomLine[] {
  const acc = new Map<string, BomLine>();
  for (const line of lines) {
    const prev = acc.get(line.part.id);
    if (!prev) {
      acc.set(line.part.id, { ...line });
      continue;
    }
    prev.qty += line.qty;
    prev.usd = prev.usd != null && line.usd != null ? prev.usd + line.usd : (prev.usd ?? line.usd);
    prev.rmb = prev.rmb != null && line.rmb != null ? prev.rmb + line.rmb : (prev.rmb ?? line.rmb);
  }
  return [...acc.values()];
}

export function sumLines(lines: BomLine[]): { usd: number; rmb: number } {
  let usd = 0;
  let rmb = 0;
  for (const l of lines) {
    if (l.part.excludeFromTotal) continue;
    usd += l.usd ?? 0;
    rmb += l.rmb ?? 0;
  }
  return { usd, rmb };
}
