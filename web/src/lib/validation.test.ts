import { describe, expect, it } from "vitest";

import {
  addressSchema,
  amountTextSchema,
  optionalAddressSchema,
  firstError,
  optionalPhoneSchema,
  personNameSchema,
  phoneSchema,
  requiredTextSchema,
  toLocalPhone,
} from "./validation";

describe("phone", () => {
  it("normalizes common ways of writing a Vietnamese mobile", () => {
    expect(toLocalPhone("+84 903.123.456")).toBe("0903123456");
    expect(toLocalPhone("84903123456")).toBe("0903123456");
    expect(phoneSchema.parse("0903 123 456")).toBe("0903123456");
  });

  it("explains an empty, short, lettered or unknown-prefix number", () => {
    expect(firstError(phoneSchema, " ")).toBe("Vui lòng nhập số điện thoại.");
    expect(firstError(phoneSchema, "0903 12a 456")).toBe(
      "Số điện thoại chỉ gồm chữ số."
    );
    expect(firstError(phoneSchema, "090312")).toBe(
      "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09."
    );
    expect(firstError(phoneSchema, "0123456789")).toBe(
      "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09."
    );
  });

  it("lets an optional phone stay empty but not wrong", () => {
    expect(firstError(optionalPhoneSchema, "")).toBeNull();
    expect(firstError(optionalPhoneSchema, "0903")).toBe(
      "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09."
    );
  });
});

describe("person name", () => {
  it("accepts Vietnamese names", () => {
    expect(firstError(personNameSchema, "Nguyễn Thị Mai")).toBeNull();
    expect(firstError(personNameSchema, "Đặng Văn Út-Ba")).toBeNull();
  });

  it("rejects empty, too short, digits and symbols", () => {
    expect(firstError(personNameSchema, "  ")).toBe("Vui lòng nhập họ tên.");
    expect(firstError(personNameSchema, "M")).toBe(
      "Họ tên cần ít nhất 2 ký tự."
    );
    expect(firstError(personNameSchema, "Mai 123")).toBe(
      "Họ tên chỉ gồm chữ cái và khoảng trắng."
    );
    expect(firstError(personNameSchema, "Mai@")).toBe(
      "Họ tên chỉ gồm chữ cái và khoảng trắng."
    );
    expect(firstError(personNameSchema, "a".repeat(101))).toBe(
      "Họ tên tối đa 100 ký tự."
    );
  });
});

describe("address", () => {
  it("needs enough detail to find the place", () => {
    expect(firstError(addressSchema, "")).toBe("Vui lòng nhập địa chỉ.");
    expect(firstError(addressSchema, "Q1")).toBe(
      "Địa chỉ cần ít nhất 5 ký tự, gồm số nhà, đường, phường/quận."
    );
    expect(firstError(addressSchema, "12345")).toBe(
      "Địa chỉ cần có tên đường hoặc khu vực."
    );
    expect(firstError(addressSchema, "12 Lê Lợi, Quận 1")).toBeNull();
  });
});

describe("required text", () => {
  it("uses the given label", () => {
    expect(firstError(requiredTextSchema("tên món"), " ")).toBe(
      "Vui lòng nhập tên món."
    );
    expect(firstError(requiredTextSchema("tên món", 5), "123456")).toBe(
      "Tên món tối đa 5 ký tự."
    );
  });
});

describe("optional address", () => {
  it("allows empty but checks a typed address", () => {
    expect(firstError(optionalAddressSchema, " ")).toBeNull();
    expect(firstError(optionalAddressSchema, "Q1")).toBe(
      "Địa chỉ cần ít nhất 5 ký tự, gồm số nhà, đường, phường/quận."
    );
  });
});

describe("amount text", () => {
  it("reads grouped digits and needs more than zero", () => {
    expect(amountTextSchema("Nhập đơn giá").parse("1.200.000")).toBe(1200000);
    expect(firstError(amountTextSchema("Nhập đơn giá"), "")).toBe(
      "Nhập đơn giá"
    );
  });
});
