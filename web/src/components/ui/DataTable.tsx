import type { ReactNode } from "react";

import { DataTableRow, type RowAction } from "./DataTableRow";

export type Column = { label: ReactNode; numeric?: boolean };

export const num = (label: ReactNode): Column => ({ label, numeric: true });

type DataTableProps = {
  columns: (ReactNode | Column)[];
  rows: ReactNode[][];
  rowActions?: (RowAction | undefined)[];
  /** Complete <td> cells. */
  foot?: ReactNode;
};

function isColumn(value: ReactNode | Column): value is Column {
  return typeof value === "object" && value !== null && "label" in value;
}

export function DataTable({ columns, rows, rowActions, foot }: DataTableProps) {
  const normalized = columns.map((column) =>
    isColumn(column) ? column : { label: column },
  );

  return (
    <div className="table-frame">
      <table className="table">
        <thead>
          <tr>
            {normalized.map((column, index) => (
              <th key={index} className={column.numeric ? "is-num" : undefined}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, rowIndex) => (
            <DataTableRow key={rowIndex} action={rowActions?.[rowIndex]}>
              {cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    normalized[cellIndex]?.numeric ? "is-num" : undefined
                  }
                >
                  {cell}
                </td>
              ))}
            </DataTableRow>
          ))}
        </tbody>
        {foot ? (
          <tfoot>
            <tr>{foot}</tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
