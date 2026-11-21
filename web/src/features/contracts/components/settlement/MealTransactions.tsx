"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PAYMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { useDemoState } from "@/lib/demoStore";

export function MealTransactions({ depositPaid }: { depositPaid: number }) {
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const succeeded = (
    <StatusBadge
      key="status"
      domain="payment"
      status={PAYMENT_STATUS.Succeeded}
    />
  );

  return (
    <DataTable
      columns={["Loại", num("Số tiền"), "Trạng thái"]}
      rows={[
        ["Cọc", formatMoney(depositPaid), succeeded],
        ...(settlementPaid > 0
          ? [["Quyết toán", formatMoney(settlementPaid), succeeded]]
          : []),
      ]}
    />
  );
}
