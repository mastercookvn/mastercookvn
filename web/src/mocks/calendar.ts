import type { BadgeTone } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";

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

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    date: "2026-11-01",
    time: "17:00",
    title: "DH-0120 Tiệc họp mặt",
    tables: 9,
    address: "33 Hoa Lan, Phú Nhuận",
    tone: "wait",
    href: ROUTES.workspaceMeal("0120"),
  },
  {
    date: "2026-11-05",
    time: "11:00",
    title: "Khảo sát HD-2026-0142",
    tables: 30,
    address: "Bình Thạnh",
    tone: "info",
    href: ROUTES.workspaceMeals,
  },
  {
    date: "2026-11-07",
    time: "18:00",
    title: "Thôi nôi bé Na",
    tables: 6,
    address: "12 Nguyễn Văn Đậu, Bình Thạnh",
    tone: "good",
    href: ROUTES.workspaceMeals,
  },
  {
    date: "2026-11-08",
    time: "10:30",
    title: "Giỗ họ Trần",
    tables: 10,
    address: "Gò Vấp",
    tone: "good",
    href: ROUTES.workspaceMeals,
  },
  {
    date: "2026-11-08",
    time: "18:00",
    title: "Liên hoan lớp 12A",
    tables: 5,
    address: "Phú Nhuận",
    tone: "wait",
    href: ROUTES.workspaceMeals,
  },
  {
    date: "2026-11-15",
    time: "18:00",
    title: "DH-0115 Họp mặt công ty",
    tables: 20,
    address: "18 Điện Biên Phủ, Bình Thạnh",
    tone: "good",
    href: ROUTES.workspaceMeal("0115"),
  },
  {
    date: "2026-11-22",
    time: "10:30",
    title: "DH-0128 Tân gia",
    tables: 12,
    address: "57 Phan Xích Long, Phú Nhuận",
    tone: "good",
    href: ROUTES.workspaceMeal("0128"),
  },
  {
    date: "2026-11-28",
    time: "18:30",
    title: "Sinh nhật",
    tables: 8,
    address: "Quận 3",
    tone: "wait",
    href: ROUTES.workspaceMeals,
  },
  {
    date: "2026-12-14",
    time: "11:00",
    title: "HD-2026-0142 Tiệc cưới",
    tables: 30,
    address: "Bình Thạnh",
    tone: "wait",
    href: ROUTES.workspaceMeals,
  },
];
