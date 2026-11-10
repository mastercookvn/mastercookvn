import { PanelHeader } from "@/components/ui/PanelHeader";

import { AffectedDishesTable } from "./AffectedDishesTable";
import { PriceProposalProgress } from "./PriceProposalProgress";
import { PriceProposalTable } from "./PriceProposalTable";

export function PricingPanel() {
  return (
    <>
      <PanelHeader
        title="Đề xuất giá nguyên liệu tháng 11/2026"
        subtitle="Tính từ phiếu nhập 02/10–31/10, trọng số 1,5; 1,5; 2 từ cũ đến mới"
        actions={<PriceProposalProgress />}
      />
      <PriceProposalTable />
      <AffectedDishesTable />
    </>
  );
}
