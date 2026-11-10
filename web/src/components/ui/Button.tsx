import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { buttonVariants, type ButtonStyle } from "./buttonVariants";

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyle) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
