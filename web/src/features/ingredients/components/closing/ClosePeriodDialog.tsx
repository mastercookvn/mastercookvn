"use client";

import { Dialog } from "@/components/ui/Dialog";
import { updateDemoState } from "@/mocks/demoStore";
import { INVENTORY_PERIOD as period } from "@/mocks/inventory";

export function ClosePeriodDialog({
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
      title={`Chốt kỳ ${period.month}`}
      confirmLabel="Chốt kỳ"
      onConfirm={() => updateDemoState({ periodClosed: true })}
    >
      <p className="text-soft">
        Khóa phiếu nhập và kiểm kê của tháng. Sửa sau chốt phải mở lại kỳ và
        chốt lại các kỳ sau.
      </p>
    </Dialog>
  );
}
