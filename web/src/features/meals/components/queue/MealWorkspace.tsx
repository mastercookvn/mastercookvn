import { Suspense, type ReactNode } from "react";

import { NoPermissionState } from "@/components/layout/workspace/NoPermissionState";
import { canViewScreen } from "@/constants/permissions";
import { getStaffRoles } from "@/lib/auth";

async function MealWorkspaceContent({ children }: { children: ReactNode }) {
  const roles = await getStaffRoles();
  if (!canViewScreen("meals", roles)) {
    return <NoPermissionState roles={roles} />;
  }

  return children;
}

export function MealWorkspace({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MealWorkspaceContent>{children}</MealWorkspaceContent>
    </Suspense>
  );
}
