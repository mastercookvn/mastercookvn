"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { env } from "@/lib/env";
import { encodeFlash, FLASH_COOKIE, type FlashKey } from "@/lib/flash";
import { encodeSession, SESSION_COOKIE, type Session } from "@/lib/session";
import { CUSTOMER } from "@/mocks/contracts";
import { STAFF_ACCOUNTS } from "@/mocks/people";

import { createOtpStore, type OtpStore, type VerifyResult } from "./otp";
import { loginSchema, otpSchema, registerSchema } from "./schemas";

export type AuthFormState = { error?: string };

const INVALID_CREDENTIALS = "Số điện thoại hoặc mật khẩu không đúng.";

const normalizePhone = (phone: string) => phone.replaceAll(" ", "");

async function writeSession(session: Session) {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

async function writeFlash(key: FlashKey, name?: string) {
  const store = await cookies();
  // Read and cleared by the toast on the next page, so not httpOnly.
  store.set(FLASH_COOKIE, encodeFlash({ key, name }), {
    sameSite: "lax",
    path: "/",
    maxAge: 60,
  });
}

function safeNext(value: FormDataEntryValue | null) {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
    ? value
    : null;
}

function landingPage(session: Session, next: string | null) {
  const nextIsWorkspace = next?.startsWith(ROUTES.workspace) ?? false;
  if (session.kind === "staff") {
    return nextIsWorkspace ? (next as string) : ROUTES.workspace;
  }
  return next && !nextIsWorkspace ? next : ROUTES.account;
}

function sessionForPhone(phone: string): Session | null {
  const normalized = normalizePhone(phone);
  const staff = STAFF_ACCOUNTS.find(
    (account) => normalizePhone(account.phone) === normalized,
  );
  if (staff && !staff.active) return null;
  return staff
    ? { kind: "staff", name: staff.name, roles: staff.roles }
    : { kind: "customer", name: CUSTOMER.name, phone };
}

// Placeholder for POST /auth/login: any password passes, the phone picks the account.
export async function login(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    phone: formData.get("phone"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: INVALID_CREDENTIALS };

  const session = sessionForPhone(parsed.data.phone);
  if (!session) return { error: INVALID_CREDENTIALS };

  await writeSession(session);
  await writeFlash("login", session.name);
  redirect(landingPage(session, safeNext(formData.get("next"))));
}

export async function signInWithSampleAccount(formData: FormData) {
  const session = sessionForPhone(String(formData.get("phone")));
  if (!session) return;

  await writeSession(session);
  await writeFlash("login", session.name);
  redirect(landingPage(session, safeNext(formData.get("next"))));
}

export type RegisterState =
  | { step: "details"; error?: string }
  | {
      step: "otp";
      phone: string;
      expiresAt: number;
      resendAt: number;
      error?: string;
      notice?: string;
      /** Only in demo mode, where no SMS is actually sent. */
      demoCode?: string;
    };

// Placeholder for the backend OTP service (V11). Kept on globalThis so dev
// reloads do not drop codes; a single server process only.
const globalOtp = globalThis as { __registerOtp?: OtpStore };
const otpStore = (globalOtp.__registerOtp ??= createOtpStore());

const DEMO_MODE = env.NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS === "true";

// Placeholder for the SMS gateway call made by POST /auth/register/otp.
async function sendOtpSms(phone: string, code: string) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[otp] ${phone}: ${code}`);
  }
}

const minutesUntil = (time: number) =>
  Math.max(1, Math.ceil((time - Date.now()) / 60_000));

function verifyError(result: Exclude<VerifyResult, { ok: true }>) {
  switch (result.reason) {
    case "mismatch":
      return `Mã không đúng. Bạn còn ${result.attemptsLeft} lần thử.`;
    case "expired":
      return "Mã đã hết hạn. Hãy gửi lại mã mới.";
    case "locked":
      return "Nhập sai quá nhiều lần. Hãy gửi lại mã mới.";
    case "missing":
      return "Mã không còn hiệu lực. Hãy gửi lại mã mới.";
  }
}

export async function register(
  previous: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { step: "details", error: parsed.error.issues[0]?.message };
  }
  const { name, phone } = parsed.data;
  const sameOtpStep =
    previous.step === "otp" && previous.phone === phone ? previous : null;

  if (formData.get("intent") === "verify" && sameOtpStep) {
    const otpStep: RegisterState = {
      step: "otp",
      phone,
      expiresAt: sameOtpStep.expiresAt,
      resendAt: sameOtpStep.resendAt,
      demoCode: sameOtpStep.demoCode,
    };
    const code = otpSchema.safeParse(formData.get("otp"));
    if (!code.success) {
      return { ...otpStep, error: code.error.issues[0]?.message };
    }
    const result = otpStore.verify(phone, code.data);
    if (!result.ok) return { ...otpStep, error: verifyError(result) };

    // Placeholder for POST /auth/register, which re-checks the verified phone.
    await writeSession({ kind: "customer", name, phone });
    await writeFlash("register", name);
    redirect(ROUTES.account);
  }

  const issued = otpStore.issue(phone);
  if (!issued.ok) {
    const error =
      issued.reason === "cooldown"
        ? "Mã vừa được gửi. Vui lòng chờ trước khi gửi lại."
        : `Đã gửi quá nhiều mã cho số này. Thử lại sau ${minutesUntil(issued.retryAt)} phút.`;
    return issued.reason === "cooldown" && issued.expiresAt > Date.now()
      ? {
          step: "otp",
          phone,
          expiresAt: issued.expiresAt,
          resendAt: issued.retryAt,
          demoCode: sameOtpStep?.demoCode,
          error,
        }
      : { step: "details", error };
  }

  await sendOtpSms(phone, issued.code);
  return {
    step: "otp",
    phone,
    expiresAt: issued.expiresAt,
    resendAt: issued.resendAt,
    demoCode: DEMO_MODE ? issued.code : undefined,
    notice: sameOtpStep ? "Đã gửi mã mới." : undefined,
  };
}

export async function logout(redirectTo: string) {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  await writeFlash("logout");
  redirect(redirectTo);
}
