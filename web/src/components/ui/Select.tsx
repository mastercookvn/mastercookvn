import type { ComponentProps } from "react";

import { ChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <span className="select">
      <select className={cn("input", className)} {...props} />
      <ChevronIcon size={14} />
    </span>
  );
}
