"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PAYMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { SETTLEMENT_COMPANY } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export function MealTransactions() {
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
        ["Cọc", formatMoney(SETTLEMENT_COMPANY.paid), succeeded],
        ...(settlementPaid > 0
          ? [["Quyết toán", formatMoney(settlementPaid), succeeded]]
          : []),
      ]}
    />
  );
}
