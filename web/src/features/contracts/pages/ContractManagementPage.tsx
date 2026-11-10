import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { getStaffRoles } from "@/lib/auth";

import { AddendumDraftPanel } from "../components/addendum/AddendumDraftPanel";
import { CancelRequestForm } from "../components/cancellation/CancelRequestForm";
import { ContractIssuePanel } from "../components/issuance/ContractIssuePanel";
import { ContractSummaryBar } from "../components/issuance/ContractSummaryBar";
import { RecordPaymentForm } from "../components/payment/RecordPaymentForm";
import { SettlementPanel } from "../components/settlement/SettlementPanel";

export async function ContractManagementPage() {
  const roles = await getStaffRoles();

  return (
    <WorkspaceTabs
      screen="contractDetail"
      header={<ContractSummaryBar />}
      panels={{
        overview: <ContractIssuePanel roles={roles} />,
        payment: <RecordPaymentForm />,
        addendum: <AddendumDraftPanel />,
        cancel: <CancelRequestForm />,
        settlement: <SettlementPanel />,
      }}
    />
  );
}
