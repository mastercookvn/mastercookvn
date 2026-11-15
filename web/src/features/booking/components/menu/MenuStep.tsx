"use client";

import { DishPicker } from "@/components/ui/DishPicker";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { MENU_MODE, MENU_MODE_LABEL } from "@/constants/booking";
import { useDemoState } from "@/mocks/demoStore";

import { BookingMealCard } from "@/features/booking/components/flow/BookingMealCard";
import { mealMenuErrors } from "@/features/booking/lib/estimate";
import { withMenuMode } from "@/features/booking/lib/mealForm";
import { useBookingMeals } from "@/features/booking/lib/useBookingMeals";

import { MenuSetSelect } from "./MenuSetSelect";

const MODE_OPTIONS = Object.values(MENU_MODE).map((value) => ({
  value,
  label: MENU_MODE_LABEL[value],
}));

export function MenuStep({ showErrors }: { showErrors: boolean }) {
  const { meals, updateMeal } = useBookingMeals();
  const allDishes = useDemoState((state) => state.dishes);
  const menuSets = useDemoState((state) => state.menuSets);
  const services = useDemoState((state) => state.services);
  const dishes = allDishes.filter((dish) => dish.active);
  const catalog = { dishes: allDishes, menuSets, services };

  return meals.map((meal, index) => (
    <BookingMealCard
      key={index}
      meal={meal}
      index={index}
      errors={showErrors ? mealMenuErrors(meal, catalog) : []}
    >
      <div className="meal-field-group">
        <SegmentedControl
          label="Cách chọn thực đơn"
          options={MODE_OPTIONS}
          value={meal.mode}
          onChange={(mode) => updateMeal(index, withMenuMode(meal, mode))}
        />
        {meal.mode === MENU_MODE.Set ? (
          <MenuSetSelect
            id={`menu-set-${index}`}
            value={meal.setId}
            onChange={(setId) => updateMeal(index, { setId })}
          />
        ) : (
          <DishPicker
            dishes={dishes}
            selectedIds={meal.dishIds}
            onChange={(dishIds) => updateMeal(index, { dishIds })}
            label="Tìm món để thêm vào thực đơn"
            emptyText="Chưa chọn món nào, gõ tên món để tìm. Cần ít nhất 6 món."
          />
        )}
      </div>
    </BookingMealCard>
  ));
}
