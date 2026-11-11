import { STAFF_POSITIONS, type StaffPosition } from "@/constants/staffing";
import { staffingDemand, type PlannedShift } from "@/lib/staffingPlan";
import { capacityRows } from "@/mocks/equipment";
import { OPERATION_MEALS } from "@/mocks/operationMeals";
import type { OrderMeal } from "@/mocks/orders";

export type StaffCapacityRow = {
  position: StaffPosition;
  needed: number;
  overlapping: number;
  active: number;
  short: boolean;
};

/**
 * BR12: demand of this meal against active staff of each position, minus the
 * people already working another meal the same day.
 */
export function staffCapacityRows(
  meal: OrderMeal,
  staff: readonly { name: string; position: string; active: boolean }[],
  assignments: Record<string, readonly PlannedShift[]>
): StaffCapacityRow[] {
  const demand = staffingDemand(meal.waves, meal.guestsPerTable);
  const busy = new Set(
    OPERATION_MEALS.filter((other) => other.date === meal.date.slice(0, 5))
      .flatMap((other) => assignments[other.id] ?? [])
      .map((shift) => shift.staff)
  );
  return STAFF_POSITIONS.map((position) => {
    const members = staff.filter(
      (member) => member.active && member.position === position
    );
    const overlapping = members.filter((member) =>
      busy.has(member.name)
    ).length;
    return {
      position,
      needed: demand[position],
      overlapping,
      active: members.length,
      short: demand[position] > members.length - overlapping,
    };
  });
}

/** BR07: shortages block accepting; below-minimum stock only warns. */
export const equipmentCapacityRows = (
  meal: OrderMeal,
  simulateShortage: boolean
) => capacityRows(simulateShortage, meal);
