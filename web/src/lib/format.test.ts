import { describe, expect, it } from "vitest";

import {
  formatDecimal,
  formatDayMonthYear,
  formatMoney,
  formatPercent,
  formatWeekdayDate,
  parseDayMonthYear,
} from "./format";

describe("format", () => {
  it("formats money as whole dong", () => {
    expect(formatMoney(96444000)).toBe("96.444.000 đ");
    expect(formatMoney(0)).toBe("0 đ");
    expect(formatMoney(1234.6)).toBe("1.235 đ");
  });

  it("uses a decimal comma", () => {
    expect(formatPercent(0.3669)).toBe("36,7%");
    expect(formatPercent(0.08, 0)).toBe("8%");
    expect(formatDecimal(1.2)).toBe("1,2");
  });

  it("round-trips dd/MM/yyyy and rejects days that do not exist", () => {
    const date = parseDayMonthYear("14/12/2026");
    expect(date && formatDayMonthYear(date)).toBe("14/12/2026");
    expect(date && formatWeekdayDate(date)).toBe("Thứ hai, 14/12/2026");
    expect(parseDayMonthYear("31/02/2026")).toBeNull();
    expect(parseDayMonthYear("2026-12-14")).toBeNull();
  });
});
