import type { Metadata } from "next";

import { ContractSelfServicePage } from "@/features/contracts/pages/ContractSelfServicePage";

export const metadata: Metadata = { title: "Hợp đồng" };

export default async function Page({
  params,
}: PageProps<"/account/contracts/[number]">) {
  const { number } = await params;
  return <ContractSelfServicePage number={number} />;
}
