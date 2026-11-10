"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useToast } from "./Toast";

export type RowAction = { href: string } | { toast: string };

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
    else showToast(action.toast);
  };

  return (
    <tr
      className="is-clickable"
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
