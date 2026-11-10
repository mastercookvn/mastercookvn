import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("card-title", className)} {...props} />;
}
