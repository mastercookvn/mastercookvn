import type { OrderChannel } from "@/constants/orders";
import type { OrderStatus } from "@/constants/statuses";
import type { MealPrice } from "@/lib/pricing";

import type { Meal } from "./contracts";

/** What the order screens need from a meal, whether it has a contract yet or not. */
export type OrderMeal = Pick<
  Meal,
  | "name"
  | "date"
  | "time"
  | "address"
  | "setName"
  | "waves"
  | "guestsPerTable"
  | "servingTables"
  | "setupTables"
  | "status"
> & {
  price: MealPrice | null;
  /** Distance already surveyed (BR07); missing until the consultant records it. */
  distanceKm?: number;
};

export type OrderRow = {
  code: string;
  customer: string;
  phone: string;
  meals: number;
  firstDate: string;
  channel: OrderChannel;
  total: number;
  status: OrderStatus;
};
