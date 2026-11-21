"use client";

import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { useDemoState, type EstimateMeal } from "@/lib/demoStore";

import { estimateMeal } from "@/features/booking/lib/estimate";

export function OrderSummary({ meal }: { meal: EstimateMeal }) {
  const dishes = useDemoState((state) => state.dishes);
  const menuSets = useDemoState((state) => state.menuSets);
  const services = useDemoState((state) => state.services);
  const estimate = estimateMeal(meal, { dishes, menuSets, services });

  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Tóm tắt</h3>
      {estimate.price ? (
        <MealPriceBreakdown price={estimate.price} />
      ) : (
        <ul className="l-stack text-small text-soft gap-1">
          {estimate.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p className="text-small text-soft">
        Khách đăng ký sau bằng cùng SĐT sẽ thấy đơn này.
      </p>
    </aside>
  );
}
