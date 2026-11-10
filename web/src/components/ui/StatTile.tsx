import type { ReactNode } from "react";

export function StatTile({
  value,
  label,
}: {
  value: ReactNode;
  label: string;
}) {
  return (
    <div className="stat-tile">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}
