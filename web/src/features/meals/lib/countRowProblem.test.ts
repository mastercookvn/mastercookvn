import { describe, expect, it } from "vitest";

import { countRowProblem } from "./countRowProblem";

const row = {
  name: "Bát ăn sứ",
  issued: 99,
  good: 89,
  damaged: 4,
  lost: 6,
  charged: 6,
  price: 15000,
};

describe("countRowProblem", () => {
  it("accepts a balanced row", () => {
    expect(countRowProblem(row)).toBeNull();
  });

  it("flags totals that do not match the issued quantity", () => {
    expect(countRowProblem({ ...row, good: 80 })).toBe("Tổng chưa khớp");
  });

  it("flags a customer charge above damaged plus lost", () => {
    expect(countRowProblem({ ...row, charged: 11 })).toBe("Khách chịu vượt");
  });
});
