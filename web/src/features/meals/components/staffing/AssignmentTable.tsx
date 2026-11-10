import { DataTable } from "@/components/ui/DataTable";
import { ToastButton } from "@/components/ui/ToastButton";

import type { Assignment } from "../../lib/assignments";

export function AssignmentTable({
  assignments,
}: {
  assignments: Assignment[];
}) {
  return (
    <DataTable
      columns={["Nhân viên", "Vị trí", "Nhiệm vụ", "Giờ làm", ""]}
      rows={assignments.map((row) => [
        row.staff,
        row.position,
        <span key="task" className="text-soft">
          {row.task}
        </span>,
        row.hours,
        <ToastButton key="remove" size="sm" message="Đã bỏ phân công">
          Bỏ
        </ToastButton>,
      ])}
    />
  );
}
