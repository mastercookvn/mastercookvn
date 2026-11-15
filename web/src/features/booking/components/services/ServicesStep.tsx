"use client";

import { ServicePicker } from "@/components/ui/ServicePicker";
import { BookingMealCard } from "@/features/booking/components/flow/BookingMealCard";
import { useBookingMeals } from "@/features/booking/lib/useBookingMeals";

export function ServicesStep() {
  const { meals, updateMeal } = useBookingMeals();

  return meals.map((meal, index) => (
    <BookingMealCard key={index} meal={meal} index={index}>
      <div className="meal-field-group">
        <ServicePicker
          selected={meal.serviceIds}
          onChange={(serviceIds) => updateMeal(index, { serviceIds })}
        />
      </div>
    </BookingMealCard>
  ));
}
