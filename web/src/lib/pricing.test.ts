import { describe, expect, it } from "vitest";

import {
  calculateCancellation,
  calculateMealPrice,
  equipmentNeeded,
  proposedIngredientPrice,
  roundTo500,
  servingStaffNeeded,
} from "./pricing";

// Examples from section 9.
describe("pricing", () => {
  it("BR04: wedding meal with 30 serving tables", () => {
    const price = calculateMealPrice({
      dishesTotal: 2860000,
      servingTables: 30,
      guestsPerTable: 10,
      services: [
        { price: 1500000, quantity: 1 },
        { price: 2000000, quantity: 1 },
      ],
    });

    expect(price.dishAmount).toBe(85800000);
    expect(price.taxAmount).toBeCloseTo(7144000);
    expect(price.total).toBe(96444000);
  });

  it("BR04: factor 1.2 rounds up to the nearest 500", () => {
    const price = calculateMealPrice({
      dishesTotal: 2120000,
      servingTables: 15,
      guestsPerTable: 12,
      services: [{ price: 1500000, quantity: 1 }],
    });

    expect(price.dishAmount).toBeCloseTo(38160000);
    expect(price.roundingDifference).toBeCloseTo(200);
    expect(price.total).toBe(42833000);
  });

  it("rounds exactly half up", () => {
    expect(roundTo500(250)).toBe(500);
    expect(roundTo500(249)).toBe(0);
  });

  it("BR10: refund for HD-2026-0128 with 17 days left", () => {
    const result = calculateCancellation({
      mealValue: 27669500,
      paid: 18000000,
      daysLeft: 17,
    });

    expect(result.basis).toBe(13834750);
    expect(result.prepaidExcess).toBe(4165250);
    expect(result.refund).toBe(11082625);
    expect(result.retained).toBe(6917375);
  });

  it("BR10: nothing paid means free cancellation", () => {
    const result = calculateCancellation({
      mealValue: 1000000,
      paid: 0,
      daysLeft: 1,
    });

    expect(result.refund).toBe(0);
    expect(result.retained).toBe(0);
  });

  it("BR12 and BR13: demand for a 30-table meal", () => {
    expect(servingStaffNeeded(10)).toBe(4);
    expect(equipmentNeeded(1, 300, 0.1)).toBe(330);
    expect(equipmentNeeded(10, 10, 0.05)).toBe(105);
  });

  it("BR05: proposed price per ingredient", () => {
    const price = proposedIngredientPrice([
      { quantity: 100, price: 112000 },
      { quantity: 100, price: 115000 },
      { quantity: 100, price: 119000 },
    ]);

    expect(Math.round(price ?? 0)).toBe(115700);
  });
});
