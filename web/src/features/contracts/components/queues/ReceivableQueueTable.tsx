import { ButtonLink } from "@/components/ui/ButtonLink";
import { DataTable, num } from "@/components/ui/DataTable";
import { ROUTES } from "@/constants/routes";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_WEDDING,
  CUSTOMER,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";

const ROWS = [
  {
    number: CONTRACT_WEDDING.number,
    customer: CUSTOMER.name,
    kind: "Cọc bắt buộc 50%",
    amount: CONTRACT_WEDDING.total * 0.5,
    due: "06/11/2026 08:30",
    href: `${ROUTES.workspaceContract(CONTRACT_WEDDING.number)}?tab=payment`,
  },
  {
    number: "HD-2026-0097",
    customer: "Công ty Minh Long",
    kind: "Số dư quyết toán",
    amount: SETTLEMENT_COMPANY.balance,
    due: "Trước khi đóng bữa",
    href: `${ROUTES.workspaceContract("HD-2026-0097")}?tab=settlement`,
  },
];

export function ReceivableQueueTable() {
  return (
    <>
      <DataTable
        columns={["Hợp đồng", "Khách", "Khoản", num("Cần thu"), "Hạn", ""]}
        rows={ROWS.map((row) => [
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
      <p className="text-small text-soft">
        Không có công nợ trả chậm: khoản còn lại phải thu đủ trước khi đóng bữa.
      </p>
    </>
  );
}
