import { describe, expect, it } from "vitest";

import {
  describeWaves,
  nextWave,
  waveErrors,
  waveSpan,
  waveTotals,
} from "./servingWaves";

const ROLLING = [
  { from: "09:00", to: "11:00", tables: 14 },
  { from: "11:00", to: "13:00", tables: 14 },
  { from: "13:00", to: "15:00", tables: 12 },
];

describe("waveTotals", () => {
  it("eats every wave's tables but sets up only the largest wave", () => {
    expect(waveTotals(ROLLING)).toEqual({ servingTables: 40, setupTables: 14 });
  });

  it("is zero without waves", () => {
    expect(waveTotals([])).toEqual({ servingTables: 0, setupTables: 0 });
  });
});

describe("waveSpan", () => {
  it("runs from the first start to the last end", () => {
    expect(waveSpan(ROLLING)).toBe("09:00–15:00");
  });
});

describe("waveErrors", () => {
  it("accepts back-to-back waves", () => {
    expect(waveErrors(ROLLING)).toEqual([]);
  });

  it("rejects overlapping waves", () => {
    expect(
      waveErrors([
        { from: "09:00", to: "11:00", tables: 10 },
        { from: "10:30", to: "12:00", tables: 10 },
      ])
    ).toEqual(["Lượt 2 bắt đầu trước khi lượt 1 kết thúc."]);
  });

  it("rejects bad times and empty waves", () => {
    expect(waveErrors([{ from: "9h", to: "11:00", tables: 10 }])).toEqual([
      "Lượt 1: giờ theo dạng HH:MM.",
    ]);
    expect(waveErrors([{ from: "11:00", to: "10:00", tables: 0 }])).toEqual([
      "Lượt 1: giờ kết thúc phải sau giờ bắt đầu.",
      "Lượt 1: cần ít nhất 1 bàn.",
    ]);
    expect(waveErrors([])).toEqual(["Cần ít nhất một lượt đãi."]);
  });
});

describe("nextWave", () => {
  it("continues after the last wave with the same length", () => {
    expect(nextWave(ROLLING)).toEqual({
      from: "15:00",
      to: "17:00",
      tables: 12,
    });
  });
});

describe("describeWaves", () => {
  it("summarises guests from tables eaten, not tables set up", () => {
    expect(describeWaves(ROLLING, 10)).toBe(
      "3 lượt · 40 bàn ăn · 400 khách · bố trí 14 bàn"
    );
  });
});
