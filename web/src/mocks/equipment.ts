import { CONTRACT_WEDDING } from "./contracts";
import { equipmentNeeded } from "@/lib/pricing";

export const EQUIPMENT_BASIS = [
  "Người",
  "Bàn bố trí",
  "Bữa",
  "Nhập theo bữa",
] as const;
export type EquipmentBasis = (typeof EQUIPMENT_BASIS)[number];

export type EquipmentType = {
  name: string;
  /** Data URL of an uploaded photo. */
  image?: string;
  unit: string;
  basis: EquipmentBasis;
  rate: number | null;
  reserve: number | null;
  minimum: number;
  compensation: number;
  /** Last purchase price, suggested on a new purchase line. */
  purchasePrice: number;
  owned: number;
  ready: number;
  inUse: number;
  damaged: number;
};

export const EQUIPMENT: EquipmentType[] = [
  {
    name: "Bát ăn sứ",
    unit: "cái",
    basis: "Người",
    rate: 1,
    reserve: 0.1,
    minimum: 400,
    compensation: 15000,
    purchasePrice: 12000,
    owned: 1200,
    ready: 980,
    inUse: 200,
    damaged: 20,
  },
  {
    name: "Đũa tre",
    unit: "đôi",
    basis: "Người",
    rate: 1,
    reserve: 0.1,
    minimum: 400,
    compensation: 5000,
    purchasePrice: 3000,
    owned: 1500,
    ready: 1250,
    inUse: 240,
    damaged: 10,
  },
  {
    name: "Ly thủy tinh",
    unit: "cái",
    basis: "Người",
    rate: 1,
    reserve: 0.15,
    minimum: 300,
    compensation: 20000,
    purchasePrice: 15000,
    owned: 900,
    ready: 268,
    inUse: 620,
    damaged: 12,
  },
  {
    name: "Bàn tròn",
    unit: "cái",
    basis: "Bàn bố trí",
    rate: 1,
    reserve: null,
    minimum: 30,
    compensation: 1200000,
    purchasePrice: 900000,
    owned: 60,
    ready: 48,
    inUse: 10,
    damaged: 2,
  },
  {
    name: "Ghế nhựa",
    unit: "cái",
    basis: "Bàn bố trí",
    rate: 10,
    reserve: 0.05,
    minimum: 300,
    compensation: 120000,
    purchasePrice: 85000,
    owned: 620,
    ready: 510,
    inUse: 100,
    damaged: 10,
  },
  {
    name: "Nồi lẩu",
    unit: "cái",
    basis: "Bàn bố trí",
    rate: 1,
    reserve: 0.1,
    minimum: 30,
    compensation: 350000,
    purchasePrice: 250000,
    owned: 50,
    ready: 38,
    inUse: 10,
    damaged: 2,
  },
  {
    name: "Khay inox",
    unit: "cái",
    basis: "Bữa",
    rate: 12,
    reserve: null,
    minimum: 30,
    compensation: 180000,
    purchasePrice: 150000,
    owned: 80,
    ready: 18,
    inUse: 60,
    damaged: 2,
  },
  {
    name: "Rạp che",
    unit: "bộ",
    basis: "Nhập theo bữa",
    rate: null,
    reserve: null,
    minimum: 2,
    compensation: 5000000,
    purchasePrice: 3500000,
    owned: 6,
    ready: 4,
    inUse: 2,
    damaged: 0,
  },
];

export type EquipmentPurchaseLine = {
  equipment: string;
  quantity: number;
  price: number;
};

export type EquipmentPurchase = {
  code: string;
  date: string;
  supplier: string;
  phone: string;
  lines: EquipmentPurchaseLine[];
  /** Data URLs of receipt photos. */
  photos: string[];
};

export const equipmentPurchaseTotal = (lines: EquipmentPurchaseLine[]) =>
  lines.reduce((sum, line) => sum + line.quantity * line.price, 0);

export function equipmentDemand(
  item: EquipmentType,
  guests: number,
  setupTables: number,
  manual: number
) {
  if (item.rate === null) return manual;
  const basis =
    item.basis === "Người"
      ? guests
      : item.basis === "Bàn bố trí"
        ? setupTables
        : 1;
  return equipmentNeeded(item.rate, basis, item.reserve ?? 0);
}

export const equipmentFormula = (item: EquipmentType) =>
  item.rate === null
    ? "Nhập theo bữa"
    : `${item.rate} × ${item.basis.toLowerCase()}${item.reserve ? ` + ${Math.round(item.reserve * 100)}% dự trù` : ""}`;

const HELD_OVERLAPPING: Record<string, number> = {
  "Bát ăn sứ": 200,
  "Đũa tre": 240,
  "Ly thủy tinh": 500,
  "Bàn tròn": 10,
  "Ghế nhựa": 100,
  "Nồi lẩu": 10,
  "Khay inox": 60,
  "Rạp che": 2,
};

/** Quantity already held by meals that overlap this one (sample). */
export const heldByOverlappingMeals = (name: string) =>
  HELD_OVERLAPPING[name] ?? 0;

/** BR13 */
export function capacityRows(
  simulateShortage: boolean,
  meal: Pick<
    (typeof CONTRACT_WEDDING.meals)[number],
    "servingTables" | "guestsPerTable" | "setupTables"
  > = CONTRACT_WEDDING.meals[0]
) {
  const guests = meal.servingTables * meal.guestsPerTable;
  return EQUIPMENT.map((item) => {
    const needed = equipmentDemand(item, guests, meal.setupTables, 2);
    const held =
      item.name === "Ly thủy tinh" && simulateShortage
        ? 800
        : HELD_OVERLAPPING[item.name];
    const available = item.owned - item.damaged - held;
    return {
      name: item.name,
      basis: item.basis,
      needed,
      usable: item.owned - item.damaged,
      held,
      available,
      short: needed > available,
      belowMinimum: item.ready < item.minimum,
    };
  });
}

export type CountReportRow = {
  name: string;
  issued: number;
  good: number;
  damaged: number;
  lost: number;
  charged: number;
  price: number;
};

export const COUNT_REPORT_STATUS = {
  Draft: "draft",
  Confirmed: "confirmed",
} as const;

export type CountReportStatus =
  (typeof COUNT_REPORT_STATUS)[keyof typeof COUNT_REPORT_STATUS];

/** BR13 biên bản kiểm đếm, one per meal. */
export type CountReport = {
  status: CountReportStatus;
  rows: CountReportRow[];
  photos: string[];
  counter: string;
  note: string;
  customerName: string;
  /** PNG data URL of the customer representative's signature. */
  customerSignature: string | null;
  savedAt: string;
};

export const countReportCompensation = (rows: CountReportRow[]) =>
  rows.reduce((sum, row) => sum + row.charged * row.price, 0);

export const COUNT_REPORT_ROWS: CountReportRow[] = [
  {
    name: "Bát ăn sứ",
    issued: 99,
    good: 89,
    damaged: 4,
    lost: 6,
    charged: 6,
    price: 15000,
  },
  {
    name: "Đũa tre",
    issued: 99,
    good: 99,
    damaged: 0,
    lost: 0,
    charged: 0,
    price: 5000,
  },
  {
    name: "Ghế nhựa",
    issued: 95,
    good: 94,
    damaged: 1,
    lost: 0,
    charged: 1,
    price: 120000,
  },
  {
    name: "Bàn tròn",
    issued: 9,
    good: 9,
    damaged: 0,
    lost: 0,
    charged: 0,
    price: 1200000,
  },
];
