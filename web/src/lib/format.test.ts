import { describe, expect, it } from "vitest";

import { formatDecimal, formatMoney, formatPercent } from "./format";

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
});
