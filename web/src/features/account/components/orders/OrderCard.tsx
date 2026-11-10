import type { ReactNode } from "react";

import { formatMoney } from "@/lib/format";

import type { CustomerOrder } from "@/features/account/lib/useCustomerOrders";

export function OrderCard({
  order,
  actions = order.actions,
}: {
  order: CustomerOrder;
  actions?: ReactNode;
}) {
  return (
    <article className="order-card">
      <i style={{ background: order.accent }} />
      <div>
        <div className="l-between">
          <div className="l-row">
            <span className="text-code text-15">{order.orderCode}</span>
            <span className="text-soft text-small">
              {order.contractNumber ?? "Chưa có hợp đồng"}
            </span>
          </div>
          {order.badge}
        </div>
        <p className="order-card-title">{order.mealNames.join(" · ")}</p>
        <p className="text-soft text-small">
          {order.mealNames.length} bữa · {order.dates.join(", ")} ·{" "}
          {order.eventType}
          {order.note ? ` · ${order.note}` : null}
        </p>
        <div className="l-between">
          <span className="price text-16">{formatMoney(order.total)}</span>
          <div className="l-row gap-2">{actions}</div>
        </div>
      </div>
    </article>
  );
}
