import type { ReproductionScore } from "./reproduction";

/**
 * Shared shape for every project in the workbench, whether hand-curated or
 * generated from a public repository tree.
 *
 * The generated side (`lib/projects.generated.ts`) emits exactly this shape, so
 * a machine-produced project and a curated one render through the same
 * component and are held to the same evidence rules.
 */

export type EvidenceState = "verified" | "partial" | "missing";

/** Procurement class of a row. Mirrors the deep workbench's PartClass. */
export type PartKind = "BUY" | "PRINT" | "PCB" | "MAKE" | "SW";

export interface WorkbenchPart {
  id: string;
  assembly: string;
  name: string;
  specification: string;
  /** Free-form: "1", "4", "UNKNOWN", "可选". Never invented. */
  quantity: string;
  kind: PartKind;
  state: EvidenceState;
  /** Where this row's claim comes from. Required. */
  source: string;
  note?: string;
}

export interface Assembly {
  id: string;
  name: string;
  description: string;
  /** 2D layout only, for the schematic map. Presentation, not data. */
  x: number;
  y: number;
  color: string;
}

export interface WorkbenchEvidence {
  label: string;
  url: string;
  state: EvidenceState;
  detail: string;
}

export interface WorkbenchProject {
  id: string;
  name: string;
  category: string;
  version: string;
  embodiment: string;
  summary: string;
  repository: string;
  /** What the release snapshot is based on, so "which files" is never a guess. */
  releaseBasis: string;
  /** Populated for generated projects; curated entries may omit. */
  stars?: number;
  license?: string;
  assemblies: Assembly[];
  parts: WorkbenchPart[];
  evidence: WorkbenchEvidence[];
  gaps: string[];
  reproduction: ReproductionScore;
  /** True when a human curated this entry rather than the evidence pipeline. */
  curated?: boolean;
  /** True when a deep 3D build explorer exists alongside this generic view. */
  deep?: boolean;
}
