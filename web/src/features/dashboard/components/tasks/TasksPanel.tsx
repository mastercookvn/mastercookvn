import { KpiBar } from "@/components/ui/KpiBar";
import { ROLE } from "@/constants/roles";
import { getStaffRoles } from "@/lib/auth";

import {
  dueRank,
  KPI_BY_ROLE,
  WORK_TASKS,
} from "@/features/dashboard/lib/workTasks";

import { StockAlertList } from "./StockAlertList";
import { UpcomingMealList } from "./UpcomingMealList";
import { WorkQueueTable } from "./WorkQueueTable";

export async function TasksPanel() {
  const roles = await getStaffRoles();
  const isManager = roles.includes(ROLE.BranchManager);
  const tasks = WORK_TASKS.filter(
    (task) => isManager || roles.includes(task.role),
  ).sort((a, b) => dueRank(a.due) - dueRank(b.due));
  const kpis =
    KPI_BY_ROLE[isManager ? ROLE.BranchManager : (roles[0] ?? ROLE.Consultant)];

  return (
    <>
      <KpiBar items={kpis} />
      <div className="l-grid l-grid-decision">
        <WorkQueueTable
          tasks={tasks}
          showGroup={isManager || roles.length > 1}
        />
        <div className="l-stack">
          <UpcomingMealList />
          <StockAlertList />
        </div>
      </div>
    </>
  );
}
