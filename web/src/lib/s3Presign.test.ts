import { describe, expect, it } from "vitest";

import { presignGetUrl } from "./s3Presign";

// Example from the AWS SigV4 query-string authentication docs.
const AWS_EXAMPLE = {
  bucket: "examplebucket",
  region: "us-east-1",
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
};

describe("presignGetUrl", () => {
  it("matches the AWS documented signature", () => {
    const url = new URL(
      presignGetUrl(
        AWS_EXAMPLE,
        "test.txt",
        86400,
        new Date("2013-05-24T00:00:00Z")
      )
    );

    expect(url.origin).toBe("https://examplebucket.s3.amazonaws.com");
    expect(url.pathname).toBe("/test.txt");
    expect(url.searchParams.get("X-Amz-Signature")).toBe(
      "aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404"
    );
  });

  it("signs the session token when temporary credentials are used", () => {
    const url = new URL(
      presignGetUrl(
        { ...AWS_EXAMPLE, sessionToken: "token/with+chars" },
        "dishes/goi.jpg",
        900,
        new Date("2026-11-11T00:00:00Z")
      )
    );

    expect(url.searchParams.get("X-Amz-Security-Token")).toBe(
      "token/with+chars"
    );
    expect(url.searchParams.get("X-Amz-Expires")).toBe("900");
  });

  it("uses path-style addressing for a custom endpoint", () => {
    const url = new URL(
      presignGetUrl(
        { ...AWS_EXAMPLE, endpoint: "http://localhost:9000" },
        "dishes/goi.jpg",
        900
      )
    );

    expect(url.origin).toBe("http://localhost:9000");
    expect(url.pathname).toBe("/examplebucket/dishes/goi.jpg");
  });
});
