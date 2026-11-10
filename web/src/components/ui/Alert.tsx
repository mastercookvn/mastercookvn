import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Alert({
  tone,
  className,
  children,
}: {
  tone: "wait" | "error" | "good" | "info";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("alert", `alert-${tone}`, className)}>{children}</div>
  );
}
