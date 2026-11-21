"use client";

import { Dialog } from "@/components/ui/Dialog";
import { formatMoney } from "@/lib/format";
import type { CancellationResult } from "@/lib/pricing";
import type { Meal } from "@/models/contracts";
import { updateDemoState } from "@/lib/demoStore";

export function ConfirmCancelDialog({
  meal,
  result,
  open,
  onOpenChange,
}: {
  meal: Meal;
  result: CancellationResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Xác nhận hủy bữa ${meal.date}`}
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
