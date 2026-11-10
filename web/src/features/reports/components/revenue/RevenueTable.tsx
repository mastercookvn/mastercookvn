import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney, formatPercent } from "@/lib/format";
import { MONTHLY_REVENUE } from "@/mocks/inventory";

export function RevenueTable() {
  return (
    <DataTable
      columns={[
        "Tháng",
        num("Doanh thu món"),
        num("Food cost"),
        num("Chi phí tiêu thụ"),
        num("Lãi theo nguyên liệu"),
      ]}
      rows={MONTHLY_REVENUE.map((row) => [
        `${row.month}/2026`,
        formatMoney(row.dishRevenue),
        formatPercent(row.foodCost),
        formatMoney(row.dishRevenue * row.foodCost),
        formatMoney(row.dishRevenue * (1 - row.foodCost)),
      ])}
    />
  );
}
