import { notFound } from "next/navigation";

import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { operationMealById } from "@/mocks/operationMeals";

import { CountPanel } from "../components/count/CountPanel";
import { EquipmentIssueTable } from "../components/issue/EquipmentIssueTable";
import { MealHeader } from "../components/MealHeader";
import { ProgressStepper } from "../components/progress/ProgressStepper";
import { StaffingPanel } from "../components/staffing/StaffingPanel";

export function MealPage({ id }: { id: string }) {
  const meal = operationMealById(id);
  if (!meal) notFound();

  return (
    <WorkspaceTabs
      screen="meals"
      showTitle={false}
      headerGap="gap-3"
      header={<MealHeader meal={meal} />}
      panels={{
        progress: <ProgressStepper meal={meal} />,
        staffing: <StaffingPanel meal={meal} />,
        issue: <EquipmentIssueTable meal={meal} />,
        count: <CountPanel meal={meal} />,
      }}
    />
  );
}
