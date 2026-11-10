"use client";

import { formatNumber } from "@/lib/format";
import { DISHES } from "@/mocks/catalog";

export function DishPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (dishIds: string[]) => void;
}) {
  return (
    <div className="l-grid l-grid-3 gap-x-4 gap-y-1.5">
      {DISHES.map((dish) => (
        <label key={dish.id} className="l-row text-small flex-nowrap gap-1.5">
          <input
            type="checkbox"
            className="checkbox"
            checked={selected.includes(dish.id)}
            onChange={(event) =>
              onChange(
                event.target.checked
                  ? [...selected, dish.id]
                  : selected.filter((id) => id !== dish.id),
              )
            }
          />
          <span className="flex-1">{dish.name}</span>
          <span className="text-soft">{formatNumber(dish.price / 1000)}k</span>
        </label>
      ))}
    </div>
  );
}
