import { ButtonLink } from "@/components/ui/ButtonLink";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ROUTES } from "@/constants/routes";
import { formatMoney } from "@/lib/format";

import { listContracts } from "@/features/contracts/lib/contractRepository";
import {
  isAwaitingContract,
  isAwaitingSettlement,
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";
import { buildSettlement } from "@/features/contracts/lib/settlement";

const COLUMNS = ["Hợp đồng", "Khách", "Khoản", "Cần thu (đ)", "Hạn"];

export function ReceivableQueueTable() {
  const rows = listContracts().flatMap((contract) => {
    if (isAwaitingContract(contract)) {
      const amount = Math.max(minimumDeposit(contract) - contract.paid, 0);
      return amount > 0
        ? [
            {
              number: contract.number,
              customer: contract.customerName,
              kind: `${MINIMUM_DEPOSIT_LABEL}, khách được trả nhiều hơn`,
              amount,
              due: contract.depositDeadline ?? "",
              href: `${ROUTES.workspaceContract(contract.number)}?tab=payment`,
            },
          ]
        : [];
    }
    const balance = isAwaitingSettlement(contract)
      ? buildSettlement(contract).balance
      : 0;
    return balance > 0
      ? [
          {
            number: contract.number,
            customer: contract.customerName,
            kind: "Số dư quyết toán",
            amount: balance,
            due: "Trước khi đóng bữa",
            href: `${ROUTES.workspaceContract(contract.number)}?tab=settlement`,
          },
        ]
      : [];
  });

  return (
    <>
      <PanelHeader
        title="Khoản cần thu"
        count={rows.length}
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
