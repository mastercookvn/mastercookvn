"use client";

import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";
import type { CountReportRow } from "@/mocks/equipment";

import { countRowProblem } from "../../lib/countRowProblem";

import { CountRowCheck } from "./CountRowCheck";

type EditableKey = "good" | "damaged" | "lost" | "charged";

const EDITABLE: { key: EditableKey; label: string }[] = [
  { key: "good", label: "Tốt" },
  { key: "damaged", label: "Hư" },
  { key: "lost", label: "Mất" },
  { key: "charged", label: "Khách chịu" },
];

export function CountReportTable({
  rows,
  onChange,
}: {
  rows: CountReportRow[];
  onChange: (rows: CountReportRow[]) => void;
}) {
  const totalCharged = rows.reduce(
    (sum, row) => sum + row.charged * row.price,
    0,
  );

  return (
    <DataTable
      columns={[
        "Dụng cụ",
        num("Đã xuất"),
        num("Tốt"),
        num("Hư"),
        num("Mất"),
        num("Khách chịu"),
        num("Giá chốt"),
        num("Bồi thường"),
        "Kiểm tra",
      ]}
      rows={rows.map((row, rowIndex) => [
        row.name,
        row.issued,
        ...EDITABLE.map(({ key, label }) => (
          <input
            key={key}
            id={`count-${rowIndex}-${key}`}
            type="number"
            min={0}
            className="input-cell"
            value={row[key]}
            aria-label={`${label} ${row.name}`}
            onChange={(event) =>
              onChange(
                rows.map((current, index) =>
                  index === rowIndex
                    ? { ...current, [key]: Number(event.target.value) }
                    : current,
                ),
              )
            }
          />
        )),
        formatMoney(row.price),
        formatMoney(row.charged * row.price),
        <CountRowCheck key="check" problem={countRowProblem(row)} />,
      ])}
      foot={
        <>
          <td colSpan={7}>Tổng bồi thường khách chịu</td>
          <td className="is-num">{formatMoney(totalCharged)}</td>
          <td />
        </>
      }
    />
  );
}
