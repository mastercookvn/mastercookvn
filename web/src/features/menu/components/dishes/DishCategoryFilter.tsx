"use client";

import { Button } from "@/components/ui/Button";
import { DISH_CATEGORY_LABEL, type DishCategory } from "@/mocks/catalog";

const CATEGORIES = Object.keys(DISH_CATEGORY_LABEL) as DishCategory[];

export function DishCategoryFilter({
  active,
  onChange,
}: {
  active: DishCategory | null;
  onChange: (category: DishCategory | null) => void;
}) {
  return (
    <div className="l-row gap-1.5">
      <Button
        size="sm"
        variant={active === null ? "inverse" : "default"}
        onClick={() => onChange(null)}
      >
        Tất cả
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          size="sm"
          variant={active === category ? "inverse" : "default"}
          onClick={() => onChange(category)}
        >
          {DISH_CATEGORY_LABEL[category]}
        </Button>
      ))}
    </div>
  );
}
