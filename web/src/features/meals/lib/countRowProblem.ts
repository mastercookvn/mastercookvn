import type { CountReportRow } from "@/mocks/equipment";

export function countRowProblem(row: CountReportRow) {
  if (row.good + row.damaged + row.lost !== row.issued) return "Tổng chưa khớp";
  if (row.charged > row.damaged + row.lost) return "Khách chịu vượt";
  return null;
}
