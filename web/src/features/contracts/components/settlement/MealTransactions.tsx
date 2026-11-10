import { DataTable, num } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PAYMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";

export function MealTransactions() {
  return (
    <DataTable
      columns={["Loại", num("Số tiền"), "Trạng thái"]}
      rows={[
        [
          "Cọc",
          formatMoney(12000000),
          <StatusBadge
            key="status"
            domain="payment"
            status={PAYMENT_STATUS.Succeeded}
          />,
        ],
      ]}
    />
  );
}
