import { STAFF_POSITIONS, type StaffPosition } from "@/constants/staffing";
import { staffingDemand, type PlannedShift } from "@/lib/staffingPlan";
import { equipmentDemand, type EquipmentType } from "@/models/equipment";
import type { OrderMeal } from "@/models/orders";

import { listOperationMeals } from "@/features/meals/lib/operationMeals";

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
    listOperationMeals()
      .filter((other) => other.date === meal.date)
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

/** Manual-basis items count this many per meal until the consultant enters a figure. */
const DEFAULT_MANUAL_QUANTITY = 2;

/**
 * BR07, BR13: shortages block accepting; below-minimum stock only warns.
 * Quantities held by overlapping meals come from the backend; none are known locally yet.
 */
export function equipmentCapacityRows(
  meal: Pick<OrderMeal, "servingTables" | "guestsPerTable" | "setupTables">,
  equipment: readonly EquipmentType[]
) {
  const guests = meal.servingTables * meal.guestsPerTable;
  return equipment.map((item) => {
    const needed = equipmentDemand(
      item,
      guests,
      meal.setupTables,
      DEFAULT_MANUAL_QUANTITY
    );
    const held = 0;
    const usable = item.owned - item.damaged;
    const available = usable - held;
    return {
      name: item.name,
      basis: item.basis,
      needed,
      usable,
      held,
      available,
      short: needed > available,
      belowMinimum: item.ready < item.minimum,
    };
  });
}
