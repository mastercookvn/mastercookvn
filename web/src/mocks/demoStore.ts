"use client";

// In-memory placeholder for backend state. A reload resets it, except the estimate draft.
import { useSyncExternalStore } from "react";

import {
  MEAL_STATUS,
  ORDER_STATUS,
  type MealStatus,
  type OrderStatus,
} from "@/constants/statuses";

export type EstimateMeal = {
  date: string;
  servingTables: number;
  guestsPerTable: number;
  setupTables: number;
  mode: "set" | "custom";
  setId: string;
  dishIds: string[];
  serviceIds: string[];
};

const DEFAULT_DISH_IDS = ["goi", "chagio", "ga", "bo", "lauthai", "traicay"];

const INITIAL_STATE = {
  estimate: [
    {
      date: "14/12/2026",
      servingTables: 30,
      guestsPerTable: 10,
      setupTables: 10,
      mode: "set",
      setId: "hysu",
      dishIds: DEFAULT_DISH_IDS,
      serviceIds: ["don", "cong"],
    },
  ] as EstimateMeal[],
  contractConfirmed: false,
  depositPaid: false,
  depositPercent: 50,
  addendumConfirmed: false,
  mealCancelled: false,
  reviewSubmitted: false,
  orderStatus: ORDER_STATUS.Pending as OrderStatus,
  surveyDistanceKm: 9.5,
  simulateShortage: false,
  contractIssued: false,
  paperSigned: false,
  periodClosed: false,
  priceDecisions: {} as Record<number, string>,
  mealStatuses: {
    "0120": MEAL_STATUS.AwaitingCount,
    "0115": MEAL_STATUS.Confirmed,
    "0128": MEAL_STATUS.Preparing,
  } as Record<string, MealStatus>,
};

export type DemoState = typeof INITIAL_STATE;

const DRAFT_KEY = "mastercook.estimate-draft";

let state = INITIAL_STATE;
let draftLoaded = false;
const listeners = new Set<() => void>();

function loadDraft() {
  if (draftLoaded) return;
  draftLoaded = true;
  try {
    const saved = window.localStorage.getItem(DRAFT_KEY);
    if (saved)
      state = { ...state, estimate: JSON.parse(saved) as EstimateMeal[] };
  } catch {
    // Unavailable storage or a corrupt draft: keep the default.
  }
}

function subscribe(listener: () => void) {
  loadDraft();
  listeners.add(listener);
  listener();
  return () => {
    listeners.delete(listener);
  };
}

export function updateDemoState(patch: Partial<DemoState>) {
  state = { ...state, ...patch };
  if (patch.estimate) {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(patch.estimate));
    } catch {
      // A lost draft is acceptable.
    }
  }
  listeners.forEach((listener) => listener());
}

export function useDemoState<T>(selector: (current: DemoState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(INITIAL_STATE),
  );
}

export function selectEstimateSet(setId: string) {
  const [first, ...rest] = state.estimate;
  updateDemoState({ estimate: [{ ...first, mode: "set", setId }, ...rest] });
}

export const NEW_ESTIMATE_MEAL: EstimateMeal = {
  date: "20/12/2026",
  servingTables: 15,
  guestsPerTable: 12,
  setupTables: 8,
  mode: "set",
  setId: "sumvay",
  dishIds: [],
  serviceIds: ["don"],
};

export { DEFAULT_DISH_IDS };
