import type { ReactNode } from "react";

export function PanelHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="l-between">
      <div className="l-stack gap-0.5">
        <h1 className="h1-compact">{title}</h1>
        {subtitle ? <p className="text-soft text-small">{subtitle}</p> : null}
      </div>
      <div className="l-row gap-2">{actions}</div>
    </div>
  );
}
