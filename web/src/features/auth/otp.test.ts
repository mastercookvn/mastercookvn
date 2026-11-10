import { describe, expect, it } from "vitest";

import { createOtpStore } from "./otp";
import {
  OTP_MAX_ATTEMPTS,
  OTP_MAX_SENDS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_SEND_WINDOW_MS,
  OTP_TTL_MS,
} from "./otp-config";

function setup() {
  let time = 1_000_000;
  const store = createOtpStore({ now: () => time, generate: () => "123456" });
  return {
    store,
    advance: (ms: number) => {
      time += ms;
    },
  };
}

const PHONE = "0903123456";

describe("otp store", () => {
  it("accepts the issued code once", () => {
    const { store } = setup();
    expect(store.issue(PHONE).ok).toBe(true);
    expect(store.verify(PHONE, "123456")).toEqual({ ok: true });
    expect(store.verify(PHONE, "123456")).toEqual({
      ok: false,
      reason: "missing",
    });
  });

  it("rejects a code for a phone that never got one", () => {
    const { store } = setup();
    expect(store.verify(PHONE, "123456").ok).toBe(false);
  });

  it("counts wrong attempts and locks the code", () => {
    const { store } = setup();
    store.issue(PHONE);
    for (let i = 1; i < OTP_MAX_ATTEMPTS; i++) {
      expect(store.verify(PHONE, "000000")).toEqual({
        ok: false,
        reason: "mismatch",
        attemptsLeft: OTP_MAX_ATTEMPTS - i,
      });
    }
    expect(store.verify(PHONE, "000000")).toEqual({
      ok: false,
      reason: "locked",
    });
    expect(store.verify(PHONE, "123456")).toEqual({
      ok: false,
      reason: "locked",
    });
  });

  it("expires the code", () => {
    const { store, advance } = setup();
    store.issue(PHONE);
    advance(OTP_TTL_MS);
    expect(store.verify(PHONE, "123456")).toEqual({
      ok: false,
      reason: "expired",
    });
  });

  it("enforces the resend cooldown and resets attempts on resend", () => {
    const { store, advance } = setup();
    store.issue(PHONE);
    store.verify(PHONE, "000000");
    expect(store.issue(PHONE)).toMatchObject({ ok: false, reason: "cooldown" });

    advance(OTP_RESEND_COOLDOWN_MS);
    expect(store.issue(PHONE).ok).toBe(true);
    expect(store.verify(PHONE, "123456")).toEqual({ ok: true });
  });

  it("caps sends per phone within the window", () => {
    const { store, advance } = setup();
    for (let i = 0; i < OTP_MAX_SENDS; i++) {
      expect(store.issue(PHONE).ok).toBe(true);
      advance(OTP_RESEND_COOLDOWN_MS);
    }
    expect(store.issue(PHONE)).toMatchObject({
      ok: false,
      reason: "too_many_sends",
    });

    advance(OTP_SEND_WINDOW_MS);
    expect(store.issue(PHONE).ok).toBe(true);
  });
});
