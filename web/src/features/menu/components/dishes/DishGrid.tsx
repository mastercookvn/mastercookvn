"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { DISH_CATEGORY_LABEL, type DishCategory } from "@/mocks/catalog";
import { useDemoState } from "@/mocks/demoStore";

import { DishCard } from "./DishCard";
import { DishCategoryFilter } from "./DishCategoryFilter";

function parseCategory(value: string | null): DishCategory | null {
  return value && value in DISH_CATEGORY_LABEL ? (value as DishCategory) : null;
}

export function DishGrid() {
  const [value, setValue] = useQueryParam("category");
  const category = parseCategory(value);
  const allDishes = useDemoState((state) => state.dishes);
  const dishes = allDishes.filter(
    (dish) => dish.active && (!category || dish.category === category)
  );

  return (
    <>
      <DishCategoryFilter active={category} onChange={setValue} />
      <div className="l-grid l-grid-4">
        {dishes.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} index={index % 4} />
        ))}
      </div>
    </>
  );
}
