"use client";

import { ChevronDown, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ALL_PROJECTS, PROJECT_STATS } from "@/lib/workbench-projects";
import { scoreLabel } from "@/lib/reproduction";
import { TEARDOWN_IDS, hasTeardown } from "@/lib/teardown-registry";

/**
 * Project switcher.
 *
 * The header used to read "88% REPRO WORKBENCHES · 6 / 6 项目已建立拆解入口" —
 * both numbers were literals. 88 was Berkeley Humanoid Lite's class ceiling,
 * displayed as if it described every project, and "6 / 6" drifted the moment a
 * project was added. Both now come from the registry.
 *
 * The "· 深度 3D" badge was a plain string with no handler: readers clicked it
 * expecting the list of teardown projects and nothing happened. The count was
 * right there in the header ("3D 拆解台 29") with no way to reach those 29.
 * It is now a real control that lists exactly the projects whose spec exists —
 * membership comes from `TEARDOWN_IDS`, never from a hand-written list.
 */
export function ProjectSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const current = ALL_PROJECTS.find((p) => p.id === value);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (event: MouseEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    const esc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const teardowns = ALL_PROJECTS.filter((p) => TEARDOWN_IDS.includes(p.id));

  return (
    <nav
      className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-[#0b0e14] px-4 lg:px-6"
      aria-label="开源机器人证据工作台"
    >
      <div className="min-w-0">
        <p className="num text-[10px] leading-none tracking-[0.16em] text-primary">
          开源机器人证据工作台
        </p>
        <p className="mt-1 truncate text-[12px] leading-none text-muted-foreground">
          {PROJECT_STATS.total} 个项目 · 策展 {PROJECT_STATS.curated} · 生成{" "}
          {PROJECT_STATS.generated} · 已评分 {PROJECT_STATS.scored} · 未评分{" "}
          {PROJECT_STATS.unscored} · 3D 拆解台 {TEARDOWN_IDS.length}
        </p>
      </div>

      <div ref={box} className="relative ml-auto shrink-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`num flex h-9 items-center gap-1.5 rounded-sm border px-2.5 text-[11px] transition-colors ${
            open
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
          }`}
          title="列出全部深度 3D 拆解台"
          data-hermes-click="teardown-list"
        >
          <Layers className="size-3.5" aria-hidden />
          深度 3D · {teardowns.length}
          <ChevronDown className="size-3.5" aria-hidden />
        </button>
        {open ? (
          <div
            role="listbox"
            aria-label="深度 3D 拆解台"
            className="absolute top-11 right-0 z-50 max-h-[70vh] w-[420px] overflow-auto rounded-sm border border-border bg-[#0b0e14] shadow-lg"
          >
            <p className="border-b border-border px-3 py-2 text-[10px] tracking-[0.12em] text-muted-foreground">
              以下 {teardowns.length} 个项目有深度 3D 拆解台：3D 几何 · 装配层级 · 零件表 ·
              关节反查 · 爆炸视图 · 六维证据分 · 缺口声明
            </p>
            {teardowns.map((project) => {
              const active = project.id === value;
              return (
                <button
                  key={project.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(project.id);
                    setOpen(false);
                  }}
                  className={`num block w-full px-3 py-2 text-left text-[11px] transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span className="block truncate">
                    {active ? "▸ " : "　"}
                    {project.name}
                  </span>
                  <span className="block truncate text-[10px] opacity-70">
                    {project.id} · {scoreLabel(project.reproduction)}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="relative min-w-0 max-w-[420px] flex-1 sm:w-[420px] sm:flex-none">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="num h-9 w-full appearance-none rounded-sm border border-border bg-background px-3 pr-9 text-[12px] outline-none transition-colors hover:border-primary/50 focus:border-primary"
          aria-label="选择机器人项目"
        >
          {ALL_PROJECTS.map((project) => (
            <option key={project.id} value={project.id}>
              {project.id} · {project.name} · {scoreLabel(project.reproduction)}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-2.5 right-3 size-4 text-muted-foreground"
          aria-hidden
        />
      </div>
      {current ? (
        <span className="num hidden shrink-0 rounded-sm border border-border px-2 py-1 text-[10px] text-muted-foreground lg:block">
          {current.curated ? "人工策展" : "证据管线"}
          {hasTeardown(current.id) ? " · 深度 3D" : ""}
        </span>
      ) : null}
      <a
        href="/review"
        className="num hidden shrink-0 rounded-sm border border-primary/40 bg-primary/10 px-2 py-1.5 text-[11px] text-primary hover:border-primary sm:block"
      >
        审看台
      </a>
    </nav>
  );
}
