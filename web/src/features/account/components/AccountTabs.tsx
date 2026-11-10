import { Tabs } from "@/components/ui/Tabs";

import { OrderList } from "@/features/account/components/orders/OrderList";
import { ProfileForm } from "@/features/account/components/profile/ProfileForm";

const ITEMS = [
  { value: "orders", label: "Đơn của tôi" },
  { value: "profile", label: "Thông tin tài khoản" },
];

export function AccountTabs({
  customer,
}: {
  customer: { name: string; phone: string };
}) {
  return (
    <Tabs
      items={ITEMS}
      panelClassName="tab-panel page-stack"
      panels={{
        orders: <OrderList />,
        profile: <ProfileForm customer={customer} />,
      }}
    />
  );
}
