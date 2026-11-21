"use client";

import { useSyncExternalStore } from "react";

let today: Date | null = null;

function readToday() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (today?.getTime() !== start.getTime()) today = start;
  return today;
}

const subscribe = () => () => {};

/**
 * Start of today in the browser. Null while prerendering, since Cache Components
 * cannot read the current time outside a Suspense boundary.
 */
export function useToday(): Date | null {
  return useSyncExternalStore(subscribe, readToday, () => null);
}
