"use client";

import { aggregateLines, collectPartsFor, nodeLabelPath, sumLines, type TreeNode } from "@/lib/robot-tree";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClassBadge, Mono, StatusDot, fmtQty } from "./marks";

export function PartsPanel({
  node,
  onOpenPart,
}: {
  node: TreeNode;
  onOpenPart: (partId: string) => void;
}) {
  const lines = aggregateLines(collectPartsFor(node));
  const totals = sumLines(lines);
  const path = nodeLabelPath(node.id);
  const actuatorTotal = node.actuators.reduce(
    (acc, a) => acc + (a.count > 0 ? a.count : 0),
    0,
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-4 pt-3 pb-3">
        <p className="num text-[11px] tracking-wide text-muted-foreground">{path.join(" › ")}</p>
        <h2 className="mt-1 text-[17px] leading-tight font-semibold">{node.label}</h2>
        {node.summary ? (
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{node.summary}</p>
        ) : null}
        <dl className="mt-3 grid grid-cols-3 gap-2">
          <Stat label="零件行" value={String(lines.length)} />
          <Stat label="执行器" value={actuatorTotal ? `${actuatorTotal} 台` : "—"} />
          <Stat label="约合成本" value={totals.usd ? `$${totals.usd.toFixed(2)}` : "—"} />
        </dl>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {lines.length === 0 ? (
          <p className="px-4 py-6 text-[13px] leading-relaxed text-muted-foreground">
            该层级没有直接挂载零件。展开子总成，或在 3D 视图中点选具体部件。
          </p>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 w-[76px] pl-4 text-[12px]">类别</TableHead>
                <TableHead className="h-8 text-[12px]">零件</TableHead>
                <TableHead className="h-8 w-[54px] text-right text-[12px]">数量</TableHead>
                <TableHead className="h-8 w-[72px] text-right text-[12px]">单价</TableHead>
                <TableHead className="h-8 w-[34px] pr-4 text-right text-[12px]">状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow
                  key={line.part.id}
                  onClick={() => onOpenPart(line.part.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="py-2 pl-4 align-top">
                    <ClassBadge cls={line.part.cls} />
                  </TableCell>
                  <TableCell className="py-2 align-top">
                    <span className="block text-[13px] leading-snug text-foreground">
                      {line.part.nameZh}
                    </span>
                    <span className="num mt-0.5 block text-[11px] leading-tight text-muted-foreground">
                      {line.part.mpn ?? "无 MPN"}
                    </span>
                  </TableCell>
                  <TableCell className="num py-2 text-right align-top text-[13px]">
                    {fmtQty(line.qty)}
                    {line.part.priceUnit ? (
                      <span className="text-muted-foreground"> {line.part.priceUnit}</span>
                    ) : null}
                  </TableCell>
                  <TableCell className="num py-2 text-right align-top text-[12px]">
                    {line.usd != null ? (
                      <>
                        <span className="block">${line.usd.toFixed(2)}</span>
                        {line.rmb != null ? (
                          <span className="block text-muted-foreground">¥{line.rmb.toFixed(2)}</span>
                        ) : null}
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2 pr-4 text-right align-top">
                    <StatusDot availability={line.part.availability} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="text-muted-foreground">本级合计（按 BOM 单价）</span>
          <Mono className="text-[15px] font-semibold">
            ${totals.usd.toFixed(2)}
            <span className="ml-2 text-muted-foreground">¥{totals.rmb.toFixed(2)}</span>
          </Mono>
        </div>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
          不含未报价的打印件与装配工序；整机总价以「采购清单」页签为准。
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-background/60 px-2 py-1.5">
      <dt className="text-[11px] leading-none text-muted-foreground">{label}</dt>
      <dd className="num mt-1 text-[14px] leading-none font-semibold">{value}</dd>
    </div>
  );
}
