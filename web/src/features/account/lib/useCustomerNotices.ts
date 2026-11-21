"use client";

import { ROUTES } from "@/constants/routes";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { useDemoState } from "@/lib/demoStore";
import { COUNT_REPORT_STATUS } from "@/constants/equipment";
import { countReportCompensation } from "@/models/equipment";
import { listContracts } from "@/features/contracts/lib/contractRepository";
import {
  isAwaitingContract,
  isAwaitingSettlement,
} from "@/features/contracts/lib/contractState";
import { buildSettlement } from "@/features/contracts/lib/settlement";
import { listOperationMeals } from "@/features/meals/lib/operationMeals";

export type CustomerNotice = {
  id: string;
  tone: "wait" | "info" | "good";
  message: string;
  href: string;
  actionLabel: string;
};

/** In-app only: Zalo, SMS and email reminders are out of scope (section 1). */
export function useCustomerNotices(): CustomerNotice[] {
  const settlementStatus = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const countReports = useDemoState((state) => state.countReports);

  const notices: CustomerNotice[] = [];

  for (const meal of listOperationMeals()) {
    const report = countReports[meal.id];
    if (report?.status !== COUNT_REPORT_STATUS.Confirmed) continue;
    const damagedOrLost = report.rows.reduce(
      (sum, row) => sum + row.damaged + row.lost,
      0
    );
    const compensation = countReportCompensation(report.rows);
    notices.push({
      id: `count-report-${meal.id}`,
      tone: compensation > 0 ? "wait" : "info",
      message:
        compensation > 0
          ? `Biên bản kiểm đếm ${meal.name} (${meal.orderCode}, ${meal.date}) đã chốt: ${damagedOrLost} dụng cụ hư, mất; khách chịu bồi thường ${formatMoney(compensation)}, cộng vào quyết toán bữa. Đại diện ${report.customerName} đã ký xác nhận.`
          : `Biên bản kiểm đếm ${meal.name} (${meal.orderCode}, ${meal.date}) đã chốt, không phát sinh bồi thường.`,
      href: ROUTES.account,
      actionLabel: "Xem đơn",
    });
  }

  for (const contract of listContracts()) {
    if (
      isAwaitingSettlement(contract) &&
      settlementStatus === SETTLEMENT_STATUS.Invoiced
    ) {
      const settlement = buildSettlement(contract);
      notices.push({
        id: `settlement-invoice-${contract.number}`,
        tone: "info",
        message: `Kế toán đã quyết toán đơn ${contract.orderCode} và gửi hóa đơn. Số dư cần thanh toán ${formatMoney(settlement.balance - settlementPaid)}.`,
        href: `${ROUTES.contract(contract.number)}?tab=invoice`,
        actionLabel: "Xem hóa đơn và thanh toán",
      });
    }

    if (isAwaitingContract(contract)) {
      notices.push({
        id: `deposit-${contract.number}`,
        tone: "wait",
        message: `Hợp đồng ${contract.number} cần xác nhận và cọc trước ${contract.depositDeadline ?? "hạn giữ chỗ"}.`,
        href: `${ROUTES.contract(contract.number)}?tab=payment`,
        actionLabel: "Xác nhận và cọc",
      });
    }
  }

  return notices;
}
