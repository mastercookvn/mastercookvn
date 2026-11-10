import type { Metadata } from "next";

import { MealPage } from "@/features/meals/pages/MealPage";

export const metadata: Metadata = { title: "Vận hành bữa" };

export default async function Page({ params }: PageProps<"/admin/meals/[id]">) {
  const { id } = await params;
  return <MealPage id={id} />;
}
