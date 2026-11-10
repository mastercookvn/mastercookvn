/** Sample values (section 1). */
export const BUSINESS_SETTINGS = {
  foodCostTarget: 0.35,
  taxRate: 0.08,
  serviceRadiusKm: 20,
  holdHours: 24,
  minimumDepositRate: 0.5,
  dishChangeCutoffDays: 5,
  tableChangeCutoffDays: 3,
  maxTableReductionRate: 0.15,
  extraDepositTableThreshold: 3,
  tablesPerServer: 3,
} as const;

/** Fixed date for the sample data. */
export const DEMO_TODAY = new Date("2026-11-05T09:00:00+07:00");
