import { BUSINESS_SETTINGS } from "@/constants/settings";
import { CONTRACT_STATUS, MEAL_STATUS } from "@/constants/statuses";
import { roundTo500 } from "@/lib/pricing";
import type { Contract } from "@/mocks/contracts";

export const isAwaitingContract = (contract: Contract) =>
  contract.status === CONTRACT_STATUS.AwaitingConfirmationAndDeposit;

export const isAwaitingSettlement = (contract: Contract) =>
  contract.meals.some((meal) => meal.status === MEAL_STATUS.AwaitingSettlement);

/** BR08: the floor the customer must pay. Any amount up to the total is accepted. */
export const minimumDeposit = (contract: Contract) =>
  roundTo500(contract.total * BUSINESS_SETTINGS.minimumDepositRate);

export const MINIMUM_DEPOSIT_LABEL = `Cọc tối thiểu ${Math.round(BUSINESS_SETTINGS.minimumDepositRate * 100)}%`;
