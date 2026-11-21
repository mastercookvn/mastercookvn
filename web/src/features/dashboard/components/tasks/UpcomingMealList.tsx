import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { listOperationMeals } from "@/features/meals/lib/operationMeals";

const VISIBLE_MEALS = 3;

export function UpcomingMealList() {
  const meals = listOperationMeals();

  return (
    <Card>
      <CardTitle>Tiệc sắp tới</CardTitle>
      {meals.length ? (
        meals.slice(0, VISIBLE_MEALS).map((meal) => (
          <div key={meal.id} className="check-row">
            <span>
              <b className="font-semibold">{meal.date}</b> {meal.time}
              <br />
              <span className="text-soft text-small">
                {meal.name}, {meal.servingTables} bàn ăn
              </span>
            </span>
            <StatusBadge domain="meal" status={meal.initialStatus} />
          </div>
        ))
      ) : (
        <p className="text-soft text-small">Chưa có tiệc sắp tới.</p>
      )}
      <Link href="?tab=calendar" className="card-link">
        Mở lịch tiệc ({meals.length} tiệc)
      </Link>
    </Card>
  );
}
