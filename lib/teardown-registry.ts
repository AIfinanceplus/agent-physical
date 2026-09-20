/**
 * Which projects have a deep 3D teardown.
 *
 * The reference implementation always does. Generated teardowns come from
 * `lib/teardowns.generated.ts` (written by `pipeline/build_teardowns.py`).
 * A project without an entry renders through the generic evidence workbench.
 */

import { GENERATED_TEARDOWNS } from "./teardowns.generated";
import { BERKELEY_SPEC, type TeardownSpec } from "./teardown";

export function teardownSpecFor(projectId: string): TeardownSpec | null {
  if (projectId === BERKELEY_SPEC.id) return BERKELEY_SPEC;
  const g = GENERATED_TEARDOWNS[projectId];
  if (!g) return null;
  const { regionByLink, generated: _generated, ...rest } = g;
  return {
    ...rest,
    computed: true,
    regionOfLink: (link: string) => regionByLink[link] ?? rest.regions[0]?.key ?? "torso",
  };
}

export const TEARDOWN_IDS: string[] = [
  BERKELEY_SPEC.id,
  ...Object.keys(GENERATED_TEARDOWNS),
];

export function hasTeardown(projectId: string): boolean {
  return teardownSpecFor(projectId) !== null;
}
