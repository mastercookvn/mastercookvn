"use client";

import { DownloadIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/constants/routes";
import { CONTRACT_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import type { Contract } from "@/mocks/contracts";

import { isAwaitingContract } from "@/features/contracts/lib/contractState";

export function ContractHeader({ contract }: { contract: Contract }) {
  const active = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed
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
        <p className="l-row text-soft gap-2">
          Đơn {contract.orderCode} · Phiên bản 1
          <StatusBadge domain="contract" status={status} />
        </p>
      </div>
      <ButtonLink
        href={ROUTES.contractDocument(contract.number)}
        target="_blank"
      >
        <DownloadIcon size={18} />
        Tải hợp đồng
      </ButtonLink>
    </div>
  );
}
