import type { Metadata } from "next";

import { LookupPage } from "@/features/lookup/pages/LookupPage";

export const metadata: Metadata = { title: "Tra cứu đơn, hợp đồng" };

export default function Page() {
  return <LookupPage />;
}
