import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";

export function ContractMealTable() {
  return (
    <DataTable
      columns={[
        "Bữa",
        "Thời gian",
        num("Bàn ăn"),
        num("Bàn bố trí"),
        "Thực đơn",
        num("Tiền món"),
        num("Dịch vụ"),
        num("Thuế"),
        num("Tổng"),
      ]}
      rows={contract.meals.map((meal, index) => [
        `Bữa ${index + 1}`,
        `${meal.date} ${meal.time.slice(0, 5)}`,
        meal.servingTables,
        meal.setupTables,
        meal.setName,
        formatMoney(meal.price.dishAmount),
        formatMoney(meal.price.serviceAmount),
        formatMoney(meal.price.taxAmount),
        formatMoney(meal.price.total),
      ])}
      foot={
        <>
          <td colSpan={8}>Tổng hợp đồng</td>
          <td className="is-num">{formatMoney(contract.total)}</td>
        </>
      }
    />
  );
}
