"use client";

import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { ServingWavesList } from "@/components/ui/ServingWavesList";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { useWorkspaceOrder } from "@/features/orders/lib/useOrders";

export function OrderMealsPanel({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  if (!order) return null;

  return order.mealDetails.map((meal, index) => (
    <section key={index} className="card">
      <div className="l-between mb-1.5">
        <h3 className="card-title card-title-flush">
          Bữa {index + 1}: {meal.name}
        </h3>
        <StatusBadge domain="meal" status={meal.status} />
      </div>
      <div className="l-grid l-grid-2">
        <div className="l-stack gap-2">
          <p className="text-small text-soft">
            {meal.date}, {meal.time}
            <br />
            {meal.address}
            <br />
            {meal.setName}
          </p>
          <ServingWavesList
            waves={meal.waves}
            guestsPerTable={meal.guestsPerTable}
          />
        </div>
        <div>
          {meal.price ? <MealPriceBreakdown price={meal.price} /> : null}
        </div>
      </div>
    </section>
  ));
}
