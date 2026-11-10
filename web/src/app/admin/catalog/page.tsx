import type { Metadata } from "next";

import { CatalogPage } from "@/features/catalog/pages/CatalogPage";

export const metadata: Metadata = { title: "Thực đơn và dịch vụ" };

export default function Page() {
  return <CatalogPage />;
}
