import type { MediaKey } from "@/lib/media";
import { proposedIngredientPrice, type RecipeLine } from "@/lib/pricing";

/** BR06, section 9.3. */
export const INVENTORY_PERIOD = (() => {
  const lines = [
    {
      name: "Thịt ba chỉ heo",
      unit: "kg",
      openingQty: 40,
      openingValue: 4400000,
      purchasedQty: 300,
      purchasedValue: 34500000,
      closingQty: 30,
    },
    {
      name: "Tôm sú",
      unit: "kg",
      openingQty: 15,
      openingValue: 3300000,
      purchasedQty: 120,
      purchasedValue: 27600000,
      closingQty: 10,
    },
    {
      name: "Thăn bò",
      unit: "kg",
      openingQty: 10,
      openingValue: 2600000,
      purchasedQty: 90,
      purchasedValue: 24300000,
      closingQty: 8,
    },
    {
      name: "Gà ta nguyên con",
      unit: "kg",
      openingQty: 20,
      openingValue: 2200000,
      purchasedQty: 150,
      purchasedValue: 17250000,
      closingQty: 15,
    },
    {
      name: "Rau củ các loại",
      unit: "kg",
      openingQty: 30,
      openingValue: 750000,
      purchasedQty: 400,
      purchasedValue: 10400000,
      closingQty: 40,
    },
  ].map((line) => {
    const unitCost =
      (line.openingValue + line.purchasedValue) /
      (line.openingQty + line.purchasedQty);
    const closingValue = Math.round(line.closingQty * unitCost);
    return {
      ...line,
      unitCost,
      closingValue,
      consumed: line.openingValue + line.purchasedValue - closingValue,
      maxQty: line.openingQty + line.purchasedQty,
    };
  });
  const dishRevenue = 318000000;
  const cost = lines.reduce((sum, line) => sum + line.consumed, 0);
  return {
    month: "10/2026",
    lines,
    dishRevenue,
    cost,
    foodCost: cost / dishRevenue,
    margin: dishRevenue - cost,
  };
})();

/** BR05, section 9.6. */
export const PRICE_PROPOSALS = [
  {
    name: "Thịt ba chỉ heo",
    unit: "kg",
    current: 115000,
    purchases: [
      { quantity: 100, price: 112000 },
      { quantity: 100, price: 115000 },
      { quantity: 100, price: 119000 },
    ],
    dishes: "Heo quay da giòn",
  },
  {
    name: "Tôm sú",
    unit: "kg",
    current: 230000,
    purchases: [
      { quantity: 40, price: 240000 },
      { quantity: 40, price: 245000 },
      { quantity: 40, price: 252000 },
    ],
    dishes: "Tôm sú hấp bia, Lẩu Thái hải sản",
  },
  {
    name: "Thăn bò",
    unit: "kg",
    current: 270000,
    purchases: [
      { quantity: 30, price: 268000 },
      { quantity: 30, price: 270000 },
      { quantity: 30, price: 270000 },
    ],
    dishes: "Bò lúc lắc khoai tây",
  },
  {
    name: "Gà ta nguyên con",
    unit: "kg",
    current: 115000,
    purchases: [
      { quantity: 50, price: 118000 },
      { quantity: 50, price: 121000 },
      { quantity: 50, price: 124000 },
    ],
    dishes: "Gà hấp lá chanh, Lẩu gà lá é",
  },
].map((row) => ({
  ...row,
  proposed: Math.round(proposedIngredientPrice(row.purchases) ?? 0),
}));

/** Quantities for one standard 10-person table, by dish id. */
export const DISH_RECIPES: Record<string, RecipeLine[]> = {
  ga: [
    { ingredient: "Gà ta nguyên con", quantity: 1.2 },
    { ingredient: "Sả, lá chanh, gừng", quantity: 0.2 },
  ],
  laugaa: [
    { ingredient: "Gà ta nguyên con", quantity: 1.5 },
    { ingredient: "Rau củ các loại", quantity: 1.2 },
  ],
  heo: [
    { ingredient: "Thịt ba chỉ heo", quantity: 1.6 },
    { ingredient: "Rau củ các loại", quantity: 0.3 },
  ],
  tom: [
    { ingredient: "Tôm sú", quantity: 1 },
    { ingredient: "Sả, lá chanh, gừng", quantity: 0.1 },
  ],
  bo: [
    { ingredient: "Thăn bò", quantity: 0.8 },
    { ingredient: "Rau củ các loại", quantity: 0.6 },
  ],
  lauthai: [
    { ingredient: "Tôm sú", quantity: 0.6 },
    { ingredient: "Rau củ các loại", quantity: 1.5 },
    { ingredient: "Sả, lá chanh, gừng", quantity: 0.3 },
  ],
};

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

export const INGREDIENT_UNITS = ["kg", "lít", "quả", "bó", "hộp", "gói"];

export const purchaseTotal = (lines: PurchaseLine[]) =>
  lines.reduce((sum, line) => sum + line.quantity * line.price, 0);

export const INGREDIENTS: Ingredient[] = [
  {
    name: "Gà ta nguyên con",
    unit: "kg",
    price: 115000,
    usedIn: "Gà hấp lá chanh, Lẩu gà lá é",
  },
  {
    name: "Thịt ba chỉ heo",
    unit: "kg",
    price: 115000,
    usedIn: "Heo quay da giòn",
  },
  {
    name: "Tôm sú",
    unit: "kg",
    price: 230000,
    usedIn: "Tôm sú hấp bia, Lẩu Thái hải sản",
  },
  {
    name: "Thăn bò",
    unit: "kg",
    price: 270000,
    usedIn: "Bò lúc lắc khoai tây",
  },
  {
    name: "Sả, lá chanh, gừng",
    unit: "kg",
    price: 25000,
    usedIn: "Gà hấp lá chanh",
  },
  { name: "Rau củ các loại", unit: "kg", price: 26000, usedIn: "Nhiều món" },
];

export const MONTHLY_REVENUE = [
  { month: "T6", dishRevenue: 241000000, foodCost: 0.362 },
  { month: "T7", dishRevenue: 198000000, foodCost: 0.381 },
  { month: "T8", dishRevenue: 226000000, foodCost: 0.355 },
  { month: "T9", dishRevenue: 287000000, foodCost: 0.348 },
  {
    month: "T10",
    dishRevenue: INVENTORY_PERIOD.dishRevenue,
    foodCost: INVENTORY_PERIOD.foodCost,
  },
];
