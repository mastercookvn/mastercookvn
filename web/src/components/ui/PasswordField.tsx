"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";

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
          {visible ? (
            <EyeOff size={17} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Eye size={17} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </span>
    </Field>
  );
}
