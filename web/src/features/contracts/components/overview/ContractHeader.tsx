"use client";

import { Reveal } from "@/components/motion/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CONTRACT_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import type { Contract } from "@/mocks/contracts";

import { isAwaitingContract } from "@/features/contracts/lib/contractState";

export function ContractHeader({ contract }: { contract: Contract }) {
  const active = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed,
  );
  const status =
    isAwaitingContract(contract) && active
      ? CONTRACT_STATUS.Active
      : contract.status;

  return (
    <div className="l-between">
      <div className="l-stack gap-1">
        <Reveal as="h1" variant="up" immediate className="h1-page">
          Hợp đồng {contract.number}
        </Reveal>
        <p className="text-soft">Đơn {contract.orderCode} · Phiên bản 1</p>
      </div>
      <StatusBadge domain="contract" status={status} />
    </div>
  );
}
