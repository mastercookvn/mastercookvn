import { z } from "zod";

const VN_MOBILE = /^0[35789]\d{8}$/;
const PHONE_SEPARATORS = /[\s.\-()]/g;
const PHONE_CHARACTERS = /^\+?\d*$/;
const PERSON_NAME = /^[\p{L}\s.'-]+$/u;
const HAS_LETTER = /\p{L}/u;

export const PERSON_NAME_MIN_LENGTH = 2;
export const PERSON_NAME_MAX_LENGTH = 100;
export const ADDRESS_MIN_LENGTH = 5;
export const ADDRESS_MAX_LENGTH = 255;
export const TEXT_MAX_LENGTH = 150;

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

/** "+84 903 123 456", "84903123456" and "0903.123.456" all become "0903123456". */
export function toLocalPhone(raw: string) {
  const digits = raw.replace(PHONE_SEPARATORS, "");
  if (digits.startsWith("+84")) return `0${digits.slice(3)}`;
  if (digits.startsWith("84") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }
  return digits;
}

/** UC-DT-01 1a, UC-TK-01 2e: one normalized 10-digit mobile per customer. */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập số điện thoại.")
  .refine(
    (value) => PHONE_CHARACTERS.test(value.replace(PHONE_SEPARATORS, "")),
    "Số điện thoại chỉ gồm chữ số."
  )
  .transform(toLocalPhone)
  .pipe(
    z
      .string()
      .regex(
        VN_MOBILE,
        "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09."
      )
  );

/** Empty passes; anything typed must satisfy `schema`, keeping its own message. */
const emptyOr = (schema: z.ZodType) =>
  z
    .string()
    .trim()
    .superRefine((value, context) => {
      if (value === "") return;
      const result = schema.safeParse(value);
      if (!result.success) {
        context.addIssue({
          code: "custom",
          message: result.error.issues[0]?.message,
        });
      }
    });

export const personNameSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập họ tên.")
  .min(
    PERSON_NAME_MIN_LENGTH,
    `Họ tên cần ít nhất ${PERSON_NAME_MIN_LENGTH} ký tự.`
  )
  .max(PERSON_NAME_MAX_LENGTH, `Họ tên tối đa ${PERSON_NAME_MAX_LENGTH} ký tự.`)
  .regex(PERSON_NAME, "Họ tên chỉ gồm chữ cái và khoảng trắng.");

export const addressSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập địa chỉ.")
  .min(
    ADDRESS_MIN_LENGTH,
    `Địa chỉ cần ít nhất ${ADDRESS_MIN_LENGTH} ký tự, gồm số nhà, đường, phường/quận.`
  )
  .max(ADDRESS_MAX_LENGTH, `Địa chỉ tối đa ${ADDRESS_MAX_LENGTH} ký tự.`)
  .regex(HAS_LETTER, "Địa chỉ cần có tên đường hoặc khu vực.");

/** Supplier bought at the market keeps the phone empty (UC-KHO-01 1a). */
export const optionalPhoneSchema = emptyOr(phoneSchema);

export const optionalAddressSchema = emptyOr(addressSchema);

/** A required free-text field such as a dish or supplier name; `label` is lower case. */
export const requiredTextSchema = (label: string, max = TEXT_MAX_LENGTH) =>
  z
    .string()
    .trim()
    .min(1, `Vui lòng nhập ${label}.`)
    .max(max, `${capitalize(label)} tối đa ${max} ký tự.`);

/** First message for one value, or null when it is valid. */
export function firstError(schema: z.ZodType, value: unknown): string | null {
  const result = schema.safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? null);
}

/** react-hook-form `mode`: check on every change and on blur, so a wrong value shows its error at once. */
export const LIVE_VALIDATION_MODE = "all" as const;

export const dayMonthYearSchema = z
  .string()
  .trim()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Ngày theo dạng dd/mm/yyyy.");

/** UC-KHO-01 step 1: purchase date, supplier name and an optional supplier phone. */
export const purchaseHeaderSchema = z.object({
  date: dayMonthYearSchema,
  supplier: requiredTextSchema("tên nhà cung cấp"),
  phone: optionalPhoneSchema,
});

export const parseAmountText = (text: string) =>
  Number(text.replace(/\D/g, ""));

/** Money typed as "1.200.000"; the output is the number. */
export const amountTextSchema = (message: string) =>
  z.string().transform(parseAmountText).pipe(z.number().positive(message));
