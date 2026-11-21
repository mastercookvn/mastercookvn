import type { OperationMeal } from "@/models/operations";

// Placeholder until the meals API exists; every lookup is empty.
export const listOperationMeals = (): OperationMeal[] => [];

export const findOperationMeal = (id: string) =>
  listOperationMeals().find((meal) => meal.id === id);
