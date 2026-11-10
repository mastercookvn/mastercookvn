import Link from "next/link";

import type { BadgeTone } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";

export function CalendarEventChip({
  label,
  tone,
}: {
  label: string;
  tone: BadgeTone;
}) {
  return (
    <Link
      href={ROUTES.workspaceMeals}
      className={`calendar-event badge-${tone}`}
    >
      {label}
    </Link>
  );
}
