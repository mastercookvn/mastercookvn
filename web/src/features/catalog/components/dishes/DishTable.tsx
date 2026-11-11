"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney, formatPercent } from "@/lib/format";
import { dishFoodCost, recipeCost } from "@/lib/pricing";
import { DISH_CATEGORY_LABEL } from "@/mocks/catalog";
import { useDemoState, type CatalogDish } from "@/mocks/demoStore";

export function DishTable({
  dishes,
  selectedId,
  onSelect,
  renderActions,
}: {
  dishes: CatalogDish[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderActions: (dish: CatalogDish) => ReactNode;
}) {
  const recipes = useDemoState((state) => state.recipes);
  const ingredients = useDemoState((state) => state.ingredients);
  const costOf = (id: string) => recipeCost(recipes[id] ?? [], ingredients);

  return (
    <DataTable
      columns={[
        "Món",
        "Loại",
        num("Giá bán"),
        num("Chi phí NL"),
        num("Food cost"),
        "Ảnh",
        "Trạng thái",
        "",
      ]}
      rows={dishes.map((dish) => [
        dish.name,
        DISH_CATEGORY_LABEL[dish.category],
        formatMoney(dish.price),
        costOf(dish.id) > 0 ? (
          formatMoney(costOf(dish.id))
        ) : (
          <span key="cost" className="text-soft text-small">
            Chưa có định lượng
          </span>
        ),
        costOf(dish.id) > 0
          ? formatPercent(dishFoodCost(costOf(dish.id), dish.price) ?? 0)
          : "",
        dish.imageKey ? (
          <Badge key="image" tone="good">
            Đã có
          </Badge>
        ) : (
          <Badge key="image" tone="wait">
            Chưa có
          </Badge>
        ),
        dish.active ? (
          <Badge key="status" tone="good">
            Đang phục vụ
          </Badge>
        ) : (
          <Badge key="status" tone="neutral">
            Ngưng
          </Badge>
        ),
        renderActions(dish),
      ])}
      rowActions={dishes.map((dish) => ({
        onSelect: () => onSelect(dish.id),
        selected: dish.id === selectedId,
      }))}
    />
  );
}
