"use client";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import {
  NEW_ESTIMATE_MEAL,
  updateDemoState,
  useDemoState,
  type EstimateMeal,
} from "@/mocks/demoStore";

import { estimateMeal } from "@/features/booking/lib/estimate";

import { EstimateSummary } from "./EstimateSummary";
import { MealCard } from "./MealCard";

export function EstimateStep({ onContinue }: { onContinue: () => void }) {
  const meals = useDemoState((state) => state.estimate);
  const estimates = meals.map(estimateMeal);

  const setMeals = (estimate: EstimateMeal[]) => updateDemoState({ estimate });

  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack gap-4">
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            meal={meal}
            index={index}
            estimate={estimates[index]}
            removable={meals.length > 1}
            onChange={(patch) =>
              setMeals(
                meals.map((item, i) =>
                  i === index ? { ...item, ...patch } : item,
                ),
              )
            }
            onRemove={() => setMeals(meals.filter((_, i) => i !== index))}
          />
        ))}
        <div>
          <Button onClick={() => setMeals([...meals, NEW_ESTIMATE_MEAL])}>
            <PlusIcon size={18} />
            Thêm bữa
          </Button>
        </div>
      </div>
      <EstimateSummary estimates={estimates} onContinue={onContinue} />
    </div>
  );
}
