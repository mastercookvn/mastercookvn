"use client";

import { Dialog } from "@/components/ui/Dialog";
import { formatMoney } from "@/lib/format";
import { CANCELLATION_HOUSEWARMING as result } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

export function ConfirmCancelDialog({
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
      title="Xác nhận hủy bữa 22/11/2026"
      confirmLabel="Hủy bữa"
      confirmVariant="danger"
      onConfirm={() => updateDemoState({ mealCancelled: true })}
    >
      <p className="text-soft">
        Bạn sẽ được hoàn {formatMoney(result.refund)}. Cơ sở giữ lại{" "}
        {formatMoney(result.retained)}.
      </p>
    </Dialog>
  );
}
