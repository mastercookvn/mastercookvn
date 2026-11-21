export const EQUIPMENT_BASIS = {
  Person: "PERSON",
  SetupTable: "SETUP_TABLE",
  Meal: "MEAL",
  Manual: "MANUAL",
} as const;

export type EquipmentBasis =
  (typeof EQUIPMENT_BASIS)[keyof typeof EQUIPMENT_BASIS];

export const EQUIPMENT_BASES = Object.values(EQUIPMENT_BASIS);

export const EQUIPMENT_BASIS_LABEL: Record<EquipmentBasis, string> = {
  [EQUIPMENT_BASIS.Person]: "Người",
  [EQUIPMENT_BASIS.SetupTable]: "Bàn bố trí",
  [EQUIPMENT_BASIS.Meal]: "Bữa",
  [EQUIPMENT_BASIS.Manual]: "Nhập theo bữa",
};

export const COUNT_REPORT_STATUS = {
  Draft: "draft",
  Confirmed: "confirmed",
} as const;

export type CountReportStatus =
  (typeof COUNT_REPORT_STATUS)[keyof typeof COUNT_REPORT_STATUS];
