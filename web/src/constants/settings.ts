/** Parameter defaults (docs system-parameters); the backend will supply current values. */
export const BUSINESS_SETTINGS = {
  foodCostTarget: 0.35,
  taxRate: 0.08,
  serviceRadiusKm: 20,
  holdHours: 24,
  qrValidityMinutes: 15,
  minimumDepositRate: 0.5,
  dishChangeCutoffDays: 5,
  tableChangeCutoffDays: 3,
  maxTableReductionRate: 0.15,
  extraDepositTableThreshold: 3,
  tablesPerServer: 3,
} as const;
