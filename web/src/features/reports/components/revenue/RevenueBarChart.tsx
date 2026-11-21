import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { formatMoney } from "@/lib/format";
import type { MonthlyRevenue } from "../../lib/revenueReport";

export function RevenueBarChart({ months }: { months: MonthlyRevenue[] }) {
  const chartMax = Math.max(...months.map((row) => row.dishRevenue), 1);

  return (
    <Card>
      <CardTitle>Doanh thu món theo tháng (triệu đồng)</CardTitle>
      <div className="bar-chart">
        {months.map((row) => (
          <div
            key={row.month}
            className="bar-chart-col"
            title={`${row.month}: ${formatMoney(row.dishRevenue)}`}
          >
            <span>{Math.round(row.dishRevenue / 1e6)}</span>
            <div
              className="bar-chart-bar"
              style={{
                height: `${((row.dishRevenue / chartMax) * 100).toFixed(1)}%`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="bar-chart-labels">
        {months.map((row) => (
          <span key={row.month}>{row.month}</span>
        ))}
      </div>
    </Card>
  );
}
