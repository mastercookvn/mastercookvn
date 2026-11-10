import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Card({
  stack = false,
  className,
  ...props
}: ComponentProps<"section"> & { stack?: boolean }) {
  return (
    <section className={cn("card", stack && "l-stack", className)} {...props} />
  );
}
