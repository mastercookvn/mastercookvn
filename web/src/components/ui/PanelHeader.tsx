import type { ReactNode } from "react";

/**
 * First block of every workspace tab: what this section is, then its actions.
 * Put secondary actions (export, print) first and the AddButton last.
 */
export function PanelHeader({
  title,
  subtitle,
  count,
  actions,
}: {
  title: string;
  subtitle?: string;
  count?: number;
  actions?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="l-stack gap-0.5">
        <h2 className="section-title">
          {title}
          {count === undefined ? null : (
            <span className="section-count">{count}</span>
          )}
        </h2>
        {subtitle ? <p className="section-description">{subtitle}</p> : null}
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}
