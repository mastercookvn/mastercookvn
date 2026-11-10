"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import {
  DISH_CATEGORY_LABEL,
  DISHES,
  type DishCategory,
} from "@/mocks/catalog";

import { DishCard } from "./DishCard";
import { DishCategoryFilter } from "./DishCategoryFilter";

function parseCategory(value: string | null): DishCategory | null {
  return value && value in DISH_CATEGORY_LABEL ? (value as DishCategory) : null;
}

export function DishGrid() {
  const [value, setValue] = useQueryParam("category");
  const category = parseCategory(value);
  const dishes = category
    ? DISHES.filter((dish) => dish.category === category)
    : DISHES;

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
