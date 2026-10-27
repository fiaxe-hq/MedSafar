"use client";

import { createContext, useContext } from "react";

/**
 * A few short labels that components shared between server and browser code
 * need, in the page's language. Set once in the root layout.
 */
export type Labels = { pending: string; photo: string; check: string };

const LabelsContext = createContext<Labels>({
  pending: "Placeholder",
  photo: "Photo to be supplied",
  check: "Pending doctor check",
});

export function LabelsProvider({ value, children }: { value: Labels; children: React.ReactNode }) {
  return <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>;
}

export const useLabels = () => useContext(LabelsContext);
