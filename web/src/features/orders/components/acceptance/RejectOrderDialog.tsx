"use client";

import { useState } from "react";

import { Dialog } from "@/components/ui/Dialog";
import { TextareaField } from "@/components/ui/TextareaField";
import { ORDER_STATUS } from "@/constants/statuses";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

import type { WorkspaceOrder } from "@/features/orders/lib/useOrders";

export function RejectOrderDialog({
  order,
  open,
  onOpenChange,
}: {
  order: WorkspaceOrder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Từ chối đơn ${order.code}`}
      confirmLabel="Từ chối đơn"
      confirmVariant="danger"
      confirmDisabled={reason.trim() === ""}
      onConfirm={() =>
        updateDemoState({
          orderStatuses: {
            ...readDemoState().orderStatuses,
            [order.code]: ORDER_STATUS.Rejected,
          },
        })
      }
    >
      <TextareaField
        id="reject-reason"
        label="Lý do từ chối (bắt buộc)"
        placeholder="Ví dụ: trùng lịch tài nguyên ngày 14/12."
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
    </Dialog>
  );
}
