import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROLE, type Role } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import {
  CONTRACT_STATUS,
  INVENTORY_PERIOD_STATUS,
  MEAL_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/constants/statuses";
import { formatMoney, formatPercent } from "@/lib/format";
import {
  CONTRACT_WEDDING,
  CUSTOMER,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";
import { INVENTORY_PERIOD } from "@/mocks/inventory";

export type WorkTask = {
  role: Role;
  title: string;
  subject: string;
  due: string;
  status: ReactNode;
  href: string;
};

const orderPending = (
  <StatusBadge domain="order" status={ORDER_STATUS.Pending} />
);
const REFUND_TOTAL = 11500000;
const RECEIVABLE_TOTAL =
  CONTRACT_WEDDING.total * 0.5 + SETTLEMENT_COMPANY.balance;

export const WORK_TASKS: WorkTask[] = [
  {
    role: ROLE.Consultant,
    title: "Khảo sát và nhận đơn DH-0142 (2 bữa)",
    subject: CUSTOMER.name,
    due: "Hôm nay",
    status: orderPending,
    href: ROUTES.workspaceOrder("DH-0142"),
  },
  {
    role: ROLE.Consultant,
    title: "Khảo sát đơn DH-0151 (1 bữa, 28/11)",
    subject: "Nguyễn Minh Đức",
    due: "06/11",
    status: orderPending,
    href: ROUTES.workspaceOrders,
  },
  {
    role: ROLE.Consultant,
    title: "Chờ khách ký và cọc HD-2026-0142",
    subject: CUSTOMER.name,
    due: "06/11 08:30",
    status: (
      <StatusBadge
        domain="contract"
        status={CONTRACT_STATUS.AwaitingConfirmationAndDeposit}
      />
    ),
    href: ROUTES.workspaceContract("HD-2026-0142"),
  },
  {
    role: ROLE.Consultant,
    title: "Phụ lục PL-0128-01 chờ khách xác nhận",
    subject: "Lý Hoàng Nam",
    due: "19/11",
    status: orderPending,
    href: `${ROUTES.workspaceContract("HD-2026-0128")}?tab=addendum`,
  },
  {
    role: ROLE.Accountant,
    title: `Thu cọc HD-2026-0142: ${formatMoney(CONTRACT_WEDDING.total * 0.5)}`,
    subject: CUSTOMER.name,
    due: "06/11 08:30",
    status: <StatusBadge domain="payment" status={PAYMENT_STATUS.Pending} />,
    href: `${ROUTES.workspaceContract("HD-2026-0142")}?tab=payment`,
  },
  {
    role: ROLE.Accountant,
    title: `Quyết toán DH-0097, còn thu ${formatMoney(SETTLEMENT_COMPANY.balance)}`,
    subject: "Công ty Minh Long",
    due: "Quá 11 ngày",
    status: (
      <StatusBadge domain="meal" status={MEAL_STATUS.AwaitingSettlement} />
    ),
    href: `${ROUTES.workspaceContract("HD-2026-0097")}?tab=settlement`,
  },
  {
    role: ROLE.Accountant,
    title: `Ghi 2 khoản hoàn, tổng ${formatMoney(REFUND_TOTAL)}`,
    subject: "2 khách",
    due: "Sớm nhất",
    status: <Badge tone="error">Phải hoàn</Badge>,
    href: `${ROUTES.workspaceContracts}?tab=refunds`,
  },
  {
    role: ROLE.Accountant,
    title: "Chốt kỳ nguyên liệu 10/2026",
    subject: `Food cost ${formatPercent(INVENTORY_PERIOD.foodCost)}`,
    due: "Đầu tháng",
    status: (
      <StatusBadge
        domain="inventoryPeriod"
        status={INVENTORY_PERIOD_STATUS.AwaitingClose}
      />
    ),
    href: `${ROUTES.workspaceIngredients}?tab=closing`,
  },
  {
    role: ROLE.Storekeeper,
    title: "Kiểm đếm dụng cụ bữa 01/11 (DH-0120)",
    subject: "Tiệc họp mặt, 9 bàn",
    due: "Quá 4 ngày",
    status: <StatusBadge domain="meal" status={MEAL_STATUS.AwaitingCount} />,
    href: `${ROUTES.workspaceMeal("0120")}?tab=count`,
  },
  {
    role: ROLE.Storekeeper,
    title: "Xuất dụng cụ bữa 22/11 (DH-0128)",
    subject: "Tân gia, 12 bàn ăn",
    due: "21/11",
    status: <StatusBadge domain="meal" status={MEAL_STATUS.Preparing} />,
    href: `${ROUTES.workspaceMeal("0128")}?tab=issue`,
  },
  {
    role: ROLE.HrManager,
    title: "Phân công bữa 15/11: phục vụ 1/3",
    subject: "Họp mặt, 20 bàn ăn",
    due: "14/11",
    status: <Badge tone="error">Thiếu 2</Badge>,
    href: `${ROUTES.workspaceMeal("0115")}?tab=staffing`,
  },
  {
    role: ROLE.BranchManager,
    title: "Xử lý đợt đề xuất giá 11/2026: 4 dòng",
    subject: "Nguyên liệu",
    due: "Đầu tháng",
    status: <Badge tone="wait">Chưa xử lý</Badge>,
    href: `${ROUTES.workspaceIngredients}?tab=pricing`,
  },
];

export function dueRank(due: string): number {
  if (due.includes("Quá")) return 0;
  if (due === "Hôm nay") return 1;
  if (due === "Sớm nhất") return 2;
  if (due === "Đầu tháng") return 3;
  return 4 + Number.parseInt(due, 10) + (due.length > 5 ? 0 : 0.5);
}

const food = formatPercent(INVENTORY_PERIOD.foodCost);

export const KPI_BY_ROLE: Record<Role, { label: string; value: ReactNode }[]> =
  {
    CONSULTANT: [
      { label: "Đơn chờ nhận", value: 2 },
      { label: "Chờ ký và cọc", value: 1 },
      { label: "Phụ lục chờ", value: 1 },
      { label: "Tiệc trong 45 ngày", value: 4 },
    ],
    ACCOUNTANT: [
      { label: "Cần thu", value: formatMoney(RECEIVABLE_TOTAL) },
      { label: "Cần hoàn", value: formatMoney(REFUND_TOTAL) },
      { label: "Chờ quyết toán", value: 1 },
      { label: "Food cost 10/2026", value: food },
    ],
    STOREKEEPER: [
      { label: "Cần xuất", value: 1 },
      { label: "Chờ kiểm đếm", value: 1 },
      { label: "Dưới tối thiểu", value: 1 },
      { label: "Kỳ kiểm kê", value: "10/2026" },
    ],
    HR_MANAGER: [
      { label: "Bữa thiếu người", value: 1 },
      { label: "Nhân sự đang làm", value: 6 },
      { label: "Tiệc trong 45 ngày", value: 4 },
      { label: "Phân công hôm nay", value: 0 },
    ],
    BRANCH_MANAGER: [
      { label: "Tiệc trong 45 ngày", value: 4 },
      { label: "Cần thu", value: formatMoney(RECEIVABLE_TOTAL) },
      { label: "Food cost 10/2026", value: food },
      { label: "Đề xuất giá chờ", value: 4 },
    ],
  };
