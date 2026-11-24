"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 1000;

let now = 0;

function readNow() {
  if (now === 0) now = Date.now();
  return now;
}

function subscribe(listener: () => void) {
  const timer = window.setInterval(() => {
    now = Date.now();
    listener();
  }, TICK_MS);
  return () => window.clearInterval(timer);
}

/** Current time in ms, ticking every second. Null while prerendering, like useToday. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, readNow, () => null);
}
