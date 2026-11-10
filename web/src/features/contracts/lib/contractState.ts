import { CONTRACT_STATUS } from "@/constants/statuses";
import type { Contract } from "@/mocks/contracts";

export const isAwaitingContract = (contract: Contract) =>
  contract.status === CONTRACT_STATUS.AwaitingConfirmationAndDeposit;
