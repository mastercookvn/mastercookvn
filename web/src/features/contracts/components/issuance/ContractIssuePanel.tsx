"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import type { Role } from "@/constants/roles";
import { CONTRACT_STATUS } from "@/constants/statuses";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import { ActivationConditions } from "./ActivationConditions";
import { ContractMealTable } from "./ContractMealTable";
import { PaperSignatureForm } from "./PaperSignatureForm";
import { PublishContractDialog } from "./PublishContractDialog";
import { SurchargeForm } from "./SurchargeForm";
import { TransactionTable } from "./TransactionTable";

export function ContractIssuePanel({ roles }: { roles: Role[] }) {
  const issued = useDemoState((state) => state.contractIssued);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <PanelHeader
        title={`Hợp đồng ${contract.number}`}
        subtitle={`Đơn ${contract.orderCode} · Giữ tạm đến ${contract.depositDeadline}`}
        actions={
          issued ? (
            <>
              <StatusBadge
                domain="contract"
                status={CONTRACT_STATUS.AwaitingConfirmationAndDeposit}
              />
              <ToastButton message="Bản mẫu: mở bản in hợp đồng">
                In để ký tại quầy
              </ToastButton>
            </>
          ) : (
            <>
              <Badge tone="neutral">Chưa phát hành</Badge>
              <Button variant="primary" onClick={() => setDialogOpen(true)}>
                Phát hành hợp đồng
              </Button>
            </>
          )
        }
      />
      <ContractMealTable />
      <div className="l-grid l-grid-main">
        <div className="l-stack gap-4">
          {issued ? <PaperSignatureForm /> : <SurchargeForm />}
          <TransactionTable />
        </div>
        <ActivationConditions roles={roles} />
      </div>
      <PublishContractDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
