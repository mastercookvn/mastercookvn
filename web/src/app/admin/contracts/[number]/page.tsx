import type { Metadata } from "next";

import { ContractManagementPage } from "@/features/contracts/pages/ContractManagementPage";

export const metadata: Metadata = { title: "Chi tiết hợp đồng" };

export default async function Page({
  params,
}: PageProps<"/admin/contracts/[number]">) {
  const { number } = await params;
  return <ContractManagementPage number={decodeURIComponent(number)} />;
}
