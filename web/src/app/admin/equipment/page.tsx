import type { Metadata } from "next";

import { EquipmentPage } from "@/features/equipment/pages/EquipmentPage";

export const metadata: Metadata = { title: "Dụng cụ" };

export default function Page() {
  return <EquipmentPage />;
}
