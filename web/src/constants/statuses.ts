export const ORDER_STATUS = {
  Pending: "PENDING",
  Accepted: "ACCEPTED",
  Rejected: "REJECTED",
  Expired: "EXPIRED",
  Cancelled: "CANCELLED",
} as const;
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const CONTRACT_STATUS = {
  AwaitingConfirmationAndDeposit: "AWAITING_CONFIRMATION_AND_DEPOSIT",
  Active: "ACTIVE",
  Expired: "EXPIRED",
  Cancelled: "CANCELLED",
  Completed: "COMPLETED",
} as const;
export type ContractStatus =
  (typeof CONTRACT_STATUS)[keyof typeof CONTRACT_STATUS];

export const MEAL_STATUS = {
  Planned: "PLANNED",
  Confirmed: "CONFIRMED",
  Preparing: "PREPARING",
  Serving: "SERVING",
  AwaitingCount: "AWAITING_COUNT",
  AwaitingSettlement: "AWAITING_SETTLEMENT",
  Completed: "COMPLETED",
  Cancelled: "CANCELLED",
} as const;
export type MealStatus = (typeof MEAL_STATUS)[keyof typeof MEAL_STATUS];

export const ADDENDUM_STATUS = {
  Pending: "PENDING",
  AwaitingExtraDeposit: "AWAITING_EXTRA_DEPOSIT",
  Applied: "APPLIED",
  Cancelled: "CANCELLED",
} as const;
export type AddendumStatus =
  (typeof ADDENDUM_STATUS)[keyof typeof ADDENDUM_STATUS];

export const PAYMENT_STATUS = {
  Pending: "PENDING",
  Succeeded: "SUCCEEDED",
  Failed: "FAILED",
} as const;
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const EQUIPMENT_ISSUE_STATUS = {
  Draft: "DRAFT",
  Issued: "ISSUED",
  Counted: "COUNTED",
  Cancelled: "CANCELLED",
} as const;
export type EquipmentIssueStatus =
  (typeof EQUIPMENT_ISSUE_STATUS)[keyof typeof EQUIPMENT_ISSUE_STATUS];

export const INVENTORY_PERIOD_STATUS = {
  AwaitingClose: "AWAITING_CLOSE",
  Closed: "CLOSED",
} as const;
export type InventoryPeriodStatus =
  (typeof INVENTORY_PERIOD_STATUS)[keyof typeof INVENTORY_PERIOD_STATUS];

/** Stages run in this order only. */
export const MEAL_PROGRESS: MealStatus[] = [
  MEAL_STATUS.Confirmed,
  MEAL_STATUS.Preparing,
  MEAL_STATUS.Serving,
  MEAL_STATUS.AwaitingCount,
  MEAL_STATUS.AwaitingSettlement,
  MEAL_STATUS.Completed,
];
