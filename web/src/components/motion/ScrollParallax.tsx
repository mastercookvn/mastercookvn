"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollParallaxProps = {
  /** Share of the scroll distance. Negative moves against the page. */
  factor: number;
  className?: string;
  children: ReactNode;
};

/** M05 */
export function ScrollParallax({
  factor,
  className,
  children,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      const parent = element?.parentElement;
      if (!element || !parent) return;
      const { top, bottom } = parent.getBoundingClientRect();
      if (bottom < 0 || top > window.innerHeight) return;
      element.style.transform = `translate3d(0, ${(-top * factor).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [factor]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
