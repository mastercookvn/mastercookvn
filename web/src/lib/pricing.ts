// BR formulas from section 9, for display. The backend is authoritative.
import { BUSINESS_SETTINGS } from "@/constants/settings";

export type ServiceLine = { price: number; quantity: number };

export type MealPriceInput = {
  dishesTotal: number;
  servingTables: number;
  guestsPerTable: number;
  services?: ServiceLine[];
  surcharge?: number;
};

export type MealPrice = {
  factor: number;
  dishAmount: number;
  serviceAmount: number;
  surcharge: number;
  taxAmount: number;
  beforeRounding: number;
  roundingDifference: number;
  total: number;
};

export type CancellationInput = {
  mealValue: number;
  paid: number;
  daysLeft: number;
};

export type CancellationResult = {
  basis: number;
  prepaidExcess: number;
  rate: number;
  refund: number;
  retained: number;
  tierLabel: string;
};

/** Nearest 500, half rounds up. */
export function roundTo500(amount: number): number {
  return Math.floor(amount / 500 + 0.5) * 500;
}

/** BR04 */
export function calculateMealPrice({
  dishesTotal,
  servingTables,
  guestsPerTable,
  services = [],
  surcharge = 0,
}: MealPriceInput): MealPrice {
  const factor = guestsPerTable / 10;
  const dishAmount = dishesTotal * factor * servingTables;
  const serviceAmount = services.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const subtotal = dishAmount + serviceAmount + surcharge;
  const taxAmount = subtotal * BUSINESS_SETTINGS.taxRate;
  const beforeRounding = subtotal + taxAmount;
  const total = roundTo500(beforeRounding);

  return {
    factor,
    dishAmount,
    serviceAmount,
    surcharge,
    taxAmount,
    beforeRounding,
    roundingDifference: total - beforeRounding,
    total,
  };
}

/** BR10 and BR08 */
export function calculateCancellation({
  mealValue,
  paid,
  daysLeft,
}: CancellationInput): CancellationResult {
  if (paid === 0) {
    return {
      basis: 0,
      prepaidExcess: 0,
      rate: 1,
      refund: 0,
      retained: 0,
      tierLabel: "Chưa cọc: hủy miễn phí",
    };
  }

  const rate = daysLeft >= 30 ? 1 : daysLeft >= 15 ? 0.5 : 0;
  const basis = Math.min(
    mealValue * BUSINESS_SETTINGS.minimumDepositRate,
    paid,
  );
  const prepaidExcess = paid - basis;
  const refund = basis * rate + prepaidExcess;
  const tierLabel =
    daysLeft >= 30
      ? "Còn ít nhất 30 ngày: hoàn 100%"
      : daysLeft >= 15
        ? "Còn 15 đến dưới 30 ngày: hoàn 50%"
        : "Còn dưới 15 ngày: hoàn 0%";

  return {
    basis,
    prepaidExcess,
    rate,
    refund,
    retained: paid - refund,
    tierLabel,
  };
}

/** BR12 */
export function servingStaffNeeded(setupTables: number): number {
  return Math.ceil(setupTables / BUSINESS_SETTINGS.tablesPerServer);
}

/** BR13 */
export function equipmentNeeded(
  rate: number,
  basis: number,
  reserveRate = 0,
): number {
  return Math.ceil(rate * basis * (1 + reserveRate) - 1e-9);
}

/** BR05. Weights run from oldest to newest window. */
export function proposedIngredientPrice(
  purchases: { quantity: number; price: number }[],
): number | null {
  const weights = [1.5, 1.5, 2];
  const value = purchases.reduce(
    (sum, row, index) => sum + row.quantity * row.price * weights[index],
    0,
  );
  const weight = purchases.reduce(
    (sum, row, index) => sum + row.quantity * weights[index],
    0,
  );
  return weight === 0 ? null : value / weight;
}
