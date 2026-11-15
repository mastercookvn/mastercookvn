import {
  LichTa,
  getCalendarGrid,
  getDayName,
  getMonthName,
  type CalendarDayCell,
  type LunarDate,
} from "@lichta/core";

export type { CalendarDayCell, LunarDate };

const MONDAY_FIRST = 1;

export const LUNAR_MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

export const solarToLunar = (date: Date): LunarDate => LichTa.fromDate(date);

/** Solar date of a lunar date, or null when that lunar day does not exist. */
export function lunarToSolar(
  day: number,
  month: number,
  year: number,
  leap = false
): Date | null {
  try {
    const solar = LichTa.toSolar(day, month, year, leap);
    return new Date(solar.year, solar.month - 1, solar.day);
  } catch (error) {
    if (error instanceof RangeError) return null;
    throw error;
  }
}

/** 0 when the lunar year has no leap month. */
export const leapMonthOf = (lunarYear: number) =>
  LichTa.getLeapMonth(lunarYear);

/** 29 (tháng thiếu) or 30 (tháng đủ); months are never assumed to have 30 days. */
export const daysInLunarMonth = (month: number, year: number, leap = false) =>
  LichTa.getDaysInLunarMonth(month, year, leap);

/** Monday-first 6-week grid of a solar month, each cell carrying its lunar date. */
export const monthGrid = (year: number, monthIndex: number) =>
  getCalendarGrid(monthIndex + 1, year, null, MONDAY_FIRST);

/** "Tháng 11 (Một)" keeps the number next to the traditional name. */
export const lunarMonthLabel = (month: number) =>
  `Tháng ${month} (${getMonthName(month)})`;

/** "15/10", leap month as "1/6N", as printed Vietnamese calendars do. */
export const formatLunarShort = (lunar: LunarDate) =>
  `${lunar.day}/${lunar.month}${lunar.isLeap ? "N" : ""}`;

/**
 * "Rằm tháng 10 (nhuận)". The month stays a number: the traditional name of
 * month 11 is "Một", which reads as January.
 */
export const formatLunarLong = (lunar: LunarDate) =>
  `${getDayName(lunar.day)} tháng ${lunar.month}${lunar.isLeap ? " (nhuận)" : ""}`;
