import type { ReactNode } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/format";
import type { ContractStatus } from "@/constants/statuses";

export function OrderCard({
  orderCode,
  contractNumber,
  status,
  summary,
  total,
  accent,
  actions,
}: {
  orderCode: string;
  contractNumber: string;
  status: ContractStatus;
  summary: string;
  total: number;
  accent: string;
  actions: ReactNode;
}) {
  return (
    <article className="order-card">
      <i style={{ background: accent }} />
      <div>
        <div className="l-between">
          <div className="l-row">
            <span className="text-code text-15">{orderCode}</span>
            <span className="text-soft text-small">{contractNumber}</span>
          </div>
          <StatusBadge domain="contract" status={status} />
        </div>
        <p className="text-soft text-small">{summary}</p>
        <div className="l-between">
          <span className="price text-16">{formatMoney(total)}</span>
          <div className="l-row gap-2">{actions}</div>
        </div>
      </div>
    </article>
  );
}
