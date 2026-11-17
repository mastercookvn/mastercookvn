import { z } from "zod";

import { personNameSchema, phoneSchema } from "@/lib/validation";

import { OTP_LENGTH } from "./otp-config";

export const PASSWORD_MIN_LENGTH = 8;

/** "0903123456" → "0903 *** 456". */
export const maskPhone = (phone: string) =>
  `${phone.slice(0, 4)} *** ${phone.slice(-3)}`;

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
    name: personNameSchema,
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
