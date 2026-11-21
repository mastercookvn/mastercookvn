import {
  EQUIPMENT_BASIS,
  EQUIPMENT_BASIS_LABEL,
  type CountReportStatus,
  type EquipmentBasis,
} from "@/constants/equipment";
import { equipmentNeeded } from "@/lib/pricing";

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
    item.basis === EQUIPMENT_BASIS.Person
      ? guests
      : item.basis === EQUIPMENT_BASIS.SetupTable
        ? setupTables
        : 1;
  return equipmentNeeded(item.rate, basis, item.reserve ?? 0);
}

export const equipmentFormula = (item: EquipmentType) =>
  item.rate === null
    ? "Nhập theo bữa"
    : `${item.rate} × ${EQUIPMENT_BASIS_LABEL[item.basis].toLowerCase()}${item.reserve ? ` + ${Math.round(item.reserve * 100)}% dự trù` : ""}`;

export type CountReportRow = {
  name: string;
  issued: number;
  good: number;
  damaged: number;
  lost: number;
  charged: number;
  price: number;
};

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
