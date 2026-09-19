/**
 * Reproduction scoring — the single source of truth for every "重现概率" in the UI.
 *
 * Why this file exists
 * --------------------
 * The predecessor workbench carried a hard-coded `88%` in the type, in the
 * component, and in the nav label. Every project therefore displayed Berkeley
 * Humanoid Lite's own score, and the gaps panel asserted "这些缺口已计入 88% 概率"
 * for projects that had never been through a model at all.
 *
 * The fix is structural: a score exists only as a `SCORED` record naming its
 * model and carrying its basis, or as `UNSCORED` with a reason. No caller can
 * default to a number, so the UI cannot show a probability no model produced.
 *
 * Vocabulary below mirrors `physical-ai/scripts/lib/reproduction-model.mjs`
 * (OPEN_REPRO_V2) exactly — band names, thresholds, floor, ceiling and class
 * ceilings. A second, slightly-different scoring vocabulary would make the two
 * systems' numbers non-comparable while looking comparable, which is worse than
 * having no score at all.
 */

// === Mirrored from OPEN_REPRO_V2 (keep byte-identical semantics) =============

export const MODEL = "OPEN_REPRO_V2";

export const INTERPRETATION =
  "Estimated probability that a competent robotics team can reproduce a working " +
  "physical robot from currently public sources, allowing ordinary fabrication " +
  "and procurement but no private files or author assistance.";

/** Dimension weights. The model contract; must sum to 1.0. */
export const WEIGHTS = {
  fabrication_design: 0.22,
  assembly_integration: 0.16,
  itemization_procurement: 0.2,
  electronics: 0.1,
  control_stack: 0.13,
  build_documentation: 0.09,
  evidence_quality: 0.1,
} as const;

export type Dimension = keyof typeof WEIGHTS;

export const SCORE_FLOOR = 5;
export const SCORE_CEILING = 95;

/**
 * Difficulty ceiling per embodiment class — a gripper with a BOM and a full
 * humanoid with a BOM are not equally reproducible, so complexity caps the
 * achievable probability instead of subtracting a flat penalty.
 *
 * `HUMANOID_FULL: 88` is the origin of the hard-coded 88 in the predecessor:
 * Berkeley Humanoid Lite's class ceiling had been copied into the UI as if it
 * were every project's measured score.
 */
export const CLASS_CEILING: Record<string, number> = {
  HUMANOID_FULL: 88,
  RECONFIGURABLE_HAND_HUMANOID: 86,
  UPPER_BODY_MOBILE_MANIPULATOR: 86,
  BIMANUAL_MANIPULATOR: 87,
  AERIAL_MANIPULATOR: 86,
  MULTI_ROBOT_CONSTRUCTION: 86,
  BIPED: 89,
  WHEELED_BIPED: 90,
  UPPER_BODY_HUMANOID: 90,
  MOBILE_MANIPULATOR: 89,
  UNDERWATER_ROBOT: 88,
  AERIAL_ROBOT: 89,
  SOFT_ROBOT: 90,
  AUTONOMOUS_SURFACE_VEHICLE: 90,
  AGRICULTURAL_ROBOT: 90,
  DEXTEROUS_HAND: 91,
  DEXTEROUS_HAND_FAMILY: 90,
  QUADRUPED: 91,
  BIPED_PLANAR: 92,
  HEXAPOD: 92,
  PARALLEL_ROBOT: 92,
  ROBOT_ARM: 93,
  ROBOT_ARM_FAMILY: 92,
  TRACKED_ROBOT: 93,
  HYBRID_ROBOT: 91,
  WHEELED_ROBOT: 94,
  LAB_ROBOT: 94,
  HOME_ROBOT: 94,
  MEASUREMENT_ROBOT: 94,
  GANTRY_ROBOT: 93,
  SURFACE_ROBOT: 93,
  ART_ROBOT: 94,
  SOCIAL_ROBOT: 93,
  EDUCATIONAL_ROBOT: 95,
  ROBOT_HEAD: 94,
  ROBOT_GRIPPER: 95,
  WHEELED_ROBOT_FAMILY: 93,
};

// === Display layer ===========================================================

export type ReproBand = "VERY_HIGH" | "HIGH" | "MODERATE" | "LOW" | "VERY_LOW";

export type Confidence = "HIGH" | "MEDIUM" | "LOW";

/** Ascending minima, mirroring BANDS in the model. */
const BANDS: { min: number; band: ReproBand }[] = [
  { min: 80, band: "VERY_HIGH" },
  { min: 65, band: "HIGH" },
  { min: 45, band: "MODERATE" },
  { min: 25, band: "LOW" },
  { min: 0, band: "VERY_LOW" },
];

/** Derived from the percentage, never authored, so it cannot drift. */
export function bandOf(percent: number): ReproBand {
  return (BANDS.find((entry) => percent >= entry.min) ?? BANDS[BANDS.length - 1]).band;
}

export const BAND_LABEL: Record<ReproBand, string> = {
  VERY_HIGH: "极高",
  HIGH: "高",
  MODERATE: "中",
  LOW: "低",
  VERY_LOW: "极低",
};

