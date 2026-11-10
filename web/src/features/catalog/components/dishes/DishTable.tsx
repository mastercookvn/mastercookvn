import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";
import { DISH_CATEGORY_LABEL, DISHES } from "@/mocks/catalog";

export function DishTable() {
  return (
    <DataTable
      columns={["Món", "Loại", num("Giá bán"), "Trạng thái"]}
      rows={DISHES.slice(0, 11).map((dish) => [
        dish.id === "ga" ? <b key="name">{dish.name}</b> : dish.name,
        DISH_CATEGORY_LABEL[dish.category],
        formatMoney(dish.price),
        <Badge key="status" tone="good">
          Đang phục vụ
        </Badge>,
      ])}
    />
  );
}
