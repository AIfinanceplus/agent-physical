"use client";

import { AVAILABILITY, PART_CLASS, type Availability, type PartClass } from "@/lib/robot-parts";
import { cn } from "@/lib/utils";

export function ClassBadge({ cls, className }: { cls: PartClass; className?: string }) {
  const info = PART_CLASS[cls];
  return (
    <span
      className={cn(
        "num inline-flex shrink-0 items-center rounded-sm border px-1.5 py-0.5 text-[11px] leading-none font-medium tracking-wide",
        className,
      )}
      style={{
        color: info.color,
        borderColor: `color-mix(in srgb, ${info.color} 45%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${info.color} 14%, transparent)`,
      }}
      title={info.hint}
    >
      {info.label}
    </span>
  );
}

export function StatusDot({
  availability,
  withLabel = false,
  className,
}: {
  availability: Availability;
  withLabel?: boolean;
  className?: string;
}) {
  const info = AVAILABILITY[availability];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[13px]", className)} title={info.hint}>
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full"
        style={{
          backgroundColor: info.dash ? "transparent" : info.color,
          border: info.dash ? `1.5px dashed ${info.color}` : "none",
        }}
      />
      {withLabel ? <span style={{ color: info.color }}>{info.label}</span> : null}
    </span>
  );
}

export function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("num", className)}>{children}</span>;
}

export function StateLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {(Object.keys(AVAILABILITY) as Availability[]).map((k) => (
        <StatusDot key={k} availability={k} withLabel />
      ))}
    </div>
  );
}

/** Quantities include fractional filament weights, so trim trailing zeros. */
export function fmtQty(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export function money(usd: number | null | undefined, rmb: number | null | undefined): string {
  if (usd == null && rmb == null) return "—";
  const parts: string[] = [];
  if (usd != null) parts.push(`$${usd.toFixed(2)}`);
  if (rmb != null) parts.push(`¥${rmb.toFixed(2)}`);
  return parts.join(" / ");
}
