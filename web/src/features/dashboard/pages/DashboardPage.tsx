import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { CalendarPanel } from "../components/calendar/CalendarPanel";
import { TasksPanel } from "../components/tasks/TasksPanel";

export function DashboardPage() {
  return (
    <WorkspaceTabs
      screen="dashboard"
      panels={{ tasks: <TasksPanel />, calendar: <CalendarPanel /> }}
    />
  );
}
