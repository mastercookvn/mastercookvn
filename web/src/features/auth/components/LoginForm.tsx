"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";

import { login } from "@/features/auth/actions";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { SubmitButton } from "./SubmitButton";

const LOGIN_MODE = {
  SignIn: "sign-in",
  ForgotPassword: "forgot-password",
} as const;

type LoginMode = (typeof LOGIN_MODE)[keyof typeof LOGIN_MODE];

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next");
  const [state, action] = useActionState(login, {});
  const [mode, setMode] = useState<LoginMode>(LOGIN_MODE.SignIn);
  const [phone, setPhone] = useState(params.get("phone") ?? "");

  if (mode === LOGIN_MODE.ForgotPassword) {
    return (
      <ForgotPasswordForm
        initialPhone={phone}
        onBack={() => setMode(LOGIN_MODE.SignIn)}
      />
    );
  }

  return (
    <form action={action} className="contents" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {next ? (
        <Alert tone="info">
          Đăng nhập để tiếp tục, lựa chọn của bạn vẫn được giữ.
        </Alert>
      ) : null}
      <TextField
        id="login-phone"
        name="phone"
        label="Số điện thoại"
        type="tel"
        autoComplete="tel"
        placeholder="0903 123 456"
        value={phone}
        error={state.fieldErrors?.phone}
        hint="Khách dùng số đã xác thực. Nhân viên dùng số do quản lý cấp."
        onChange={(event) => setPhone(event.target.value)}
      />
      <PasswordField
        id="login-password"
        name="password"
        label="Mật khẩu"
        autoComplete="current-password"
        error={state.fieldErrors?.password}
      />
      <div className="l-between">
        <span />
        <Button
          variant="text"
          size="sm"
          onClick={() => setMode(LOGIN_MODE.ForgotPassword)}
        >
          Quên mật khẩu?
        </Button>
      </div>
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      <SubmitButton>Đăng nhập</SubmitButton>
      <p className="text-small text-soft">
        Chưa có tài khoản?{" "}
        <a href="?tab=register" className="underline">
          Tạo tài khoản bằng số điện thoại
        </a>
      </p>
    </form>
  );
}
