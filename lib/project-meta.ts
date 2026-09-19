export const PROJECT_META = {
  projectId: "HUM-BERKELEY-LITE",
  version: "v1.1.0",
  embodiment: "FULL_22_DOF",
  universeFreeze: "PROJECT_UNIVERSE_FREEZE_V1",
  universeProjects: 243,
  reproduction: { probabilityPercent: 88, band: "VERY_HIGH", confidence: "HIGH" },
  releaseStates: [
    { version: "v1.0.0", status: "HISTORICAL_RELEASE" },
    { version: "v1.1.0", status: "STABLE_BUILD_TARGET" },
    { version: "v2", status: "PLANNED_NOT_RELEASED" },
  ],
} as const;
