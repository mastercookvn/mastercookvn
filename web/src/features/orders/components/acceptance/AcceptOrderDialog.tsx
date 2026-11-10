"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { ORDER_STATUS } from "@/constants/statuses";
import { updateDemoState } from "@/mocks/demoStore";

export function AcceptOrderDialog({
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
      title="Nhận đơn DH-0142"
      confirmLabel="Nhận đơn"
      onConfirm={() => {
        updateDemoState({ orderStatus: ORDER_STATUS.Accepted });
        showToast("Đã nhận đơn, giữ chỗ đến 06/11/2026 08:30");
      }}
    >
      <p className="text-soft">
        Hệ thống kiểm tra lại tài nguyên và giữ tạm toàn bộ 2 bữa trong 24 giờ.
        Không nhận một phần đơn.
      </p>
    </Dialog>
  );
}
