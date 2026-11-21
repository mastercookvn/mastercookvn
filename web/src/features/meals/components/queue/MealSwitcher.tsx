"use client";

import { useRouter } from "next/navigation";

import { Select } from "@/components/ui/Select";
import { MEAL_STATUS_META } from "@/constants/labels";
import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { MEAL_STATUS, type MealStatus } from "@/constants/statuses";
import { useDemoState } from "@/lib/demoStore";
import { listOperationMeals } from "@/features/meals/lib/operationMeals";

/** Opens the tab matching the meal stage and the viewer's role. */
function tabForMeal(status: MealStatus, roles: Role[]) {
  if (
    status === MEAL_STATUS.AwaitingCount &&
    hasAnyRole(roles, [ROLE.Storekeeper])
  )
    return "count";
  if (status === MEAL_STATUS.Preparing && hasAnyRole(roles, [ROLE.Storekeeper]))
    return "issue";
  if (status === MEAL_STATUS.Confirmed && hasAnyRole(roles, [ROLE.HrManager]))
    return "staffing";
  return hasAnyRole(roles, [ROLE.Consultant, ROLE.Storekeeper])
    ? "progress"
    : "staffing";
}

export function MealSwitcher({
  currentId,
  roles,
}: {
  currentId: string;
  roles: Role[];
}) {
  const router = useRouter();
  const statuses = useDemoState((state) => state.mealStatuses);

  return (
    <Select
      aria-label="Chọn bữa"
      className="meal-switcher"
      value={currentId}
      options={listOperationMeals().map((meal) => ({
        value: meal.id,
        label: `${meal.date} · ${meal.name} · ${MEAL_STATUS_META[statuses[meal.id]].label}`,
      }))}
      onValueChange={(id) =>
        router.push(
          `${ROUTES.workspaceMeal(id)}?tab=${tabForMeal(statuses[id], roles)}`
        )
      }
    />
  );
}
