"use client";

import { useState } from "react";
import { Workbench } from "@/components/build-explorer/workbench";
import { GenericWorkbench } from "@/components/generic-workbench";
import { ProjectSwitcher } from "@/components/project-switcher";
import { TeardownProvider } from "@/lib/teardown-context";
import { teardownSpecFor } from "@/lib/teardown-registry";
import { REFERENCE_PROJECT, findProject } from "@/lib/workbench-projects";

/**
 * Shell.
 *
 * Projects with a deep 3D teardown — the reference implementation plus every
 * teardown the evidence pipeline has built — render through the deep workbench,
 * with the spec supplied in context. Everything else renders through the
 * generic evidence workbench. Both are held to identical evidence rules; the
 * difference is whether real geometry could be assembled for it.
 */
export default function Page() {
  const [projectId, setProjectId] = useState<string>(REFERENCE_PROJECT.id);
  const spec = teardownSpecFor(projectId);
  const project = spec ? null : findProject(projectId);
  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
      <ProjectSwitcher value={projectId} onChange={setProjectId} />
      <div className="min-h-0 flex-1 overflow-auto lg:overflow-hidden">
        {spec ? (
          <TeardownProvider key={spec.id} value={spec}>
            <Workbench embedded />
          </TeardownProvider>
        ) : project ? (
          <GenericWorkbench key={project.id} project={project} />
        ) : (
          <p className="p-8 text-[13px] text-muted-foreground">未找到项目 {projectId}。</p>
        )}
      </div>
    </div>
  );
}
