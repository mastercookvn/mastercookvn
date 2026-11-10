import { NoPermissionState } from "@/components/layout/workspace/NoPermissionState";
import { canViewScreen } from "@/constants/permissions";
import { getStaffRoles } from "@/lib/auth";

import { StaffTable } from "../components/StaffTable";

export async function StaffPage() {
  const roles = await getStaffRoles();
  if (!canViewScreen("staff", roles)) {
    return <NoPermissionState roles={roles} />;
  }

  return <StaffTable />;
}
