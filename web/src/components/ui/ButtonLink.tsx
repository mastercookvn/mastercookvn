import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { buttonVariants, type ButtonStyle } from "./buttonVariants";

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyle) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
