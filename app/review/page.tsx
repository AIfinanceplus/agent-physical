"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, ExternalLink, Search } from "lucide-react";
import { ALL_PROJECTS, PROJECT_STATS, findProject } from "@/lib/workbench-projects";
import { PIPELINE_AUDIT } from "@/lib/pipeline-audit";
import { BAND_LABEL, UNSCORED_LABEL, scoreLabel } from "@/lib/reproduction";
import {
  ANCHOR_NAME,
  ANCHOR_SCORE,
  BAND_FILTERS,
  DIMENSION_NOTES,
  EVIDENCE_SCORES,
  bandOf,
  scoreOf,
} from "@/lib/evidence-score";

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

type SortKey = "stars" | "name" | "parts" | "assemblies" | "eri";

/** 人工复核后排除的条目附带的理由（只有这一类分组有）。 */
type ExcludedDetail = {
  full_name: string;
  date?: string;
  reason: string;
  found_by?: string;
};

export default function ReviewPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | "generated" | "curated">("all");
  const [state, setState] = useState<"all" | "scored" | "unscored">("all");
  const [band, setBand] = useState<string>("all");
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
      if (band !== "all") {
        const s = EVIDENCE_SCORES[p.id]?.score ?? null;
        const f = BAND_FILTERS.find((b) => b.key === band);
        if (s === null || !f || !f.test(s)) return false;
      }
      if (!q) return true;
      return `${p.id} ${p.name} ${p.category}`.toLowerCase().includes(q);
    });
    const detail = (id: string) => findProject(id);
    return list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "eri") {
        const sa = EVIDENCE_SCORES[a.id]?.score ?? -1;
        const sb = EVIDENCE_SCORES[b.id]?.score ?? -1;
        return sb - sa;
      }
      if (sort === "stars") return (b.stars ?? -1) - (a.stars ?? -1);
      const da = detail(a.id);
      const db = detail(b.id);
      if (sort === "parts") return (db?.parts.length ?? 0) - (da?.parts.length ?? 0);
      return (db?.assemblies.length ?? 0) - (da?.assemblies.length ?? 0);
    });
  }, [query, scope, state, band, sort]);

  const eriStats = useMemo(() => {
    const vals = Object.values(EVIDENCE_SCORES)
      .map((s) => s.score)
      .filter((v): v is number => v !== null);
    const sorted = [...vals].sort((a, b) => a - b);
    return {
      n: vals.length,
      median: sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0,
      atOrAbove: vals.filter((v) => v >= 100).length,
      lowerBound: Object.values(EVIDENCE_SCORES).filter((s) => s.measuredWeight < 100).length,
    };
  }, []);

  const open = openId ? findProject(openId) : null;
  const openEntry = openId ? ALL_PROJECTS.find((p) => p.id === openId) ?? null : null;
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
            ["eri", "按重现度"],
          ]}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/20 px-4 py-2 lg:px-6">
        <span className="num text-[10px] text-muted-foreground">
          证据重现度（锚点 {ANCHOR_NAME} = {ANCHOR_SCORE}）
        </span>
        <Segmented
          value={band}
          onChange={setBand}
          options={[["all", "任意档"], ...BAND_FILTERS.map(
            (b) => [b.key, b.label] as [string, string])]}
        />
        <span className="num ml-auto text-[10px] text-muted-foreground">
          口径：只计仓库内文件 · 已计分 {eriStats.n} · 中位 {eriStats.median} · ≥100 有 {eriStats.atOrAbove} 个
          {eriStats.lowerBound ? ` · ${eriStats.lowerBound} 个含未测维度（分数为下界）` : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-border text-left text-[11px] text-muted-foreground">
              <Th className="w-[300px]">项目</Th>
              <Th>形态</Th>
              <Th className="w-[120px]">重现度</Th>
              <Th className="w-[150px]">OPEN_REPRO_V2</Th>
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
                    <EriCell id={p.id} />
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

          <EriBreakdown id={open.id} />

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

      {/*
        标杆项目走的是另一条路径：它有专门的深度 3D 浏览器，因此不在通用项目
        列表里，findProject 对它返回 null。原来这一行渲染出来却点不出任何东西——
        看起来可点、实际是死的。而它恰恰是评分锚点，必须能打开六维表来核对
        "100 分"是怎么来的。这里给它一条精简抽屉。
      */}
      {!open && openEntry ? (
        <div className="fixed inset-y-0 right-0 z-20 w-full max-w-[520px] overflow-y-auto border-l border-border bg-background p-5 shadow-2xl">
          <div className="flex items-start gap-2">
            <div className="min-w-0">
              <p className="num text-[10px] text-muted-foreground">{openEntry.id}</p>
              <h2 className="text-[16px] font-semibold">{openEntry.name}</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="ml-auto shrink-0 rounded-sm border border-border px-2 py-1 text-[11px] hover:border-primary/50"
            >
              关闭
            </button>
          </div>
          {scoreOf(openEntry.id)?.repository ? (
            <a
              href={scoreOf(openEntry.id)!.repository}
              target="_blank"
              rel="noreferrer"
              className="num mt-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              {scoreOf(openEntry.id)!.repository} <ExternalLink className="size-3" />
            </a>
          ) : null}
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            标杆项目使用专门的深度 3D 浏览器，零件行与装配树不在通用列表中。
            下面是与其它 212 个项目「同一算式」算出的六维证据拆解——它同时是满分基准。
          </p>
          <a
            href="/"
            className="mt-2 inline-flex items-center gap-1 rounded-sm border border-primary/40 bg-primary/10 px-2 py-1 text-[11px] text-primary"
          >
            打开深度工作台 <ExternalLink className="size-3" />
          </a>
          <EriBreakdown id={openEntry.id} />
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
            {PIPELINE_AUDIT.excluded.map((group) => {
              // 只有"人工逐条核对后排除"这一类带理由明细；
              // 其余分组是纯名单，没有 details 字段，所以这里显式断言形状。
              const details =
                (group as { details?: readonly ExcludedDetail[] }).details ?? [];
              return (
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
                {details.length > 0 && (
                  <ul className="mt-3 space-y-2 border-t border-border/60 pt-2">
                    {details.map((d) => (
                      <li key={d.full_name} className="text-[11px] leading-relaxed">
                        <a
                          href={`https://github.com/${d.full_name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="num text-foreground hover:text-primary"
                        >
                          {d.full_name}
                        </a>
                        {d.found_by && (
                          <span className="ml-2 text-[10px] text-muted-foreground">
                            发现于：{d.found_by}
                          </span>
                        )}
                        <p className="mt-0.5 text-muted-foreground">{d.reason}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              );
            })}
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

/** 表格里的重现度格子。数字旁边始终带档位与"下界"标记，避免被当成满分读。 */
function EriCell({ id }: { id: string }) {
  const s = scoreOf(id);
  if (!s || s.score === null) {
    return <span className="num text-[10px] text-muted-foreground">未计分</span>;
  }
  const b = bandOf(s.score);
  return (
    <span className="flex flex-col gap-0.5">
      <span className="num text-[13px] font-medium">{s.score.toFixed(1)}</span>
      {b ? (
        <span className={`w-fit rounded-sm border px-1 py-px text-[9px] ${b.className}`}>
          {b.label}
        </span>
      ) : null}
      {s.measuredWeight < 100 ? (
        <span className="num text-[9px] text-[#ffb454]">下界（有维度未测）</span>
      ) : null}
    </span>
  );
}

/**
 * 抽屉里的重现度拆解：六个维度逐条列出取值、基准、与锚点的比、得分，
 * 并把产生这个数值的证据链接摆出来。
 *
 * 这里是"不靠模型自评"的落点——每个数字旁边都能点开它数的是哪些文件。
 */
function EriBreakdown({ id }: { id: string }) {
  const s = scoreOf(id);
  if (!s) return null;
  const b = s.score === null ? null : bandOf(s.score);
  return (
    <Section title={`证据重现度（锚点 ${ANCHOR_SCORE}）`}>
      <div className="flex flex-wrap items-baseline gap-2 py-1.5">
        <span className="num text-[26px] font-semibold">
          {s.score === null ? "—" : s.score.toFixed(1)}
        </span>
        {b ? (
          <span className={`rounded-sm border px-1.5 py-0.5 text-[10px] ${b.className}`}>
            {b.label}
          </span>
        ) : null}
        <span className="text-[10px] text-muted-foreground">{b?.hint}</span>
      </div>
      {s.flags.map((f) => (
        <p key={f} className="border-t border-border/60 py-1.5 text-[10px] text-[#ffb454]">
          {f}
        </p>
      ))}
      <div className="border-t border-border/60 py-1">
        {s.dimensions.map((d) => {
          const pct = d.ratio === null ? 0 : Math.min(100, (d.ratio / 2) * 100);
          return (
            <div key={d.key} className="border-b border-border/40 py-1.5 last:border-0">
              <div className="flex items-baseline gap-2">
                <span className="w-[86px] shrink-0 text-[11px]">{d.label}</span>
                <span className="num text-[11px] tabular-nums">
                  {d.value.toFixed(d.unit.startsWith("许可") ? 1 : 0)}
                </span>
                <span className="num text-[10px] text-muted-foreground">
                  / 基准 {d.anchorValue.toFixed(0)}
                </span>
                <span className="num ml-auto text-[11px]">
                  {d.points === null ? "未测" : `+${d.points.toFixed(1)}`}
                </span>
                <span className="num w-[38px] shrink-0 text-right text-[10px] text-muted-foreground">
                  权重 {d.weight}
                </span>
              </div>
              <div className="mt-1 h-[3px] w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
                {d.detail}
                {DIMENSION_NOTES[d.key] ? ` — ${DIMENSION_NOTES[d.key]}` : ""}
              </p>
              {d.evidence.length ? (
                <div className="mt-1 flex flex-wrap gap-1">
                  {d.evidence.slice(0, 3).map((u) => (
                    <a
                      key={u}
                      href={u}
                      target="_blank"
                      rel="noreferrer"
                      title={u}
                      className="num max-w-[220px] truncate rounded-sm border border-border px-1 py-px text-[9px] text-primary hover:border-primary/50"
                    >
                      {u.replace("https://github.com/", "").replace("/blob/HEAD/", " ▸ ")}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
