import { notFound } from "next/navigation";

import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { getStaffRoles } from "@/lib/auth";
import { operationMealById } from "@/mocks/operationMeals";

import { CountPanel } from "../components/count/CountPanel";
import { EquipmentIssueTable } from "../components/issue/EquipmentIssueTable";
import { MealHeader } from "../components/MealHeader";
import { ProgressStepper } from "../components/progress/ProgressStepper";
import { StaffingPanel } from "../components/staffing/StaffingPanel";

export async function MealPage({ id }: { id: string }) {
  const meal = operationMealById(id);
  if (!meal) notFound();
  const roles = await getStaffRoles();

  return (
    <WorkspaceTabs
      screen="meals"
      showTitle={false}
      header={<MealHeader meal={meal} roles={roles} />}
      panels={{
        progress: <ProgressStepper meal={meal} />,
        staffing: <StaffingPanel meal={meal} />,
        issue: <EquipmentIssueTable meal={meal} />,
        count: <CountPanel meal={meal} />,
      }}
    />
  );
}
