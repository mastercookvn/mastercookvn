import type { Contract } from "@/models/contracts";

// Placeholder until the contracts API exists; every lookup is empty.
export const listContracts = (): Contract[] => [];

export const findContract = (number: string) =>
  listContracts().find((contract) => contract.number === number);

/** BR09: an addendum waiting for the customer. */
export type PendingAddendum = {
  number: string;
  contractNumber: string;
  tablesBefore: number;
  tablesAfter: number;
  totalBefore: number;
  totalAfter: number;
  difference: number;
  extraDeposit: number;
};

// Placeholder until the addendum API exists.
const listPendingAddenda = (): PendingAddendum[] => [];

export const findPendingAddendum = (contractNumber: string) =>
  listPendingAddenda().find(
    (addendum) => addendum.contractNumber === contractNumber
  ) ?? null;
