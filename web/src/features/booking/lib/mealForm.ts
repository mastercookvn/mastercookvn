import {
  MENU_MODE,
  SERVING_FORMAT,
  TRAY_WINDOW_MINUTES,
  type MenuMode,
  type ServingFormat,
} from "@/constants/booking";
import { fromMinutes, nextWave, toMinutes } from "@/lib/servingWaves";
import { DEFAULT_DISH_IDS, type EstimateMeal } from "@/mocks/demoStore";

/** Trays keep one delivery window; switching back keeps the first wave. */
export function withServingFormat(
  meal: EstimateMeal,
  format: ServingFormat
): Partial<EstimateMeal> {
  const first = meal.waves[0] ?? nextWave([]);
  return {
    format,
    name: format === SERVING_FORMAT.Trays ? "" : meal.name,
    waves: [
      format === SERVING_FORMAT.Trays
        ? {
            ...first,
            to: fromMinutes(toMinutes(first.from) + TRAY_WINDOW_MINUTES),
          }
        : first,
    ],
  };
}

/** A custom menu starts from the sample dishes instead of an empty list. */
export function withMenuMode(
  meal: EstimateMeal,
  mode: MenuMode
): Partial<EstimateMeal> {
  return {
    mode,
    dishIds:
      mode === MENU_MODE.Custom && meal.dishIds.length === 0
        ? DEFAULT_DISH_IDS
        : meal.dishIds,
  };
}
