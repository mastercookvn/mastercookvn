"use client";

import { Badge } from "@/components/ui/Badge";
import { useDemoState } from "@/mocks/demoStore";
import { PRICE_PROPOSALS } from "@/mocks/inventory";

export function PriceProposalProgress() {
  const done = useDemoState(
    (state) => Object.keys(state.priceDecisions).length,
  );

  return (
    <Badge tone={done === PRICE_PROPOSALS.length ? "good" : "wait"}>
      {done}/{PRICE_PROPOSALS.length} dòng đã xử lý
    </Badge>
  );
}
