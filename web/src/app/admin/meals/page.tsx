import { redirect } from "next/navigation";

import { PageHeader } from "@/components/layout/workspace/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";
import { listOperationMeals } from "@/features/meals/lib/operationMeals";

export default function Page() {
  const [first] = listOperationMeals();
  if (first) redirect(ROUTES.workspaceMeal(first.id));

  return (
    <div className="l-stack gap-4">
      <PageHeader screen="meals" />
      <EmptyState>Chưa có bữa tiệc nào cần vận hành.</EmptyState>
    </div>
  );
}
