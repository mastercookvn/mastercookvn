"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { ORDER_STATUS } from "@/constants/statuses";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

import type { WorkspaceOrder } from "@/features/orders/lib/useOrders";

export function AcceptOrderDialog({
  order,
  open,
  onOpenChange,
}: {
  order: WorkspaceOrder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const showToast = useToast();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Nhận đơn ${order.code}`}
      confirmLabel="Nhận đơn"
      onConfirm={() => {
        updateDemoState({
          orderStatuses: {
            ...readDemoState().orderStatuses,
            [order.code]: ORDER_STATUS.Accepted,
          },
        });
        showToast("Đã nhận đơn, giữ chỗ 24 giờ chờ ký và cọc");
      }}
    >
      <p className="text-soft">
        Hệ thống kiểm tra lại tài nguyên và giữ tạm toàn bộ{" "}
        {order.mealDetails.length} bữa trong 24 giờ. Không nhận một phần đơn.
      </p>
    </Dialog>
  );
}
