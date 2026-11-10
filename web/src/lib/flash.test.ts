import { describe, expect, it } from "vitest";

import { encodeFlash, readFlash } from "./flash";

describe("flash", () => {
  it("round-trips a notice with the name filled in", () => {
    expect(
      readFlash(encodeFlash({ key: "login", name: "Trần Thị Mai" })),
    ).toEqual({
      tone: "success",
      message: "Đăng nhập thành công. Chào mừng Trần Thị Mai!",
    });
  });

  it("falls back when no name is given", () => {
    expect(readFlash(encodeFlash({ key: "register" }))?.message).toContain(
      "Chào bạn!",
    );
  });

  it("ignores missing, malformed or unknown values", () => {
    expect(readFlash(undefined)).toBeNull();
    expect(readFlash("%E0%A4%A")).toBeNull();
    expect(readFlash("not-json")).toBeNull();
    expect(
      readFlash(encodeURIComponent(JSON.stringify({ key: "nope" }))),
    ).toBeNull();
  });
});
