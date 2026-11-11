"use client";

import { useState } from "react";

import { PrintIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PanelHeader } from "@/components/ui/PanelHeader";
import type { Role } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import type { Contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import { isAwaitingContract } from "@/features/contracts/lib/contractState";

import { ActivationConditions } from "./ActivationConditions";
import { ContractMealTable } from "./ContractMealTable";
import { DepositTermsForm } from "./DepositTermsForm";
import { PaperSignatureForm } from "./PaperSignatureForm";
import { PublishContractDialog } from "./PublishContractDialog";
import { SurchargeForm } from "./SurchargeForm";
import { TransactionTable } from "./TransactionTable";

export function ContractIssuePanel({
  roles,
  contract,
}: {
  roles: Role[];
  contract: Contract;
}) {
  const issued = useDemoState((state) => state.contractIssued);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Issuing and signing only apply before the contract takes effect.
  if (!isAwaitingContract(contract)) {
    return (
      <>
        <PanelHeader
          title="Các bữa trong hợp đồng"
          subtitle={`Đơn ${contract.orderCode}`}
        />
        <ContractMealTable contract={contract} />
      </>
    );
  }

  return (
    <>
      <PanelHeader
        title="Phát hành và ký"
        subtitle={`Đơn ${contract.orderCode} · Giữ tạm đến ${contract.depositDeadline}`}
        actions={
          issued ? (
            <ButtonLink
              href={ROUTES.contractDocument(contract.number)}
              target="_blank"
            >
              <PrintIcon size={18} />
              In để ký tại quầy
            </ButtonLink>
          ) : (
            <Button variant="primary" onClick={() => setDialogOpen(true)}>
              Phát hành hợp đồng
            </Button>
          )
        }
      />
      <ContractMealTable contract={contract} />
      <div className="l-grid l-grid-main">
        <div className="l-stack gap-4">
          {issued ? (
            <PaperSignatureForm />
          ) : (
            <>
              <DepositTermsForm />
              <SurchargeForm />
            </>
          )}
          <TransactionTable />
        </div>
        <ActivationConditions roles={roles} />
      </div>
      <PublishContractDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
