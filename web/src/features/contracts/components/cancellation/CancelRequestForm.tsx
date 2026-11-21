"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Dialog } from "@/components/ui/Dialog";
import { num } from "@/components/ui/tableColumns";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { MEAL_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { daysUntil, type Contract, type Meal } from "@/models/contracts";
import { updateDemoState, useDemoState } from "@/lib/demoStore";

import { cancellationFor, paidForMeal } from "../../lib/contractState";
import { RefundPreview } from "./RefundPreview";

const REQUESTED_AT = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;

/** "dd/MM/yyyy HH:mm" in Vietnam time, or null when it is not a real moment. */
function parseRequestedAt(text: string): Date | null {
  const match = REQUESTED_AT.exec(text.trim());
  if (!match) return null;
  const [, day, month, year, hour, minute] = match;
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00+07:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function CancelRequestForm({
  contract,
  meal,
}: {
  contract: Contract;
  meal: Meal;
}) {
  const showToast = useToast();
  const cancelled = useDemoState((state) => state.mealCancelled);
  const [requestedText, setRequestedText] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // BR10: the tier follows when the customer asked, not when staff process it.
  const requestedAt = parseRequestedAt(requestedText);
  const daysLeft = requestedAt ? daysUntil(meal.startsAt, requestedAt) : null;
  const mealPaid = paidForMeal(contract, meal);
  const result = requestedAt
    ? cancellationFor(contract, meal, requestedAt)
    : null;

  return (
    <>
      <PanelHeader title="Hủy bữa" subtitle={contract.number} />
      <div className="l-grid l-grid-2">
        <section className="card l-stack">
          <TextField
            id="cancel-requested-at"
            label="Thời điểm khách yêu cầu"
            hint="dd/MM/yyyy HH:mm. Mức hoàn tính theo thời điểm này."
            value={requestedText}
            disabled={cancelled}
            error={
              requestedAt || !requestedText
                ? null
                : "Nhập theo dạng dd/MM/yyyy HH:mm"
            }
            onChange={(event) => setRequestedText(event.target.value)}
          />
          <TextareaField
            id="cancel-workspace-reason"
            label="Lý do"
            disabled={cancelled}
          />
          <DataTable
            columns={[
              "Bữa",
              "Ngày",
              num("Còn lại"),
              num("Giá trị"),
              "Trạng thái",
            ]}
            rows={[
              [
                meal.name,
                meal.date,
                daysLeft === null ? "" : `${Math.max(daysLeft, 0)} ngày`,
                formatMoney(meal.price.total),
                <StatusBadge
                  key="status"
                  domain="meal"
                  status={cancelled ? MEAL_STATUS.Cancelled : meal.status}
                />,
              ],
            ]}
          />
        </section>
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Kết quả tính</h3>
          {result ? (
            <RefundPreview compact result={result} paid={mealPaid} />
          ) : null}
          {cancelled ? (
            <Alert tone="good">
              Bữa đã hủy. Giữ dụng cụ đã nhả, phân công đã hủy, khoản phải hoàn
              nằm trong danh sách Cần hoàn.
            </Alert>
          ) : (
            <Button
              variant="danger"
              disabled={!result}
              onClick={() => setConfirmOpen(true)}
            >
              Xác nhận hủy
            </Button>
          )}
        </section>
      </div>
      {result ? (
        <Dialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={`Hủy ${meal.name} ${meal.date}`}
          confirmLabel="Hủy bữa"
          confirmVariant="danger"
          onConfirm={() => {
            updateDemoState({ mealCancelled: true });
            showToast(
              `Đã hủy bữa. Ghi khoản phải hoàn ${formatMoney(result.refund)}.`
            );
          }}
        >
          <p className="text-soft">
            {result.tierLabel}. Hoàn {formatMoney(result.refund)}, cơ sở giữ lại{" "}
            {formatMoney(result.retained)}. Không hoàn tác được.
          </p>
        </Dialog>
      ) : null}
    </>
  );
}
