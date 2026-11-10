import type { Metadata } from "next";

import { ContractListPage } from "@/features/contracts/pages/ContractListPage";

export const metadata: Metadata = { title: "Hợp đồng" };

export default function Page() {
  return <ContractListPage />;
}
