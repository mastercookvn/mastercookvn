"use client";

import { useEffect, useRef } from "react";

type RevealOptions = {
  /** Clipped elements have no area to observe. */
  observeParent?: boolean;
  /** Run on load instead of on scroll. */
  immediate?: boolean;
};

const SETTLE_AFTER_MS = 2400;

export function useRevealOnce<T extends HTMLElement>({
  observeParent = false,
  immediate = false,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      element.dataset.in = "";
      settleTimer = setTimeout(() => {
        element.dataset.settled = "";
      }, SETTLE_AFTER_MS);
    };

    if (immediate) {
      const frame = requestAnimationFrame(() => requestAnimationFrame(reveal));
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(settleTimer);
      };
    }

    const target = observeParent ? (element.parentElement ?? element) : element;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(target);

    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
    };
  }, [immediate, observeParent]);

  return ref;
}
