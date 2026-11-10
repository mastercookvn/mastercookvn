import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/constants/routes";
import { CONTRACT_STATUS, type ContractStatus } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import {
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING,
  CUSTOMER,
  MEAL_COMPANY,
} from "@/mocks/contracts";

const CONTRACTS: {
  number: string;
  customer: string;
  total: number;
  paid: number;
  deadline: string;
  status: ContractStatus;
}[] = [
  {
    number: CONTRACT_WEDDING.number,
    customer: CUSTOMER.name,
    total: CONTRACT_WEDDING.total,
    paid: 0,
    deadline: CONTRACT_WEDDING.depositDeadline ?? "",
    status: CONTRACT_STATUS.AwaitingConfirmationAndDeposit,
  },
  {
    number: CONTRACT_HOUSEWARMING.number,
    customer: "Lý Hoàng Nam",
    total: CONTRACT_HOUSEWARMING.total,
    paid: 18000000,
    deadline: "Đã đủ",
    status: CONTRACT_STATUS.Active,
  },
  {
    number: "HD-2026-0097",
    customer: "Công ty Minh Long",
    total: MEAL_COMPANY.price.total,
    paid: 12000000,
    deadline: "Đã đủ",
    status: CONTRACT_STATUS.Active,
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

const OPENABLE: Record<string, string> = {
  [CONTRACT_WEDDING.number]: ROUTES.workspaceContract(CONTRACT_WEDDING.number),
  [CONTRACT_HOUSEWARMING.number]: `${ROUTES.workspaceContract(CONTRACT_HOUSEWARMING.number)}?tab=addendum`,
};

export function ContractTable() {
  return (
    <>
      <PanelHeader
        title="Hợp đồng"
        subtitle="Tra cứu hợp đồng, phụ lục và giao dịch"
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
        rows={CONTRACTS.map((row) => [
          <span key="number" className="text-code">
            {row.number}
          </span>,
          row.customer,
          formatMoney(row.total),
          formatMoney(row.paid),
          row.deadline,
          <StatusBadge key="status" domain="contract" status={row.status} />,
        ])}
        rowActions={CONTRACTS.map((row) =>
          OPENABLE[row.number]
            ? { href: OPENABLE[row.number] }
            : { toast: "Bản mẫu chỉ mở HD-2026-0142 và HD-2026-0128" },
        )}
      />
    </>
  );
}
