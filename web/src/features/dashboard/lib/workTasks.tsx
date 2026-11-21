import type { ReactNode } from "react";

import { ROLE, type Role } from "@/constants/roles";

export type WorkTask = {
  role: Role;
  title: string;
  subject: string;
  due: string;
  status: ReactNode;
  href: string;
};

// Placeholder until the dashboard API exists.
export const WORK_TASKS: WorkTask[] = [];

export function dueRank(due: string): number {
  if (due.includes("Quá")) return 0;
  if (due === "Hôm nay") return 1;
  if (due === "Sớm nhất") return 2;
  if (due === "Đầu tháng") return 3;
  return 4 + Number.parseInt(due, 10) + (due.length > 5 ? 0 : 0.5);
}

const NO_DATA = "—";

// Placeholder until the dashboard API exists.
export const KPI_BY_ROLE: Record<Role, { label: string; value: ReactNode }[]> =
  {
    [ROLE.Consultant]: [
      { label: "Đơn chờ nhận", value: NO_DATA },
      { label: "Chờ ký và cọc", value: NO_DATA },
      { label: "Phụ lục chờ", value: NO_DATA },
      { label: "Tiệc trong 45 ngày", value: NO_DATA },
    ],
    [ROLE.Accountant]: [
      { label: "Cần thu", value: NO_DATA },
      { label: "Cần hoàn", value: NO_DATA },
      { label: "Chờ quyết toán", value: NO_DATA },
      { label: "Food cost kỳ gần nhất", value: NO_DATA },
    ],
    [ROLE.Storekeeper]: [
      { label: "Cần xuất", value: NO_DATA },
      { label: "Chờ kiểm đếm", value: NO_DATA },
      { label: "Dưới tối thiểu", value: NO_DATA },
      { label: "Kỳ kiểm kê", value: NO_DATA },
    ],
    [ROLE.HrManager]: [
      { label: "Bữa thiếu người", value: NO_DATA },
      { label: "Nhân sự đang làm", value: NO_DATA },
      { label: "Tiệc trong 45 ngày", value: NO_DATA },
      { label: "Phân công hôm nay", value: NO_DATA },
    ],
    [ROLE.BranchManager]: [
      { label: "Tiệc trong 45 ngày", value: NO_DATA },
      { label: "Cần thu", value: NO_DATA },
      { label: "Food cost kỳ gần nhất", value: NO_DATA },
      { label: "Đề xuất giá chờ", value: NO_DATA },
    ],
  };
