"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { updateDemoState } from "@/mocks/demoStore";

export function ConfirmContractDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const showToast = useToast();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xác nhận hợp đồng"
      confirmLabel="Tôi đồng ý"
      onConfirm={() => {
        updateDemoState({ contractConfirmed: true });
        showToast("Đã ghi nhận xác nhận hợp đồng");
      }}
    >
      <p className="text-soft">
        Bạn đồng ý với nội dung và giá đã chốt của phiên bản 1. Hệ thống lưu tài
        khoản, thời điểm và phiên bản bạn xác nhận.
      </p>
    </Dialog>
  );
}
