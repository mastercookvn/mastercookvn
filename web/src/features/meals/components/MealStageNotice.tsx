import { ClockIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";

export function MealStageNotice({ message }: { message: string }) {
  return (
    <EmptyState>
      <ClockIcon size={26} />
      <p className="text-soft">{message}</p>
    </EmptyState>
  );
}
