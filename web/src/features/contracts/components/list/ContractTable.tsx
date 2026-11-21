"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CONTRACT_STATUS_META } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";
import { CONTRACT_STATUS, type ContractStatus } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";

import { listContracts } from "../../lib/contractRepository";
import { isAwaitingSettlement } from "../../lib/contractState";
import { buildSettlement } from "../../lib/settlement";

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
  const contracts: ContractRow[] = listContracts().map((contract) => ({
    number: contract.number,
    customer: contract.customerName,
    total: isAwaitingSettlement(contract)
      ? buildSettlement(contract).settlementTotal
      : contract.total,
    paid: contract.paid,
    deadline: contract.depositDeadline ?? "Đã đủ",
    status: contract.status,
    href:
      contract.status === CONTRACT_STATUS.Expired
        ? undefined
        : ROUTES.workspaceContract(contract.number),
  }));

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
