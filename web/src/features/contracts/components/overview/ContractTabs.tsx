import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { CONTRACT_STATUS } from "@/constants/statuses";
import type { Contract } from "@/mocks/contracts";

import { isAwaitingContract } from "../../lib/contractState";
import { AddendumConfirmationPanel } from "../addendum/AddendumConfirmationPanel";
import { CancelMealPanel } from "../cancellation/CancelMealPanel";
import { PaymentPanel } from "../payment/PaymentPanel";
import { ReviewForm } from "../review/ReviewForm";

import { ContractOverviewPanel } from "./ContractOverviewPanel";

// Tabs depend on the contract status (section 8.1).
function tabsFor(contract: Contract): TabItem[] {
  const overview = { value: "overview", label: "Tổng quan" };
  if (isAwaitingContract(contract)) {
    return [overview, { value: "payment", label: "Thanh toán" }];
  }
  if (contract.status === CONTRACT_STATUS.Active) {
    return [
      overview,
      { value: "addendum", label: "Phụ lục" },
      { value: "cancel", label: "Hủy bữa" },
    ];
  }
  return [overview, { value: "review", label: "Đánh giá" }];
}

export function ContractTabs({ contract }: { contract: Contract }) {
  const panels = {
    overview: <ContractOverviewPanel contract={contract} />,
    payment: <PaymentPanel contract={contract} />,
    addendum: <AddendumConfirmationPanel />,
    cancel: <CancelMealPanel />,
    review: <ReviewForm />,
  };

  return (
    <Tabs
      items={tabsFor(contract)}
      panelClassName="tab-panel"
      panels={panels}
    />
  );
}
