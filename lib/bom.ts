/**
 * Whole-robot purchase list, generated from the assembly tree rather than
 * hand-maintained. The published Google Sheet is the source of every unit price.
 */

import {
  ROBOT_TREE,
  rollup,
  type TreeNode,
} from "./robot-tree";
import { ACTUATOR_PARTS, type Availability, type Part, type PartClass } from "./robot-parts";

export interface BomRow {
  part: Part;
  qty: number;
  usd: number | null;
  rmb: number | null;
  /** Distinct assembly paths where the part appears. */
  paths: string[];
}

export interface WholeBom {
  rows: BomRow[];
  /** Count of distinct part lines. */
  lineCount: number;
  /** Sum of quantities across rows, used as a rough "piece count". */
  totalUnits: number;
  usd: number;
  rmb: number;
}

export const ACTIVITY_TOTAL_NOTE =
  "总额与官方 BOM 的整机页签一致（$4,350.59 / ¥23,244.19）。未报价的打印件与装配工序按 0 计入，替代 IMU 不计入总额。";

export function buildBom(): WholeBom {
  const roll = rollup(ROBOT_TREE);

  // Walk the tree once to collect every occurrence path per part.
  const paths = new Map<string, Set<string>>();
  const note = (partId: string, trail: string[]) => {
    const set = paths.get(partId) ?? new Set<string>();
    set.add(trail.join(" › ") || ROBOT_TREE.label);
    paths.set(partId, set);
  };
  const visit = (node: TreeNode, trail: string[]) => {
    const here = node.kind === "root" ? trail : [...trail, node.label];
    for (const ref of node.parts) {
      note(ref.partId, here);
    }
    for (const a of node.actuators) {
      if (a.count <= 0) continue;
      for (const p of ACTUATOR_PARTS[a.variant]) {
        if (p.printed && !p.mpn) continue;
        note(p.id, here);
      }
    }
    node.children.forEach((c) => visit(c, here));
  };
  visit(ROBOT_TREE, []);

  const rows: BomRow[] = roll.lines
    .map((line) => ({
      part: line.part,
      qty: line.qty,
      usd: line.usd,
      rmb: line.rmb,
      paths: [...(paths.get(line.part.id) ?? new Set<string>())],
    }))
    .sort((a, b) => {
      const order: PartClass[] = ["BUY", "PCB", "PRINT", "ASSEMBLE"];
      const byClass = order.indexOf(a.part.cls) - order.indexOf(b.part.cls);
      if (byClass !== 0) return byClass;
      return (b.usd ?? 0) - (a.usd ?? 0);
    });

  const totalUnits = rows.reduce((s, r) => s + r.qty, 0);
  return { rows, lineCount: rows.length, totalUnits, usd: roll.usd, rmb: roll.rmb };
}

export interface BomFilter {
  classes: PartClass[];
  statuses: Availability[];
}
