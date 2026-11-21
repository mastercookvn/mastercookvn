import {
  SERVING_FORMAT,
  TRAY_WINDOW_MINUTES,
  type ServingFormat,
} from "@/constants/booking";
import { fromMinutes, nextWave, toMinutes } from "@/lib/servingWaves";
import type { EstimateMeal } from "@/lib/demoStore";

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
