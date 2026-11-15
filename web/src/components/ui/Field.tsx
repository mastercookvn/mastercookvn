import type { ReactNode } from "react";

export type FieldProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
};

export const fieldMessageId = (id: string) => `${id}-message`;

export function Field({ id, label, hint, error, children }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <span id={fieldMessageId(id)} className="field-error">
          {error}
        </span>
      ) : null}
      {!error && hint ? (
        <span id={fieldMessageId(id)} className="field-hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
