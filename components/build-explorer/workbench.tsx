"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Boxes, Crosshair, Eye, EyeOff, Focus, Maximize2, RotateCcw } from "lucide-react";
import { CAN_BUS_COLOR, EVIDENCE } from "@/lib/robot-parts";
import {
  aggregateLines,
  buildMeshIndex,
  collectPartsFor,
  findNode,
  flattenJoints,
  sumLines,
  type TreeNode,
} from "@/lib/robot-tree";
import type { Region, RobotModel } from "@/lib/robot-view";
import { useTeardown } from "@/lib/teardown-context";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { AssemblyTree } from "./assembly-tree";
import { BomPanel } from "./bom-panel";
import { JointPanel, type JointEntry } from "./joint-panel";
import { JointTable } from "./joint-table";
import { PartSheet } from "./part-sheet";
import { PartsPanel } from "./parts-panel";
import RobotViewer, {
  type JointMarker,
  type RegionMode,
  type ViewerHandle,
} from "./robot-viewer";

function collectMeshLinks(node: TreeNode): string[] {
  const out: string[] = [...node.meshLinks];
  for (const c of node.children) out.push(...collectMeshLinks(c));
  return out;
}

/** Only one panel layout is mounted at a time, so the 3D canvas is never duplicated. */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

export function Workbench({ embedded = false }: { embedded?: boolean }) {
  const spec = useTeardown();
  const tree = spec.tree;

  const meshIndex = useMemo(() => buildMeshIndex(tree), [tree]);
  const jointNodes = useMemo(() => flattenJoints(tree), [tree]);
  const jointMarkers: JointMarker[] = useMemo(
    () =>
      jointNodes.map((n) => ({
        jointId: n.joint!.jointId,
        docName: n.joint!.docName,
        bus: n.joint!.canBus ?? "",
        canId: n.joint!.canId ?? -1,
        link: n.joint!.meshLink,
        color: (n.joint!.canBus ? CAN_BUS_COLOR[n.joint!.canBus] : undefined) ?? "#8894a6",
      })),
    [jointNodes],
  );
  const jointEntries: JointEntry[] = useMemo(() => jointNodes.map((node) => ({ node })), [jointNodes]);
  const totalMeshLinks = useMemo(() => collectMeshLinks(tree).length, [tree]);
  const defaultModes = useMemo(
    () => Object.fromEntries(spec.regions.map((r) => [r.key, "on" as RegionMode])) as Record<Region, RegionMode>,
    [spec.regions],
  );

  const [model, setModel] = useState<RobotModel | null>(null);
  const [selectedId, setSelectedId] = useState<string>(tree.id);
  const [activeJointId, setActiveJointId] = useState<number | null>(null);
  const [tab, setTab] = useState("parts");
  const [openPartId, setOpenPartId] = useState<string | null>(null);
  const [explode, setExplode] = useState(0);
  const [regionModes, setRegionModes] = useState<Record<Region, RegionMode>>(defaultModes);
  const [isolated, setIsolated] = useState(false);
  const [showJoints, setShowJoints] = useState(true);
  const viewerRef = useRef<ViewerHandle | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    let alive = true;
    fetch(spec.modelJsonUrl)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<RobotModel>;
      })
      .then((data) => {
        if (alive) setModel(data);
      })
      .catch(() => {
        if (alive) setModel(null);
      });
    return () => {
      alive = false;
    };
  }, [spec.modelJsonUrl]);

  const selectedNode = useMemo(() => findNode(selectedId, tree) ?? tree, [selectedId, tree]);
  const highlightLinks = useMemo(() => collectMeshLinks(selectedNode), [selectedNode]);
  const isolatedLink = isolated && highlightLinks.length ? highlightLinks[0] : null;

  const selection = useMemo(() => {
    const lines = aggregateLines(collectPartsFor(selectedNode, spec.parts));
    return { lines, totals: sumLines(lines) };
  }, [selectedNode, spec.parts]);

  const rootTotals = useMemo(() => {
    const lines = aggregateLines(collectPartsFor(tree, spec.parts));
    return sumLines(lines);
  }, [tree, spec.parts]);

  /** True when nothing in the tree carries a price — a number would be invented. */
  const priced = useMemo(() => spec.parts.some((p) => p.unitUsd != null || p.unitRmb != null), [spec.parts]);

  useEffect(() => {
    viewerRef.current?.setState({
      highlightLinks,
      regionModes,
      isolatedLink,
      explode,
      showJoints,
      activeJointId,
    });
  }, [highlightLinks, regionModes, isolatedLink, explode, showJoints, activeJointId]);

  const selectNode = useCallback(
    (id: string) => {
      setSelectedId(id);
      const node = findNode(id, tree);
      if (node?.joint) setActiveJointId(node.joint.jointId);
      setIsolated(false);
    },
    [tree],
  );

  const selectJoint = useCallback(
    (jointId: number) => {
      if (jointId < 0) {
        setActiveJointId(null);
        return;
      }
      const node = jointNodes.find((n) => n.joint!.jointId === jointId);
      if (!node) return;
      setActiveJointId(jointId);
      setSelectedId(node.id);
      setIsolated(false);
      setTab("joint");
    },
    [jointNodes],
  );

  const handlePickLink = useCallback(
    (link: string | null) => {
      if (!link) return;
      const owner = meshIndex.get(link);
      if (owner) selectNode(owner);
    },
    [meshIndex, selectNode],
  );

  const cycleRegion = (region: Region) => {
    setRegionModes((prev) => {
      const next: RegionMode = prev[region] === "on" ? "off" : prev[region] === "off" ? "only" : "on";
      return { ...prev, [region]: next };
    });
  };

  const resetView = () => {
    setRegionModes(defaultModes);
    setExplode(0);
    setIsolated(false);
    viewerRef.current?.reset();
  };

  const openPart = useCallback((partId: string) => setOpenPartId(partId), []);

  const usages = useMemo(() => {
    if (!openPartId) return [];
    const seen = new Map<string, number>();
    const walk = (node: TreeNode, trail: string[]) => {
      const here = node.kind === "root" ? trail : [...trail, node.label];
      for (const ref of node.parts) {
        if (ref.partId !== openPartId) continue;
        const key = here.join(" › ");
        seen.set(key, (seen.get(key) ?? 0) + ref.qty);
      }
      node.children.forEach((c) => walk(c, here));
    };
    walk(tree, []);
    return [...seen.entries()].map(([path, qty]) => ({ path, qty }));
  }, [openPartId, tree]);

  const meta = spec.meta;

  return (
    <div
      className={cn(
        "flex flex-col bg-background",
        // The desktop workbench is a fixed-height shell: every column scrolls on its own, and the
        // 3D canvas keeps a stable aspect ratio instead of stretching to the tallest column.
        isDesktop ? (embedded ? "h-full overflow-hidden" : "h-dvh overflow-hidden") : embedded ? "min-h-full" : "min-h-dvh",
      )}
    >
      <header className="border-b border-border">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-2.5">
            <span className="num rounded-sm border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[11px] leading-none font-medium text-primary">
              {meta.projectId}
            </span>
            {meta.embodiment ? (
              <span className="num rounded-sm border border-border px-1.5 py-0.5 text-[11px] leading-none text-muted-foreground">
                {meta.embodiment}
              </span>
            ) : null}
            <span className="num rounded-sm border border-border px-1.5 py-0.5 text-[11px] leading-none text-muted-foreground">
              {spec.computed ? "EVIDENCE_PIPELINE" : "A_BUILD_REPRODUCIBLE"}
            </span>
            {meta.version ? (
              <span className="num rounded-sm border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[11px] leading-none text-primary">
                {meta.version}
              </span>
            ) : null}
            {spec.score != null ? (
              <span className="num rounded-sm border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[11px] leading-none text-primary">
                证据重现度 {spec.score.toFixed(1)} · 锚点 Berkeley = 100
              </span>
            ) : null}
            {!spec.computed && meta.reproduction ? (
              <span className="num rounded-sm border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[11px] leading-none text-primary">
                OPEN REPRO {meta.reproduction.probabilityPercent}% · {meta.reproduction.confidence}
              </span>
            ) : null}
          </div>
          <h1 className="text-[15px] leading-tight font-semibold lg:text-[16px]">
            {spec.name} · 互动拆解与采购台
          </h1>
          <div className="ml-auto flex items-baseline gap-2">
            <span className="text-[12px] text-muted-foreground">整机物料</span>
            {priced ? (
              <>
                <span className="num text-[16px] font-semibold text-primary">
                  ${rootTotals.usd.toFixed(2)}
                </span>
                {rootTotals.rmb ? (
                  <span className="num text-[13px] text-muted-foreground">¥{rootTotals.rmb.toFixed(2)}</span>
                ) : null}
              </>
            ) : (
              <span className="text-[12px] text-muted-foreground">仓库内未给出任何单价</span>
            )}
          </div>
        </div>
        <p className="border-t border-border/70 px-4 py-1.5 text-[12px] leading-relaxed text-muted-foreground lg:px-6">
          {spec.basis}
        </p>
        {spec.gaps.length ? (
          <ul className="border-t border-border/70 px-4 py-1.5 lg:px-6">
            {spec.gaps.map((g) => (
              <li key={g} className="text-[12px] leading-relaxed text-muted-foreground">
                · {g}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <main
        className={cn(
          "min-h-0 flex-1",
          isDesktop && "grid grid-cols-[minmax(280px,320px)_minmax(0,1fr)_minmax(360px,420px)]",
        )}
      >
        {isDesktop ? (
          <section className="flex min-h-0 flex-col border-r border-border">
            <AssemblyTree
              selectedId={selectedId}
              onSelect={(id) => {
                selectNode(id);
                setTab("parts");
              }}
              onOpenPart={openPart}
            />
          </section>
        ) : null}

        <section
          className={cn(
            "relative border-border",
            isDesktop ? "min-h-0" : "h-[56vh] min-h-[380px] border-b",
          )}
        >
          {model ? (
            <RobotViewer
              model={model}
              joints={jointMarkers}
              onPickLink={handlePickLink}
              onPickJoint={selectJoint}
              handleRef={viewerRef}
              glbUrl={spec.modelUrl}
              linkRegion={spec.regionOfLink}
              className="absolute inset-0"
            />
          ) : (
            <div className="bench-grid absolute inset-0 grid place-items-center bg-[#0a0d13]">
              <p className="num text-[13px] text-muted-foreground">正在载入整机模型…</p>
            </div>
          )}

          {/* Selection readout */}
          <div className="pointer-events-none absolute top-3 left-3 max-w-[min(92%,420px)] rounded-sm border border-border bg-background/85 px-3 py-2 backdrop-blur">
            <p className="num text-[11px] tracking-wide text-muted-foreground">
              {highlightLinks.length === 0
                ? "整机"
                : highlightLinks.length === totalMeshLinks
                  ? `整机 · ${totalMeshLinks} 个 3D 部件`
                  : `${highlightLinks.length} 个 3D 部件已高亮`}
            </p>
            <p className="mt-0.5 text-[14px] leading-tight font-semibold">{selectedNode.label}</p>
            {selectedNode.joint ? (
              <p className="num mt-1 text-[11px] leading-none text-muted-foreground">
                {selectedNode.joint.canBus
                  ? `${selectedNode.joint.canBus} · CAN ID ${selectedNode.joint.canId} · #${selectedNode.joint.jointId}`
                  : `URDF 关节 #${selectedNode.joint.jointId}`}
              </p>
            ) : (
              <p className="num mt-1 text-[11px] leading-none text-muted-foreground">
                {priced ? `$${selection.totals.usd.toFixed(2)} · ` : ""}
                {selection.lines.length} 类零件
              </p>
            )}
          </div>

          {/* Region visibility */}
          <div className="absolute top-3 right-3 max-h-[60%] overflow-y-auto rounded-sm border border-border bg-background/85 p-2 backdrop-blur">
            <p className="mb-1.5 px-0.5 text-[11px] tracking-wide text-muted-foreground">
              显示 / 隐藏 / 隔离
            </p>
            <div className="flex flex-col gap-1">
              {spec.regions.map((r) => {
                const mode = regionModes[r.key] ?? "on";
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => cycleRegion(r.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-xs border px-2 py-1 text-left text-[12px] transition-colors",
                      mode === "on" && "border-border text-foreground/80 hover:border-primary/40",
                      mode === "off" && "border-transparent text-muted-foreground/60 line-through",
                      mode === "only" && "border-primary/50 bg-primary/10 text-primary",
                    )}
                    aria-pressed={mode !== "on"}
                  >
                    {mode === "on" ? (
                      <Eye className="size-3.5 shrink-0" aria-hidden />
                    ) : mode === "off" ? (
                      <EyeOff className="size-3.5 shrink-0" aria-hidden />
                    ) : (
                      <Focus className="size-3.5 shrink-0" aria-hidden />
                    )}
                    <span className="flex-1">{r.short}</span>
                    {r.bus ? (
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: CAN_BUS_COLOR[r.bus] }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom control bar */}
          <div className="absolute inset-x-3 bottom-3 rounded-sm border border-border bg-background/85 px-3 py-2.5 backdrop-blur">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <label className="flex min-w-[210px] flex-1 items-center gap-3">
                <span className="flex items-center gap-1.5 text-[12px] whitespace-nowrap text-muted-foreground">
                  <Boxes className="size-3.5" aria-hidden />
                  爆炸图
                </span>
                <Slider
                  value={[Math.round(explode * 100)]}
                  onValueChange={([v]) => setExplode((v ?? 0) / 100)}
                  max={100}
                  step={1}
                  aria-label="爆炸图展开程度"
                  className="flex-1"
                />
                <span className="num w-9 shrink-0 text-right text-[12px] text-muted-foreground">
                  {Math.round(explode * 100)}%
                </span>
              </label>

              <div className="flex items-center gap-1">
                {(
                  [
                    ["iso", "等轴"],
                    ["front", "正面"],
                    ["side", "侧面"],
                    ["top", "俯视"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => viewerRef.current?.setView(key)}
                    className="rounded-xs border border-border px-2 py-1 text-[12px] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowJoints((v) => !v)}
                  aria-pressed={showJoints}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xs border px-2 py-1 text-[12px] transition-colors",
                    showJoints ? "border-primary/50 text-primary" : "border-border text-muted-foreground",
                  )}
                >
                  <Crosshair className="size-3.5" aria-hidden />
                  关节标记
                </button>
                <button
                  type="button"
                  onClick={() => setIsolated((v) => !v)}
                  disabled={!highlightLinks.length}
                  aria-pressed={isolated}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xs border px-2 py-1 text-[12px] transition-colors disabled:opacity-40",
                    isolated ? "border-primary/50 text-primary" : "border-border text-foreground/80",
                  )}
                >
                  <Maximize2 className="size-3.5" aria-hidden />
                  仅显示选中件
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  className="flex items-center gap-1.5 rounded-xs border border-border px-2 py-1 text-[12px] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  复位
                </button>
              </div>
            </div>
          </div>
        </section>

        {isDesktop ? (
          <section className="flex min-h-0 flex-col border-l border-border">
            <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col gap-0">
              <TabsList className="m-3 mb-0 grid w-auto grid-cols-3 rounded-sm border border-border bg-background/60 p-0.5">
                <TabsTrigger value="parts" className="rounded-xs text-[13px]">
                  零件明细
                </TabsTrigger>
                <TabsTrigger value="joint" className="rounded-xs text-[13px]">
                  关节反查
                </TabsTrigger>
                <TabsTrigger value="bom" className="rounded-xs text-[13px]">
                  采购清单
                </TabsTrigger>
              </TabsList>
              <TabsContent value="parts" className="mt-0 flex min-h-0 flex-1 flex-col">
                <PartsPanel node={selectedNode} onOpenPart={openPart} />
              </TabsContent>
              <TabsContent value="joint" className="mt-0 flex min-h-0 flex-1 flex-col">
                {spec.computed ? (
                  <JointTable
                    model={model}
                    joints={jointNodes.map((n) => ({
                      id: n.joint!.jointId,
                      name: n.joint!.docName,
                      link: n.joint!.meshLink,
                    }))}
                    activeId={activeJointId}
                    onSelect={selectJoint}
                  />
                ) : (
                  <JointPanel
                    joints={jointEntries}
                    activeId={activeJointId}
                    onSelect={selectJoint}
                    onOpenPart={openPart}
                  />
                )}
              </TabsContent>
              <TabsContent value="bom" className="mt-0 flex min-h-0 flex-1 flex-col">
                <BomPanel onOpenPart={openPart} />
              </TabsContent>
            </Tabs>
          </section>
        ) : (
          <MobilePanels
            tab={tab === "parts" ? "tree" : tab}
            setTab={setTab}
            selectedId={selectedId}
            selectedNode={selectedNode}
            selectNode={selectNode}
            activeJointId={activeJointId}
            selectJoint={selectJoint}
            openPart={openPart}
            jointEntries={jointEntries}
            computed={Boolean(spec.computed)}
            model={model}
            jointTableRows={jointNodes.map((n) => ({
              id: n.joint!.jointId,
              name: n.joint!.docName,
              link: n.joint!.meshLink,
            }))}
          />
        )}
      </main>

      <footer className="border-t border-border px-4 py-3 text-[12px] leading-relaxed text-muted-foreground lg:px-6">
        <span className="text-foreground/70">资料来源：</span>
        {Object.values(EVIDENCE).map((e, i) => (
          <span key={e.key}>
            {i > 0 ? <span className="mx-1.5 opacity-50">·</span> : null}
            <a href={e.url} target="_blank" rel="noreferrer" className="num hover:text-primary">
              {e.label}
            </a>
          </span>
        ))}
        {spec.repository ? (
          <>
            <span className="mx-1.5 opacity-50">·</span>
            <a href={spec.repository} target="_blank" rel="noreferrer" className="num hover:text-primary">
              原始仓库
            </a>
          </>
        ) : null}
        <span className="mx-1.5 opacity-50">·</span>
        本项目为社区整理的非官方拆解视图，采购前请核对官方最新 BOM。
      </footer>

      <PartSheet partId={openPartId} onClose={() => setOpenPartId(null)} usages={usages} />
    </div>
  );
}

function MobilePanels({
  tab,
  setTab,
  selectedId,
  selectedNode,
  selectNode,
  activeJointId,
  selectJoint,
  openPart,
  jointEntries,
  computed,
  model,
  jointTableRows,
}: {
  tab: string;
  setTab: (v: string) => void;
  selectedId: string;
  selectedNode: TreeNode;
  selectNode: (id: string) => void;
  activeJointId: number | null;
  selectJoint: (id: number) => void;
  openPart: (id: string) => void;
  jointEntries: JointEntry[];
  computed: boolean;
  model: RobotModel | null;
  jointTableRows: { id: number; name: string; link: string }[];
}) {
  return (
    <section className="min-h-[60vh]">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-col gap-0">
        <TabsList className="m-3 mb-0 grid w-auto grid-cols-4 rounded-sm border border-border bg-background/60 p-0.5">
          <TabsTrigger value="tree" className="rounded-xs px-1 text-[12px]">
            装配树
          </TabsTrigger>
          <TabsTrigger value="parts" className="rounded-xs px-1 text-[12px]">
            零件
          </TabsTrigger>
          <TabsTrigger value="joint" className="rounded-xs px-1 text-[12px]">
            关节
          </TabsTrigger>
          <TabsTrigger value="bom" className="rounded-xs px-1 text-[12px]">
            清单
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tree" className="mt-0">
          <AssemblyTree
            className="max-h-[68vh]"
            selectedId={selectedId}
            onSelect={selectNode}
            onOpenPart={openPart}
          />
        </TabsContent>
        <TabsContent value="parts" className="mt-0">
          <PartsPanel node={selectedNode} onOpenPart={openPart} />
        </TabsContent>
        <TabsContent value="joint" className="mt-0">
          {computed ? (
            <JointTable
              model={model}
              joints={jointTableRows}
              activeId={activeJointId}
              onSelect={selectJoint}
            />
          ) : (
            <JointPanel
              joints={jointEntries}
              activeId={activeJointId}
              onSelect={selectJoint}
              onOpenPart={openPart}
            />
          )}
        </TabsContent>
        <TabsContent value="bom" className="mt-0">
          <BomPanel onOpenPart={openPart} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
