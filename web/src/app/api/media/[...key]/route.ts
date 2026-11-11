import { connection, NextResponse, type NextRequest } from "next/server";

import { isMediaKey } from "@/lib/media";
import { readS3Credentials } from "@/lib/mediaStorage";
import { presignGetUrl } from "@/lib/s3Presign";

const SIGNED_URL_TTL_SECONDS = 15 * 60;
const BROWSER_CACHE_SECONDS = SIGNED_URL_TTL_SECONDS - 60;
const LOCAL_IMAGE_DIR = "/images";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/media/[...key]">
) {
  await connection();
  const { key } = await context.params;
  const objectKey = key.join("/");

  if (!isMediaKey(objectKey)) {
    return NextResponse.json({ error: "Invalid media key" }, { status: 400 });
  }

  const credentials = readS3Credentials();
  const target = credentials
    ? presignGetUrl(credentials, objectKey, SIGNED_URL_TTL_SECONDS)
    : new URL(`${LOCAL_IMAGE_DIR}/${objectKey}`, request.url);

  const response = NextResponse.redirect(target, 307);
  response.headers.set(
    "Cache-Control",
    `private, max-age=${BROWSER_CACHE_SECONDS}`
  );
  return response;
}
