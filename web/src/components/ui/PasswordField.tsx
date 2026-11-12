"use client";

import { useState, type ComponentProps } from "react";

import { EyeIcon, EyeOffIcon } from "@/components/icons";

import { Field } from "./Field";

export function PasswordField({
  id,
  label,
  hint,
  error,
  ...props
}: Omit<ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <span className="password-input">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="input"
          {...props}
        />
        <button
          type="button"
          className="password-toggle"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </span>
    </Field>
  );
}
