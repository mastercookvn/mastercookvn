"use client";

import { BowlIcon } from "@/components/icons";
import { DISH_CATEGORY_LABEL } from "@/mocks/catalog";
import type { CatalogDish } from "@/mocks/demoStore";

import { SearchPicker } from "./SearchPicker";

export function DishPicker({
  dishes,
  selectedIds,
  onChange,
  label = "Tìm món để thêm vào set",
  emptyText = "Chưa chọn món nào.",
}: {
  dishes: CatalogDish[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label?: string;
  emptyText?: string;
}) {
  return (
    <SearchPicker
      options={dishes.map((dish) => ({
        id: dish.id,
        name: dish.name,
        meta: DISH_CATEGORY_LABEL[dish.category],
        price: dish.price,
        imageKey: dish.imageKey,
      }))}
      selectedIds={selectedIds}
      onChange={onChange}
      label={label}
      placeholder="Tìm món theo tên hoặc loại, ví dụ: lẩu"
      emptyText={emptyText}
      fallbackIcon={<BowlIcon size={18} />}
    />
  );
}
