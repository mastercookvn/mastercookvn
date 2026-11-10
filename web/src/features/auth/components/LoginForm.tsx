"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";

import { Alert } from "@/components/ui/Alert";
import { TextField } from "@/components/ui/TextField";

import { login } from "@/features/auth/actions";

import { SubmitButton } from "./SubmitButton";

function NextField() {
  const next = useSearchParams().get("next");
  return next ? <input type="hidden" name="next" value={next} /> : null;
}

export function LoginForm() {
  const [state, action] = useActionState(login, {});

  return (
    <form action={action} className="contents">
      <Suspense fallback={null}>
        <NextField />
      </Suspense>
      <TextField
        id="login-phone"
        name="phone"
        label="Số điện thoại"
        type="tel"
        defaultValue="0903 123 456"
      />
      <TextField
        id="login-password"
        name="password"
        label="Mật khẩu"
        type="password"
        defaultValue="matkhaumau"
      />
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      <SubmitButton>Đăng nhập</SubmitButton>
      <p className="text-small text-soft">
        Quên mật khẩu? Gọi nhân viên để được đặt lại.
      </p>
    </form>
  );
}
