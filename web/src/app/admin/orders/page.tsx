import type { Metadata } from "next";

import { OrderListPage } from "@/features/orders/pages/OrderListPage";

export const metadata: Metadata = { title: "Đơn đặt tiệc" };

export default function Page() {
  return <OrderListPage />;
}
