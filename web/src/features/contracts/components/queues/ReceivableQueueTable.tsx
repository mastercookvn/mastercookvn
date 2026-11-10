"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ROUTES } from "@/constants/routes";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_WEDDING,
  CUSTOMER,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

const COLUMNS = ["Hợp đồng", "Khách", "Khoản", "Cần thu (đ)", "Hạn"];

export function ReceivableQueueTable() {
  const depositPaid = useDemoState((state) => state.depositPaid);
  const settlementStatus = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const settlementBalance = SETTLEMENT_COMPANY.balance - settlementPaid;

  const rows = [
    ...(depositPaid
      ? []
      : [
          {
            number: CONTRACT_WEDDING.number,
            customer: CUSTOMER.name,
            kind: `${MINIMUM_DEPOSIT_LABEL}, khách được trả nhiều hơn`,
            amount: minimumDeposit(CONTRACT_WEDDING),
            due: CONTRACT_WEDDING.depositDeadline ?? "",
            href: `${ROUTES.workspaceContract(CONTRACT_WEDDING.number)}?tab=payment`,
          },
        ]),
    ...(settlementBalance > 0
      ? [
          {
            number: SETTLEMENT_COMPANY.contractNumber,
            customer: CUSTOMER.name,
            kind:
              settlementStatus === SETTLEMENT_STATUS.Invoiced
                ? `Hóa đơn ${SETTLEMENT_COMPANY.invoiceNumber}, đã gửi khách`
                : "Số dư quyết toán, chưa phát hành hóa đơn",
            amount: settlementBalance,
            due: "Trước khi đóng bữa",
            href: `${ROUTES.workspaceContract(SETTLEMENT_COMPANY.contractNumber)}?tab=settlement`,
          },
        ]
      : []),
  ];

  return (
    <>
      <PanelHeader
        title="Khoản cần thu"
        count={rows.length}
        subtitle="Không có công nợ trả chậm: khoản còn lại phải thu đủ trước khi đóng bữa."
        actions={
          <ExportButton
            fileName="khoan-can-thu"
            columns={COLUMNS}
            rows={rows.map((row) => [
              row.number,
              row.customer,
              row.kind,
              row.amount,
              row.due,
            ])}
          />
        }
      />
      <DataTable
        columns={["Hợp đồng", "Khách", "Khoản", num("Cần thu"), "Hạn", ""]}
        rows={rows.map((row) => [
          <span key="number" className="font-semibold">
            {row.number}
          </span>,
          row.customer,
          row.kind,
          formatMoney(row.amount),
          row.due,
          <ButtonLink key="open" href={row.href} size="sm">
            Mở
          </ButtonLink>,
        ])}
      />
    </>
  );
}
