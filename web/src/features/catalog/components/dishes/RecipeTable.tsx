import { DataTable, num } from "@/components/ui/DataTable";
import { formatDecimal, formatMoney } from "@/lib/format";
import { CHICKEN_COST, CHICKEN_RECIPE } from "@/mocks/inventory";

export function RecipeTable() {
  return (
    <DataTable
      columns={[
        "Nguyên liệu",
        num("Lượng"),
        num("Giá hiện hành"),
        num("Chi phí"),
      ]}
      rows={CHICKEN_RECIPE.map((row) => [
        row.ingredient,
        `${formatDecimal(row.quantity)} ${row.unit}`,
        formatMoney(row.price),
        formatMoney(row.quantity * row.price),
      ])}
      foot={
        <>
          <td colSpan={3}>Chi phí ước tính</td>
          <td className="is-num">{formatMoney(CHICKEN_COST)}</td>
        </>
      }
    />
  );
}
