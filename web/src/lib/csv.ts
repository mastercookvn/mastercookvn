export type CsvCell = string | number;

const NEEDS_QUOTES = /[",\r\n]/;

function escapeCell(cell: CsvCell) {
  const text = String(cell);
  return NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(columns: string[], rows: CsvCell[][]) {
  return [columns, ...rows]
    .map((row) => row.map(escapeCell).join(","))
    .join("\r\n");
}

/** The byte order mark makes Excel read the file as UTF-8, so Vietnamese text stays intact. */
export function downloadCsv(
  fileName: string,
  columns: string[],
  rows: CsvCell[][]
) {
  const blob = new Blob(["﻿", toCsv(columns, rows)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
