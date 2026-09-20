"use client";

import type { RobotModel } from "@/lib/robot-view";
import { Mono } from "./marks";

/**
 * Joint reverse-lookup for generated teardowns.
 *
 * The reference implementation's panel is an actuator-chain view (motor →
 * cycloidal reducer → driver → encoder → harness) built from its published
 * documentation. Generated teardowns have no such document, so this renders
 * exactly what the released URDF states — type, parent/child, axis, limits —
 * and says so, instead of borrowing the reference's wording.
 */
export function JointTable({
  model,
  joints,
  activeId,
  onSelect,
}: {
  model: RobotModel | null;
  joints: { id: number; name: string; link: string }[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  if (!model || model.joints.length === 0) {
    return (
      <div className="p-4">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          该仓库没有发布运动学定义（URDF/MJCF），因此无法反查关节。
        </p>
      </div>
    );
  }

  const active = model.joints.find((j) => joints.find((x) => x.id === activeId)?.name === j.name) ?? null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-4 pt-3 pb-3">
        <p className="num text-[11px] tracking-wide text-muted-foreground">
          URDF 关节 {model.joints.length} 个
        </p>
        <h2 className="mt-1 text-[17px] leading-tight font-semibold">关节反查</h2>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
          序号为关节在发布 URDF 中的出现顺序，不是总线编号——该仓库没有发布 CAN 映射。
        </p>
      </div>

      {active ? (
        <div className="border-b border-border px-4 py-3">
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12px]">
            <dt className="text-muted-foreground">类型</dt>
            <dd>
              <Mono>{active.type}</Mono>
            </dd>
            <dt className="text-muted-foreground">父 → 子</dt>
            <dd className="break-all">
              <Mono>
                {active.parent} → {active.child}
              </Mono>
            </dd>
            <dt className="text-muted-foreground">轴向</dt>
            <dd>
              <Mono>[{active.axis.join(", ")}]</Mono>
            </dd>
            <dt className="text-muted-foreground">限位</dt>
            <dd>
              <Mono>
                {active.limitLower != null || active.limitUpper != null
                  ? `${active.limitLower ?? "—"} … ${active.limitUpper ?? "—"}`
                  : "未给出"}
              </Mono>
            </dd>
            <dt className="text-muted-foreground">原点</dt>
            <dd>
              <Mono>[{active.origin.map((v) => v.toFixed(4)).join(", ")}]</Mono>
            </dd>
          </dl>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="divide-y divide-border/60">
          {joints.map((j) => (
            <li key={j.id}>
              <button
                type="button"
                onClick={() => onSelect(j.id)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-accent"
              >
                <Mono className="w-6 shrink-0 text-[12px] text-muted-foreground">#{j.id}</Mono>
                <span className="min-w-0 flex-1 truncate text-[13px]">{j.name}</span>
                <Mono className="shrink-0 text-[11px] text-muted-foreground">{j.link}</Mono>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
