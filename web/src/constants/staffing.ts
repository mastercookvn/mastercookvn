import { BUSINESS_SETTINGS } from "./settings";

export const STAFF_POSITION = {
  Server: "Phục vụ",
  Cook: "Bếp",
  Driver: "Vận chuyển",
  Counter: "Kiểm đếm",
} as const;

export type StaffPosition =
  (typeof STAFF_POSITION)[keyof typeof STAFF_POSITION];

export const STAFF_POSITIONS: StaffPosition[] = Object.values(STAFF_POSITION);

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
