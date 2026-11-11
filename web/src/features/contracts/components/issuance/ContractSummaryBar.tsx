"use client";

import { Suspense } from "react";

import { PageHeader } from "@/components/layout/workspace/PageHeader";
import { DownloadIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/constants/routes";
import { CONTRACT_STATUS } from "@/constants/statuses";
import { useQueryParam } from "@/hooks/useQueryParam";
import { formatMoney } from "@/lib/format";
import { SETTLEMENT_COMPANY, type Contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import {
  isAwaitingContract,
  isAwaitingSettlement,
  upcomingMeal,
} from "@/features/contracts/lib/contractState";

/** One compact line instead of a grid of tiles: who, when, how much is paid. */
function Summary({ contract }: { contract: Contract }) {
  const [tab] = useQueryParam("tab");
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const issued = useDemoState((state) => state.contractIssued);
  const activated = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed
  );
  const applied = useDemoState(
    (state) => state.appliedAddenda[contract.number]
  );
  const edited = applied ? upcomingMeal(contract) : undefined;

  const awaiting = isAwaitingContract(contract);
  const settling = isAwaitingSettlement(contract);
  const row = {
    number: contract.number,
    customer: contract.customerName,
    value: settling
      ? SETTLEMENT_COMPANY.settlementTotal
      : edited && applied
        ? contract.total - edited.price.total + applied.total
        : contract.total,
    paid: awaiting
      ? depositPaidAmount
      : settling
        ? SETTLEMENT_COMPANY.paid + settlementPaid
        : contract.paid,
    firstDate: contract.meals[0]?.date ?? "",
    editable: upcomingMeal(contract) !== undefined,
    status:
      awaiting && !issued ? (
        <Badge tone="neutral">Chưa phát hành</Badge>
      ) : (
        <StatusBadge
          domain="contract"
          status={
            awaiting && activated ? CONTRACT_STATUS.Active : contract.status
          }
        />
      ),
  };
  const paidShare = row.value ? Math.min(1, row.paid / row.value) : 0;

  return (
    <PageHeader
      screen="contractDetail"
      title={`Hợp đồng ${row.number}`}
      meta={
        <div className="contract-head-meta">
          <span>
            {row.customer} · Bữa đầu {row.firstDate}
          </span>
          {row.status}
          <span className="contract-head-paid">
            Đã thu <b>{formatMoney(row.paid)}</b> / {formatMoney(row.value)}
          </span>
          <span className="contract-head-progress" aria-hidden="true">
            <span style={{ width: `${paidShare * 100}%` }} />
          </span>
        </div>
      }
      aside={
        <div className="l-row gap-2">
          {row.editable && tab !== "addendum" ? (
            <ButtonLink href="?tab=addendum">Sửa hợp đồng</ButtonLink>
          ) : null}
          <ButtonLink
            href={ROUTES.contractDocument(row.number)}
            target="_blank"
            variant="primary"
          >
            <DownloadIcon size={18} />
            Xuất hợp đồng
          </ButtonLink>
        </div>
      }
    />
  );
}

export function ContractSummaryBar({ contract }: { contract: Contract }) {
  return (
    <Suspense fallback={null}>
      <Summary contract={contract} />
    </Suspense>
  );
}
