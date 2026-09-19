"use client";

import { ChevronLeft } from "lucide-react";
import { CAN_BUS_COLOR, CAN_BUS_LABEL } from "@/lib/robot-parts";
import type { TreeNode } from "@/lib/robot-tree";
import { Mono } from "./marks";

export interface JointEntry {
  node: TreeNode;
}

const GROUPS: { key: string; label: string; bus: "CAN0" | "CAN1" | "CAN2" | "CAN3" }[] = [
  { key: "left_shoulder", label: "左臂", bus: "CAN0" },
  { key: "right_shoulder", label: "右臂", bus: "CAN1" },
  { key: "left_hip", label: "左腿", bus: "CAN2" },
  { key: "right_hip", label: "右腿", bus: "CAN3" },
];

/** Actuator mix published per limb, never per joint. */
function limbActuators(docName: string): { big: number; small: number; label: string } {
  if (docName.startsWith("left_shoulder") || docName.startsWith("left_elbow"))
    return { big: 1, small: 4, label: "左臂" };
  if (docName.startsWith("right_shoulder") || docName.startsWith("right_elbow"))
    return { big: 1, small: 4, label: "右臂" };
  return { big: 4, small: 2, label: docName.startsWith("left") ? "左腿" : "右腿" };
}

export function JointPanel({
  joints,
  activeId,
  onSelect,
  onOpenPart,
}: {
  joints: JointEntry[];
  activeId: number | null;
  onSelect: (jointId: number) => void;
  onOpenPart: (partId: string) => void;
}) {
  const active = joints.find((j) => j.node.joint?.jointId === activeId) ?? null;

  if (active) {
    const j = active.node.joint!;
    const busColor = CAN_BUS_COLOR[j.canBus] ?? "#8894a6";
    const limb = limbActuators(j.docName);

    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="border-b border-border px-4 pt-3 pb-3">
          <button
            type="button"
            onClick={() => onSelect(-1)}
            className="mb-2 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
            全部 22 个关节
          </button>
          <p className="num text-[11px] tracking-wide text-muted-foreground">
            关节 #{String(j.jointId).padStart(2, "0")}
          </p>
          <h2 className="mt-1 text-[17px] leading-tight font-semibold">{j.zhName}</h2>
          <p className="num mt-0.5 text-[11px] leading-none text-muted-foreground">{j.docName}</p>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{j.motion}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <section className="rounded-sm border border-border bg-background/50 p-3">
            <h3 className="text-[12px] tracking-wide text-muted-foreground">总线定位</h3>
            <div className="mt-2 flex items-center gap-3">
              <span
                className="num inline-flex items-center rounded-sm border px-2 py-1 text-[13px] font-semibold"
                style={{
                  color: busColor,
                  borderColor: `color-mix(in srgb, ${busColor} 45%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${busColor} 14%, transparent)`,
                }}
              >
                {j.canBus}
              </span>
              <Mono className="text-[15px]">CAN ID {j.canId}</Mono>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
              {CAN_BUS_LABEL[j.canBus] ?? ""}
              <span className="mx-1">·</span>
              关节角范围{" "}
              <Mono>
                {j.range[0]}° … {j.range[1]}°
              </Mono>
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              URDF 关节名 <Mono>{j.urdfJoint}</Mono>
            </p>
          </section>

          <section className="mt-4">
            <h3 className="text-[12px] tracking-wide text-muted-foreground">该关节的驱动链</h3>
            <ul className="mt-2 divide-y divide-border/70 overflow-hidden rounded-sm border border-border">
              <ChainRow
                label="电机"
                value={`${limb.label}共 ${limb.big} × MAD Components M6C12 150KV（6512）+ ${limb.small} × MAD Components 5010 110KV`}
                partId="6512-motor"
                onOpenPart={onOpenPart}
              />
              <ChainRow
                label="减速器"
                value="摆线针轮（cycloidal），壳体、摆线轮与输出轴均为打印件"
                partId="6512-print-cycloid"
                onOpenPart={onOpenPart}
              />
              <ChainRow
                label="驱动器"
                value="ST B-G431B-ESC1 单板 FOC，固件来自 Recoil-Motor-Controller-BESC"
                partId="esc"
                onOpenPart={onOpenPart}
              />
              <ChainRow
                label="位置反馈"
                value="AS5600 磁编码器 + 径向磁铁（改板后贴到驱动板上）"
                partId="as5600"
                onOpenPart={onOpenPart}
              />
              <ChainRow
                label="线束"
                value="XT30 电源线 + 30 AWG CAN 双绞线，14 AWG 走主电源"
                partId="xt30"
                onOpenPart={onOpenPart}
              />
            </ul>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
              公开发布给出了每个肢体的执行器配比，但没有逐关节标注哪一台是 6512、哪一台是 5010。装机前请按打印件尺寸与输出扭矩需求判断。
            </p>
          </section>

          <section className="mt-4 rounded-sm border border-dashed border-border px-3 py-2.5">
            <h3 className="text-[12px] tracking-wide text-muted-foreground">该关节的资料缺口</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              发布资料给出了总线、CAN ID、关节范围与 URDF 轴，但没有给出减速比实测值、编码器零位偏移与固件中的电角度标定结果，这些需要按官方文档自行标定。
            </p>
          </section>

          <section className="mt-4">
            <h3 className="text-[12px] tracking-wide text-muted-foreground">对应 3D 部件</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              该关节的壳体内含电机、驱动板、编码器与摆线组，在 3D 视图中对应{" "}
              <Mono>{j.meshLink}</Mono> 这一个部件。选中后用「仅显示选中件」可以单独查看它。
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-4 pt-3 pb-3">
        <h2 className="text-[17px] leading-tight font-semibold">关节反查</h2>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
          选择任一关节，查看它的电机、驱动器、线束与 CAN 地址。也可以直接点击 3D 视图里的关节标记。
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {GROUPS.map((g) => {
          const rows = joints.filter((j) => j.node.joint!.docName.startsWith(g.key));
          return (
            <section key={g.key} className="mb-4">
              <h3 className="mb-1.5 flex items-center gap-2 text-[12px] tracking-wide text-muted-foreground">
                <span
                  aria-hidden
                  className="size-2 rounded-full"
                  style={{ backgroundColor: CAN_BUS_COLOR[g.bus] }}
                />
                {g.label}
                <Mono className="text-[11px]">{g.bus}</Mono>
              </h3>
              <ul className="divide-y divide-border/60 overflow-hidden rounded-sm border border-border">
                {rows.map((row) => {
                  const j = row.node.joint!;
                  return (
                    <li key={j.jointId}>
                      <button
                        type="button"
                        onClick={() => onSelect(j.jointId)}
                        className="flex w-full items-baseline gap-3 px-2.5 py-2 text-left transition-colors hover:bg-accent"
                      >
                        <Mono className="w-5 shrink-0 text-[12px] text-muted-foreground">{j.canId}</Mono>
                        <span className="min-w-0 flex-1 truncate text-[13px]">{j.docName}</span>
                        <Mono className="shrink-0 text-[11px] text-muted-foreground">
                          {j.range[0]}…{j.range[1]}°
                        </Mono>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ChainRow({
  label,
  value,
  partId,
  onOpenPart,
}: {
  label: string;
  value: string;
  partId?: string;
  onOpenPart?: (id: string) => void;
}) {
  return (
    <li className="flex items-start gap-3 px-3 py-2">
      <span className="w-[52px] shrink-0 pt-px text-[12px] text-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 text-[13px] leading-snug">{value}</span>
      {partId && onOpenPart ? (
        <button
          type="button"
          onClick={() => onOpenPart(partId)}
          className="shrink-0 rounded-xs border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          查看
        </button>
      ) : null}
    </li>
  );
}
