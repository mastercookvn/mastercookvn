"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { CUSTOMER } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export function OrderHeader() {
  const status = useDemoState((state) => state.orderStatus);

  return (
    <div className="l-between">
      <div className="l-stack gap-0.5">
        <h1 className="h1-compact">Đơn DH-0142</h1>
        <p className="text-soft text-small">
          {CUSTOMER.name} · {CUSTOMER.phone} · Kênh online · Tạo 04/11/2026
        </p>
      </div>
      <StatusBadge domain="order" status={status} />
    </div>
  );
}
