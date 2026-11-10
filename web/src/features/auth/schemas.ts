import { z } from "zod";

import { OTP_LENGTH } from "./otp-config";

const VN_MOBILE = /^0[35789]\d{8}$/;

export const PASSWORD_MIN_LENGTH = 8;

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

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập số điện thoại.")
  .transform(toLocalPhone)
  .pipe(
    z
      .string()
      .regex(
        VN_MOBILE,
        "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09."
      )
  );

const newPasswordSchema = z
  .string()
  .min(
    PASSWORD_MIN_LENGTH,
    `Mật khẩu cần ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`
  );

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Vui lòng nhập họ tên."),
    phone: phoneSchema,
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu nhập lại không khớp.",
  });

export const resetPhoneSchema = z.object({ phone: phoneSchema });

export const newPasswordPairSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu nhập lại không khớp.",
  });

export const otpSchema = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Nhập đủ ${OTP_LENGTH} chữ số.`);

export type FieldErrors = Partial<Record<string, string>>;

/** First message per field, ready to show under each input. */
export function firstFieldErrors(error: z.ZodError): FieldErrors {
  return Object.fromEntries(
    Object.entries(z.flattenError(error).fieldErrors).map(
      ([field, messages]) => [field, (messages as string[] | undefined)?.[0]]
    )
  );
}
