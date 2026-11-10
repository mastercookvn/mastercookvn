"use client";

import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import type { Assignment } from "@/mocks/operationMeals";

export function AssignmentTable({
  mealId,
  assignments,
}: {
  mealId: string;
  assignments: Assignment[];
}) {
  const showToast = useToast();

  if (assignments.length === 0) {
    return (
      <EmptyState>
        <p className="text-soft">Chưa phân công ai cho bữa này.</p>
      </EmptyState>
    );
  }

  return (
    <DataTable
      columns={["Nhân viên", "Vị trí", "Nhiệm vụ", "Giờ làm", ""]}
      rows={assignments.map((row, index) => [
        row.staff,
        row.position,
        <span key="task" className="text-soft">
          {row.task}
        </span>,
        row.hours,
        <Button
          key="remove"
          size="sm"
          onClick={() => {
            const current = readDemoState().assignments;
            updateDemoState({
              assignments: {
                ...current,
                [mealId]: current[mealId].filter((_, i) => i !== index),
              },
            });
            showToast(`Đã bỏ phân công ${row.staff}`);
          }}
        >
          Bỏ
        </Button>,
      ])}
    />
  );
}
