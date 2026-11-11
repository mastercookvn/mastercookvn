import "server-only";

import { z } from "zod";

import type { S3Credentials } from "./s3Presign";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const schema = z.object({
  MEDIA_S3_BUCKET: z.preprocess(emptyToUndefined, z.string().optional()),
  MEDIA_S3_REGION: z.preprocess(emptyToUndefined, z.string().optional()),
  MEDIA_S3_ACCESS_KEY_ID: z.preprocess(emptyToUndefined, z.string().optional()),
  MEDIA_S3_SECRET_ACCESS_KEY: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
  MEDIA_S3_SESSION_TOKEN: z.preprocess(emptyToUndefined, z.string().optional()),
  MEDIA_S3_ENDPOINT: z.preprocess(emptyToUndefined, z.url().optional()),
});

/** Null until the bucket is configured; the media route then serves local copies. */
export function readS3Credentials(): S3Credentials | null {
  const parsed = schema.parse(process.env);
  if (
    !parsed.MEDIA_S3_BUCKET ||
    !parsed.MEDIA_S3_REGION ||
    !parsed.MEDIA_S3_ACCESS_KEY_ID ||
    !parsed.MEDIA_S3_SECRET_ACCESS_KEY
  ) {
    return null;
  }
  return {
    bucket: parsed.MEDIA_S3_BUCKET,
    region: parsed.MEDIA_S3_REGION,
    accessKeyId: parsed.MEDIA_S3_ACCESS_KEY_ID,
    secretAccessKey: parsed.MEDIA_S3_SECRET_ACCESS_KEY,
    sessionToken: parsed.MEDIA_S3_SESSION_TOKEN,
    endpoint: parsed.MEDIA_S3_ENDPOINT,
  };
}
