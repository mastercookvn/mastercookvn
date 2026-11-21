"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { ADDENDUM_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import { updateDemoState, useDemoState } from "@/lib/demoStore";

import type { PendingAddendum } from "../../lib/contractRepository";
import { BeforeAfterTable } from "./BeforeAfterTable";

export function AddendumConfirmationPanel({
  addendum,
}: {
  addendum: PendingAddendum | null;
}) {
  const confirmed = useDemoState((state) => state.addendumConfirmed);
  const showToast = useToast();

  if (!addendum) {
    return <EmptyState>Không có phụ lục nào chờ bạn xác nhận.</EmptyState>;
  }

  return (
    <div className="l-stack">
      <div className="l-between">
        <h3 className="text-17 font-semibold">Phụ lục {addendum.number}</h3>
        <StatusBadge
          domain="addendum"
          status={
            confirmed
              ? ADDENDUM_STATUS.AwaitingExtraDeposit
              : ADDENDUM_STATUS.Pending
          }
        />
      </div>
      <BeforeAfterTable addendum={addendum} firstColumn="Nội dung" />
      <div className="card l-stack max-w-[520px]">
        <MoneyRow label="Chênh lệch" value={formatMoney(addendum.difference)} />
        <MoneyRow
          label="Cọc bổ sung (50% phần tăng, vì tăng trên 3 bàn)"
          value={formatMoney(addendum.extraDeposit)}
          total
        />
        <p className="text-small text-soft">
          Bữa chỉ cập nhật sau khi bạn xác nhận và đã đủ cọc bổ sung. Muốn đổi
          thêm, hãy gọi tư vấn để lập phụ lục mới.
        </p>
        {confirmed ? (
          <>
            <Alert tone="wait">
              Đã xác nhận phụ lục. Cần thanh toán cọc bổ sung để áp dụng.
            </Alert>
            <Button
              variant="inverse"
              onClick={() =>
                showToast(
                  `Mở mã QR với số tiền ${formatMoney(addendum.extraDeposit)}`
                )
              }
            >
              Thanh toán cọc bổ sung
            </Button>
          </>
        ) : (
          <div className="l-row">
            <Button
              variant="primary"
              onClick={() => updateDemoState({ addendumConfirmed: true })}
            >
              Đồng ý phụ lục
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
