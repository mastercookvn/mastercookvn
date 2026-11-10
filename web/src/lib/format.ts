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
