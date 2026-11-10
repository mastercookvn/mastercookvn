import { describe, expect, it } from "vitest";

import { moneyInWords } from "./moneyWords";

describe("moneyInWords", () => {
  it.each([
    [0, "Không đồng"],
    [15, "Mười lăm đồng"],
    [21, "Hai mươi mốt đồng"],
    [105, "Một trăm linh năm đồng"],
    [1_000, "Một nghìn đồng"],
    [12_005_000, "Mười hai triệu không trăm linh năm nghìn đồng"],
    [96_444_000, "Chín mươi sáu triệu bốn trăm bốn mươi bốn nghìn đồng"],
    [1_000_500, "Một triệu năm trăm đồng"],
    [2_300_000_000, "Hai tỷ ba trăm triệu đồng"],
  ])("reads %i", (amount, words) => {
    expect(moneyInWords(amount)).toBe(words);
  });
});
