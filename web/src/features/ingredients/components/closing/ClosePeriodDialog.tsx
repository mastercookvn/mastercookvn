"use client";

import { Dialog } from "@/components/ui/Dialog";
import { updateDemoState } from "@/lib/demoStore";

export function ClosePeriodDialog({
  month,
  open,
  onOpenChange,
}: {
  month: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Chốt kỳ ${month}`}
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
