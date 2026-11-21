import { describe, expect, it } from "vitest";

import { CONTRACT_STATUS, MEAL_STATUS } from "@/constants/statuses";
import type { Contract, Meal } from "@/models/contracts";

import { buildSettlement } from "./settlement";

const meal = {
  name: "Tiệc",
  date: "25/10/2026",
  status: MEAL_STATUS.AwaitingSettlement,
  price: { total: 20_000_000 },
} as Meal;

const contract: Contract = {
  number: "HD-1",
  orderCode: "DH-1",
  customerName: "Khách",
  customerPhone: "0900000001",
  status: CONTRACT_STATUS.Active,
  meals: [meal],
  total: 20_000_000,
  paid: 12_000_000,
};

describe("buildSettlement", () => {
  it("adds compensation and subtracts what was collected", () => {
    const settlement = buildSettlement(contract, [
      { name: "Bát", quantity: 6, price: 15_000 },
    ]);

    expect(settlement.compensation).toBe(90_000);
    expect(settlement.settlementTotal).toBe(20_090_000);
    expect(settlement.balance).toBe(8_090_000);
  });
});
