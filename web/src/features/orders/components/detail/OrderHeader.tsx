"use client";

import { PageHeader } from "@/components/layout/workspace/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CUSTOMER } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export function OrderHeader() {
  const status = useDemoState((state) => state.orderStatus);

  return (
    <PageHeader
      screen="orderDetail"
      title="Đơn DH-0142"
      meta={
        <>
          <StatusBadge domain="order" status={status} />
          <span>
            {CUSTOMER.name} · {CUSTOMER.phone} · Kênh online · Tạo 04/11/2026
          </span>
        </>
      }
    />
  );
}
