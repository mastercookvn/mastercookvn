// BR09: adjusting one meal of an active contract through an addendum.
import { BUSINESS_SETTINGS } from "@/constants/settings";

import { calculateMealPrice, type ServiceLine } from "./pricing";

export const CHECK_RESULT = {
  Pass: "pass",
  Fail: "fail",
  NotNeeded: "not-needed",
} as const;

export type CheckResult = (typeof CHECK_RESULT)[keyof typeof CHECK_RESULT];

export type AddendumCheck = {
  key: string;
  label: string;
  result: CheckResult;
  detail: string;
};

export type AddendumInput = {
  daysLeft: number;
  dishesTotal: number;
  guestsPerTable: number;
  services: ServiceLine[];
  tablesBefore: number;
  tablesAfter: number;
  /** Price change per standard table when one chosen dish is swapped. */
  dishSwapDelta: number | null;
  hasOtherPendingAddendum: boolean;
};

export function maxTableReduction(tablesBefore: number) {
  return Math.floor(tablesBefore * BUSINESS_SETTINGS.maxTableReductionRate);
}

export function evaluateAddendum(input: AddendumInput) {
  const {
    daysLeft,
    dishesTotal,
    guestsPerTable,
    services,
    tablesBefore,
    tablesAfter,
    dishSwapDelta,
    hasOtherPendingAddendum,
  } = input;
  const tablesChanged = tablesAfter !== tablesBefore;
  const dishChanged = dishSwapDelta !== null;
  const added = tablesAfter - tablesBefore;
  const reduction = maxTableReduction(tablesBefore);
  const { tableChangeCutoffDays, dishChangeCutoffDays } = BUSINESS_SETTINGS;

  const checks: AddendumCheck[] = [
    {
      key: "change",
      label: "Có nội dung thay đổi",
      result:
        tablesChanged || dishChanged ? CHECK_RESULT.Pass : CHECK_RESULT.Fail,
      detail: "Đổi số bàn ăn hoặc đổi một món đã chọn. Không dời ngày.",
    },
    {
      key: "tables-deadline",
      label: `Đổi bàn: còn ít nhất ${tableChangeCutoffDays} ngày`,
      result: !tablesChanged
        ? CHECK_RESULT.NotNeeded
        : daysLeft >= tableChangeCutoffDays
          ? CHECK_RESULT.Pass
          : CHECK_RESULT.Fail,
      detail: `Còn ${daysLeft} ngày tới giờ bắt đầu bữa.`,
    },
    {
      key: "tables-reduction",
      label: `Giảm tối đa ${reduction} bàn (15% số bàn ký ban đầu)`,
      result:
        added >= 0
          ? CHECK_RESULT.NotNeeded
          : -added <= reduction
            ? CHECK_RESULT.Pass
            : CHECK_RESULT.Fail,
      detail: `Ký ban đầu ${tablesBefore} bàn, đang giảm ${Math.max(0, -added)} bàn.`,
    },
    {
      key: "dish-deadline",
      label: `Đổi món: còn ít nhất ${dishChangeCutoffDays} ngày`,
      result: !dishChanged
        ? CHECK_RESULT.NotNeeded
        : daysLeft >= dishChangeCutoffDays
          ? CHECK_RESULT.Pass
          : CHECK_RESULT.Fail,
      detail: "Chỉ đổi món đã chọn, không thêm món mới.",
    },
    {
      key: "resources",
      label: "Còn đủ nhân sự, dụng cụ cho phần tăng",
      result: added > 0 ? CHECK_RESULT.Pass : CHECK_RESULT.NotNeeded,
      detail: "Kiểm tra lại cùng các bữa chồng giờ trước khi áp dụng.",
    },
    {
      key: "pending",
      label: "Bữa không có phụ lục khác đang chờ",
      result: hasOtherPendingAddendum ? CHECK_RESULT.Fail : CHECK_RESULT.Pass,
      detail: "Mỗi bữa chỉ một phụ lục chờ xác nhận tại một thời điểm.",
    },
  ];

  const priceFor = (tables: number, dishes: number) =>
    calculateMealPrice({
      dishesTotal: dishes,
      servingTables: tables,
      guestsPerTable,
      services,
    }).total;

  const totalBefore = priceFor(tablesBefore, dishesTotal);
  const totalAfter = priceFor(tablesAfter, dishesTotal + (dishSwapDelta ?? 0));
  const difference = totalAfter - totalBefore;
  const needsExtraDeposit =
    added > BUSINESS_SETTINGS.extraDepositTableThreshold;
  const addedTablesValue =
    priceFor(tablesAfter, dishesTotal) - priceFor(tablesBefore, dishesTotal);

  return {
    checks,
    canSend: checks.every((check) => check.result !== CHECK_RESULT.Fail),
    totalBefore,
    totalAfter,
    difference,
    needsExtraDeposit,
    extraDeposit: needsExtraDeposit
      ? addedTablesValue * BUSINESS_SETTINGS.minimumDepositRate
      : 0,
  };
}
