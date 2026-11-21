import { BUSINESS_SETTINGS } from "@/constants/settings";
import { CONTRACT_STATUS, MEAL_STATUS } from "@/constants/statuses";
import { calculateCancellation, roundTo500 } from "@/lib/pricing";
import { daysUntil, type Contract, type Meal } from "@/models/contracts";

export const isAwaitingContract = (contract: Contract) =>
  contract.status === CONTRACT_STATUS.AwaitingConfirmationAndDeposit;

export const isAwaitingSettlement = (contract: Contract) =>
  contract.meals.some((meal) => meal.status === MEAL_STATUS.AwaitingSettlement);

/** BR09, BR10: only a meal that has not started serving can be edited or cancelled. */
const NOT_STARTED: readonly string[] = [
  MEAL_STATUS.Planned,
  MEAL_STATUS.Confirmed,
  MEAL_STATUS.Preparing,
];

export const upcomingMeal = (contract: Contract) =>
  contract.status === CONTRACT_STATUS.Active
    ? contract.meals.find((meal) => NOT_STARTED.includes(meal.status))
    : undefined;

/** Contract detail tabs that make sense at this contract's stage. */
export function contractStageTabs(contract: Contract): string[] {
  if (isAwaitingContract(contract)) return ["overview", "payment"];
  if (contract.status !== CONTRACT_STATUS.Active) return ["overview"];
  return [
    "overview",
    ...(upcomingMeal(contract) ? ["addendum", "cancel"] : []),
    ...(isAwaitingSettlement(contract) ? ["payment", "settlement"] : []),
  ];
}

/** BR01: money collected on the contract is allocated to meals by value. */
export const paidForMeal = (contract: Contract, meal: Meal) =>
  contract.total
    ? Math.round((contract.paid * meal.price.total) / contract.total)
    : 0;

/** BR10: the refund tier follows when the customer asks. */
export const cancellationFor = (
  contract: Contract,
  meal: Meal,
  requestedAt: Date = new Date()
) =>
  calculateCancellation({
    mealValue: meal.price.total,
    paid: paidForMeal(contract, meal),
    daysLeft: daysUntil(meal.startsAt, requestedAt),
  });

/** BR08: the floor the customer must pay. Any amount up to the total is accepted. */
export const minimumDeposit = (contract: Contract) =>
  roundTo500(contract.total * BUSINESS_SETTINGS.minimumDepositRate);

export const MINIMUM_DEPOSIT_LABEL = `Cọc tối thiểu ${Math.round(BUSINESS_SETTINGS.minimumDepositRate * 100)}%`;

export const ISSUED_CONTRACT_VERSION = 1;
