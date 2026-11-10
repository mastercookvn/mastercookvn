"use client";

import { Field, type FieldProps } from "./Field";
import { Select, type SelectProps } from "./Select";

export function SelectField({
  id,
  label,
  hint,
  error,
  ...props
}: Omit<FieldProps, "children"> & SelectProps & { id: string }) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <Select id={id} {...props} />
    </Field>
  );
}
