import { randomInt, timingSafeEqual } from "node:crypto";

import {
  OTP_LENGTH,
  OTP_MAX_ATTEMPTS,
  OTP_MAX_SENDS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_SEND_WINDOW_MS,
  OTP_TTL_MS,
} from "./otp-config";

type Entry = {
  code: string | null;
  expiresAt: number;
  resendAt: number;
  attempts: number;
  sentAt: number[];
};

export type IssueResult =
  | { ok: true; code: string; expiresAt: number; resendAt: number }
  | {
      ok: false;
      reason: "cooldown" | "too_many_sends";
      retryAt: number;
      expiresAt: number;
    };

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "expired" | "locked" }
  | { ok: false; reason: "mismatch"; attemptsLeft: number };

const randomCode = () =>
  randomInt(0, 10 ** OTP_LENGTH)
    .toString()
    .padStart(OTP_LENGTH, "0");

function sameCode(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createOtpStore({
  now = Date.now,
  generate = randomCode,
}: { now?: () => number; generate?: () => string } = {}) {
  const entries = new Map<string, Entry>();

  function prune(time: number) {
    for (const [key, entry] of entries) {
      const lastSend = entry.sentAt.at(-1) ?? 0;
      if (time - lastSend > OTP_SEND_WINDOW_MS) entries.delete(key);
    }
  }

  return {
    issue(key: string): IssueResult {
      const time = now();
      prune(time);
      const entry = entries.get(key);
      const sentAt = (entry?.sentAt ?? []).filter(
        (at) => time - at < OTP_SEND_WINDOW_MS,
      );

      if (entry && time < entry.resendAt) {
        return {
          ok: false,
          reason: "cooldown",
          retryAt: entry.resendAt,
          expiresAt: entry.expiresAt,
        };
      }
      if (sentAt.length >= OTP_MAX_SENDS) {
        return {
          ok: false,
          reason: "too_many_sends",
          retryAt: sentAt[0] + OTP_SEND_WINDOW_MS,
          expiresAt: entry?.expiresAt ?? 0,
        };
      }

      const code = generate();
      const next: Entry = {
        code,
        expiresAt: time + OTP_TTL_MS,
        resendAt: time + OTP_RESEND_COOLDOWN_MS,
        attempts: 0,
        sentAt: [...sentAt, time],
      };
      entries.set(key, next);
      return {
        ok: true,
        code,
        expiresAt: next.expiresAt,
        resendAt: next.resendAt,
      };
    },

    verify(key: string, code: string): VerifyResult {
      const entry = entries.get(key);
      if (!entry?.code) return { ok: false, reason: "missing" };
      if (now() >= entry.expiresAt) {
        entry.code = null;
        return { ok: false, reason: "expired" };
      }
      if (entry.attempts >= OTP_MAX_ATTEMPTS) {
        return { ok: false, reason: "locked" };
      }
      if (!sameCode(entry.code, code)) {
        entry.attempts += 1;
        const attemptsLeft = OTP_MAX_ATTEMPTS - entry.attempts;
        return attemptsLeft > 0
          ? { ok: false, reason: "mismatch", attemptsLeft }
          : { ok: false, reason: "locked" };
      }
      // A used code cannot be replayed; the send history stays for rate limiting.
      entry.code = null;
      return { ok: true };
    },
  };
}

export type OtpStore = ReturnType<typeof createOtpStore>;
