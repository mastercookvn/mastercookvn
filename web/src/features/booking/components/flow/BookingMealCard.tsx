import type { ReactNode } from "react";

import { WarningIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import type { EstimateMeal } from "@/mocks/demoStore";

import { mealTitle, mealWhen } from "@/features/booking/lib/mealTitle";

export function BookingMealCard({
  meal,
  index,
  aside,
  errors = [],
  showHeader = true,
  children,
}: {
  meal: EstimateMeal;
  index: number;
  aside?: ReactNode;
  errors?: string[];
  /** The first step is where the meal gets its details, so it has nothing to show yet. */
  showHeader?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="card meal-card">
      {showHeader ? (
        <header className="meal-card-head">
          <div>
            <h3>{mealTitle(meal, `Bữa ${index + 1}`)}</h3>
            <p>{mealWhen(meal)}</p>
          </div>
          {aside}
        </header>
      ) : null}
      <div className="meal-card-body">{children}</div>
      {errors.length ? (
        <footer className="meal-card-foot">
          <Alert tone="error">
            <WarningIcon size={18} />
            <span>{errors.join(" ")}</span>
          </Alert>
        </footer>
      ) : null}
    </section>
  );
}
