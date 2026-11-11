import { notFound } from "next/navigation";

import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { getStaffRoles } from "@/lib/auth";
import { contractByNumber } from "@/mocks/contracts";

import { AddendumDraftPanel } from "../components/addendum/AddendumDraftPanel";
import { CancelRequestForm } from "../components/cancellation/CancelRequestForm";
import { ContractIssuePanel } from "../components/issuance/ContractIssuePanel";
import { ContractSummaryBar } from "../components/issuance/ContractSummaryBar";
import { RecordPaymentForm } from "../components/payment/RecordPaymentForm";
import { SettlementPanel } from "../components/settlement/SettlementPanel";
import { contractStageTabs, upcomingMeal } from "../lib/contractState";

export async function ContractManagementPage({ number }: { number: string }) {
  const contract = contractByNumber(number);
  if (!contract) notFound();

  const roles = await getStaffRoles();
  const meal = upcomingMeal(contract);

  return (
    <WorkspaceTabs
      screen="contractDetail"
      showTitle={false}
      header={<ContractSummaryBar contract={contract} />}
      only={contractStageTabs(contract)}
      panels={{
        overview: <ContractIssuePanel roles={roles} contract={contract} />,
        payment: <RecordPaymentForm contractNumber={contract.number} />,
        addendum: meal ? (
          <AddendumDraftPanel contract={contract} meal={meal} />
        ) : null,
        cancel: meal ? (
          <CancelRequestForm contract={contract} meal={meal} />
        ) : null,
        settlement: <SettlementPanel />,
      }}
    />
  );
}
