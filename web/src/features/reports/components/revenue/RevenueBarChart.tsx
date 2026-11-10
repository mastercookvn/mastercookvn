import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { formatMoney } from "@/lib/format";
import { MONTHLY_REVENUE } from "@/mocks/inventory";

const CHART_MAX = 350000000;

export function RevenueBarChart() {
  return (
    <Card>
      <CardTitle>Doanh thu món theo tháng (triệu đồng)</CardTitle>
      <div className="bar-chart">
        {MONTHLY_REVENUE.map((row) => (
          <div
            key={row.month}
            className="bar-chart-col"
            title={`${row.month}: ${formatMoney(row.dishRevenue)}`}
          >
            <span>{Math.round(row.dishRevenue / 1e6)}</span>
            <div
              className="bar-chart-bar"
              style={{
                height: `${((row.dishRevenue / CHART_MAX) * 100).toFixed(1)}%`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="bar-chart-labels">
        {MONTHLY_REVENUE.map((row) => (
          <span key={row.month}>{row.month}</span>
        ))}
      </div>
    </Card>
  );
}
