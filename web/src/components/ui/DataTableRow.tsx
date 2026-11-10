"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useToast } from "./Toast";

export type RowAction =
  | { href: string }
  | { toast: string }
  | { onSelect: () => void; selected?: boolean };

export function DataTableRow({
  action,
  children,
}: {
  action?: RowAction;
  children: ReactNode;
}) {
  const router = useRouter();
  const showToast = useToast();

  if (!action) return <tr>{children}</tr>;

  const run = () => {
    if ("href" in action) router.push(action.href);
    else if ("onSelect" in action) action.onSelect();
    else showToast(action.toast);
  };
  const selected = "onSelect" in action && action.selected;

  return (
    <tr
      className={selected ? "is-clickable is-selected" : "is-clickable"}
      aria-selected={"onSelect" in action ? selected : undefined}
      tabIndex={0}
      onClick={run}
      onKeyDown={(event) => {
        if (event.key === "Enter") run();
      }}
    >
      {children}
    </tr>
  );
}
