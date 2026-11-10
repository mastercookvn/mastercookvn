"use client";

import { KpiBar } from "@/components/ui/KpiBar";
import { MEAL_STATUS } from "@/constants/statuses";
import { servingStaffNeeded } from "@/lib/pricing";
import { useDemoState } from "@/mocks/demoStore";
import type { OperationMeal } from "@/mocks/operationMeals";

import { assignmentsForMeal } from "../../lib/assignments";
import { MealStageNotice } from "../MealStageNotice";

import { AssignmentForm } from "./AssignmentForm";
import { AssignmentTable } from "./AssignmentTable";

const CLOSED_STAGES: string[] = [
  MEAL_STATUS.AwaitingCount,
  MEAL_STATUS.AwaitingSettlement,
  MEAL_STATUS.Completed,
];

export function StaffingPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);

  if (CLOSED_STAGES.includes(status)) {
    return (
      <MealStageNotice message="Bữa đã kết thúc, phân công chỉ còn để xem lại." />
    );
  }

  const assignments = assignmentsForMeal(meal.id);
  const count = (position: string) =>
    assignments.filter((row) => row.position === position).length;

  return (
    <>
      <KpiBar
        items={[
          {
            label: "Phục vụ (gợi ý bàn bố trí / 3)",
            value: `${count("Phục vụ")} / ${servingStaffNeeded(meal.setupTables)}`,
          },
          { label: "Bếp", value: `${count("Bếp")} / 2` },
          { label: "Vận chuyển", value: `${count("Vận chuyển")} / 1` },
        ]}
      />
      <div className="l-grid l-grid-decision">
        <AssignmentTable assignments={assignments} />
        <AssignmentForm meal={meal} />
      </div>
    </>
  );
}
