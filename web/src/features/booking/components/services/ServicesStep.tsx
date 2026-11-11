"use client";

import { BookingMealCard } from "@/features/booking/components/flow/BookingMealCard";
import { useBookingMeals } from "@/features/booking/lib/useBookingMeals";

import { ServicePicker } from "./ServicePicker";

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
