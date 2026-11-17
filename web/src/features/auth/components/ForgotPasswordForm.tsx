"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import { LIVE_VALIDATION_MODE } from "@/lib/validation";

import {
  resetPassword,
  type ResetPasswordState,
} from "@/features/auth/actions";
import { PASSWORD_MIN_LENGTH, resetPhoneSchema } from "@/features/auth/schemas";

import { AuthSteps } from "./AuthSteps";
import { OtpStep } from "./OtpStep";
import { SubmitButton } from "./SubmitButton";

const INITIAL: ResetPasswordState = { step: "details" };

const STEPS = [
  { title: "Số điện thoại", hint: "Số bạn dùng để đăng nhập" },
  { title: "Mã SMS và mật khẩu mới", hint: "Xác thực rồi đặt lại" },
  { title: "Đăng nhập lại", hint: "Dùng mật khẩu mới" },
] as const;

export function ForgotPasswordForm({
  initialPhone,
  onBack,
}: {
  initialPhone: string;
  onBack: () => void;
}) {
  const [state, action] = useActionState(resetPassword, INITIAL);
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPhoneSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { phone: initialPhone },
  });
  const phone = useWatch({ control, name: "phone" });
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });
  const [editedFrom, setEditedFrom] = useState<ResetPasswordState | null>(null);
  const showOtp = state.step === "otp" && editedFrom !== state;

  return (
    <form
      action={action}
      className="contents"
      noValidate
      onSubmit={(event) => {
        if (showOtp || resetPhoneSchema.safeParse(getValues()).success) return;
        event.preventDefault();
        void trigger();
      }}
    >
      <div className="l-stack gap-1">
        <h2 className="auth-title">Đặt lại mật khẩu</h2>
        <p className="text-small text-soft">
          Nếu số đã có tài khoản, chúng tôi gửi mã xác nhận qua SMS.
        </p>
      </div>
      <AuthSteps
        label="Các bước đặt lại mật khẩu"
        steps={STEPS}
        current={showOtp ? 1 : 0}
      />
      <div hidden={showOtp} className="contents">
        <TextField
          id="reset-phone"
          label="Số điện thoại"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          value={phone}
          error={
            errors.phone?.message ??
            (state.step === "details" ? state.fieldErrors?.phone : undefined)
          }
        />
      </div>
      {showOtp ? (
        <OtpStep
          idPrefix="reset"
          state={state}
          submitLabel="Đặt mật khẩu mới"
          onEditPhone={() => setEditedFrom(state)}
        >
          <PasswordField
            id="reset-password"
            name="password"
            label="Mật khẩu mới"
            autoComplete="new-password"
            hint={`Ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`}
            error={state.fieldErrors?.password}
            value={passwords.password}
            onChange={(event) =>
              setPasswords({ ...passwords, password: event.target.value })
            }
          />
          <PasswordField
            id="reset-confirm"
            name="confirmPassword"
            label="Nhập lại mật khẩu mới"
            autoComplete="new-password"
            error={state.fieldErrors?.confirmPassword}
            value={passwords.confirm}
            onChange={(event) =>
              setPasswords({ ...passwords, confirm: event.target.value })
            }
          />
        </OtpStep>
      ) : (
        <>
          {state.step === "details" && state.error ? (
            <Alert tone="error">{state.error}</Alert>
          ) : null}
          <SubmitButton name="intent" value="send">
            Gửi mã xác nhận
          </SubmitButton>
        </>
      )}
      <Button variant="text" size="sm" onClick={onBack}>
        Quay lại đăng nhập
      </Button>
    </form>
  );
}
