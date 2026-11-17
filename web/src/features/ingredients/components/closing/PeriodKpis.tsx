import { StatTile } from "@/components/ui/StatTile";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatMoney, formatPercent } from "@/lib/format";
import { INVENTORY_PERIOD as period } from "@/mocks/inventory";

export function PeriodKpis() {
  return (
    <div className="l-grid l-grid-4">
      <StatTile value={formatMoney(period.cost)} label="Chi phí tiêu thụ" />
      <StatTile value={formatMoney(period.dishRevenue)} label="Doanh thu món" />
      <StatTile
        value={formatPercent(period.foodCost)}
        label={`Food cost thực tế toàn cơ sở, mục tiêu ${formatPercent(BUSINESS_SETTINGS.foodCostTarget, 0)}`}
      />
      <StatTile
        value={formatMoney(period.margin)}
        label="Lãi theo nguyên liệu, chưa trừ lương"
      />
    </div>
  );
}
