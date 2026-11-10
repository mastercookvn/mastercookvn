import Link from "next/link";

import type { BadgeTone } from "@/constants/labels";

export function CalendarEventChip({
  time,
  title,
  tone,
  href,
}: {
  time: string;
  title: string;
  tone: BadgeTone;
  href: string;
}) {
  return (
    <Link href={href} className={`calendar-event tone-${tone}`} title={title}>
      <i className="calendar-dot" aria-hidden="true" />
      <span className="calendar-event-time">{time}</span>
      <span className="calendar-event-title">{title}</span>
    </Link>
  );
}
