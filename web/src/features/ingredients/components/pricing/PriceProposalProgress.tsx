"use client";

import { Badge } from "@/components/ui/Badge";
import { useDemoState } from "@/lib/demoStore";

export function PriceProposalProgress({ total }: { total: number }) {
  const done = useDemoState(
    (state) => Object.keys(state.priceDecisions).length
  );

  return (
    <Badge tone={done === total ? "good" : "wait"}>
      {done}/{total} dòng đã xử lý
    </Badge>
  );
}
