/**
 * View-model helpers shared by the 3D viewport and the control strip.
 *
 * Region assignment comes straight from the released URDF link names in
 * `public/model/robot.json`, so hiding or isolating a limb maps 1:1 onto the
 * published CAD hierarchy.
 */

export type Region = "torso" | "arm_left" | "arm_right" | "leg_left" | "leg_right";

export interface RegionInfo {
  key: Region;
  label: string;
  short: string;
  /** CAN bus carrying the region's motors, from the Joint ID Mapping doc. */
  bus: "CAN0" | "CAN1" | "CAN2" | "CAN3" | null;
  /** Lateral sign in the URDF (+Y is the model's left). */
  side: -1 | 0 | 1;
}

export const REGIONS: RegionInfo[] = [
  { key: "torso", label: "躯干（机身与机载设备）", short: "躯干", bus: null, side: 0 },
  { key: "arm_left", label: "左臂", short: "左臂", bus: "CAN0", side: 1 },
  { key: "arm_right", label: "右臂", short: "右臂", bus: "CAN1", side: -1 },
  { key: "leg_left", label: "左腿", short: "左腿", bus: "CAN2", side: 1 },
  { key: "leg_right", label: "右腿", short: "右腿", bus: "CAN3", side: -1 },
];

export function regionOfLink(link: string): Region {
  if (link.startsWith("arm_left")) return "arm_left";
  if (link.startsWith("arm_right")) return "arm_right";
  if (link.startsWith("leg_left")) return "leg_left";
  if (link.startsWith("leg_right")) return "leg_right";
  return "torso";
}

export interface LinkMeta {
  mass: number | null;
  min: [number, number, number];
  max: [number, number, number];
  tris: number;
}

export interface JointMeta {
  name: string;
  type: string;
  parent: string;
  child: string;
  origin: [number, number, number];
  axis: [number, number, number];
  limitLower: number | null;
  limitUpper: number | null;
}

export interface RobotModel {
  source: string;
  links: Record<string, LinkMeta>;
  joints: JointMeta[];
}

export function linkCenter(meta: LinkMeta): [number, number, number] {
  return [
    (meta.min[0] + meta.max[0]) / 2,
    (meta.min[1] + meta.max[1]) / 2,
    (meta.min[2] + meta.max[2]) / 2,
  ];
}

/** Bounding box centre of the whole released model, used as the explosion origin. */
export function modelCenter(model: RobotModel): [number, number, number] {
  const names = Object.keys(model.links);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const n of names) {
    const l = model.links[n];
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], l.min[i]);
      max[i] = Math.max(max[i], l.max[i]);
    }
  }
  return [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
}

/**
 * Explosion offset for one link, in the URDF frame (X forward, Y left, Z up).
 *
 * Lateral and vertical travel is exaggerated relative to the front/back axis so
 * limbs fan out and the stacked actuator modules separate along each limb.
 * Values are metres at full extension.
 */
export function explodeOffset(
  meta: LinkMeta,
  center: [number, number, number],
): [number, number, number] {
  const c = linkCenter(meta);
  return [
    (c[0] - center[0]) * 2.0,
    (c[1] - center[1]) * 2.8,
    (c[2] - center[2]) * 1.7,
  ];
}

/** URDF is Z-up; the viewport renders a Y-up scene, so the model root is rotated. */
export const MODEL_ROOT_ROTATION_X = -Math.PI / 2;
