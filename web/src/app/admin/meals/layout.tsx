import { MealWorkspace } from "@/features/meals/components/queue/MealWorkspace";

export default function MealsLayout({ children }: LayoutProps<"/admin/meals">) {
  return <MealWorkspace>{children}</MealWorkspace>;
}
