import { StatTile } from "@/components/ui/StatTile";
import { formatMoney, formatPercent } from "@/lib/format";
import { INVENTORY_PERIOD as period } from "@/mocks/inventory";

export function ReportKpis() {
  return (
    <div className="l-grid l-grid-4">
      <StatTile
        value={formatMoney(period.dishRevenue)}
        label="Doanh thu món 10/2026"
      />
      <StatTile
        value={formatPercent(period.foodCost)}
        label="Food cost 10/2026"
      />
      <StatTile
        value={formatMoney(period.margin)}
        label="Lãi theo nguyên liệu 10/2026"
      />
      <StatTile value="4,6 / 5" label="Điểm đánh giá trung bình" />
    </div>
  );
}
