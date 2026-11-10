import type { ReactNode } from "react";

export function KpiBar({
  items,
}: {
  items: { label: string; value: ReactNode; compact?: boolean }[];
}) {
  return (
    <div className="kpi-bar">
      {items.map(({ label, value, compact }) => (
        <div key={label}>
          <span>{label}</span>
          <b className={compact ? "text-14-5" : undefined}>{value}</b>
        </div>
      ))}
    </div>
  );
}
