import { createHash, createHmac } from "node:crypto";

export type S3Credentials = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  /** Temporary STS token. Signed into the URL when present. */
  sessionToken?: string;
  /** S3-compatible storage such as MinIO. Uses path-style addressing. */
  endpoint?: string;
};

const ALGORITHM = "AWS4-HMAC-SHA256";
const SERVICE = "s3";
const LEGACY_GLOBAL_REGION = "us-east-1";

const rfc3986 = (text: string) =>
  encodeURIComponent(text).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );

const hmac = (key: Buffer | string, data: string) =>
  createHmac("sha256", key).update(data, "utf8").digest();

const sha256Hex = (data: string) =>
  createHash("sha256").update(data, "utf8").digest("hex");

/** SigV4 query-string presign for a GET, without pulling in the AWS SDK. */
export function presignGetUrl(
  credentials: S3Credentials,
  key: string,
  expiresInSeconds: number,
  now = new Date()
): string {
  const encodedKey = key.split("/").map(rfc3986).join("/");
  const base = credentials.endpoint
    ? new URL(
        `${credentials.endpoint.replace(/\/$/, "")}/${credentials.bucket}/${encodedKey}`
      )
    : new URL(
        `https://${credentials.bucket}.${
          credentials.region === LEGACY_GLOBAL_REGION
            ? "s3"
            : `s3.${credentials.region}`
        }.amazonaws.com/${encodedKey}`
      );

  const amzDate = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const dateStamp = amzDate.slice(0, 8);
  const scope = `${dateStamp}/${credentials.region}/${SERVICE}/aws4_request`;

  const params: [string, string][] = [
    ["X-Amz-Algorithm", ALGORITHM],
    ["X-Amz-Credential", `${credentials.accessKeyId}/${scope}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(expiresInSeconds)],
    ["X-Amz-SignedHeaders", "host"],
  ];
  if (credentials.sessionToken) {
    params.push(["X-Amz-Security-Token", credentials.sessionToken]);
  }
  const query = params
    .map(([name, value]) => [rfc3986(name), rfc3986(value)])
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, value]) => `${name}=${value}`)
    .join("&");

  const canonicalRequest = [
    "GET",
    base.pathname,
    query,
    `host:${base.host}`,
    "",
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    ALGORITHM,
    amzDate,
    scope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = hmac(
    hmac(
      hmac(
        hmac(`AWS4${credentials.secretAccessKey}`, dateStamp),
        credentials.region
      ),
      SERVICE
    ),
    "aws4_request"
  );
  const signature = createHmac("sha256", signingKey)
    .update(stringToSign, "utf8")
    .digest("hex");

  return `${base.origin}${base.pathname}?${query}&X-Amz-Signature=${signature}`;
}
