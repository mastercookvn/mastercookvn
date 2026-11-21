import type { MediaKey } from "@/lib/media";

export type Ingredient = {
  name: string;
  unit: string;
  price: number;
  usedIn: string;
  imageKey?: MediaKey;
};

export type PurchaseLine = {
  ingredient: string;
  unit?: string;
  quantity: number;
  price: number;
};

export type Purchase = {
  code: string;
  date: string;
  supplier: string;
  phone: string;
  lines: PurchaseLine[];
  /** Data URLs of receipt photos. */
  photos?: string[];
};

export const purchaseTotal = (lines: PurchaseLine[]) =>
  lines.reduce((sum, line) => sum + line.quantity * line.price, 0);
