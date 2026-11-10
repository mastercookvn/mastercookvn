"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PAYMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";

export function TransactionTable() {
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);

  return (
    <DataTable
      columns={[
        "Mã giao dịch",
        "Loại",
        "Phương thức",
        num("Số tiền"),
        "Trạng thái",
      ]}
      rows={
        depositPaidAmount > 0
          ? [
              [
                <span key="code" className="text-code">
                  GD-0142-01
                </span>,
                "Cọc",
                "QR hoặc kế toán ghi",
                formatMoney(depositPaidAmount),
                <StatusBadge
                  key="status"
                  domain="payment"
                  status={PAYMENT_STATUS.Succeeded}
                />,
              ],
            ]
          : [
              [
                <span key="empty" className="text-soft">
                  Chưa có giao dịch
                </span>,
                "",
                "",
                "",
                "",
              ],
            ]
      }
    />
  );
}
