import { z } from "zod";

import { OTP_LENGTH } from "./otp-config";

export const loginSchema = z.object({
  phone: z.string().trim().min(1),
  password: z.string().min(1),
});

const VN_MOBILE = /^0[35789]\d{8}$/;

/** "+84 903 123 456", "84903123456" and "0903.123.456" all become "0903123456". */
export function toLocalPhone(raw: string) {
  const digits = raw.replace(/[\s.\-()]/g, "");
  if (digits.startsWith("+84")) return `0${digits.slice(3)}`;
  if (digits.startsWith("84") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }
  return digits;
}

/** "0903123456" → "0903 *** 456". */
export const maskPhone = (phone: string) =>
  `${phone.slice(0, 4)} *** ${phone.slice(-3)}`;

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .transform(toLocalPhone)
    .pipe(z.string().regex(VN_MOBILE, "Số điện thoại di động không hợp lệ.")),
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export const otpSchema = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Nhập đủ ${OTP_LENGTH} chữ số.`);
