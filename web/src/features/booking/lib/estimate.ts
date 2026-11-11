import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { parseDayMonthYear } from "@/lib/format";
import { solarToLunar } from "@/lib/lunar";
import { calculateMealPrice, type MealPrice } from "@/lib/pricing";
import { waveErrors, waveTotals } from "@/lib/servingWaves";
import {
  DISHES,
  MENU_SETS,
  SERVICES,
  menuSetPriceFrom,
  type Dish,
  type MenuSet,
  type Service,
} from "@/mocks/catalog";
import type { BookingContact, EstimateMeal } from "@/mocks/demoStore";

/** BR04: fixed holiday lists, solar as dd/MM and lunar as [day, month]. Sample rate (V6). */
const SOLAR_HOLIDAYS = ["01/01", "30/04", "01/05", "02/09"];
const LUNAR_HOLIDAYS: [number, number][] = [
  [1, 1],
  [2, 1],
  [3, 1],
  [10, 3],
];
const HOLIDAY_SURCHARGE_RATE = 0.05;
const MIN_GUESTS_PER_TABLE = 10;
const MIN_CUSTOM_DISHES = 6;
const PHONE_PATTERN = /^0\d{9}$/;

/** What the customer can pick right now, as managed in the admin catalog. */
export type BookingCatalog = {
  dishes: readonly (Dish & { active?: boolean })[];
  menuSets: readonly MenuSet[];
  services: readonly Service[];
};

const SAMPLE_CATALOG: BookingCatalog = {
  dishes: DISHES,
  menuSets: MENU_SETS,
  services: SERVICES,
};

export function isHoliday(date: string) {
  const solar = parseDayMonthYear(date);
  if (!solar) return false;
  const lunar = solarToLunar(solar);
  return (
    SOLAR_HOLIDAYS.includes(date.slice(0, 5)) ||
    (!lunar.leap &&
      LUNAR_HOLIDAYS.some(
        ([day, month]) => lunar.day === day && lunar.month === month
      ))
  );
}

export type MealEstimate =
  | { errors: string[]; price?: undefined; isHoliday?: undefined }
  | { errors?: undefined; price: MealPrice; isHoliday: boolean };

/** Step 1: date, place and how the tables are served (UC-DT-02 4e). */
export function mealInfoErrors(meal: EstimateMeal): string[] {
  const waveProblems = waveErrors(meal.waves);
  const errors =
    meal.format === SERVING_FORMAT.Trays && waveProblems.length
      ? ["Chọn giờ giao và số mâm, ít nhất 1 mâm."]
      : waveProblems;
  if (!parseDayMonthYear(meal.date))
    errors.push("Chọn ngày tổ chức trên lịch.");
  if (meal.address.trim() === "") errors.push("Nhập địa chỉ tổ chức.");
  if (meal.guestsPerTable < MIN_GUESTS_PER_TABLE)
    errors.push(`Mỗi bàn cần ít nhất ${MIN_GUESTS_PER_TABLE} người.`);
  return errors;
}

/** UC-DT-01 3e: under 6 dishes, or a dish or set that is no longer served. */
export function mealMenuErrors(
  meal: EstimateMeal,
  catalog: BookingCatalog = SAMPLE_CATALOG
): string[] {
  if (meal.mode === MENU_MODE.Set) {
    const set = catalog.menuSets.find((item) => item.id === meal.setId);
    if (!set) return ["Chọn một set thực đơn."];
    return set.active === false
      ? [`${set.name} đã ngưng phục vụ, hãy chọn set khác.`]
      : [];
  }

  const errors: string[] = [];
  const stopped = catalog.dishes.filter(
    (dish) => meal.dishIds.includes(dish.id) && dish.active === false
  );
  if (stopped.length) {
    errors.push(
      `Đã ngưng phục vụ: ${stopped.map((dish) => dish.name).join(", ")}. Bỏ các món này rồi chọn món khác.`
    );
  }
  const served = meal.dishIds.length - stopped.length;
  if (served < MIN_CUSTOM_DISHES) {
    errors.push(
      `Tự chọn cần ít nhất ${MIN_CUSTOM_DISHES} món đang phục vụ, bạn đang có ${served} món.`
    );
  }
  return errors;
}

export function contactErrors(contact: BookingContact) {
  return {
    name: contact.name.trim() === "" ? "Nhập họ tên người đặt" : null,
    phone: PHONE_PATTERN.test(contact.phone.replace(/\s/g, ""))
      ? null
      : "Số điện thoại gồm 10 số, bắt đầu bằng 0",
  };
}

/** Preview only. POST /estimates is authoritative once available. */
export function estimateMeal(
  meal: EstimateMeal,
  catalog: BookingCatalog = SAMPLE_CATALOG
): MealEstimate {
  const errors = [...mealInfoErrors(meal), ...mealMenuErrors(meal, catalog)];
  if (errors.length) return { errors };

  const { servingTables } = waveTotals(meal.waves);
  const set = catalog.menuSets.find((item) => item.id === meal.setId);
  const dishesTotal =
    meal.mode === MENU_MODE.Set && set
      ? menuSetPriceFrom(set, catalog.dishes)
      : catalog.dishes
          .filter((dish) => meal.dishIds.includes(dish.id))
          .reduce((sum, dish) => sum + dish.price, 0);
  const holiday = isHoliday(meal.date);

  return {
    isHoliday: holiday,
    price: calculateMealPrice({
      dishesTotal,
      servingTables,
      guestsPerTable: meal.guestsPerTable,
      services: catalog.services
        .filter((service) => meal.serviceIds.includes(service.id))
        .map((service) => ({ price: service.price, quantity: 1 })),
      surcharge: holiday
        ? dishesTotal *
          (meal.guestsPerTable / MIN_GUESTS_PER_TABLE) *
          servingTables *
          HOLIDAY_SURCHARGE_RATE
        : 0,
    }),
  };
}

export const MINIMUM_DEPOSIT_RATE = BUSINESS_SETTINGS.minimumDepositRate;
