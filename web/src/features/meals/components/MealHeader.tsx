"use client";

import { PageHeader } from "@/components/layout/workspace/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Role } from "@/constants/roles";
import { useDemoState } from "@/mocks/demoStore";
import type { OperationMeal } from "@/mocks/operationMeals";

import { MealSwitcher } from "./queue/MealSwitcher";

export function MealHeader({
  meal,
  roles,
}: {
  meal: OperationMeal;
  roles: Role[];
}) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);

  return (
    <PageHeader
      screen="meals"
      meta={
        <>
          <StatusBadge domain="meal" status={status} />
          <span>
            {meal.name} · {meal.date}/2026 · {meal.time} · {meal.guests} khách
          </span>
          <span>{meal.address}</span>
        </>
      }
      aside={<MealSwitcher currentId={meal.id} roles={roles} />}
    />
  );
}
