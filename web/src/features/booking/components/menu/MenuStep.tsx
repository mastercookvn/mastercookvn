"use client";

import { DishPicker } from "@/components/ui/DishPicker";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { MENU_MODE, type MenuMode } from "@/constants/booking";
import { DEFAULT_DISH_IDS, useDemoState } from "@/mocks/demoStore";

import { BookingMealCard } from "@/features/booking/components/flow/BookingMealCard";
import { mealMenuErrors } from "@/features/booking/lib/estimate";
import { useBookingMeals } from "@/features/booking/lib/useBookingMeals";

import { MenuSetSelect } from "./MenuSetSelect";

const MODE_OPTIONS: { value: MenuMode; label: string }[] = [
  { value: MENU_MODE.Set, label: "Chọn set có sẵn" },
  { value: MENU_MODE.Custom, label: "Tự chọn món" },
];

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
          onChange={(mode) =>
            updateMeal(index, {
              mode,
              dishIds:
                mode === MENU_MODE.Custom && !meal.dishIds.length
                  ? DEFAULT_DISH_IDS
                  : meal.dishIds,
            })
          }
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
