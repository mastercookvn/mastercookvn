import { BUSINESS_SETTINGS } from "@/constants/settings";
import { calculateMealPrice, type MealPrice } from "@/lib/pricing";
import {
  dishById,
  menuSetById,
  menuSetPrice,
  serviceById,
} from "@/mocks/catalog";
import type { EstimateMeal } from "@/mocks/demoStore";

/** Sample list and rate (V6). */
const HOLIDAYS = ["01/01", "30/04", "01/05", "02/09"];
const HOLIDAY_SURCHARGE_RATE = 0.05;

export type MealEstimate =
  | { errors: string[]; price?: undefined; isHoliday?: undefined }
  | { errors?: undefined; price: MealPrice; isHoliday: boolean };

/** Preview only. POST /estimates is authoritative once available. */
export function estimateMeal(meal: EstimateMeal): MealEstimate {
  const errors: string[] = [];
  if (meal.guestsPerTable < 10) errors.push("Mỗi bàn cần ít nhất 10 người.");
  if (meal.setupTables > meal.servingTables) {
    errors.push("Số bàn bố trí không vượt số bàn ăn.");
  }
  if (meal.mode === "custom" && meal.dishIds.length < 6) {
    errors.push(
      `Tự chọn cần ít nhất 6 món, bạn đang chọn ${meal.dishIds.length} món.`,
    );
  }
  if (errors.length) return { errors };

  const dishesTotal =
    meal.mode === "set"
      ? menuSetPrice(menuSetById(meal.setId))
      : meal.dishIds.reduce((sum, id) => sum + dishById(id).price, 0);
  const isHoliday = HOLIDAYS.includes(meal.date.slice(0, 5));

  return {
    isHoliday,
    price: calculateMealPrice({
      dishesTotal,
      servingTables: meal.servingTables,
      guestsPerTable: meal.guestsPerTable,
      services: meal.serviceIds.map((id) => ({
        price: serviceById(id).price,
        quantity: 1,
      })),
      surcharge: isHoliday
        ? dishesTotal *
          (meal.guestsPerTable / 10) *
          meal.servingTables *
          HOLIDAY_SURCHARGE_RATE
        : 0,
    }),
  };
}

export const MINIMUM_DEPOSIT_RATE = BUSINESS_SETTINGS.minimumDepositRate;
