"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { hasAnyRole, ROLE, type Role } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { MEAL_STATUS, type MealStatus } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import { OPERATION_MEALS } from "@/mocks/operationMeals";

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

export function MealQueue({ roles }: { roles: Role[] }) {
  const pathname = usePathname();
  const statuses = useDemoState((state) => state.mealStatuses);

  return (
    <nav className="meal-queue" aria-label="Danh sách bữa">
      <h3>Bữa cần xử lý</h3>
      {OPERATION_MEALS.map((meal) => {
        const href = ROUTES.workspaceMeal(meal.id);
        return (
          <Link
            key={meal.id}
            href={`${href}?tab=${tabForMeal(statuses[meal.id], roles)}`}
            aria-current={pathname === href ? "page" : undefined}
          >
            <time>
              {meal.date}
              <small>{meal.time.slice(0, 5)}</small>
            </time>
            <b>{meal.name}</b>
            <span>
              <StatusBadge domain="meal" status={statuses[meal.id]} />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
