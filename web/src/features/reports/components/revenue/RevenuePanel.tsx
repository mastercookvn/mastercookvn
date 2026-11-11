import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { MONTHLY_REVENUE } from "@/mocks/inventory";

import { CashFlowCard } from "./CashFlowCard";
import { FoodCostLineChart } from "./FoodCostLineChart";
import { OrderStatsCard } from "./OrderStatsCard";
import { ReportFilters } from "./ReportFilters";
import { ReportKpis } from "./ReportKpis";
import { RevenueBarChart } from "./RevenueBarChart";
import { RevenueTable } from "./RevenueTable";

export function RevenuePanel() {
  return (
    <>
      <PanelHeader
        title="Doanh thu và food cost"
        actions={
          <ExportButton
            fileName="bao-cao-doanh-thu-food-cost"
            columns={[
              "Tháng",
              "Doanh thu món (đ)",
              "Food cost (%)",
              "Chi phí tiêu thụ (đ)",
              "Lãi theo nguyên liệu (đ)",
            ]}
            rows={MONTHLY_REVENUE.map((row) => [
              `${row.month}/2026`,
              row.dishRevenue,
              Math.round(row.foodCost * 1000) / 10,
              Math.round(row.dishRevenue * row.foodCost),
              Math.round(row.dishRevenue * (1 - row.foodCost)),
            ])}
          />
        }
      />
      <ReportFilters />
      <ReportKpis />
      <div className="l-grid l-grid-2">
        <RevenueBarChart />
        <FoodCostLineChart />
      </div>
      <RevenueTable />
      <div className="l-grid l-grid-2">
        <CashFlowCard />
        <OrderStatsCard />
      </div>
    </>
  );
}
