const LOCALE = "vi-VN";

export function formatMoney(amount: number): string {
  return `${Math.round(amount).toLocaleString(LOCALE)} đ`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString(LOCALE);
}

export function formatPercent(ratio: number, fractionDigits = 1): string {
  return `${(ratio * 100).toFixed(fractionDigits).replace(".", ",")}%`;
}

export function formatDecimal(value: number): string {
  return String(value).replace(".", ",");
}

export const WEEKDAY_NAMES = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

/** "14/12/2026", the date format typed and stored across the app. */
export function formatDayMonthYear(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

/** Local date of "dd/MM/yyyy", or null when it is not a real calendar day. */
export function parseDayMonthYear(text: string): Date | null {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
  if (!match) return null;
  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 ? date : null;
}

/** "Thứ hai, 14/12/2026" */
export function formatWeekdayDate(date: Date): string {
  return `${WEEKDAY_NAMES[date.getDay()]}, ${formatDayMonthYear(date)}`;
}
