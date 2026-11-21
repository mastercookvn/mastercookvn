"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  PRICE_PROPOSAL_DECISION,
  PRICE_PROPOSAL_DECISION_LABEL,
  type PriceProposalDecision,
} from "@/constants/priceProposal";
import { updateDemoState, useDemoState } from "@/lib/demoStore";

export function ProposalDecisionButtons({ index }: { index: number }) {
  const decisions = useDemoState((state) => state.priceDecisions);
  const decision = decisions[index];

  if (decision) {
    return (
      <Badge
        tone={decision === PRICE_PROPOSAL_DECISION.Skipped ? "neutral" : "good"}
      >
        {PRICE_PROPOSAL_DECISION_LABEL[decision]}
      </Badge>
    );
  }

  const decide = (value: PriceProposalDecision) =>
    updateDemoState({ priceDecisions: { ...decisions, [index]: value } });

  return (
    <div className="l-row flex-nowrap gap-1">
      <Button
        size="sm"
        variant="primary"
        onClick={() => decide(PRICE_PROPOSAL_DECISION.Accepted)}
      >
        Chấp nhận
      </Button>
      <Button
        size="sm"
        onClick={() => decide(PRICE_PROPOSAL_DECISION.Adjusted)}
      >
        Chỉnh
      </Button>
      <Button size="sm" onClick={() => decide(PRICE_PROPOSAL_DECISION.Skipped)}>
        Bỏ qua
      </Button>
    </div>
  );
}
