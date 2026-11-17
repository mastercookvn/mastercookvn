"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import { LIVE_VALIDATION_MODE } from "@/lib/validation";

import { login } from "@/features/auth/actions";
import { loginSchema } from "@/features/auth/schemas";

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
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { phone: params.get("phone") ?? "", password: "" },
  });
  const values = useWatch({ control });

  if (mode === LOGIN_MODE.ForgotPassword) {
    return (
      <ForgotPasswordForm
        initialPhone={values.phone ?? ""}
        onBack={() => setMode(LOGIN_MODE.SignIn)}
      />
    );
  }

  return (
    <form
      action={action}
      className="contents"
      noValidate
      onSubmit={(event) => {
        if (loginSchema.safeParse(getValues()).success) return;
        event.preventDefault();
        void trigger();
      }}
    >
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {next ? (
        <Alert tone="info">
          Đăng nhập để tiếp tục, lựa chọn của bạn vẫn được giữ.
        </Alert>
      ) : null}
      <TextField
        id="login-phone"
        label="Số điện thoại"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="0903 123 456"
        {...register("phone")}
        value={values.phone}
        error={errors.phone?.message ?? state.fieldErrors?.phone}
        hint="Khách dùng số đã xác thực. Nhân viên dùng số do quản lý cấp."
      />
      <PasswordField
        id="login-password"
        label="Mật khẩu"
        autoComplete="current-password"
        {...register("password")}
        value={values.password}
        error={errors.password?.message ?? state.fieldErrors?.password}
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
