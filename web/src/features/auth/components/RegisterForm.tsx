"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Alert } from "@/components/ui/Alert";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import { LIVE_VALIDATION_MODE } from "@/lib/validation";

import { register, type RegisterState } from "@/features/auth/actions";
import { PASSWORD_MIN_LENGTH, registerSchema } from "@/features/auth/schemas";

import { AuthSteps } from "./AuthSteps";
import { OtpStep } from "./OtpStep";
import { SubmitButton } from "./SubmitButton";

type RegisterField = "name" | "phone" | "password" | "confirmPassword";

const INITIAL: RegisterState = { step: "details" };

const STEPS = [
  { title: "Thông tin", hint: "Họ tên, SĐT, mật khẩu" },
  { title: "Xác thực SĐT", hint: "Nhập mã SMS gửi tới số của bạn" },
  { title: "Hoàn tất", hint: "Thấy ngay đơn đặt bằng SĐT này" },
] as const;

export function RegisterForm() {
  const [state, action] = useActionState(register, INITIAL);
  const {
    register: field,
    control,
    trigger,
    getValues,
    formState: { errors: liveErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { name: "", phone: "", password: "", confirmPassword: "" },
  });
  // "Đổi số" goes back to the details for this response only; the next send shows the code step again.
  const [editedFrom, setEditedFrom] = useState<RegisterState | null>(null);
  const showOtp = state.step === "otp" && editedFrom !== state;
  const serverErrors = state.step === "details" ? state.fieldErrors : undefined;

  const values = useWatch({ control });

  // Controlled so the values survive React's form reset between the two steps.
  const bind = (name: RegisterField) => ({
    ...field(name),
    value: values[name] ?? "",
    error: liveErrors[name]?.message ?? serverErrors?.[name],
  });

  return (
    <form
      action={action}
      className="contents"
      noValidate
      onSubmit={(event) => {
        if (showOtp || registerSchema.safeParse(getValues()).success) return;
        event.preventDefault();
        void trigger();
      }}
    >
      <AuthSteps
        label="Các bước tạo tài khoản"
        steps={STEPS}
        current={showOtp ? 1 : 0}
      />
      <div hidden={showOtp} className="contents">
        <TextField
          id="register-name"
          label="Họ tên"
          autoComplete="name"
          placeholder="Nguyễn Thị Mai"
          {...bind("name")}
        />
        <TextField
          id="register-phone"
          label="Số điện thoại"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0903 123 456"
          hint="Số này là tên đăng nhập. Chúng tôi gửi mã SMS để chắc chắn số là của bạn."
          {...bind("phone")}
        />
        <PasswordField
          id="register-password"
          label="Mật khẩu"
          autoComplete="new-password"
          hint={`Ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`}
          {...bind("password")}
        />
        <PasswordField
          id="register-confirm"
          label="Nhập lại mật khẩu"
          autoComplete="new-password"
          {...bind("confirmPassword")}
        />
      </div>
      {showOtp ? (
        <OtpStep
          idPrefix="register"
          state={state}
          submitLabel="Xác nhận và tạo tài khoản"
          onEditPhone={() => setEditedFrom(state)}
        />
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
    </form>
  );
}
