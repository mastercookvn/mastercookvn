"use client";

import { useActionState, useState, type ChangeEvent } from "react";

import { Alert } from "@/components/ui/Alert";
import { TextField } from "@/components/ui/TextField";

import { register, type RegisterState } from "@/features/auth/actions";

import { OtpStep } from "./OtpStep";
import { SubmitButton } from "./SubmitButton";

const INITIAL: RegisterState = { step: "details" };

export function RegisterForm() {
  const [state, action] = useActionState(register, INITIAL);
  // Controlled so the values survive React's form reset between the two steps.
  const [values, setValues] = useState({
    name: "Trần Thị Mai",
    phone: "0903 123 456",
    password: "matkhaumau",
  });
  // "Đổi số" goes back to the details for this response only; the next send shows the code step again.
  const [editedFrom, setEditedFrom] = useState<RegisterState | null>(null);
  const showOtp = state.step === "otp" && editedFrom !== state;

  const bind = (field: keyof typeof values) => ({
    name: field,
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value })),
  });

  return (
    <form action={action} className="contents">
      <div hidden={showOtp} className="contents">
        <TextField id="register-name" label="Họ tên" {...bind("name")} />
        <TextField
          id="register-phone"
          label="Số điện thoại"
          type="tel"
          autoComplete="tel"
          hint="Chúng tôi gửi mã xác nhận qua SMS để chắc chắn số này là của bạn."
          {...bind("phone")}
        />
        <TextField
          id="register-password"
          label="Mật khẩu"
          type="password"
          autoComplete="new-password"
          {...bind("password")}
        />
      </div>
      {showOtp ? (
        <OtpStep state={state} onEditPhone={() => setEditedFrom(state)} />
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
