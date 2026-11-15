import { describe, expect, it } from "vitest";

import {
  daysInLunarMonth,
  formatLunarLong,
  leapMonthOf,
  lunarToSolar,
  monthGrid,
  solarToLunar,
} from "./lunar";

describe("solarToLunar", () => {
  it("maps Tết 2026 to mùng 1 tháng Giêng", () => {
    expect(solarToLunar(new Date(2026, 1, 17))).toMatchObject({
      day: 1,
      month: 1,
      year: 2026,
      isLeap: false,
    });
  });

  it("knows the leap sixth month of 2025", () => {
    expect(solarToLunar(new Date(2025, 6, 25))).toMatchObject({
      day: 1,
      month: 6,
      isLeap: true,
    });
    expect(leapMonthOf(2025)).toBe(6);
    expect(leapMonthOf(2026)).toBe(0);
  });
});

describe("lunarToSolar", () => {
  it("round-trips a death anniversary date", () => {
    const solar = lunarToSolar(15, 10, 2026);
    expect(solar).not.toBeNull();
    expect(solarToLunar(solar as Date)).toMatchObject({ day: 15, month: 10 });
  });

  it("rejects a leap month that the year does not have", () => {
    expect(lunarToSolar(1, 3, 2026, true)).toBeNull();
  });

  it("rejects day 30 of a short month", () => {
    expect(daysInLunarMonth(1, 2024)).toBe(29);
    expect(lunarToSolar(30, 1, 2024)).toBeNull();
  });
});

describe("formatLunarLong", () => {
  it("names rằm and the leap month", () => {
    expect(
      formatLunarLong({ day: 15, month: 6, year: 2025, isLeap: true, jd: 0 })
    ).toBe("Rằm tháng 6 (nhuận)");
  });
});

describe("monthGrid", () => {
  it("starts on Monday and fills six weeks", () => {
    const grid = monthGrid(2026, 10);
    expect(grid).toHaveLength(42);
    expect(grid[0].solar.getDay()).toBe(1);
  });
});
