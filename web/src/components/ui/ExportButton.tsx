"use client";

import { DownloadIcon } from "@/components/icons";
import { downloadCsv, type CsvCell } from "@/lib/csv";

import { Button } from "./Button";
import { useToast } from "./Toast";

/** Exports raw values (not formatted money) so the sheet can still be summed in Excel. */
export function ExportButton({
  fileName,
  columns,
  rows,
  label = "Xuất Excel (CSV)",
}: {
  fileName: string;
  columns: string[];
  rows: CsvCell[][];
  label?: string;
}) {
  const showToast = useToast();

  return (
    <Button
      disabled={rows.length === 0}
      onClick={() => {
        downloadCsv(fileName, columns, rows);
        showToast(`Đã xuất ${rows.length} dòng ra ${fileName}.csv`);
      }}
    >
      <DownloadIcon size={18} />
      {label}
    </Button>
  );
}
