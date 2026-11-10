"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney } from "@/lib/format";
import {
  countReportCompensation,
  type CountReportRow,
} from "@/mocks/equipment";

import { countRowProblem } from "../../lib/countRowProblem";

import { CountRowCheck } from "./CountRowCheck";

type EditableKey = "good" | "damaged" | "lost" | "charged";

const EDITABLE: { key: EditableKey; label: string }[] = [
  { key: "good", label: "Tốt" },
  { key: "damaged", label: "Hư" },
  { key: "lost", label: "Mất" },
  { key: "charged", label: "Khách chịu" },
];

/** Editable while counting; pass no onChange to show a confirmed report. */
export function CountReportTable({
  rows,
  onChange,
}: {
  rows: CountReportRow[];
  onChange?: (rows: CountReportRow[]) => void;
}) {
  return (
    <DataTable
      searchable={onChange === undefined}
      columns={[
        "Dụng cụ",
        num("Đã xuất"),
        num("Tốt"),
        num("Hư"),
        num("Mất"),
        num("Khách chịu"),
        num("Giá chốt"),
        num("Bồi thường"),
        ...(onChange ? ["Kiểm tra"] : []),
      ]}
      rows={rows.map((row, rowIndex) => [
        row.name,
        row.issued,
        ...EDITABLE.map(({ key, label }) =>
          onChange ? (
            <input
              key={key}
              id={`count-${rowIndex}-${key}`}
              inputMode="numeric"
              className="input-cell"
              value={String(row[key])}
              aria-label={`${label} ${row.name}`}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) =>
                onChange(
                  rows.map((current, index) =>
                    index === rowIndex
                      ? {
                          ...current,
                          [key]:
                            Number(event.target.value.replace(/\D/g, "")) || 0,
                        }
                      : current
                  )
                )
              }
            />
          ) : (
            row[key]
          )
        ),
        formatMoney(row.price),
        formatMoney(row.charged * row.price),
        ...(onChange
          ? [<CountRowCheck key="check" problem={countRowProblem(row)} />]
          : []),
      ])}
      foot={
        <>
          <td colSpan={7}>Tổng bồi thường khách chịu</td>
          <td className="is-num">
            {formatMoney(countReportCompensation(rows))}
          </td>
          {onChange ? <td /> : null}
        </>
      }
    />
  );
}
