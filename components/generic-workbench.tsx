"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Download, ExternalLink, Search } from "lucide-react";
import type { EvidenceState, WorkbenchProject } from "@/lib/workbench-projects";
import { gapsDisclaimer, scoreLabel } from "@/lib/reproduction";
import { bandOf, scoreOf } from "@/lib/evidence-score";

const KIND_COLOR = { BUY: "#5aa9ff", PRINT: "#b98cff", PCB: "#35d0c8", MAKE: "#ffb454", SW: "#8894a6" } as const;
const STATE_LABEL: Record<EvidenceState, string> = { verified: "已核验", partial: "待归一", missing: "资料缺失" };

export function GenericWorkbench({ project }: { project: WorkbenchProject }) {
  const score = project.reproduction;
  const [selected, setSelected] = useState(project.assemblies[0]?.id ?? "");
  const [explode, setExplode] = useState(46);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"bom" | "evidence" | "gaps">("bom");
  const selectedAssembly = project.assemblies.find((assembly) => assembly.id === selected) ?? project.assemblies[0];
  const rows = useMemo(() => project.parts.filter((part) => {
    const matchesAssembly = !selected || part.assembly === selected;
    const haystack = `${part.name} ${part.specification} ${part.kind}`.toLowerCase();
    return matchesAssembly && haystack.includes(query.toLowerCase());
  }), [project.parts, query, selected]);
  const verifiedCount = project.parts.filter((part) => part.state === "verified").length;
  const eri = scoreOf(project.id);

  const exportCsv = () => {
    const fields = ["assembly", "kind", "name", "specification", "quantity", "evidence_state", "source"];
    const body = project.parts.map((part) => [part.assembly, part.kind, part.name, part.specification, part.quantity, part.state, part.source]);
    const csv = [fields, ...body].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${project.id.toLowerCase()}-evidence-bom.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background lg:h-full lg:overflow-hidden">
      <header className="shrink-0 border-b border-border px-4 py-3 lg:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge primary>{project.id}</Badge><Badge>{project.category}</Badge><Badge primary>{project.version} · {project.embodiment}</Badge><Badge primary>{score.state === "SCORED" ? `OPEN REPRO ${scoreLabel(score)}` : scoreLabel(score)}</Badge><EriBadge id={project.id} />
          <a href={project.repository} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary">官方源 <ExternalLink className="size-3" /></a>
        </div>
        <h1 className="mt-2 text-[20px] font-semibold">{project.name} · 互动拆解与证据台</h1>
        <p className="mt-1 max-w-5xl text-[12px] leading-relaxed text-muted-foreground">{project.summary} 版本依据：{project.releaseBasis}。未公开信息保持 UNKNOWN，不做推测填充。</p>
      </header>

      <main className="grid min-h-0 flex-1 lg:grid-cols-[280px_minmax(0,1fr)_minmax(380px,460px)]">
        <aside className="border-b border-border lg:min-h-0 lg:overflow-y-auto lg:border-r lg:border-b-0">
          <div className="border-b border-border px-4 py-3"><p className="text-[13px] font-semibold">装配树</p><p className="mt-1 text-[11px] text-muted-foreground">点击总成同步筛选拓扑与 BOM</p></div>
          <div className="space-y-1 p-2">
            {project.assemblies.map((assembly, index) => {
              const count = project.parts.filter((part) => part.assembly === assembly.id).length;
              return <button key={assembly.id} type="button" onClick={() => setSelected(assembly.id)} className={`w-full rounded-sm border px-3 py-2.5 text-left transition-colors ${selected === assembly.id ? "border-primary/50 bg-primary/10" : "border-transparent hover:bg-accent"}`}>
                <span className="flex items-center gap-2"><span className="num text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><span className="text-[13px] font-medium">{assembly.name}</span><span className="num ml-auto text-[11px] text-muted-foreground">{count} 行</span></span>
                <span className="mt-1 block pl-7 text-[11px] leading-snug text-muted-foreground">{assembly.description}</span>
              </button>;
            })}
          </div>
          <div className="border-t border-border p-4 text-[11px] leading-relaxed text-muted-foreground"><span className="text-foreground">范围说明：</span> 行数表示已经证据化的 BOM/文件条目，不等于实体零件总数。</div>
        </aside>

        <section className="bench-grid relative min-h-[430px] overflow-hidden border-b border-border lg:min-h-0 lg:border-r lg:border-b-0">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 border-b border-border/80 bg-background/85 px-4 py-2 backdrop-blur">
            <div><p className="text-[12px] font-medium">装配拓扑 · {selectedAssembly?.name}</p><p className="text-[10px] text-muted-foreground">非 CAD 比例图；节点来自公开总成证据</p></div>
            <label className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">拆分<input type="range" min="0" max="100" value={explode} onChange={(event) => setExplode(Number(event.target.value))} className="w-28 accent-[#d3ea5c]" /></label>
          </div>
          <AssemblyMap project={project} selected={selected} explode={explode} onSelect={setSelected} />
          <div className="absolute right-4 bottom-4 left-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-4">
            <Metric label="证据化 BOM 行" value={String(project.parts.length)} />
            <Metric label="已核验" value={`${verifiedCount}/${project.parts.length}`} />
            <Metric label="OPEN_REPRO_V2（physical-ai 模型）" value={score.state === "SCORED" ? `${score.probabilityPercent}%` : "—"} accent={score.state === "SCORED"} />
            <Metric label="证据重现度（Berkeley=100）" value={eri ? eri.score?.toFixed(1) ?? "—" : "—"} accent={!!eri && (eri.score ?? 0) >= 100} />
          </div>
        </section>

        <section className="flex min-h-[520px] flex-col lg:min-h-0">
          <div className="flex shrink-0 border-b border-border">
            {(["bom", "evidence", "gaps"] as const).map((value) => <button key={value} type="button" onClick={() => setTab(value)} className={`flex-1 border-b-2 px-3 py-3 text-[12px] ${tab === value ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{value === "bom" ? "零件 / 文件" : value === "evidence" ? "证据覆盖" : `缺口 ${project.gaps.length}`}</button>)}
          </div>
          {tab === "bom" ? <>
            <div className="flex items-center gap-2 border-b border-border px-3 py-2"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`搜索 ${selectedAssembly?.name ?? "总成"} 零件`} className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" /><button type="button" onClick={exportCsv} title="导出全部项目 CSV" className="rounded-sm border border-border p-1.5 hover:border-primary/50 hover:text-primary"><Download className="size-3.5" /></button></div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {rows.map((part) => <a key={part.id} href={part.source} target="_blank" rel="noreferrer" className="block border-b border-border/70 px-4 py-3 hover:bg-accent/70">
                <div className="flex items-start gap-3"><span className="num mt-0.5 rounded-sm border px-1.5 py-0.5 text-[10px]" style={{ borderColor: `${KIND_COLOR[part.kind]}66`, color: KIND_COLOR[part.kind] }}>{part.kind}</span><div className="min-w-0 flex-1"><p className="text-[13px] font-medium">{part.name}</p><p className="num mt-0.5 text-[11px] leading-snug text-muted-foreground">{part.specification}</p>{part.note ? <p className="mt-1 text-[11px] text-[#ffb454]">{part.note}</p> : null}</div><div className="shrink-0 text-right"><p className="num text-[13px]">×{part.quantity}</p><State state={part.state} /></div></div>
              </a>)}
              {rows.length === 0 ? <p className="p-8 text-center text-[12px] text-muted-foreground">当前总成没有匹配行。</p> : null}
            </div>
          </> : null}
          {tab === "evidence" ? <div className="min-h-0 flex-1 overflow-y-auto p-4"><div className="space-y-2">{project.evidence.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="block rounded-sm border border-border p-3 hover:border-primary/40"><div className="flex items-center gap-2"><State state={item.state} /><span className="text-[13px] font-medium">{item.label}</span><ExternalLink className="ml-auto size-3 text-muted-foreground" /></div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{item.detail}</p></a>)}</div></div> : null}
          {tab === "gaps" ? <div className="min-h-0 flex-1 overflow-y-auto p-4"><div className={`rounded-sm border p-3 ${score.state === "SCORED" ? "border-primary/30 bg-primary/5" : "border-[#ffb454]/30 bg-[#ffb454]/5"}`}><p className={`flex items-center gap-2 text-[13px] font-medium ${score.state === "SCORED" ? "text-primary" : "text-[#ffb454]"}`}>{score.state === "SCORED" ? <Check className="size-4" /> : <AlertTriangle className="size-4" />}{score.state === "SCORED" ? `重现概率 ${score.probabilityPercent}% · ${score.model}` : scoreLabel(score)}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{gapsDisclaimer(score)}</p>{score.state === "SCORED" && score.basis.length > 0 ? <div className="mt-3 space-y-1 border-t border-border pt-3">{score.basis.map((b) => <div key={b.dimension} className="flex items-baseline gap-2 text-[11px]"><span className="num w-28 shrink-0 text-muted-foreground">{b.dimension}</span><span className="num w-16 shrink-0">{b.points}<span className="text-muted-foreground">/{b.max}</span></span><span className="leading-snug text-muted-foreground">{b.detail}</span></div>)}{score.ceilingClass ? <p className="pt-1 text-[11px] text-muted-foreground">形态封顶 <span className="num">{score.ceilingClass}</span> = <span className="num">{score.ceilingValue}</span></p> : null}{score.provenance === "IMPORTED" ? <p className="pt-1 text-[11px] text-muted-foreground">导入自 {score.sourceRef}</p> : null}</div> : null}</div><ol className="mt-3 space-y-2">{project.gaps.map((gap, index) => <li key={gap} className="flex gap-3 rounded-sm border border-border p-3"><span className="num text-[11px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><span className="text-[12px] leading-relaxed">{gap}</span></li>)}</ol></div> : null}
        </section>
      </main>
    </div>
  );
}

function AssemblyMap({ project, selected, explode, onSelect }: { project: WorkbenchProject; selected: string; explode: number; onSelect: (id: string) => void }) {
  const factor = explode / 100;
  return <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-14 pb-24" role="img" aria-label={`${project.name} 装配拓扑图`}>
    <defs><filter id="glow"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    {project.assemblies.map((assembly) => { const dx = (assembly.x - 50) * factor * .36; const dy = (assembly.y - 50) * factor * .36; const x = assembly.x + dx; const y = assembly.y + dy; return <line key={`line-${assembly.id}`} x1="50" y1="50" x2={x} y2={y} stroke={assembly.id === selected ? assembly.color : "#303946"} strokeWidth={assembly.id === selected ? 0.8 : 0.35} strokeDasharray="2 2"/>; })}
    {project.assemblies.map((assembly) => { const dx = (assembly.x - 50) * factor * .36; const dy = (assembly.y - 50) * factor * .36; const x = assembly.x + dx; const y = assembly.y + dy; const active = assembly.id === selected; return <g key={assembly.id} onClick={() => onSelect(assembly.id)} className="cursor-pointer" filter={active ? "url(#glow)" : undefined}><rect x={x - 10} y={y - 6} width="20" height="12" rx="1.5" fill={active ? `${assembly.color}22` : "#0e1219"} stroke={active ? assembly.color : "#3a4452"} strokeWidth={active ? .8 : .45}/><circle cx={x - 6.8} cy={y - 2.4} r="1" fill={assembly.color}/><text x={x} y={y + .8} textAnchor="middle" fill={active ? "#e7ecf3" : "#a6b0bf"} fontSize="2.5" fontFamily="ui-monospace, monospace">{assembly.name}</text><text x={x} y={y + 4} textAnchor="middle" fill="#657184" fontSize="1.6" fontFamily="ui-monospace, monospace">{project.parts.filter((part) => part.assembly === assembly.id).length} LINES</text></g>; })}
    <circle cx="50" cy="50" r="3.2" fill="#080a0e" stroke="#d3ea5c" strokeWidth=".7"/><circle cx="50" cy="50" r="1.2" fill="#d3ea5c"/>
  </svg>;
}

function Badge({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) { return <span className={`num rounded-sm border px-1.5 py-0.5 text-[10px] ${primary ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{children}</span>; }
/** 头部的重现度徽标：分值 + 档位，并链到审看台的逐维拆解。 */
function EriBadge({ id }: { id: string }) {
  const s = scoreOf(id);
  if (!s || s.score === null) return <Badge>重现度 未计分</Badge>;
  const b = bandOf(s.score);
  return (
    <a href="/review" title={`证据重现度 ${s.score}（锚点 Berkeley=100）${s.measuredWeight < 100 ? " · 分数为下界" : ""}，点开看逐维证据`}>
      <Badge primary>重现度 {s.score.toFixed(1)}{b ? ` · ${b.label}` : ""}{s.measuredWeight < 100 ? "†" : ""}</Badge>
    </a>
  );
}
function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) { return <div className="bg-card/95 px-3 py-2 backdrop-blur"><p className="text-[9px] text-muted-foreground">{label}</p><p className={`num mt-1 text-[14px] font-semibold ${accent ? "text-primary" : ""}`}>{value}</p></div>; }
function State({ state }: { state: EvidenceState }) { const ok = state === "verified"; return <span className={`mt-1 inline-flex items-center gap-1 text-[10px] ${ok ? "text-[#35d0c8]" : state === "partial" ? "text-[#ffb454]" : "text-destructive"}`}>{ok ? <Check className="size-2.5" /> : <AlertTriangle className="size-2.5" />}{STATE_LABEL[state]}</span>; }
