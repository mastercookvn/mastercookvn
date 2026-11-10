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
import {
  firstFieldErrors,
  loginSchema,
  newPasswordPairSchema,
  otpSchema,
  registerSchema,
  resetPhoneSchema,
  type FieldErrors,
} from "./schemas";

export type AuthFormState = { error?: string; fieldErrors?: FieldErrors };

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
    (account) => normalizePhone(account.phone) === normalized
  );
  if (staff && !staff.active) return null;
  return staff
    ? { kind: "staff", name: staff.name, roles: staff.roles }
    : { kind: "customer", name: CUSTOMER.name, phone };
}

// Placeholder for POST /auth/login: any password passes, the phone picks the account.
export async function login(
  _previous: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    phone: formData.get("phone"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: firstFieldErrors(parsed.error) };
  }

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

export type OtpFlowState =
  | { step: "details"; error?: string; fieldErrors?: FieldErrors }
  | {
      step: "otp";
      phone: string;
      expiresAt: number;
      resendAt: number;
      error?: string;
      fieldErrors?: FieldErrors;
      notice?: string;
      /** Only in demo mode, where no SMS is actually sent. */
      demoCode?: string;
    };

export type RegisterState = OtpFlowState;
export type ResetPasswordState = OtpFlowState;

const OTP_PURPOSE = {
  Register: "register",
  ResetPassword: "reset-password",
} as const;

type OtpPurpose = (typeof OTP_PURPOSE)[keyof typeof OTP_PURPOSE];

// Placeholder for the backend OTP service (V11). Kept on globalThis so dev
// reloads do not drop codes; a single server process only.
const globalOtp = globalThis as { __registerOtp?: OtpStore };
const otpStore = (globalOtp.__registerOtp ??= createOtpStore());

const DEMO_MODE = env.NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS === "true";

// Placeholder for the SMS gateway call made by POST /auth/otp.
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

const otpKey = (purpose: OtpPurpose, phone: string) => `${purpose}:${phone}`;

const otpStepFor = (previous: OtpFlowState, phone: string) =>
  previous.step === "otp" && previous.phone === phone ? previous : null;

async function sendCode(
  purpose: OtpPurpose,
  phone: string,
  previous: OtpFlowState
): Promise<OtpFlowState> {
  const sameOtpStep = otpStepFor(previous, phone);
  const issued = otpStore.issue(otpKey(purpose, phone));
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

/** Null when the code is right; otherwise the OTP step to show again. */
function checkCode(
  purpose: OtpPurpose,
  otpStep: Extract<OtpFlowState, { step: "otp" }>,
  formData: FormData
): OtpFlowState | null {
  const retry: OtpFlowState = {
    step: "otp",
    phone: otpStep.phone,
    expiresAt: otpStep.expiresAt,
    resendAt: otpStep.resendAt,
    demoCode: otpStep.demoCode,
  };
  const code = otpSchema.safeParse(formData.get("otp"));
  if (!code.success) {
    return { ...retry, fieldErrors: { otp: code.error.issues[0]?.message } };
  }
  const result = otpStore.verify(otpKey(purpose, otpStep.phone), code.data);
  return result.ok ? null : { ...retry, error: verifyError(result) };
}

export async function register(
  previous: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { step: "details", fieldErrors: firstFieldErrors(parsed.error) };
  }
  const { name, phone } = parsed.data;
  const sameOtpStep = otpStepFor(previous, phone);

  if (formData.get("intent") === "verify" && sameOtpStep) {
    const retry = checkCode(OTP_PURPOSE.Register, sameOtpStep, formData);
    if (retry) return retry;

    // Placeholder for POST /auth/register, which re-checks the verified phone.
    await writeSession({ kind: "customer", name, phone });
    await writeFlash("register", name);
    redirect(ROUTES.account);
  }

  return sendCode(OTP_PURPOSE.Register, phone, previous);
}

// Placeholder for POST /auth/password-reset. The answer is the same whether
// or not the phone has an account, so the form cannot be used to probe numbers.
export async function resetPassword(
  previous: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const parsed = resetPhoneSchema.safeParse({ phone: formData.get("phone") });
  if (!parsed.success) {
    return { step: "details", fieldErrors: firstFieldErrors(parsed.error) };
  }
  const { phone } = parsed.data;
  const sameOtpStep = otpStepFor(previous, phone);

  if (formData.get("intent") === "verify" && sameOtpStep) {
    const passwords = newPasswordPairSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!passwords.success) {
      return {
        ...sameOtpStep,
        error: undefined,
        notice: undefined,
        fieldErrors: firstFieldErrors(passwords.error),
      };
    }
    const retry = checkCode(OTP_PURPOSE.ResetPassword, sameOtpStep, formData);
    if (retry) return retry;

    await writeFlash("passwordReset");
    redirect(`${ROUTES.login}?phone=${phone}`);
  }

  return sendCode(OTP_PURPOSE.ResetPassword, phone, previous);
}

export async function logout(redirectTo: string) {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  await writeFlash("logout");
  redirect(redirectTo);
}
