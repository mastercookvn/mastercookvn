import type { ReactNode } from "react";

export type Column = { label: ReactNode; numeric?: boolean };

/** Plain module so server components can build columns for the client table. */
export const num = (label: ReactNode): Column => ({ label, numeric: true });
