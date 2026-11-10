// Shared with the client form, so nothing here may touch node APIs.
export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 5 * 60_000;
export const OTP_RESEND_COOLDOWN_MS = 60_000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_MAX_SENDS = 5;
export const OTP_SEND_WINDOW_MS = 60 * 60_000;
