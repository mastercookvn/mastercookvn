import { BUSINESS_SETTINGS } from "@/constants/settings";
import { CONTRACT_STATUS, MEAL_STATUS } from "@/constants/statuses";
import { roundTo500 } from "@/lib/pricing";
import type { Contract } from "@/mocks/contracts";

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

/** BR08: the floor the customer must pay. Any amount up to the total is accepted. */
export const minimumDeposit = (contract: Contract) =>
  roundTo500(contract.total * BUSINESS_SETTINGS.minimumDepositRate);

export const MINIMUM_DEPOSIT_LABEL = `Cọc tối thiểu ${Math.round(BUSINESS_SETTINGS.minimumDepositRate * 100)}%`;
