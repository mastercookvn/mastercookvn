import { proposedIngredientPrice } from "@/lib/pricing";

export type InventoryPeriodLineInput = {
  name: string;
  unit: string;
  openingQty: number;
  openingValue: number;
  purchasedQty: number;
  purchasedValue: number;
  closingQty: number;
};

/** BR06: weighted average cost of opening stock and purchases. */
export function buildInventoryPeriod(
  month: string,
  inputs: InventoryPeriodLineInput[],
  dishRevenue: number
) {
  const lines = inputs.map((line) => {
    const unitCost =
      (line.openingValue + line.purchasedValue) /
      (line.openingQty + line.purchasedQty);
    const closingValue = Math.round(line.closingQty * unitCost);
    return {
      ...line,
      unitCost,
      closingValue,
      consumed: line.openingValue + line.purchasedValue - closingValue,
      maxQty: line.openingQty + line.purchasedQty,
    };
  });
  const cost = lines.reduce((sum, line) => sum + line.consumed, 0);
  return {
    month,
    lines,
    dishRevenue,
    cost,
    foodCost: dishRevenue ? cost / dishRevenue : 0,
    margin: dishRevenue - cost,
  };
}

export type InventoryPeriod = ReturnType<typeof buildInventoryPeriod>;

// Placeholder until the inventory period API exists.
export const currentInventoryPeriod = (): InventoryPeriod | null => null;

export type PriceProposalInput = {
  name: string;
  unit: string;
  current: number;
  purchases: { quantity: number; price: number }[];
  dishes: string;
};

/** BR05: the proposed price follows the period's purchases. */
export const buildPriceProposal = (input: PriceProposalInput) => ({
  ...input,
  proposed: Math.round(proposedIngredientPrice(input.purchases) ?? 0),
});

export type PriceProposal = ReturnType<typeof buildPriceProposal>;

export type AffectedDish = {
  name: string;
  price: number;
  newCost: number;
};

// Placeholder until the price proposal API exists.
export const listPriceProposals = (): PriceProposal[] => [];
export const listAffectedDishes = (): AffectedDish[] => [];
