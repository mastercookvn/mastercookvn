import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    emptyToUndefined,
    z.url().default("http://localhost:3000"),
  ),
  NEXT_PUBLIC_API_URL: z.preprocess(emptyToUndefined, z.url().optional()),
  NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS: z.preprocess(
    emptyToUndefined,
    z.enum(["true", "false"]).default("true"),
  ),
});

// Next.js inlines NEXT_PUBLIC_* only when referenced literally.
export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS:
    process.env.NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS,
});
