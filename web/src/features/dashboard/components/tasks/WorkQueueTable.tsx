import { DataTable } from "@/components/ui/DataTable";
import { ROLE_SHORT_LABEL } from "@/constants/roles";

import type { WorkTask } from "@/features/dashboard/lib/workTasks";

export function WorkQueueTable({
  tasks,
  showGroup,
}: {
  tasks: WorkTask[];
  showGroup: boolean;
}) {
  return (
    <div className="l-stack gap-1.5">
      <div className="l-between">
        <h2 className="text-17 font-bold">{tasks.length} việc cần xử lý</h2>
        <span className="text-small text-soft">Sắp theo hạn</span>
      </div>
      <DataTable
        columns={[
          ...(showGroup ? ["Nhóm"] : []),
          "Việc",
          "Đối tượng",
          "Hạn",
          "Trạng thái",
        ]}
        rows={tasks.map((task) => [
          ...(showGroup
            ? [
                <span key="group" className="text-soft whitespace-nowrap">
                  {ROLE_SHORT_LABEL[task.role]}
                </span>,
              ]
            : []),
          task.title,
          <span key="subject" className="text-soft">
            {task.subject}
          </span>,
          task.due.includes("Quá") ? (
            <span
              key="due"
              className="font-semibold whitespace-nowrap text-error"
            >
              {task.due}
            </span>
          ) : (
            <span key="due" className="whitespace-nowrap">
              {task.due}
            </span>
          ),
          task.status,
        ])}
        rowActions={tasks.map((task) => ({ href: task.href }))}
      />
    </div>
  );
}
