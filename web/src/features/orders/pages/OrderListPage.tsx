import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { OrderListPanel } from "../components/list/OrderListPanel";
import { OnBehalfOrderPanel } from "../components/on-behalf/OnBehalfOrderPanel";

export function OrderListPage() {
  return (
    <WorkspaceTabs
      screen="orders"
      panels={{ list: <OrderListPanel />, new: <OnBehalfOrderPanel /> }}
    />
  );
}
