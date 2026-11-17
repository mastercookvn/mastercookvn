export const PAYMENT_METHOD = {
  Cash: "CASH",
  BankTransfer: "BANK_TRANSFER",
} as const;
export type PaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  [PAYMENT_METHOD.Cash]: "Tiền mặt",
  [PAYMENT_METHOD.BankTransfer]: "Chuyển khoản",
};
export const PAYMENT_METHOD_OPTIONS = Object.values(PAYMENT_METHOD).map(
  (value) => ({
    value,
    label: PAYMENT_METHOD_LABEL[value],
  })
);
