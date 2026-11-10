"use client";

import { isValidElement, useState, type ReactNode } from "react";

import { SearchIcon } from "@/components/icons";

import { DataTableRow, type RowAction } from "./DataTableRow";
import type { Column } from "./tableColumns";

/** Below this many rows the whole table fits on screen, so no search box. */
const SEARCH_MIN_ROWS = 4;

type DataTableProps = {
  columns: (ReactNode | Column)[];
  rows: ReactNode[][];
  rowActions?: (RowAction | undefined)[];
  /** Complete <td> cells. */
  foot?: ReactNode;
  searchPlaceholder?: string;
  searchable?: boolean;
};

function isColumn(value: ReactNode | Column): value is Column {
  return typeof value === "object" && value !== null && "label" in value;
}

/** Visible text of a cell, so search works on badges and links too. */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join(" ");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeText(node.props.children);
  }
  return "";
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

export function DataTable({
  columns,
  rows,
  rowActions,
  foot,
  searchPlaceholder = "Tìm trong danh sách",
  searchable = true,
}: DataTableProps) {
  const [query, setQuery] = useState("");
  const normalized = columns.map((column) =>
    isColumn(column) ? column : { label: column }
  );
  const showSearch = searchable && rows.length >= SEARCH_MIN_ROWS;
  const needle = normalize(query.trim());
  const visible = rows
    .map((cells, index) => ({ cells, index }))
    .filter(
      ({ cells }) =>
        needle === "" || normalize(nodeText(cells)).includes(needle)
    );

  return (
    <div className="data-table">
      {showSearch ? (
        <div className="table-search">
          <label className="table-search-box">
            <SearchIcon size={16} />
            <input
              type="search"
              className="input"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {needle ? (
            <span className="text-small text-soft">
              {visible.length} / {rows.length} dòng
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="table-frame">
        <table className="is-stackable table">
          <thead>
            <tr>
              {normalized.map((column, index) => (
                <th
                  key={index}
                  className={column.numeric ? "is-num" : undefined}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(({ cells, index: rowIndex }) => (
              <DataTableRow key={rowIndex} action={rowActions?.[rowIndex]}>
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    data-label={
                      typeof normalized[cellIndex]?.label === "string"
                        ? normalized[cellIndex].label
                        : undefined
                    }
                    className={
                      normalized[cellIndex]?.numeric ? "is-num" : undefined
                    }
                  >
                    {cell}
                  </td>
                ))}
              </DataTableRow>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={normalized.length} className="table-empty">
                  Không có dòng nào khớp “{query.trim()}”.
                </td>
              </tr>
            ) : null}
          </tbody>
          {foot ? (
            <tfoot>
              <tr>{foot}</tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </div>
  );
}
