import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Field, type FieldProps } from "./Field";

export function TextField({
  id,
  label,
  hint,
  error,
  className,
  type = "text",
  ...props
}: Omit<FieldProps, "children"> & ComponentProps<"input">) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        type={type}
        className={cn("input", error ? "has-error" : null, className)}
        {...props}
      />
    </Field>
  );
}
