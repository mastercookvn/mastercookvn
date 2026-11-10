"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

import type { RegisterState } from "@/features/auth/actions";
import { OTP_LENGTH } from "@/features/auth/otp-config";
import { maskPhone } from "@/features/auth/schemas";

import { SubmitButton } from "./SubmitButton";

type OtpState = Extract<RegisterState, { step: "otp" }>;

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const secondsLeft = (target: number, now: number) =>
  Math.max(0, Math.ceil((target - now) / 1000));

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function ResendButton({ wait }: { wait: number }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="text"
      size="sm"
      name="intent"
      value="resend"
      formNoValidate
      disabled={pending || wait > 0}
    >
      {wait > 0 ? `Gửi lại mã sau ${wait}s` : "Gửi lại mã"}
    </Button>
  );
}

export function OtpStep({
  state,
  onEditPhone,
}: {
  state: OtpState;
  onEditPhone: () => void;
}) {
  const now = useNow();
  const expiresIn = secondsLeft(state.expiresAt, now);

  return (
    <>
      <p className="text-small">
        Mã xác nhận {OTP_LENGTH} chữ số đã được gửi qua SMS tới{" "}
        <strong>{maskPhone(state.phone)}</strong>.{" "}
        <Button variant="text" size="sm" onClick={onEditPhone}>
          Đổi số
        </Button>
      </p>
      {state.demoCode ? (
        <Alert tone="info">
          Bản demo không gửi SMS. Mã của bạn: <strong>{state.demoCode}</strong>
        </Alert>
      ) : null}
      <TextField
        // Remount on every server response so a wrong code is cleared.
        key={`${state.expiresAt}-${state.error ?? ""}`}
        id="register-otp"
        name="otp"
        label="Mã xác nhận"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`\\d{${OTP_LENGTH}}`}
        maxLength={OTP_LENGTH}
        required
        autoFocus
        className="tracking-[0.4em]"
        hint={
          expiresIn > 0
            ? `Mã hết hạn sau ${clock(expiresIn)}.`
            : "Mã đã hết hạn. Hãy gửi lại mã mới."
        }
      />
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      {!state.error && state.notice ? (
        <Alert tone="good">{state.notice}</Alert>
      ) : null}
      <SubmitButton name="intent" value="verify">
        Xác nhận và tạo tài khoản
      </SubmitButton>
      <ResendButton wait={secondsLeft(state.resendAt, now)} />
    </>
  );
}
