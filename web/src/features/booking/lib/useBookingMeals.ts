"use client";

import {
  updateDemoState,
  useDemoState,
  type EstimateMeal,
} from "@/mocks/demoStore";

export function useBookingMeals() {
  const meals = useDemoState((state) => state.estimate);
  const setMeals = (estimate: EstimateMeal[]) => updateDemoState({ estimate });
  const updateMeal = (index: number, patch: Partial<EstimateMeal>) =>
    setMeals(
      meals.map((meal, i) => (i === index ? { ...meal, ...patch } : meal))
    );

  return { meals, setMeals, updateMeal };
}
