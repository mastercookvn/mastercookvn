import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";
import type { Contract } from "@/mocks/contracts";

export function AllocationPreview({
  contract,
  amount,
}: {
  contract: Contract;
  amount: number;
}) {
  return (
    <DataTable
      columns={["Bữa", num("Giá trị"), num("Phân bổ dự kiến")]}
      rows={contract.meals.map((meal, index) => [
        `Bữa ${index + 1}, ${meal.date}`,
        formatMoney(meal.price.total),
        formatMoney((amount * meal.price.total) / contract.total),
      ])}
    />
  );
}
