import type { ContractStatus, MealStatus } from "@/constants/statuses";
import type { MealPrice } from "@/lib/pricing";
import type { ServingWave } from "@/lib/servingWaves";

import type { Service } from "./catalog";

export type MealService = Service & { quantity: number };

export type Meal = {
  name: string;
  eventType: string;
  startsAt: string;
  date: string;
  time: string;
  address: string;
  distanceKm: number;
  servingTables: number;
  guestsPerTable: number;
  setupTables: number;
  waves: ServingWave[];
  setId: string;
  setName: string;
  dishNames: string[];
  services: MealService[];
  status: MealStatus;
  price: MealPrice;
};

export type Contract = {
  number: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  status: ContractStatus;
  meals: Meal[];
  total: number;
  paid: number;
  depositDeadline?: string;
};

/** Whole days from `from` to the meal start; negative once the meal has started. */
export const daysUntil = (iso: string, from: Date = new Date()) =>
  Math.floor((new Date(iso).getTime() - from.getTime()) / 864e5);
