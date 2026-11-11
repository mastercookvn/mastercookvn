"use client";

import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import { MEAL_STATUS, ORDER_STATUS } from "@/constants/statuses";
import { waveSpan, waveTotals } from "@/lib/servingWaves";
import { CONTRACTS } from "@/mocks/contracts";
import {
  useDemoState,
  type DemoState,
  type EstimateMeal,
} from "@/mocks/demoStore";
import {
  ORDER_MEALS,
  ORDERS,
  type OrderMeal,
  type OrderRow,
} from "@/mocks/orders";

import { estimateMeal } from "@/features/booking/lib/estimate";
import { mealTitle } from "@/features/booking/lib/mealTitle";

export type WorkspaceOrder = OrderRow & {
  mealDetails: OrderMeal[];
  createdAt?: string;
  /** Contract issued from this order, when there is one. */
  contractNumber?: string;
};

function toOrderMeal(
  meal: EstimateMeal,
  index: number,
  state: DemoState
): OrderMeal {
  const catalog = {
    dishes: state.dishes,
    menuSets: state.menuSets,
    services: state.services,
  };
  const setName =
    meal.mode === MENU_MODE.Set
      ? (state.menuSets.find((set) => set.id === meal.setId)?.name ?? "")
      : `Tự chọn ${meal.dishIds.length} món`;
  return {
    name: mealTitle(meal, `Bữa ${index + 1}`),
    date: meal.date,
    time:
      meal.format === SERVING_FORMAT.Trays
        ? `giao lúc ${meal.waves[0]?.from ?? ""}`
        : waveSpan(meal.waves),
    address: meal.address,
    setName,
    waves: meal.waves,
    guestsPerTable: meal.guestsPerTable,
    ...waveTotals(meal.waves),
    status: MEAL_STATUS.Planned,
    price: estimateMeal(meal, catalog).price ?? null,
  };
}

/** Orders customers sent from the booking page come first, then the samples (UC-DT-02 step 6). */
function selectOrders(state: DemoState): WorkspaceOrder[] {
  const submitted: WorkspaceOrder[] = state.submittedOrders.map((order) => ({
    code: order.code,
    customer: order.contact?.name ?? "",
    phone: order.contact?.phone ?? "",
    meals: order.meals.length,
    firstDate: order.meals[0]?.date ?? "",
    channel: "Online",
    total: order.total,
    status: state.orderStatuses[order.code] ?? ORDER_STATUS.Pending,
    createdAt: order.submittedAt,
    mealDetails: order.meals.map((meal, index) =>
      toOrderMeal(meal, index, state)
    ),
  }));
  const samples: WorkspaceOrder[] = ORDERS.map((order) => ({
    ...order,
    status: state.orderStatuses[order.code] ?? order.status,
    mealDetails: ORDER_MEALS[order.code] ?? [],
    contractNumber: CONTRACTS.find(
      (contract) => contract.orderCode === order.code
    )?.number,
  }));
  return [...submitted, ...samples];
}

export function useWorkspaceOrders() {
  return selectOrders(useDemoState((state) => state));
}

export function useWorkspaceOrder(code: string) {
  return useWorkspaceOrders().find((order) => order.code === code);
}

export const surveyKey = (code: string, mealIndex: number) =>
  `${code}:${mealIndex}`;
