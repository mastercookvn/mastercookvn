import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { ORDER_ON_BEHALF_ROLES } from "@/constants/permissions";
import { hasAnyRole } from "@/constants/roles";
import { getStaffRoles } from "@/lib/auth";

import { OrderListPanel } from "../components/list/OrderListPanel";

export async function OrderListPage() {
  const roles = await getStaffRoles();

  return (
    <WorkspaceTabs
      screen="orders"
      panels={{
        list: (
          <OrderListPanel
            canCreate={hasAnyRole(roles, ORDER_ON_BEHALF_ROLES)}
          />
        ),
      }}
    />
  );
}
