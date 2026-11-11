import { SERVING_FORMAT } from "@/constants/booking";
import type { EstimateMeal } from "@/mocks/demoStore";

/** Tray orders have no name, so they are titled by what is delivered. */
export function mealTitle(meal: EstimateMeal, fallback: string) {
  if (meal.format === SERVING_FORMAT.Trays) {
    return `${meal.waves[0]?.tables ?? 0} mâm · ${meal.guestsPerTable} người/mâm`;
  }
  return meal.name.trim() || fallback;
}

/** "14/12/2026 · giao lúc 11:00" for trays, "14/12/2026 · 11:00–14:00" otherwise. */
export function mealWhen(meal: EstimateMeal) {
  const first = meal.waves[0];
  const last = meal.waves.at(-1);
  if (!first || !last) return meal.date;
  return meal.format === SERVING_FORMAT.Trays
    ? `${meal.date} · giao lúc ${first.from}`
    : `${meal.date} · ${first.from}–${last.to}`;
}
