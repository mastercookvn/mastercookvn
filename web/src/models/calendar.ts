import type { BadgeTone } from "@/constants/labels";

export type CalendarEvent = {
  /** ISO date, yyyy-mm-dd. */
  date: string;
  time: string;
  title: string;
  tables: number;
  address: string;
  tone: BadgeTone;
  href: string;
};
