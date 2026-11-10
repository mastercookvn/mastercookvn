"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/** pushState syncs into useSearchParams, so no server round trip. */
export function useQueryParam(name: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const value = searchParams.get(name);

  const setValue = useCallback(
    (next: string | null) => {
      const params = new URLSearchParams(window.location.search);
      if (next === null) {
        params.delete(name);
      } else {
        params.set(name, next);
      }
      const query = params.toString();
      window.history.pushState(
        null,
        "",
        query ? `${pathname}?${query}` : pathname,
      );
    },
    [name, pathname],
  );

  return [value, setValue] as const;
}
