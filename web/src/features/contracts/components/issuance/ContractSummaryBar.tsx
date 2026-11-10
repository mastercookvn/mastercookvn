"use client";

import { Suspense } from "react";

import { Badge } from "@/components/ui/Badge";
import { KpiBar } from "@/components/ui/KpiBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
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

/** Sample data: each tab shows a contract at the matching stage. */
function SummaryForTab() {
  const [tab] = useQueryParam("tab");
  const deposited = useDemoState((state) => state.depositPaid);
  const issued = useDemoState((state) => state.contractIssued);

  const row =
    tab === "addendum" || tab === "cancel"
      ? {
          number: CONTRACT_HOUSEWARMING.number,
          customer: "Lý Hoàng Nam",
          value: CONTRACT_HOUSEWARMING.total,
          paid: CONTRACT_HOUSEWARMING.paid,
          firstDate: "22/11/2026",
          status: (
            <StatusBadge domain="contract" status={CONTRACT_STATUS.Active} />
          ),
        }
      : tab === "settlement"
        ? {
            number: "HD-2026-0097",
            customer: "Công ty Minh Long",
            value: SETTLEMENT_COMPANY.settlementTotal,
            paid: SETTLEMENT_COMPANY.paid,
            firstDate: "25/10/2026",
            status: (
              <StatusBadge domain="contract" status={CONTRACT_STATUS.Active} />
            ),
          }
        : {
            number: CONTRACT_WEDDING.number,
            customer: CUSTOMER.name,
            value: CONTRACT_WEDDING.total,
            paid: deposited ? CONTRACT_WEDDING.total * 0.5 : 0,
            firstDate: "14/12/2026",
            status: issued ? (
              <StatusBadge
                domain="contract"
                status={CONTRACT_STATUS.AwaitingConfirmationAndDeposit}
              />
            ) : (
              <Badge tone="neutral">Chưa phát hành</Badge>
            ),
          };

  return (
    <KpiBar
      items={[
        { label: row.customer, value: row.number },
        { label: "Giá trị", value: formatMoney(row.value) },
        { label: "Đã thu", value: formatMoney(row.paid) },
        { label: "Còn lại", value: formatMoney(row.value - row.paid) },
        { label: "Bữa đầu", value: row.firstDate },
        { label: "Trạng thái", value: row.status, compact: true },
      ]}
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
