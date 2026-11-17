export const PRICE_PROPOSAL_DECISION = {
  Accepted: "ACCEPTED",
  Adjusted: "ADJUSTED",
  Skipped: "SKIPPED",
} as const;

export type PriceProposalDecision =
  (typeof PRICE_PROPOSAL_DECISION)[keyof typeof PRICE_PROPOSAL_DECISION];

export const PRICE_PROPOSAL_DECISION_LABEL: Record<
  PriceProposalDecision,
  string
> = {
  [PRICE_PROPOSAL_DECISION.Accepted]: "Đã chấp nhận",
  [PRICE_PROPOSAL_DECISION.Adjusted]: "Đã chỉnh giá",
  [PRICE_PROPOSAL_DECISION.Skipped]: "Bỏ qua",
};
