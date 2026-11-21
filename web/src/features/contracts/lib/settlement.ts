import { MEAL_STATUS } from "@/constants/statuses";
import type { Contract } from "@/models/contracts";

export type CompensationLine = {
  name: string;
  quantity: number;
  price: number;
};

/** BR11: final value of the meal plus compensation, less what was collected. */
export function buildSettlement(
  contract: Contract,
  compensationLines: CompensationLine[] = [],
  refunded = 0
) {
  const meal =
    contract.meals.find(
      (candidate) => candidate.status === MEAL_STATUS.AwaitingSettlement
    ) ?? contract.meals[0];
  const mealValue = meal?.price.total ?? 0;
  const compensation = compensationLines.reduce(
    (sum, line) => sum + line.quantity * line.price,
    0
  );
  const settlementTotal = mealValue + compensation;
  return {
    contractNumber: contract.number,
    orderCode: contract.orderCode,
    mealName: meal?.name ?? "",
    mealDate: meal?.date ?? "",
    mealValue,
    compensationLines,
    compensation,
    settlementTotal,
    paid: contract.paid,
    refunded,
    balance: settlementTotal - contract.paid + refunded,
  };
}

export type Settlement = ReturnType<typeof buildSettlement>;
