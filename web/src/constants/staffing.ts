import { BUSINESS_SETTINGS } from "./settings";

export const STAFF_POSITION = {
  Server: "SERVER",
  Cook: "COOK",
  Driver: "DRIVER",
  Counter: "COUNTER",
} as const;

export type StaffPosition =
  (typeof STAFF_POSITION)[keyof typeof STAFF_POSITION];

export const STAFF_POSITIONS: StaffPosition[] = Object.values(STAFF_POSITION);

export const STAFF_POSITION_LABEL: Record<StaffPosition, string> = {
  [STAFF_POSITION.Server]: "Phục vụ",
  [STAFF_POSITION.Cook]: "Bếp",
  [STAFF_POSITION.Driver]: "Vận chuyển",
  [STAFF_POSITION.Counter]: "Kiểm đếm",
};

export const STAFF_TYPE = {
  Permanent: "PERMANENT",
  Temporary: "TEMPORARY",
} as const;
export type StaffType = (typeof STAFF_TYPE)[keyof typeof STAFF_TYPE];
export const STAFF_TYPES = Object.values(STAFF_TYPE);
export const STAFF_TYPE_LABEL: Record<StaffType, string> = {
  [STAFF_TYPE.Permanent]: "Cố định",
  [STAFF_TYPE.Temporary]: "Thời vụ",
};

export const STAFF_GENDER = {
  Male: "MALE",
  Female: "FEMALE",
  Other: "OTHER",
} as const;
export type StaffGender = (typeof STAFF_GENDER)[keyof typeof STAFF_GENDER];
export const STAFF_GENDERS = Object.values(STAFF_GENDER);
export const STAFF_GENDER_LABEL: Record<StaffGender, string> = {
  [STAFF_GENDER.Male]: "Nam",
  [STAFF_GENDER.Female]: "Nữ",
  [STAFF_GENDER.Other]: "Khác",
};

/**
 * BR12 only fixes servers (set-up tables / 3). The other ratios and the
 * arrive-early / leave-late buffers are demo defaults until the business
 * gives real numbers; they are suggestions, never a hard block.
 */
export const STAFFING_RULES = {
  tablesPerServer: BUSINESS_SETTINGS.tablesPerServer,
  guestsPerCook: 150,
  setupTablesPerDriver: 20,
  counters: 1,
  /** Minutes before the first wave and after the last one. */
  shift: {
    [STAFF_POSITION.Server]: { before: 90, after: 60 },
    [STAFF_POSITION.Cook]: { before: 240, after: 0 },
    [STAFF_POSITION.Driver]: { before: 180, after: 90 },
    [STAFF_POSITION.Counter]: { before: 0, after: 90 },
  },
} as const;
