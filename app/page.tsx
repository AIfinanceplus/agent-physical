"use client";

import { useState } from "react";
import { Workbench } from "@/components/build-explorer/workbench";
import { GenericWorkbench } from "@/components/generic-workbench";
import { ProjectSwitcher } from "@/components/project-switcher";
import { ALL_PROJECTS, REFERENCE_PROJECT, findProject } from "@/lib/workbench-projects";

/**
 * Shell.
 *
 * The reference project (Berkeley Humanoid Lite) has a dedicated deep 3D
 * explorer, so it is not in the generic list — `findProject` returns null for it
 * and the deep workbench renders instead. Every other project renders through
 * the same generic component, whether a human curated it or the evidence
 * pipeline generated it, so both are held to identical evidence rules.
 */
export default function Page() {
  const [projectId, setProjectId] = useState<string>(REFERENCE_PROJECT.id);
  const project = findProject(projectId);
  const known = ALL_PROJECTS.some((p) => p.id === projectId);
  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
      <ProjectSwitcher value={projectId} onChange={setProjectId} />
      <div className="min-h-0 flex-1 overflow-auto lg:overflow-hidden">
        {project ? (
          <GenericWorkbench key={project.id} project={project} />
        ) : known ? (
          <Workbench embedded />
        ) : (
          <p className="p-8 text-[13px] text-muted-foreground">未找到项目 {projectId}。</p>
        )}
      </div>
    </div>
  );
}
