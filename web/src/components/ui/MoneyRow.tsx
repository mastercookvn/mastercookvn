import type { ReactNode } from "react";

export function MoneyRow({
  label,
  value,
  total = false,
}: {
  label: ReactNode;
  value: ReactNode;
  total?: boolean;
}) {
  return (
    <div className={total ? "money-row is-total" : "money-row"}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
