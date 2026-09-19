"use client";

import { ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ALL_PARTS, AVAILABILITY, EVIDENCE, PART_CLASS, type Part } from "@/lib/robot-parts";
import { ClassBadge, Mono, StatusDot } from "./marks";

const BY_ID = new Map<string, Part>(ALL_PARTS.map((p) => [p.id, p]));

export function PartSheet({
  partId,
  onClose,
  usages,
}: {
  partId: string | null;
  onClose: () => void;
  /** Assembly paths where this part appears, with quantity per path. */
  usages: { path: string; qty: number }[];
}) {
  const part = partId ? BY_ID.get(partId) : undefined;
  const availability = part ? AVAILABILITY[part.availability] : null;

  return (
    <Sheet open={Boolean(part)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full gap-0 border-l border-border bg-card p-0 sm:max-w-[440px]"
      >
        {part && availability ? (
          <>
            <SheetHeader className="gap-2 border-b border-border px-5 pt-5 pb-4">
              <div className="flex items-center gap-2">
                <ClassBadge cls={part.cls} />
                <StatusDot availability={part.availability} withLabel className="text-[12px]" />
              </div>
              <SheetTitle className="text-[19px] leading-tight">{part.nameZh}</SheetTitle>
              <SheetDescription className="num text-[12px] leading-snug text-muted-foreground">
                {part.name}
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <dl className="grid grid-cols-[92px_minmax(0,1fr)] gap-x-3 gap-y-2.5 text-[14px]">
                <Row label="数量">
                  <Mono>
                    {formatQty(part.qty)}
                    {part.priceUnit ? ` ${part.priceUnit}` : ""}
                  </Mono>
                  <span className="text-[12px] text-muted-foreground">
                    {part.priceUnit ? "／每台执行器或整机" : "／每套对应总成"}
                  </span>
                </Row>
                <Row label="单价">
                  {part.unitUsd != null || part.unitRmb != null ? (
                    <Mono>
                      {part.unitUsd != null ? `$${part.unitUsd.toFixed(2)}` : "—"}
                      {part.unitRmb != null ? ` / ¥${part.unitRmb.toFixed(2)}` : ""}
                      {part.priceUnit ? ` / ${part.priceUnit}` : ""}
                    </Mono>
                  ) : (
                    <span className="text-muted-foreground">发布资料未给价格</span>
                  )}
                </Row>
                <Row label="MPN">
                  <Mono>{part.mpn ?? "—"}</Mono>
                  {!part.mpn ? (
                    <span className="text-[12px] text-muted-foreground">
                      可从 CAD / 文档识别，但发布资料未给出型号
                    </span>
                  ) : null}
                </Row>
                <Row label="制造商">
                  {part.manufacturer ?? "—"}
                  {part.manufacturerFromMpn ? (
                    <span className="text-[12px] text-muted-foreground">由 MPN 推得</span>
                  ) : null}
                </Row>
                <Row label="规格">{part.spec ?? "—"}</Row>
                <Row label="类别">
                  {PART_CLASS[part.cls].label}
                  <span className="text-[12px] text-muted-foreground">{PART_CLASS[part.cls].hint}</span>
                </Row>
                <Row label="状态">
                  {availability.label}
                  <span className="text-[12px] text-muted-foreground">{availability.hint}</span>
                </Row>
              </dl>

              {part.excludeFromTotal ? (
                <p className="mt-4 rounded-sm border border-border bg-background/60 px-3 py-2 text-[12px] leading-relaxed text-muted-foreground">
                  该行在官方 BOM 中没有小计，属于可选替代方案，因此不计入整机预计成本。
                </p>
              ) : null}

              {part.note ? (
                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{part.note}</p>
              ) : null}

              <section className="mt-5">
                <h3 className="text-[12px] tracking-wide text-muted-foreground">采购链接（来自公开发布）</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {part.link?.us ? (
                    <LinkButton href={part.link.us} label="美国渠道" sub="USD" />
                  ) : null}
                  {part.link?.cn ? (
                    <LinkButton href={part.link.cn} label="中国渠道" sub="CNY" />
                  ) : null}
                  {!part.link?.us && !part.link?.cn ? (
                    <p className="text-[13px] text-muted-foreground">
                      发布资料未提供该件的采购链接，需要自行选型或替代。
                    </p>
                  ) : null}
                </div>
              </section>

              <section className="mt-5">
                <h3 className="text-[12px] tracking-wide text-muted-foreground">出处</h3>
                <ul className="mt-2 space-y-1.5">
                  {part.evidence.map((key) => {
                    const e = EVIDENCE[key];
                    return (
                      <li key={key}>
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start gap-2 text-[13px] leading-snug text-foreground/85 hover:text-primary"
                        >
                          <span className="num mt-px shrink-0 rounded-xs border border-border px-1 py-px text-[10px] leading-none text-muted-foreground">
                            {e.label}
                          </span>
                          <span className="flex-1">{e.detail}</span>
                          <ExternalLink className="mt-0.5 size-3.5 shrink-0 opacity-0 group-hover:opacity-70" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {usages.length ? (
                <section className="mt-5">
                  <h3 className="text-[12px] tracking-wide text-muted-foreground">用在哪里</h3>
                  <ul className="mt-2 space-y-1">
                    {usages.map((u) => (
                      <li
                        key={u.path}
                        className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1 text-[12px] last:border-0"
                      >
                        <span className="min-w-0 flex-1 text-muted-foreground">{u.path}</span>
                        <Mono className="shrink-0">×{formatQty(u.qty)}</Mono>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="pt-0.5 text-[12px] tracking-wide text-muted-foreground">{label}</dt>
      <dd className="min-w-0 leading-snug">
        {children}
      </dd>
    </>
  );
}

function LinkButton({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/60 px-2.5 py-1.5 text-[13px] transition-colors hover:border-primary/50 hover:text-primary"
    >
      <ExternalLink className="size-3.5" aria-hidden />
      <span>{label}</span>
      <span className="num text-[11px] text-muted-foreground">{sub}</span>
    </a>
  );
}

function formatQty(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}
