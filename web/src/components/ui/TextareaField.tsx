import type { ComponentProps } from "react";

import { Field, type FieldProps } from "./Field";

export function TextareaField({
  id,
  label,
  hint,
  ...props
}: Omit<FieldProps, "children"> & ComponentProps<"textarea">) {
  return (
    <Field id={id} label={label} hint={hint}>
      <textarea id={id} className="input" {...props} />
    </Field>
  );
}
