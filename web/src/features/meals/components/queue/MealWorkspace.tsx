import { Suspense, type ReactNode } from "react";

import { NoPermissionState } from "@/components/layout/workspace/NoPermissionState";
import { canViewScreen } from "@/constants/permissions";
import { getStaffRoles } from "@/lib/auth";

import { MealQueue } from "./MealQueue";

async function MealWorkspaceContent({ children }: { children: ReactNode }) {
  const roles = await getStaffRoles();
  if (!canViewScreen("meals", roles)) {
    return <NoPermissionState roles={roles} />;
  }

  return (
    <>
      <h1 className="h1-compact">Vận hành bữa</h1>
      <div className="l-grid l-grid-meals">
        <MealQueue roles={roles} />
        <div className="l-stack">{children}</div>
      </div>
    </>
  );
}

export function MealWorkspace({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MealWorkspaceContent>{children}</MealWorkspaceContent>
    </Suspense>
  );
}
