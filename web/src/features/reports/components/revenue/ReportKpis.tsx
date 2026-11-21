import { StatTile } from "@/components/ui/StatTile";
import { formatMoney, formatPercent } from "@/lib/format";

import type { RevenueReport } from "../../lib/revenueReport";

export function ReportKpis({ report }: { report: RevenueReport }) {
  return (
    <div className="l-grid l-grid-4">
      <StatTile
        value={formatMoney(report.dishRevenue)}
        label={`Doanh thu món ${report.period}`}
      />
      <StatTile
        value={formatPercent(report.foodCost)}
        label={`Food cost thực tế ${report.period}`}
      />
      <StatTile
        value={formatMoney(report.margin)}
        label={`Lãi theo nguyên liệu ${report.period}`}
      />
      <StatTile
        value={
          report.averageRating === null
            ? "—"
            : `${report.averageRating.toLocaleString("vi-VN")} / 5`
        }
        label="Điểm đánh giá trung bình"
      />
    </div>
  );
}
