"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { TextareaField } from "@/components/ui/TextareaField";
import { formatMoney } from "@/lib/format";
import { daysUntil, MEAL_HOUSEWARMING as meal } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import { CancelledState } from "./CancelledState";
import { ConfirmCancelDialog } from "./ConfirmCancelDialog";
import { RefundPreview } from "./RefundPreview";

export function CancelMealPanel() {
  const cancelled = useDemoState((state) => state.mealCancelled);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (cancelled) return <CancelledState />;

  return (
    <div className="l-grid l-grid-2">
      <section className="card l-stack">
        <label className="l-row flex-nowrap items-start">
          <input
            type="checkbox"
            className="checkbox mt-1"
            checked
            disabled
            readOnly
          />
          <span>
            <b>{meal.name}</b>
            <br />
            <span className="text-small text-soft">
              {meal.date}, {meal.time} · Còn {daysUntil(meal.startsAt)} ngày ·{" "}
              {formatMoney(meal.price.total)}
            </span>
          </span>
        </label>
        <TextareaField
          id="cancel-reason"
          label="Lý do hủy"
          defaultValue="Gia đình đổi kế hoạch."
        />
      </section>
      <section className="card l-stack">
        <h3 className="card-title card-title-flush">Kết quả nếu hủy lúc này</h3>
        <RefundPreview />
        <Alert tone="wait">
          Hủy xong không khôi phục được. Việc hoàn tiền do kế toán thực hiện
          sau.
        </Alert>
        <Button variant="danger" onClick={() => setDialogOpen(true)}>
          Xác nhận hủy bữa này
        </Button>
      </section>
      <ConfirmCancelDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
