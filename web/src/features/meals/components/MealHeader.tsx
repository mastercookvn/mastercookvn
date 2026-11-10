import type { OperationMeal } from "@/mocks/operationMeals";

export function MealHeader({ meal }: { meal: OperationMeal }) {
  return (
    <div className="meal-head">
      <h2>
        {meal.name} · {meal.date}/2026, {meal.time}
      </h2>
      <span className="text-small text-soft">
        {meal.orderCode} · {meal.address} · {meal.servingTables} bàn ăn,{" "}
        {meal.setupTables} bàn bố trí
      </span>
    </div>
  );
}
