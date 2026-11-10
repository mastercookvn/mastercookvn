"use client";

import { MEAL_PROGRESS } from "@/constants/statuses";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

/** Stages only move forward one at a time. */
export function advanceMeal(mealId: string) {
  const { mealStatuses } = readDemoState();
  const stage = MEAL_PROGRESS.indexOf(mealStatuses[mealId]);
  const next = MEAL_PROGRESS[stage + 1];
  if (stage < 0 || !next) {
    throw new Error(
      `Meal ${mealId} cannot advance from ${mealStatuses[mealId]}`
    );
  }
  updateDemoState({ mealStatuses: { ...mealStatuses, [mealId]: next } });
  return next;
}
