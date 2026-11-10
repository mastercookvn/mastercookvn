import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function CheckboxLabel({
  children,
  className,
  ...props
}: ComponentProps<"input"> & { children: ReactNode }) {
  return (
    <label className={cn("l-row text-small gap-1.5", className)}>
      <input type="checkbox" className="checkbox" {...props} />
      {children}
    </label>
  );
}
