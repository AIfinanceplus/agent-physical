"use client";

import { ChevronDown } from "lucide-react";
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
 */
export function ProjectSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const current = ALL_PROJECTS.find((p) => p.id === value);
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
      <div className="relative ml-auto min-w-0 max-w-[420px] flex-1 sm:w-[420px] sm:flex-none">
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
