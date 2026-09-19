"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { ACTIVITY_TOTAL_NOTE, buildBom, type BomFilter } from "@/lib/bom";
import { AVAILABILITY, PART_CLASS, type Availability, type PartClass } from "@/lib/robot-parts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ClassBadge, Mono, StatusDot, fmtQty } from "./marks";

const CLASSES: PartClass[] = ["BUY", "PRINT", "PCB", "ASSEMBLE"];
const STATUSES: Availability[] = ["orderable", "alternative", "nosource", "missing"];

export function BomPanel({ onOpenPart }: { onOpenPart: (partId: string) => void }) {
  const [filter, setFilter] = useState<BomFilter>({ classes: [], statuses: [] });
  const all = useMemo(() => buildBom(), []);

  const rows = useMemo(
    () =>
      all.rows.filter(
        (r) =>
          (filter.classes.length === 0 || filter.classes.includes(r.part.cls)) &&
          (filter.statuses.length === 0 || filter.statuses.includes(r.part.availability)),
      ),
    [all.rows, filter],
  );

  const totals = useMemo(() => {
    let usd = 0;
    let rmb = 0;
    for (const r of rows) {
      if (r.part.excludeFromTotal) continue;
      usd += r.usd ?? 0;
      rmb += r.rmb ?? 0;
    }
    return { usd, rmb };
  }, [rows]);

  const activeFilters = filter.classes.length + filter.statuses.length;

  const exportCsv = () => {
    const header = [
      "类别",
      "名称",
      "MPN",
      "制造商",
      "数量",
      "单位",
      "单价USD",
      "小计USD",
      "小计RMB",
      "状态",
      "采购链接",
    ];
    const lines = rows.map((r) =>
      [
        r.part.cls,
        r.part.nameZh,
        r.part.mpn ?? "",
        r.part.manufacturer ?? "",
        fmtQty(r.qty),
        r.part.priceUnit ?? "件",
        r.part.unitUsd != null ? r.part.unitUsd.toFixed(2) : "",
        r.usd != null ? r.usd.toFixed(2) : "",
        r.rmb != null ? r.rmb.toFixed(2) : "",
        AVAILABILITY[r.part.availability].label,
        r.part.link?.us ?? r.part.link?.cn ?? "",
      ]
        .map(csvCell)
        .join(","),
    );
    const csv = [header.map(csvCell).join(","), ...lines].join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "berkeley-humanoid-lite-bom.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-4 pt-3 pb-3">
        <h2 className="text-[17px] leading-tight font-semibold">整机采购清单</h2>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
          按公开发布版本自动汇总，共 {all.rows.length} 行零件。
        </p>

        <div className="mt-3 flex items-end justify-between gap-4 rounded-sm border border-border bg-background/60 px-3 py-2.5">
          <div>
            <p className="text-[11px] leading-none text-muted-foreground">预计整机物料成本</p>
            <p className="num mt-1.5 text-[24px] leading-none font-semibold text-primary">
              ${totals.usd.toFixed(2)}
            </p>
            <p className="num mt-1 text-[13px] leading-none text-muted-foreground">
              ¥{totals.rmb.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-[13px] transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Download className="size-3.5" aria-hidden />
            导出 CSV
          </button>
        </div>

        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{ACTIVITY_TOTAL_NOTE}</p>

        <div className="mt-3 space-y-2">
          <FilterRow
            label="类型"
            options={CLASSES.map((c) => ({ value: c, label: PART_CLASS[c].label, color: PART_CLASS[c].color }))}
            selected={filter.classes}
            onChange={(classes) => setFilter((f) => ({ ...f, classes: classes as PartClass[] }))}
          />
          <FilterRow
            label="状态"
            options={STATUSES.map((s) => ({ value: s, label: AVAILABILITY[s].label, color: AVAILABILITY[s].color }))}
            selected={filter.statuses}
            onChange={(statuses) => setFilter((f) => ({ ...f, statuses: statuses as Availability[] }))}
          />
          {activeFilters > 0 ? (
            <button
              type="button"
              onClick={() => setFilter({ classes: [], statuses: [] })}
              className="text-[12px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              清除筛选
            </button>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-8 w-[74px] pl-4 text-[12px]">类型</TableHead>
              <TableHead className="h-8 text-[12px]">零件 / MPN</TableHead>
              <TableHead className="h-8 w-[46px] text-right text-[12px]">数量</TableHead>
              <TableHead className="h-8 w-[70px] text-right text-[12px]">小计</TableHead>
              <TableHead className="h-8 w-[30px] pr-4 text-right text-[12px]">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.part.id} onClick={() => onOpenPart(r.part.id)} className="cursor-pointer">
                <TableCell className="py-2 pl-4 align-top">
                  <ClassBadge cls={r.part.cls} />
                </TableCell>
                <TableCell className="py-2 align-top">
                  <span className="block text-[13px] leading-snug">{r.part.nameZh}</span>
                  <span className="num mt-0.5 block text-[11px] leading-tight text-muted-foreground">
                    {r.part.mpn ?? "无 MPN"} · {r.paths.length} 处
                  </span>
                </TableCell>
                <TableCell className="num py-2 text-right align-top text-[13px]">
                  {fmtQty(r.qty)}
                  {r.part.priceUnit ? (
                    <span className="block text-[10px] text-muted-foreground">{r.part.priceUnit}</span>
                  ) : null}
                </TableCell>
                <TableCell className="num py-2 text-right align-top text-[12px]">
                  {r.usd != null ? (
                    <>
                      <span className="block">${r.usd.toFixed(2)}</span>
                      {r.rmb != null ? (
                        <span className="block text-muted-foreground">¥{r.rmb.toFixed(2)}</span>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-muted-foreground">未报价</span>
                  )}
                </TableCell>
                <TableCell className="py-2 pr-4 text-right align-top">
                  <StatusDot availability={r.part.availability} />
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-[13px] text-muted-foreground">
                  当前筛选下没有零件。
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-muted-foreground">
            {activeFilters > 0 ? `已筛选 ${rows.length} 行` : "全部零件行"}
          </span>
          <Mono className="text-[15px] font-semibold">
            ${totals.usd.toFixed(2)}
            <span className="ml-2 text-[13px] font-normal text-muted-foreground">
              ¥{totals.rmb.toFixed(2)}
            </span>
          </Mono>
        </div>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; color: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 shrink-0 text-[12px] text-muted-foreground">{label}</span>
      <ToggleGroup
        type="multiple"
        value={selected}
        onValueChange={onChange}
        size="sm"
        className="flex-wrap justify-start gap-1"
      >
        {options.map((o) => (
          <ToggleGroupItem
            key={o.value}
            value={o.value}
            className="num h-6 gap-1.5 rounded-sm border border-input px-2 text-[11px] data-[state=on]:border-current"
            style={selected.includes(o.value) ? { color: o.color } : undefined}
          >
            <span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: o.color }} />
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
