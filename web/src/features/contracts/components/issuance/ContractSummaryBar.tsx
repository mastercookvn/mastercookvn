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
import {
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
  CUSTOMER,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

/**
 * One compact line instead of a grid of tiles: who, when, how much is paid.
 * Sample data: each tab shows a contract at the matching stage.
 */
function SummaryForTab() {
  const [tab] = useQueryParam("tab");
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const issued = useDemoState((state) => state.contractIssued);

  const row =
    tab === "addendum" || tab === "cancel"
      ? {
          number: CONTRACT_HOUSEWARMING.number,
          customer: "Lý Hoàng Nam",
          value: CONTRACT_HOUSEWARMING.total,
          paid: CONTRACT_HOUSEWARMING.paid,
          firstDate: "22/11/2026",
          editable: true,
          status: (
            <StatusBadge domain="contract" status={CONTRACT_STATUS.Active} />
          ),
        }
      : tab === "settlement"
        ? {
            number: SETTLEMENT_COMPANY.contractNumber,
            customer: CUSTOMER.name,
            value: SETTLEMENT_COMPANY.settlementTotal,
            paid: SETTLEMENT_COMPANY.paid + settlementPaid,
            firstDate: "25/10/2026",
            editable: false,
            status: (
              <StatusBadge domain="contract" status={CONTRACT_STATUS.Active} />
            ),
          }
        : {
            number: CONTRACT_WEDDING.number,
            customer: CUSTOMER.name,
            value: CONTRACT_WEDDING.total,
            paid: depositPaidAmount,
            firstDate: "14/12/2026",
            editable: false,
            status: issued ? (
              <StatusBadge
                domain="contract"
                status={CONTRACT_STATUS.AwaitingConfirmationAndDeposit}
              />
            ) : (
              <Badge tone="neutral">Chưa phát hành</Badge>
            ),
          };
  const paidShare = row.value ? Math.min(1, row.paid / row.value) : 0;

  return (
    <PageHeader
      screen="contractDetail"
      title={`Hợp đồng ${row.number}`}
      description={`${row.customer} · Bữa đầu ${row.firstDate}`}
      meta={
        <div className="contract-head-meta">
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

export function ContractSummaryBar() {
  return (
    <Suspense fallback={null}>
      <SummaryForTab />
    </Suspense>
  );
}
