import { EmptyState } from "@/components/ui/EmptyState";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";

import type { RevenueReport } from "../../lib/revenueReport";
import { CashFlowCard } from "./CashFlowCard";
import { FoodCostLineChart } from "./FoodCostLineChart";
import { OrderStatsCard } from "./OrderStatsCard";
import { ReportFilters } from "./ReportFilters";
import { ReportKpis } from "./ReportKpis";
import { RevenueBarChart } from "./RevenueBarChart";
import { RevenueTable } from "./RevenueTable";

// Placeholder until the revenue report API exists.
const report: RevenueReport | null = null;

export function RevenuePanel() {
  return (
    <>
      <PanelHeader
        title="Doanh thu và food cost"
        actions={
          report ? (
            <ExportButton
              fileName="bao-cao-doanh-thu-food-cost"
              columns={[
                "Tháng",
                "Doanh thu món (đ)",
                "Food cost (%)",
                "Chi phí tiêu thụ (đ)",
                "Lãi theo nguyên liệu (đ)",
              ]}
              rows={report.months.map((row) => [
                row.month,
                row.dishRevenue,
                Math.round(row.foodCost * 1000) / 10,
                Math.round(row.dishRevenue * row.foodCost),
                Math.round(row.dishRevenue * (1 - row.foodCost)),
              ])}
            />
          ) : null
        }
      />
      <ReportFilters />
      {report ? (
        <>
          <ReportKpis report={report} />
          <div className="l-grid l-grid-2">
            <RevenueBarChart months={report.months} />
            <FoodCostLineChart months={report.months} />
          </div>
          <RevenueTable months={report.months} />
          <div className="l-grid l-grid-2">
            <CashFlowCard period={report.period} cashFlow={report.cashFlow} />
            <OrderStatsCard
              period={report.period}
              orderStats={report.orderStats}
            />
          </div>
        </>
      ) : (
        <EmptyState>Chưa có dữ liệu báo cáo.</EmptyState>
      )}
    </>
  );
}
