"use client";

import {
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { useRevealOnce } from "@/hooks/useRevealOnce";

export type RevealVariant = "up" | "fade" | "mask" | "wipe" | "line";

type RevealProps = {
  variant: RevealVariant;
  delayMs?: number;
  immediate?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Reveal({
  variant,
  delayMs = 0,
  immediate = false,
  as = "div",
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRevealOnce<HTMLElement>({
    observeParent: variant === "mask" || variant === "line",
    immediate,
  });

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": variant,
      style: { ...style, "--delay": `${delayMs}ms` } as CSSProperties,
    },
    children,
  );
}
