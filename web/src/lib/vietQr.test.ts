import { describe, expect, it } from "vitest";

import { crc16Ccitt, vietQrPayload } from "./vietQr";

const transfer = {
  bankBin: "970436",
  accountNumber: "0123456789",
  amount: 1500000,
  purpose: "COC-0001-ABC",
};

describe("crc16Ccitt", () => {
  it("matches the CRC-16/CCITT-FALSE check value", () => {
    expect(crc16Ccitt("123456789")).toBe("29B1");
  });
});

describe("vietQrPayload", () => {
  it("encodes the account, amount and transfer content as EMVCo fields", () => {
    const payload = vietQrPayload(transfer);

    expect(payload).toBe(
      "000201" +
        "010212" +
        "3854" +
        "0010A000000727" +
        "0124" +
        "0006970436" +
        "01100123456789" +
        "0208QRIBFTTA" +
        "5303704" +
        "54071500000" +
        "5802VN" +
        "6216" +
        "0812COC-0001-ABC" +
        "6304" +
        payload.slice(-4)
    );
  });

  it("ends with the CRC of everything before it", () => {
    const payload = vietQrPayload(transfer);

    expect(payload.slice(-4)).toBe(crc16Ccitt(payload.slice(0, -4)));
  });

  it("rejects values a bank app would not accept", () => {
    expect(() => vietQrPayload({ ...transfer, bankBin: "9704" })).toThrow();
    expect(() => vietQrPayload({ ...transfer, amount: 0 })).toThrow();
    expect(() => vietQrPayload({ ...transfer, amount: 10.5 })).toThrow();
    expect(() =>
      vietQrPayload({ ...transfer, purpose: "X".repeat(26) })
    ).toThrow();
  });
});
