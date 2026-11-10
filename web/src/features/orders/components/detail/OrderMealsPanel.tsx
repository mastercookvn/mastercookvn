import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CONTRACT_WEDDING } from "@/mocks/contracts";

export function OrderMealsPanel() {
  return CONTRACT_WEDDING.meals.map((meal, index) => (
    <section key={meal.name} className="card">
      <div className="l-between mb-1.5">
        <h3 className="card-title card-title-flush">
          Bữa {index + 1}: {meal.name}
        </h3>
        <StatusBadge domain="meal" status={meal.status} />
      </div>
      <div className="l-grid l-grid-2">
        <p className="text-small text-soft">
          {meal.date}, {meal.time}
          <br />
          {meal.address}
          <br />
          {meal.servingTables} bàn ăn, {meal.guestsPerTable} người mỗi bàn,{" "}
          {meal.setupTables} bàn bố trí
          <br />
          {meal.setName}
        </p>
        <div>
          <MealPriceBreakdown price={meal.price} />
        </div>
      </div>
    </section>
  ));
}
