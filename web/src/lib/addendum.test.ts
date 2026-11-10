import { describe, expect, it } from "vitest";

import { CHECK_RESULT, evaluateAddendum, type AddendumInput } from "./addendum";
import { calculateMealPrice } from "./pricing";

const BASE: AddendumInput = {
  daysLeft: 17,
  dishesTotal: 2_000_000,
  guestsPerTable: 10,
  services: [],
  tablesBefore: 12,
  tablesAfter: 12,
  dishSwapDelta: null,
  hasOtherPendingAddendum: false,
};

const result = (patch: Partial<AddendumInput>, key: string) =>
  evaluateAddendum({ ...BASE, ...patch }).checks.find(
    (check) => check.key === key
  )?.result;

describe("evaluateAddendum", () => {
  it("cannot be sent without a change", () => {
    expect(evaluateAddendum(BASE).canSend).toBe(false);
  });

  it("asks an extra deposit of half the added tables only above 3 tables", () => {
    const five = evaluateAddendum({ ...BASE, tablesAfter: 17 });
    const added =
      calculateMealPrice({
        dishesTotal: 2_000_000,
        servingTables: 17,
        guestsPerTable: 10,
      }).total -
      calculateMealPrice({
        dishesTotal: 2_000_000,
        servingTables: 12,
        guestsPerTable: 10,
      }).total;
    expect(five.canSend).toBe(true);
    expect(five.extraDeposit).toBe(added / 2);
    expect(evaluateAddendum({ ...BASE, tablesAfter: 15 }).extraDeposit).toBe(0);
  });

  it("limits a reduction to 15% of the signed tables, rounded down", () => {
    expect(result({ tablesAfter: 11 }, "tables-reduction")).toBe(
      CHECK_RESULT.Pass
    );
    expect(result({ tablesAfter: 10 }, "tables-reduction")).toBe(
      CHECK_RESULT.Fail
    );
  });

  it("closes table changes 3 days before and dish changes 5 days before", () => {
    expect(result({ tablesAfter: 13, daysLeft: 3 }, "tables-deadline")).toBe(
      CHECK_RESULT.Pass
    );
    expect(result({ tablesAfter: 13, daysLeft: 2 }, "tables-deadline")).toBe(
      CHECK_RESULT.Fail
    );
    expect(
      result({ dishSwapDelta: 40_000, daysLeft: 4 }, "dish-deadline")
    ).toBe(CHECK_RESULT.Fail);
  });

  it("prices a dish swap on every table", () => {
    const swap = evaluateAddendum({ ...BASE, dishSwapDelta: 40_000 });
    expect(swap.totalAfter).toBe(
      calculateMealPrice({
        dishesTotal: 2_040_000,
        servingTables: 12,
        guestsPerTable: 10,
      }).total
    );
    expect(swap.extraDeposit).toBe(0);
  });
});
