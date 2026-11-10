import { PanelHeader } from "@/components/ui/PanelHeader";

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
        subtitle="Doanh thu theo ngày phục vụ của bữa đã thực hiện. Tháng chưa chốt hiển thị chưa xác định."
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
