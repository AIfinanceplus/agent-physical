"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, ExternalLink, Search } from "lucide-react";
import { ALL_PROJECTS, PROJECT_STATS, findProject } from "@/lib/workbench-projects";
import { PIPELINE_AUDIT } from "@/lib/pipeline-audit";
import { BAND_LABEL, UNSCORED_LABEL, scoreLabel } from "@/lib/reproduction";

/**
 * 审看台 / Audit surface.
 *
 * Two questions this page has to answer without reading code or logs:
 *   1. What is actually in the catalog, and is any of it showing a score it
 *      did not earn? (The predecessor showed one project's 88 on all of them.)
 *   2. Why is a given repository missing? A heuristic filter that cannot be
 *      audited is indistinguishable from a bug, so the exclusion list ships
 *      with the data instead of scrolling past in a terminal.
 */

type SortKey = "stars" | "name" | "parts" | "assemblies";

export default function ReviewPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | "generated" | "curated">("all");
  const [state, setState] = useState<"all" | "scored" | "unscored">("all");
  const [sort, setSort] = useState<SortKey>("stars");
  const [openId, setOpenId] = useState<string | null>(null);
  const [auditOpen, setAuditOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = ALL_PROJECTS.filter((p) => {
      if (scope === "generated" && p.curated) return false;
      if (scope === "curated" && !p.curated) return false;
      if (state === "scored" && p.reproduction.state !== "SCORED") return false;
      if (state === "unscored" && p.reproduction.state !== "UNSCORED") return false;
      if (!q) return true;
      return `${p.id} ${p.name} ${p.category}`.toLowerCase().includes(q);
    });
    const detail = (id: string) => findProject(id);
    return list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "stars") return (b.stars ?? -1) - (a.stars ?? -1);
      const da = detail(a.id);
      const db = detail(b.id);
      if (sort === "parts") return (db?.parts.length ?? 0) - (da?.parts.length ?? 0);
      return (db?.assemblies.length ?? 0) - (da?.assemblies.length ?? 0);
    });
  }, [query, scope, state, sort]);

  const open = openId ? findProject(openId) : null;
  const totalExcluded = PIPELINE_AUDIT.excluded.reduce((s, e) => s + e.repos.length, 0);

  return (
    <div className="min-h-dvh bg-background">
      <div className="border-b border-border px-4 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="num rounded-sm border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
            审看台
          </span>
          <span className="num rounded-sm border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            管线批次 {PIPELINE_AUDIT.generatedAt} · 收录线 tier ≤ {PIPELINE_AUDIT.minTier}
          </span>
          <a
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary"
          >
            进入工作台 <ExternalLink className="size-3" />
          </a>
        </div>
        <h1 className="mt-2 text-[20px] font-semibold">目录审看 · 证据与评分状态</h1>
        <p className="mt-1 max-w-4xl text-[12px] leading-relaxed text-muted-foreground">
          共 {PROJECT_STATS.total} 个项目。评分一栏只有真正经过评分模型的条目才会出现数字，
          其余显示未评分及原因——不存在"看起来合理"的默认值。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px border-b border-border bg-border lg:grid-cols-7">
        <Metric label="项目总数" value={String(PROJECT_STATS.total)} />
        <Metric label="人工策展" value={String(PROJECT_STATS.curated)} />
        <Metric label="管线生成" value={String(PROJECT_STATS.generated)} />
        <Metric label="已评分" value={String(PROJECT_STATS.scored)} accent />
        <Metric label="未评分" value={String(PROJECT_STATS.unscored)} />
        <Metric label="管线候选" value={String(PIPELINE_AUDIT.candidates)} />
        <Metric label="被排除" value={String(totalExcluded)} />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2.5 lg:px-6">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索 ID / 名称 / 形态"
          className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
        />
        <Segmented
          value={scope}
          onChange={(v) => setScope(v as typeof scope)}
          options={[
            ["all", "全部"],
            ["curated", "人工策展"],
            ["generated", "管线生成"],
          ]}
        />
        <Segmented
          value={state}
          onChange={(v) => setState(v as typeof state)}
          options={[
            ["all", "任意评分态"],
            ["scored", "已评分"],
            ["unscored", "未评分"],
          ]}
        />
        <Segmented
          value={sort}
          onChange={(v) => setSort(v as SortKey)}
          options={[
            ["stars", "按星数"],
            ["name", "按名称"],
            ["parts", "按零件行"],
            ["assemblies", "按总成数"],
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-border text-left text-[11px] text-muted-foreground">
              <Th className="w-[300px]">项目</Th>
              <Th>形态</Th>
              <Th className="w-[150px]">评分</Th>
              <Th className="w-[130px]">来源</Th>
              <Th className="w-[70px] text-right">★</Th>
              <Th className="w-[90px] text-right">总成</Th>
              <Th className="w-[90px] text-right">零件行</Th>
              <Th className="w-[80px] text-right">缺口</Th>
              <Th className="w-[110px]">许可</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const d = findProject(p.id);
              const isOpen = openId === p.id;
              return (
                <tr
                  key={p.id}
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  className={`cursor-pointer border-b border-border/60 transition-colors ${
                    isOpen ? "bg-primary/5" : "hover:bg-accent/60"
                  }`}
                >
                  <Td>
                    <span className="num block truncate text-[11px] text-muted-foreground">
                      {p.id}
                    </span>
                    <span className="text-[13px]">{p.name}</span>
                  </Td>
                  <Td>
                    <span className="num text-[11px]">{p.category}</span>
                  </Td>
                  <Td>
                    {p.reproduction.state === "SCORED" ? (
                      <span className="text-primary">
                        {p.reproduction.probabilityPercent}% ·{" "}
                        {BAND_LABEL[p.reproduction.band]}
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          {p.reproduction.provenance === "IMPORTED" ? "导入" : "本地"}
                        </span>
                      </span>
                    ) : (
                      <span className="text-[#ffb454]">
                        未评分
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          {UNSCORED_LABEL[p.reproduction.reason]}
                        </span>
                      </span>
                    )}
                  </Td>
                  <Td>
                    <span className="num text-[10px] text-muted-foreground">
                      {p.curated ? "人工策展" : "证据管线"}
                      {p.deep ? " · 深度3D" : ""}
                    </span>
                  </Td>
                  <Td className="num text-right">{p.stars ?? "—"}</Td>
                  <Td className="num text-right">{d?.assemblies.length ?? "—"}</Td>
                  <Td className="num text-right">{d?.parts.length ?? "—"}</Td>
                  <Td className="num text-right">{d?.gaps.length ?? "—"}</Td>
                  <Td>
                    <span className="num text-[10px] text-muted-foreground">
                      {d?.license ?? "—"}
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-[12px] text-muted-foreground">没有匹配的项目。</p>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-y-0 right-0 z-20 w-full max-w-[520px] overflow-y-auto border-l border-border bg-background p-5 shadow-2xl">
          <div className="flex items-start gap-2">
            <div className="min-w-0">
              <p className="num text-[10px] text-muted-foreground">{open.id}</p>
              <h2 className="text-[16px] font-semibold">{open.name}</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="ml-auto shrink-0 rounded-sm border border-border px-2 py-1 text-[11px] hover:border-primary/50"
            >
              关闭
            </button>
          </div>
          <a
            href={open.repository}
            target="_blank"
            rel="noreferrer"
            className="num mt-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
          >
            {open.repository} <ExternalLink className="size-3" />
          </a>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            {open.releaseBasis}
          </p>

          <Section title={`装配（${open.assemblies.length}）`}>
            {open.assemblies.map((a) => (
              <div key={a.id} className="flex gap-2 border-b border-border/60 py-1.5 last:border-0">
                <span
                  className="mt-1 size-2 shrink-0 rounded-full"
                  style={{ background: a.color }}
                />
                <span className="w-[110px] shrink-0 text-[12px]">{a.name}</span>
                <span className="text-[11px] leading-snug text-muted-foreground">
                  {a.description}
                </span>
              </div>
            ))}
          </Section>

          <Section title={`零件行（${open.parts.length}，列前 12）`}>
            {open.parts.slice(0, 12).map((p) => (
              <a
                key={p.id}
                href={p.source}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline gap-2 border-b border-border/60 py-1.5 last:border-0 hover:bg-accent/50"
              >
                <span className="num w-[46px] shrink-0 text-[10px] text-muted-foreground">
                  {p.kind}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px]">{p.name}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">×{p.quantity}</span>
              </a>
            ))}
          </Section>

          <Section title={`证据（${open.evidence.length}）`}>
            {open.evidence.map((e) => (
              <a
                key={e.label}
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="block border-b border-border/60 py-1.5 last:border-0 hover:bg-accent/50"
              >
                <span className="flex items-center gap-1.5 text-[12px]">
                  <Check className="size-3 text-[#35d0c8]" />
                  {e.label}
                </span>
                <span className="num block truncate text-[10px] text-muted-foreground">
                  {e.detail}
                </span>
              </a>
            ))}
          </Section>

          <Section title={`缺口（${open.gaps.length}）`}>
            <div className="rounded-sm border border-[#ffb454]/30 bg-[#ffb454]/5 p-2">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {open.reproduction.state === "SCORED"
                  ? `已作为扣分项计入 ${open.reproduction.probabilityPercent}%。`
                  : "未被任何模型计入，不代表已评估。"}
              </p>
            </div>
            <ol className="mt-2 space-y-1">
              {open.gaps.map((g, i) => (
                <li key={g} className="flex gap-2 text-[11px] leading-snug">
                  <span className="num text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span>{g}</span>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      ) : null}

      <div className="border-t border-border px-4 py-4 lg:px-6">
        <button
          type="button"
          onClick={() => setAuditOpen((v) => !v)}
          className="flex items-center gap-2 text-[13px] font-medium hover:text-primary"
        >
          <AlertTriangle className="size-4 text-[#ffb454]" />
          管线排除清单（{totalExcluded}）· 为什么有些仓库没进来
          <span className="text-[11px] text-muted-foreground">{auditOpen ? "收起" : "展开"}</span>
        </button>
        {auditOpen ? (
          <div className="mt-3 space-y-3">
            <p className="max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
              排除规则是启发式的，不是形式化判定。下面逐条列出被排除的仓库，
              便于复核规则是否误伤——误杀真项目比放进无关项目更难发现。
            </p>
            {PIPELINE_AUDIT.excluded.map((group) => (
              <div key={group.reason} className="rounded-sm border border-border p-3">
                <p className="text-[12px] font-medium">
                  {group.label}
                  <span className="num ml-2 text-[11px] text-muted-foreground">
                    {group.repos.length}
                  </span>
                </p>
                <p className="num mt-1 text-[10px] text-muted-foreground">{group.reason}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {group.repos.map((r) => (
                    <a
                      key={r}
                      href={`https://github.com/${r}`}
                      target="_blank"
                      rel="noreferrer"
                      className="num rounded-sm border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:border-primary/50 hover:text-primary"
                    >
                      {r}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {PIPELINE_AUDIT.rescuedByStructure.length > 0 ? (
              <div className="rounded-sm border border-primary/30 bg-primary/5 p-3">
                <p className="text-[12px] font-medium text-primary">
                  关键词未命中但凭 URDF 结构证据收录
                  <span className="num ml-2 text-[11px]">{PIPELINE_AUDIT.rescuedByStructure.length}</span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  只靠名称/描述关键词判"是不是机器人"会漏掉真项目，这几条是靠结构证据救回的。
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {PIPELINE_AUDIT.rescuedByStructure.map((r) => (
                    <a
                      key={r}
                      href={`https://github.com/${r}`}
                      target="_blank"
                      rel="noreferrer"
                      className="num rounded-sm border border-primary/40 px-1.5 py-0.5 text-[10px] text-primary hover:underline"
                    >
                      {r}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-background px-4 py-2.5">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={`num mt-0.5 text-[16px] font-semibold ${accent ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="flex overflow-hidden rounded-sm border border-border">
      {options.map(([k, label]) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={`px-2.5 py-1 text-[11px] transition-colors ${
            value === k
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-1 text-[12px] font-semibold">{title}</p>
      <div className="rounded-sm border border-border px-3 py-1">{children}</div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-3 py-2 font-normal ${className}`}>{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 align-top ${className}`}>{children}</td>;
}
