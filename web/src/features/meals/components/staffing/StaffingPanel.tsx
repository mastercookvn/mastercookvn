"use client";

import { useState } from "react";

import { AddButton } from "@/components/ui/AddButton";
import { Drawer } from "@/components/ui/Drawer";
import { KpiBar } from "@/components/ui/KpiBar";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { MEAL_STATUS } from "@/constants/statuses";
import { servingStaffNeeded } from "@/lib/pricing";
import { useDemoState } from "@/mocks/demoStore";
import type { Assignment, OperationMeal } from "@/mocks/operationMeals";

import { MealStageNotice } from "../MealStageNotice";

import { AssignmentForm } from "./AssignmentForm";
import { AssignmentTable } from "./AssignmentTable";

const NO_ASSIGNMENTS: Assignment[] = [];

const FORM_ID = "assignment-form";

const CLOSED_STAGES: string[] = [
  MEAL_STATUS.AwaitingCount,
  MEAL_STATUS.AwaitingSettlement,
  MEAL_STATUS.Completed,
];

export function StaffingPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const assignments = useDemoState(
    (state) => state.assignments[meal.id] ?? NO_ASSIGNMENTS
  );
  const [adding, setAdding] = useState(false);

  if (CLOSED_STAGES.includes(status)) {
    return (
      <MealStageNotice message="Bữa đã kết thúc, phân công chỉ còn để xem lại." />
    );
  }

  const count = (position: string) =>
    assignments.filter((row) => row.position === position).length;

  return (
    <>
      <PanelHeader
        title="Phân công nhân sự"
        count={assignments.length}
        subtitle="Trùng giờ sẽ bị từ chối. Gợi ý số người không chặn cứng."
        actions={
          <AddButton onClick={() => setAdding(true)}>Thêm phân công</AddButton>
        }
      />
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
      <AssignmentTable mealId={meal.id} assignments={assignments} />
      <Drawer
        open={adding}
        onOpenChange={setAdding}
        title="Thêm phân công"
        description={`Bữa ${meal.time}. Báo nhân viên qua Zalo hoặc điện thoại sau khi lưu.`}
        formId={FORM_ID}
        submitLabel="Lưu phân công"
      >
        {adding ? (
          <AssignmentForm
            formId={FORM_ID}
            meal={meal}
            onSaved={() => setAdding(false)}
          />
        ) : null}
      </Drawer>
    </>
  );
}
