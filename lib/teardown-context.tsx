"use client";

import { createContext, useContext } from "react";
import { BERKELEY_SPEC, type TeardownSpec } from "./teardown";

/**
 * The deep 3D workbench is one component tree shared by every teardown. Rather
 * than threading a spec through six components, the spec travels in context and
 * defaults to the reference implementation — so the reference renders
 * unchanged when nobody provides one.
 */
const TeardownContext = createContext<TeardownSpec>(BERKELEY_SPEC);

export const TeardownProvider = TeardownContext.Provider;

export function useTeardown(): TeardownSpec {
  return useContext(TeardownContext);
}
