import type { Metadata } from "next";

import { ServicesPage } from "@/features/services/pages/ServicesPage";

export const metadata: Metadata = { title: "Dịch vụ và chính sách" };

export default function Page() {
  return <ServicesPage />;
}
