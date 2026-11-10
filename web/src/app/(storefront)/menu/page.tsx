import type { Metadata } from "next";

import { MenuPage } from "@/features/menu/pages/MenuPage";

export const metadata: Metadata = { title: "Thực đơn" };

export default function Page() {
  return <MenuPage />;
}
