import type { Metadata } from "next";

import { OrderDetailPage } from "@/features/orders/pages/OrderDetailPage";

export const metadata: Metadata = { title: "Chi tiết đơn" };

export default async function Page({
  params,
}: PageProps<"/admin/orders/[code]">) {
  const { code } = await params;
  return <OrderDetailPage code={decodeURIComponent(code)} />;
}
