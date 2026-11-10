"use client";

import { useEffect, useRef } from "react";

import { formatMoney } from "@/lib/format";

const DURATION_MS = 400;
const FLASH_MS = 600;

/** M10 */
export function NumberTicker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);

  useEffect(() => {
    const element = ref.current;
    const from = previous.current;
    previous.current = value;
    if (!element || from === value) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = formatMoney(value);
      return;
    }

    const row = element.closest(".money-row");
    row?.classList.add("number-flash");
    const flashTimer = setTimeout(
      () => row?.classList.remove("number-flash"),
      FLASH_MS,
    );

    const startedAt = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatMoney(from + (value - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(flashTimer);
      row?.classList.remove("number-flash");
    };
  }, [value]);

  return <span ref={ref}>{formatMoney(value)}</span>;
}
