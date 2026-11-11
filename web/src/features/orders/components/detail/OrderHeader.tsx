"use client";

import { PageHeader } from "@/components/layout/workspace/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { useDemoLoaded } from "@/mocks/demoStore";

import { useWorkspaceOrder } from "@/features/orders/lib/useOrders";

export function OrderHeader({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  const loaded = useDemoLoaded();

  if (!order) {
    return (
      <PageHeader
        screen="orderDetail"
        title={loaded ? `Không tìm thấy đơn ${code}` : `Đơn ${code}`}
      />
    );
  }

  return (
    <PageHeader
      screen="orderDetail"
      title={`Đơn ${order.code}`}
      meta={
        <>
          <StatusBadge domain="order" status={order.status} />
          <span>
            {[
              order.customer,
              order.phone,
              `Kênh ${order.channel.toLowerCase()}`,
              order.createdAt ? `Tạo ${order.createdAt}` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </>
      }
    />
  );
}
