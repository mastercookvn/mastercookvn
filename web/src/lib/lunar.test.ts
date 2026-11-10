import { describe, expect, it } from "vitest";

import { lunarToSolar, solarToLunar } from "./lunar";

describe("solarToLunar", () => {
  it("maps Tết 2026 to mùng 1 tháng Giêng", () => {
    expect(solarToLunar(new Date(2026, 1, 17))).toEqual({
      day: 1,
      month: 1,
      year: 2026,
      leap: false,
    });
  });

  it("maps Tết 2025 to mùng 1 tháng Giêng", () => {
    expect(solarToLunar(new Date(2025, 0, 29))).toMatchObject({
      day: 1,
      month: 1,
      year: 2025,
    });
  });

  it("knows the leap sixth month of 2025", () => {
    expect(solarToLunar(new Date(2025, 6, 25))).toMatchObject({
      day: 1,
      month: 6,
      leap: true,
    });
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
});
