import type { Metadata } from "next";

import { IngredientsPage } from "@/features/ingredients/pages/IngredientsPage";

export const metadata: Metadata = { title: "Nguyên liệu" };

export default function Page() {
  return <IngredientsPage />;
}
