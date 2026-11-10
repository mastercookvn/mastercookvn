import { describe, expect, it } from "vitest";

import {
  firstFieldErrors,
  loginSchema,
  newPasswordPairSchema,
  registerSchema,
} from "./schemas";

describe("loginSchema", () => {
  it("accepts any common way of writing a Vietnamese mobile", () => {
    expect(
      loginSchema.parse({ phone: "+84 903.123.456", password: "x" }).phone
    ).toBe("0903123456");
  });

  it("explains a bad phone and an empty password per field", () => {
    const result = loginSchema.safeParse({ phone: "12345", password: "" });
    expect(result.success).toBe(false);
    expect(result.error && firstFieldErrors(result.error)).toEqual({
      phone: "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09.",
      password: "Vui lòng nhập mật khẩu.",
    });
  });
});

describe("new passwords", () => {
  it("needs eight characters and a matching confirmation", () => {
    const short = newPasswordPairSchema.safeParse({
      password: "abc",
      confirmPassword: "abc",
    });
    expect(short.error && firstFieldErrors(short.error).password).toBe(
      "Mật khẩu cần ít nhất 8 ký tự."
    );

    const mismatch = registerSchema.safeParse({
      name: "Mai",
      phone: "0903123456",
      password: "matkhaumau",
      confirmPassword: "matkhaumoi",
    });
    expect(
      mismatch.error && firstFieldErrors(mismatch.error).confirmPassword
    ).toBe("Mật khẩu nhập lại không khớp.");
  });
});
