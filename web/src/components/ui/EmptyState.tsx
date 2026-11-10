import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("card empty-state", className)}>{children}</div>;
}
