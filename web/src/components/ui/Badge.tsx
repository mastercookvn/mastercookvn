import type { ReactNode } from "react";

import type { BadgeTone } from "@/constants/labels";

export function Badge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: ReactNode;
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
