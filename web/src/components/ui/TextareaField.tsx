import type { ComponentProps } from "react";

import { Field, fieldMessageId, type FieldProps } from "./Field";

export function TextareaField({
  id,
  label,
  hint,
  error,
  ...props
}: Omit<FieldProps, "children"> & ComponentProps<"textarea">) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        className={error ? "input has-error" : "input"}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? fieldMessageId(id) : undefined}
        {...props}
      />
    </Field>
  );
}
