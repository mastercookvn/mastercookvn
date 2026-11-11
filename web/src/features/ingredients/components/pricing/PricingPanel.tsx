import { PanelHeader } from "@/components/ui/PanelHeader";

import { AffectedDishesTable } from "./AffectedDishesTable";
import { PriceProposalProgress } from "./PriceProposalProgress";
import { PriceProposalTable } from "./PriceProposalTable";

export function PricingPanel() {
  return (
    <>
      <PanelHeader
        title="Đề xuất giá nguyên liệu tháng 11/2026"
        actions={<PriceProposalProgress />}
      />
      <PriceProposalTable />
      <AffectedDishesTable />
    </>
  );
}
