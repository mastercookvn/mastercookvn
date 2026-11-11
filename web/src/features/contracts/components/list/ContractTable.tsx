"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CONTRACT_STATUS_META } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";
import {
  CONTRACT_STATUS,
  SETTLEMENT_STATUS,
  type ContractStatus,
} from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_COMPANY,
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
  CUSTOMER,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

type ContractRow = {
  number: string;
  customer: string;
  total: number;
  paid: number;
  deadline: string;
  status: ContractStatus;
  href?: string;
};

export function ContractTable() {
  const weddingActive = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed
  );
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const settlementClosed = useDemoState(
    (state) => state.settlementStatus === SETTLEMENT_STATUS.Closed
  );

  const contracts: ContractRow[] = [
    {
      number: CONTRACT_WEDDING.number,
      customer: CUSTOMER.name,
      total: CONTRACT_WEDDING.total,
      paid: depositPaidAmount,
      deadline: weddingActive
        ? "Đã đủ"
        : (CONTRACT_WEDDING.depositDeadline ?? ""),
      status: weddingActive
        ? CONTRACT_STATUS.Active
        : CONTRACT_STATUS.AwaitingConfirmationAndDeposit,
      href: ROUTES.workspaceContract(CONTRACT_WEDDING.number),
    },
    {
      number: CONTRACT_HOUSEWARMING.number,
      customer: "Lý Hoàng Nam",
      total: CONTRACT_HOUSEWARMING.total,
      paid: CONTRACT_HOUSEWARMING.paid,
      deadline: "Đã đủ",
      status: CONTRACT_STATUS.Active,
      href: `${ROUTES.workspaceContract(CONTRACT_HOUSEWARMING.number)}?tab=addendum`,
    },
    {
      number: CONTRACT_COMPANY.number,
      customer: CUSTOMER.name,
      total: SETTLEMENT_COMPANY.settlementTotal,
      paid: CONTRACT_COMPANY.paid + settlementPaid,
      deadline: "Đã đủ",
      status: settlementClosed
        ? CONTRACT_STATUS.Completed
        : CONTRACT_STATUS.Active,
      href: `${ROUTES.workspaceContract(CONTRACT_COMPANY.number)}?tab=settlement`,
    },
    {
      number: "HD-2026-0088",
      customer: "Đặng Quốc Việt",
      total: 32400000,
      paid: 16200000,
      deadline: "Quá hạn",
      status: CONTRACT_STATUS.Expired,
    },
  ];

  return (
    <>
      <PanelHeader
        title="Tất cả hợp đồng"
        count={contracts.length}
        actions={
          <ExportButton
            fileName="hop-dong"
            columns={[
              "Số hợp đồng",
              "Khách",
              "Giá trị (đ)",
              "Đã thu (đ)",
              "Hạn cọc",
              "Trạng thái",
            ]}
            rows={contracts.map((row) => [
              row.number,
              row.customer,
              row.total,
              row.paid,
              row.deadline,
              CONTRACT_STATUS_META[row.status].label,
            ])}
          />
        }
      />
      <DataTable
        columns={[
          "Số hợp đồng",
          "Khách",
          num("Giá trị"),
          num("Đã thu"),
          "Hạn cọc",
          "Trạng thái",
        ]}
        rows={contracts.map((row) => [
          <span key="number" className="text-code">
            {row.number}
          </span>,
          row.customer,
          formatMoney(row.total),
          formatMoney(row.paid),
          row.deadline,
          <StatusBadge key="status" domain="contract" status={row.status} />,
        ])}
        rowActions={contracts.map((row) =>
          row.href
            ? { href: row.href }
            : { toast: "Hợp đồng hết hạn: chỉ còn xem trong lịch sử giao dịch" }
        )}
      />
    </>
  );
}
