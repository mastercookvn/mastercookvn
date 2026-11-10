"use client";

import { Dialog } from "@/components/ui/Dialog";
import { TextareaField } from "@/components/ui/TextareaField";
import { ORDER_STATUS } from "@/constants/statuses";
import { updateDemoState } from "@/mocks/demoStore";

export function RejectOrderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Từ chối đơn DH-0142"
      confirmLabel="Từ chối đơn"
      confirmVariant="danger"
      onConfirm={() => updateDemoState({ orderStatus: ORDER_STATUS.Rejected })}
    >
      <TextareaField
        id="reject-reason"
        label="Lý do từ chối (bắt buộc)"
        defaultValue="Trùng lịch tài nguyên ngày 14/12."
      />
    </Dialog>
  );
}
