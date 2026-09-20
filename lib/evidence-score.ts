/**
 * 证据重现度指数（ERI）的展示层。
 *
 * 这是**本目录自有的第二把尺子**，与 OPEN_REPRO_V2 是两个不同的模型，
 * 不能互相冒充：
 *   OPEN_REPRO_V2  —— physical-ai 的评分模型。本目录里只有 Berkeley 参考实现
 *                     带一个从那边**导入**的 88（原样保留、单独标注来源）。
 *   ERI（本文件）  —— 以 Berkeley 参考实现为 100 分锚点、由 pipeline/
 *                     score_reproduction.py 从可复核计数算出的证据指数。
 *
 * 它的可信度来自构造方式，而不是来自"看起来合理"：
 *   1. 六个维度全是计数——CAD 文件数、可解析 BOM 行项、PCB 文件数、
 *      URDF 文件数、装配文档数、许可字段。没有任何一处让模型去判断好坏。
 *   2. 锚点基准值由脚本从参考实现与 Berkeley 硬件仓库树**解析**得出，
 *      不是写死的常数；脚本每次运行重算并断言。
 *   3. 每个维度的证据（具体文件路径 / BOM 链接）随分数落盘在
 *      data/score-audit.json，可逐条核对。
 *   4. 未测维度按 0 计入并标注为**下界**——没验证过的不能得分，
 *      但也不假装它确实为 0。
 *
 * 口径（必须让读者知道）：
 *   - 观测面是**公开代码仓库的文件树**。把硬件资料放在仓库之外的项目
 *     （官方站点零件表、EasyEDA、OSF）会被系统性低估，其分数下会写明这一点。
 *   - 因此 ERI 回答的是"这个仓库里的证据有多齐全"，不是"这个项目有多好"。
 */
import { EVIDENCE_SCORES, type EvidenceScore, type ScoreDimension } from "./scores.generated";

export { EVIDENCE_SCORES };
export type { EvidenceScore, ScoreDimension };

export const ANCHOR_SCORE = 100;
export const ANCHOR_NAME = "Berkeley Humanoid Lite（参考实现）";

export type BandKey = "reference" | "near" | "partial" | "early" | "design-only";

export interface Band {
  key: BandKey;
  label: string;
  hint: string;
  className: string;
}

/** 档位按锚点划分——100 是"参考实现"的位置，不是满分上限。 */
export const BANDS: Record<BandKey, Band> = {
  reference: {
    key: "reference",
    label: "参考级或以上",
    hint: "证据齐全度达到或超过 Berkeley 参考实现",
    className: "border-primary/50 bg-primary/10 text-primary",
  },
  near: {
    key: "near",
    label: "接近参考",
    hint: "设计、物料与文档中多数维度齐备",
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  partial: {
    key: "partial",
    label: "部分可重现",
    hint: "部分维度齐备，通常缺可采购清单或装配文档",
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  early: {
    key: "early",
    label: "起步",
    hint: "仅提供了部分设计文件",
    className: "border-border bg-muted/40 text-muted-foreground",
  },
  "design-only": {
    key: "design-only",
    label: "仅存设计",
    hint: "只有设计文件，缺物料、文档与电子设计",
    className: "border-border bg-muted/30 text-muted-foreground",
  },
};

export function bandOf(score: number | null): Band | null {
  if (score === null) return null;
  if (score >= 100) return BANDS.reference;
  if (score >= 70) return BANDS.near;
  if (score >= 45) return BANDS.partial;
  if (score >= 20) return BANDS.early;
  return BANDS["design-only"];
}

export function scoreOf(projectId: string): EvidenceScore | null {
  return EVIDENCE_SCORES[projectId] ?? null;
}

/** 档位分界，供审看台做筛选用。 */
export const BAND_FILTERS: { key: BandKey; label: string; test: (s: number) => boolean }[] = [
  { key: "reference", label: "≥100 参考级或以上", test: (s) => s >= 100 },
  { key: "near", label: "70–100 接近参考", test: (s) => s >= 70 && s < 100 },
  { key: "partial", label: "45–70 部分可重现", test: (s) => s >= 45 && s < 70 },
  { key: "early", label: "20–45 起步", test: (s) => s >= 20 && s < 45 },
  { key: "design-only", label: "<20 仅存设计", test: (s) => s < 20 },
];

/** 各维度的通用说明，用于界面上的口径解释。 */
export const DIMENSION_NOTES: Record<string, string> = {
  design: "参数化 CAD 文件数（STEP/IGES/F3D/SLDPRT/SCAD 等）。可再导出加工是「能造」的前提；网格只能打印，不能改。",
  sourcing: "可解析 BOM 的行项数 × 规格系数（有型号/价格/供应商各占 0.25）。仅有一份清单但无型号无价格，不等于可采购。",
  assembly: "装配/构建类文档数（非 README 的构建指南、装配手册）。",
  electronics: "PCB / EDA 文件数（Gerber、KiCad、brd、sch）。机器人自有的板子设计。",
  kinematics: "URDF / Xacro / MJCF / USD / SRDF 文件数。运动学可被第三方复算与验证。Gazebo 的 .sdf 不计：语料里的 .sdf 绝大多数是仿真场景（地形、道具、角色），不是机器人自身的运动学描述——把它算进来会奖励「建了个仿真世界」。",
  licensing: "许可明确度：开放许可 1.0；有 LICENSE 但无法识别 0.5；未声明 0。允许再制造才算数。",
};