/** Why a project has no probability. Rendered verbatim. */
export type UnscoredReason =
  | "NOT_YET_MODELED"
  | "INSUFFICIENT_EVIDENCE"
  | "OUT_OF_MODEL_SCOPE";

export const UNSCORED_LABEL: Record<UnscoredReason, string> = {
  NOT_YET_MODELED: "尚未进入评分模型",
  INSUFFICIENT_EVIDENCE: "证据不足以评分",
  OUT_OF_MODEL_SCOPE: "不在评分模型覆盖的形态范围内",
};

/** One weighted dimension, kept so a score can be re-derived rather than trusted. */
export interface ScoreBasis {
  dimension: Dimension | string;
  /** Contribution to the final percentage, in points (weight × 100 × dimension score). */
  points: number;
  /** Points this dimension could contribute at full marks, so the reader can judge the loss. */
  max: number;
  /** What the dimension observed, in the model's own counts. */
  detail: string;
}

export interface ScoredReproduction {
  state: "SCORED";
  probabilityPercent: number;
  band: ReproBand;
  confidence: Confidence;
  model: string;
  /** Non-empty by construction: a score without a stated basis is not publishable. */
  basis: ScoreBasis[];
  /** Embodiment class whose ceiling capped this score, if any. */
  ceilingClass?: string;
  ceilingValue?: number;
  gradedAt: string;
  /**
   * "DERIVED"  — this system ran the model and can show every dimension.
   * "IMPORTED" — the number was published by another system. Displayed with
   *              attribution and never re-derived, because a locally
   *              reconstructed breakdown would not be the published score.
   */
  provenance: "DERIVED" | "IMPORTED";
  /** Required for IMPORTED: where the number came from. */
  sourceRef?: string;
}

export interface UnscoredReproduction {
  state: "UNSCORED";
  reason: UnscoredReason;
  note: string;
}

export type ReproductionScore = ScoredReproduction | UnscoredReproduction;

/**
 * Build a locally derived score. Band is derived, and an empty basis throws, so
 * an unsupported score cannot compile its way into the data.
 */
export function scored(
  probabilityPercent: number,
  confidence: Confidence,
  basis: ScoreBasis[],
  opts: { ceilingClass?: string; gradedAt: string; model?: string },
): ScoredReproduction {
  if (basis.length === 0) {
    throw new Error(
      `scored(): ${probabilityPercent}% supplied with no basis. ` +
        `A score must state its dimensions; use unscored() instead.`,
    );
  }
  const ceilingValue = opts.ceilingClass ? CLASS_CEILING[opts.ceilingClass] : undefined;
  return {
    state: "SCORED",
    probabilityPercent,
    band: bandOf(probabilityPercent),
    confidence,
    model: opts.model ?? MODEL,
    basis,
    ceilingClass: opts.ceilingClass,
    ceilingValue,
    gradedAt: opts.gradedAt,
    provenance: "DERIVED",
  };
}

/**
 * Record a score published by another system without pretending to re-derive it.
 * `source` is required so the number always carries its attribution; the basis
 * is transcribed from the publisher rather than reconstructed here.
 */
export function importedScore(
  probabilityPercent: number,
  confidence: Confidence,
  source: string,
  basis: ScoreBasis[],
  opts: { ceilingClass?: string; gradedAt: string; model?: string },
): ScoredReproduction {
  if (!source) {
    throw new Error("importedScore(): a non-empty source is required.");
  }
  const ceilingValue = opts.ceilingClass ? CLASS_CEILING[opts.ceilingClass] : undefined;
  return {
    state: "SCORED",
    probabilityPercent,
    band: bandOf(probabilityPercent),
    confidence,
    model: opts.model ?? MODEL,
    basis,
    ceilingClass: opts.ceilingClass,
    ceilingValue,
    gradedAt: opts.gradedAt,
    provenance: "IMPORTED",
    sourceRef: source,
  };
}

export function unscored(reason: UnscoredReason, note: string): UnscoredReproduction {
  return { state: "UNSCORED", reason, note };
}

/** Compact label for badges. Never falls back to a number. */
export function scoreLabel(score: ReproductionScore): string {
  return score.state === "SCORED"
    ? `${score.probabilityPercent}% · ${BAND_LABEL[score.band]}`
    : `未评分 · ${UNSCORED_LABEL[score.reason]}`;
}

/**
 * Sentence shown above the gaps list. Phrasing differs by state because the
 * claim differs: a scored project's gaps are inside the model, an unscored
 * project's gaps are not represented by any number at all.
 */
export function gapsDisclaimer(score: ReproductionScore): string {
  return score.state === "SCORED"
    ? `这些缺口已作为扣分项计入 ${score.model} 的 ${score.probabilityPercent}%，未在 UI 中被静默补齐。`
    : `本项目尚无重现概率（${UNSCORED_LABEL[score.reason]}）。下列缺口未被任何模型计入，不代表已评估。`;
}
