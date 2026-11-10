import { describe, expect, it } from "vitest";

import { toCsv } from "./csv";

describe("toCsv", () => {
  it("joins the header and rows with CRLF", () => {
    expect(toCsv(["Món", "Giá"], [["Gà hấp", 420000]])).toBe(
      "Món,Giá\r\nGà hấp,420000"
    );
  });

  it("quotes cells that contain commas, quotes or line breaks", () => {
    expect(toCsv(["Ghi chú"], [['Sả, "lá chanh"'], ["hai\ndòng"]])).toBe(
      'Ghi chú\r\n"Sả, ""lá chanh"""\r\n"hai\ndòng"'
    );
  });
});
