"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import { EQUIPMENT_ISSUE_STATUS, MEAL_STATUS } from "@/constants/statuses";
import { useDemoState } from "@/mocks/demoStore";
import { COUNT_REPORT_ROWS } from "@/mocks/equipment";
import type { OperationMeal } from "@/mocks/operationMeals";

import { countRowProblem } from "../../lib/countRowProblem";
import { MealStageNotice } from "../MealStageNotice";

import { CountReportTable } from "./CountReportTable";

export function CountPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const [rows, setRows] = useState(COUNT_REPORT_ROWS);

  if (status !== MEAL_STATUS.AwaitingCount) {
    return (
      <MealStageNotice message="Biên bản kiểm đếm mở sau khi kết thúc phục vụ." />
    );
  }

  return (
    <>
      <div className="l-between">
        <div className="l-stack gap-0.5" />
        <div className="l-row gap-2">
          <StatusBadge
            domain="equipmentIssue"
            status={EQUIPMENT_ISSUE_STATUS.Issued}
          />
          <ToastButton
            variant="primary"
            disabled={rows.some(countRowProblem)}
            message="Đã xác nhận biên bản. Bữa chuyển sang Chờ quyết toán."
          >
            Xác nhận biên bản
          </ToastButton>
        </div>
      </div>
      <CountReportTable rows={rows} onChange={setRows} />
      <p className="text-small text-soft">
        Tốt + hư + mất phải bằng số đã xuất. Khách chịu không vượt hư + mất. Hư
        do nhân viên ghi khách chịu bằng 0.
      </p>
    </>
  );
}
