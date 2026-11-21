import { describe, expect, it } from "vitest";

import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import type { EstimateMeal } from "@/lib/demoStore";

import { withServingFormat } from "./mealForm";

const MEAL: EstimateMeal = {
  format: SERVING_FORMAT.Waves,
  name: "Tiệc cưới",
  date: "28/11/2026",
  address: "9 Hoa Sứ",
  guestsPerTable: 10,
  waves: [
    { from: "11:00", to: "13:00", tables: 10 },
    { from: "13:00", to: "15:00", tables: 8 },
  ],
  mode: MENU_MODE.Set,
  setId: "hysu",
  dishIds: [],
  serviceIds: [],
};

describe("withServingFormat", () => {
  it("keeps a single delivery window for trays", () => {
    const patch = withServingFormat(MEAL, SERVING_FORMAT.Trays);

    expect(patch.name).toBe("");
    expect(patch.waves).toEqual([{ from: "11:00", to: "12:00", tables: 10 }]);
  });

  it("keeps the first wave when going back to waves", () => {
    expect(withServingFormat(MEAL, SERVING_FORMAT.Waves).waves).toEqual([
      MEAL.waves[0],
    ]);
  });
});
