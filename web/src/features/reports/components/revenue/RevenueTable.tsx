import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney, formatPercent } from "@/lib/format";
import type { MonthlyRevenue } from "../../lib/revenueReport";

export function RevenueTable({ months }: { months: MonthlyRevenue[] }) {
  return (
    <DataTable
      columns={[
        "Tháng",
        num("Doanh thu món"),
        num("Food cost"),
        num("Chi phí tiêu thụ"),
        num("Lãi theo nguyên liệu"),
      ]}
      rows={months.map((row) => [
        row.month,
        formatMoney(row.dishRevenue),
        formatPercent(row.foodCost),
        formatMoney(row.dishRevenue * row.foodCost),
        formatMoney(row.dishRevenue * (1 - row.foodCost)),
      ])}
    />
  );
}
