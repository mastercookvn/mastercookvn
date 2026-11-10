import type { ComponentProps } from "react";

import { Field, type FieldProps } from "./Field";
import { Select } from "./Select";

type SelectFieldProps = Omit<FieldProps, "children"> &
  ComponentProps<"select"> & {
    options: (string | { value: string; label: string })[];
  };

export function SelectField({
  id,
  label,
  hint,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} hint={hint}>
      <Select id={id} {...props}>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const text = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </Select>
    </Field>
  );
}
