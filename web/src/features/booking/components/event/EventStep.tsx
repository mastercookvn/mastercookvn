"use client";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import {
  NEW_ESTIMATE_MEAL,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import { mealInfoErrors } from "@/features/booking/lib/estimate";
import { useBookingMeals } from "@/features/booking/lib/useBookingMeals";

import { MealInfoCard } from "./MealInfoCard";

export function EventStep({ showErrors }: { showErrors: boolean }) {
  const { meals, setMeals, updateMeal } = useBookingMeals();
  const eventTypes = useDemoState((state) => state.eventTypes);
  const eventType = useDemoState((state) => state.bookingEventType);

  return (
    <>
      <section className="card">
        <SelectField
          id="booking-event-type"
          label="Loại tiệc"
          options={eventTypes}
          value={eventType}
          onValueChange={(bookingEventType) =>
            updateDemoState({ bookingEventType })
          }
        />
      </section>
      {meals.map((meal, index) => (
        <MealInfoCard
          key={index}
          meal={meal}
          index={index}
          errors={showErrors ? mealInfoErrors(meal) : []}
          removable={meals.length > 1}
          onChange={(patch) => updateMeal(index, patch)}
          onRemove={() => setMeals(meals.filter((_, i) => i !== index))}
        />
      ))}
      <div>
        <Button onClick={() => setMeals([...meals, NEW_ESTIMATE_MEAL])}>
          <PlusIcon size={18} />
          Thêm bữa
        </Button>
      </div>
    </>
  );
}
