import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    emptyToUndefined,
    z.url().default("http://localhost:3000")
  ),
  NEXT_PUBLIC_API_URL: z.preprocess(emptyToUndefined, z.url().optional()),
  NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS: z.preprocess(
    emptyToUndefined,
    z.enum(["true", "false"]).default("true")
  ),
  NEXT_PUBLIC_PAYMENT_BANK_BIN: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .regex(/^\d{6}$/)
      .optional()
  ),
  NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
  NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
});

// Next.js inlines NEXT_PUBLIC_* only when referenced literally.
export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS:
    process.env.NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS,
  NEXT_PUBLIC_PAYMENT_BANK_BIN: process.env.NEXT_PUBLIC_PAYMENT_BANK_BIN,
  NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER:
    process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER,
  NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME:
    process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME,
});
