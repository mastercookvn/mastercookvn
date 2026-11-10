"use client";

import { ROUTES } from "@/constants/routes";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING, SETTLEMENT_COMPANY } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";
import {
  COUNT_REPORT_STATUS,
  countReportCompensation,
} from "@/mocks/equipment";
import { OPERATION_MEALS } from "@/mocks/operationMeals";

export type CustomerNotice = {
  id: string;
  tone: "wait" | "info" | "good";
  message: string;
  href: string;
  actionLabel: string;
};

/** In-app only: Zalo, SMS and email reminders are out of scope (section 1). */
export function useCustomerNotices(): CustomerNotice[] {
  const weddingActive = useDemoState(
    (state) => state.depositPaid && state.contractConfirmed
  );
  const settlementStatus = useDemoState((state) => state.settlementStatus);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const countReports = useDemoState((state) => state.countReports);

  const notices: CustomerNotice[] = [];

  for (const meal of OPERATION_MEALS) {
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

  if (settlementStatus === SETTLEMENT_STATUS.Invoiced) {
    notices.push({
      id: "settlement-invoice",
      tone: "info",
      message: `Kế toán đã quyết toán đơn ${SETTLEMENT_COMPANY.orderCode} và gửi hóa đơn ${SETTLEMENT_COMPANY.invoiceNumber}. Số dư cần thanh toán ${formatMoney(SETTLEMENT_COMPANY.balance - settlementPaid)}.`,
      href: `${ROUTES.contract(SETTLEMENT_COMPANY.contractNumber)}?tab=invoice`,
      actionLabel: "Xem hóa đơn và thanh toán",
    });
  }

  if (!weddingActive) {
    notices.push({
      id: "wedding-deposit",
      tone: "wait",
      message: `Hợp đồng ${CONTRACT_WEDDING.number} cần xác nhận và cọc trước ${CONTRACT_WEDDING.depositDeadline}.`,
      href: `${ROUTES.contract(CONTRACT_WEDDING.number)}?tab=payment`,
      actionLabel: "Xác nhận và cọc",
    });
  }

  return notices;
}
