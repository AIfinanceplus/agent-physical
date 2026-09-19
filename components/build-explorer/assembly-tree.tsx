"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { ROBOT_TREE, type TreeNode } from "@/lib/robot-tree";
import { ACTUATOR_PARTS, ROBOT_PARTS, type Part } from "@/lib/robot-parts";
import { cn } from "@/lib/utils";
import { ClassBadge, fmtQty } from "./marks";

const PART_INDEX = new Map<string, Part>([
  ...ROBOT_PARTS.map((p) => [p.id, p] as const),
  ...ACTUATOR_PARTS["6512"].map((p) => [p.id, p] as const),
  ...ACTUATOR_PARTS["5010"].map((p) => [p.id, p] as const),
]);

const KIND_LABEL: Record<TreeNode["kind"], string | null> = {
  root: null,
  assembly: "总成",
  sub: "子总成",
  joint: "关节",
  group: "工序",
};

function nodeMatches(node: TreeNode, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  if (node.label.toLowerCase().includes(needle) || node.labelEn.toLowerCase().includes(needle)) return true;
  if (node.summary?.toLowerCase().includes(needle)) return true;
  if (
    node.joint &&
    (node.joint.docName.toLowerCase().includes(needle) || String(node.joint.canId) === needle)
  )
    return true;
  for (const ref of node.parts) {
    const p = PART_INDEX.get(ref.partId);
    if (
      p &&
      (p.name.toLowerCase().includes(needle) || p.nameZh.includes(q) || (p.mpn ?? "").toLowerCase().includes(needle))
    )
      return true;
  }
  return node.children.some((c) => nodeMatches(c, q));
}

export function AssemblyTree({
  selectedId,
  onSelect,
  onOpenPart,
  className,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  onOpenPart: (partId: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const pathToSelected = useMemo(() => {
    const trail: string[] = [];
    const walk = (n: TreeNode): boolean => {
      trail.push(n.id);
      if (n.id === selectedId) return true;
      for (const c of n.children) if (walk(c)) return true;
      trail.pop();
      return false;
    };
    walk(ROBOT_TREE);
    return new Set(trail);
  }, [selectedId]);

  const isOpen = (n: TreeNode) => {
    if (collapsed.has(n.id)) return false;
    if (query) return true;
    if (pathToSelected.has(n.id)) return true;
    return n.kind === "root" || n.kind === "assembly";
  };

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number) => {
    if (query && !nodeMatches(node, query)) return null;
    const open = isOpen(node);
    const hasChildren = node.children.length > 0;
    const needle = query.toLowerCase();
    const parts = node.parts
      .map((r) => ({ part: PART_INDEX.get(r.partId), qty: r.qty }))
      .filter((x): x is { part: Part; qty: number } => Boolean(x.part))
      .filter(
        ({ part }) =>
          !query ||
          part.name.toLowerCase().includes(needle) ||
          part.nameZh.includes(query) ||
          (part.mpn ?? "").toLowerCase().includes(needle),
      );
    const isSelected = node.id === selectedId;
    const kind = KIND_LABEL[node.kind];

    return (
      <li key={node.id}>
        <div
          className={cn(
            "flex items-start gap-1.5 rounded-sm py-1 pr-2 transition-colors",
            isSelected ? "bg-primary/10" : "hover:bg-accent",
          )}
          style={{ paddingLeft: `${depth * 14 + 4}px` }}
        >
          <button
            type="button"
            onClick={() => (hasChildren ? toggle(node.id) : undefined)}
            className={cn(
              "mt-0.5 grid size-4 shrink-0 place-items-center rounded-xs text-muted-foreground",
              hasChildren ? "hover:text-foreground" : "invisible",
            )}
            aria-label={open ? "折叠" : "展开"}
            aria-expanded={hasChildren ? open : undefined}
          >
            <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} />
          </button>
          <button type="button" onClick={() => onSelect(node.id)} className="min-w-0 flex-1 text-left">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span
                className={cn(
                  "text-[14px] leading-snug",
                  isSelected ? "font-semibold text-foreground" : "text-foreground/90",
                )}
              >
                {node.label}
              </span>
              {kind ? (
                <span className="num rounded-xs border border-border px-1 py-px text-[10px] leading-none text-muted-foreground">
                  {kind}
                </span>
              ) : null}
              {node.joint ? (
                <span className="num text-[11px] leading-none text-muted-foreground">
                  #{node.joint.jointId} · {node.joint.canBus} ID{node.joint.canId}
                </span>
              ) : null}
            </span>
            {node.summary ? (
              <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{node.summary}</span>
            ) : null}
          </button>
        </div>

        {open ? (
          <ul>
            {parts.map(({ part, qty }) => (
              <li key={`${node.id}-${part.id}`}>
                <button
                  type="button"
                  onClick={() => onOpenPart(part.id)}
                  className="flex w-full items-center gap-2 rounded-sm py-1 pr-2 text-left hover:bg-accent"
                  style={{ paddingLeft: `${depth * 14 + 26}px` }}
                >
                  <ClassBadge cls={part.cls} />
                  <span className="min-w-0 flex-1 truncate text-[13px] text-foreground/85">{part.nameZh}</span>
                  <span className="num shrink-0 text-[12px] text-muted-foreground">×{fmtQty(qty)}</span>
                </button>
              </li>
            ))}
            {node.children.map((c) => renderNode(c, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索总成、关节或零件"
          aria-label="搜索装配树"
          className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/70"
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto py-1.5 pr-1">
        <ul>{renderNode(ROBOT_TREE, 0)}</ul>
      </div>
      <div className="border-t border-border px-3 py-2 text-[12px] leading-snug text-muted-foreground">
        点击任意总成、子总成、关节或单件，3D 视图会同步高亮。
      </div>
    </div>
  );
}
