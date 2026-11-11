import { describe, expect, it } from "vitest";

import { SERVING_FORMAT } from "@/constants/booking";
import { NEW_ESTIMATE_MEAL } from "@/mocks/demoStore";

import { mealTitle, mealWhen } from "./mealTitle";

const tray = {
  ...NEW_ESTIMATE_MEAL,
  format: SERVING_FORMAT.Trays,
  name: "Không hiển thị",
  waves: [{ from: "10:00", to: "11:00", tables: 2 }],
};

describe("mealTitle", () => {
  it("titles a tray order by what is delivered, ignoring any name", () => {
    expect(mealTitle(tray, "Bữa 1")).toBe("2 mâm · 10 người/mâm");
    expect(mealWhen(tray)).toBe("20/12/2026 · giao lúc 10:00");
  });

  it("uses the meal name, then the fallback, for a served meal", () => {
    expect(mealTitle({ ...NEW_ESTIMATE_MEAL, name: " " }, "Bữa 2")).toBe(
      "Bữa 2"
    );
    expect(mealWhen(NEW_ESTIMATE_MEAL)).toBe("20/12/2026 · 17:30–20:30");
  });
});
