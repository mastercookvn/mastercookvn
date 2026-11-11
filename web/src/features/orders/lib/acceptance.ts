"use client";

import { useDemoState } from "@/mocks/demoStore";
import { SERVICE_RADIUS_KM } from "@/mocks/orders";

import { equipmentCapacityRows, staffCapacityRows } from "./capacity";
import { surveyKey, type WorkspaceOrder } from "./useOrders";

/** BR07, BR12, UC-DT-03: every meal surveyed, within range, with enough resources. */
export function useAcceptanceChecks(order: WorkspaceOrder) {
  const distances = useDemoState((state) => state.surveyDistances);
  const shortage = useDemoState((state) => state.simulateShortage);
  const staff = useDemoState((state) => state.staff);
  const assignments = useDemoState((state) => state.assignments);

  const kmOf = (index: number) =>
    distances[surveyKey(order.code, index)] ??
    order.mealDetails[index].distanceKm;
  const kms = order.mealDetails.map((_, index) => kmOf(index));
  const surveyed = kms.filter((km) => km !== undefined).length;
  const farthest = Math.max(0, ...kms.map((km) => km ?? 0));

  return {
    mealCount: order.mealDetails.length,
    surveyed,
    farthest,
    outOfRange: farthest > SERVICE_RADIUS_KM,
    equipmentShort: order.mealDetails.some((meal) =>
      equipmentCapacityRows(meal, shortage).some((row) => row.short)
    ),
    staffShort: order.mealDetails.some((meal) =>
      staffCapacityRows(meal, staff, assignments).some((row) => row.short)
    ),
    kmOf,
  };
}
