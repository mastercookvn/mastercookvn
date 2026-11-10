"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

const SKIPPED = "Bỏ qua";

export function ProposalDecisionButtons({ index }: { index: number }) {
  const decisions = useDemoState((state) => state.priceDecisions);
  const decision = decisions[index];

  if (decision) {
    return (
      <Badge tone={decision === SKIPPED ? "neutral" : "good"}>{decision}</Badge>
    );
  }

  const decide = (value: string) =>
    updateDemoState({ priceDecisions: { ...decisions, [index]: value } });

  return (
    <div className="l-row flex-nowrap gap-1">
      <Button
        size="sm"
        variant="primary"
        onClick={() => decide("Đã chấp nhận")}
      >
        Chấp nhận
      </Button>
      <Button size="sm" onClick={() => decide("Đã chỉnh giá")}>
        Chỉnh
      </Button>
      <Button size="sm" onClick={() => decide(SKIPPED)}>
        Bỏ qua
      </Button>
    </div>
  );
}
