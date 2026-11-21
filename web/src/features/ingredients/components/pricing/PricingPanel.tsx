import { EmptyState } from "@/components/ui/EmptyState";
import { PanelHeader } from "@/components/ui/PanelHeader";

import {
  listAffectedDishes,
  listPriceProposals,
} from "../../lib/inventoryPeriod";
import { AffectedDishesTable } from "./AffectedDishesTable";
import { PriceProposalProgress } from "./PriceProposalProgress";
import { PriceProposalTable } from "./PriceProposalTable";

export function PricingPanel() {
  const proposals = listPriceProposals();
  const affectedDishes = listAffectedDishes();

  if (!proposals.length) {
    return (
      <>
        <PanelHeader title="Đề xuất giá nguyên liệu" />
        <EmptyState>Chưa có đề xuất giá nào.</EmptyState>
      </>
    );
  }

  return (
    <>
      <PanelHeader
        title="Đề xuất giá nguyên liệu"
        actions={<PriceProposalProgress total={proposals.length} />}
      />
      <PriceProposalTable proposals={proposals} />
      {affectedDishes.length ? (
        <AffectedDishesTable dishes={affectedDishes} />
      ) : null}
    </>
  );
}
