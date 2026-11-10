import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { EquipmentReportTable } from "../components/equipment/EquipmentReportTable";
import { RevenuePanel } from "../components/revenue/RevenuePanel";

export function ReportsPage() {
  return (
    <WorkspaceTabs
      screen="reports"
      panels={{
        revenue: <RevenuePanel />,
        equipment: <EquipmentReportTable />,
      }}
    />
  );
}
