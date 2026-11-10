import type { Metadata } from "next";

import { ContractManagementPage } from "@/features/contracts/pages/ContractManagementPage";

export const metadata: Metadata = { title: "Chi tiết hợp đồng" };

export default function Page() {
  return <ContractManagementPage />;
}
