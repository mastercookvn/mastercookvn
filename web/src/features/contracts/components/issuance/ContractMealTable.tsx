import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";

export function ContractMealTable() {
  return (
    <DataTable
      columns={[
        "Bữa",
        "Thời gian",
        num("Lượt đãi"),
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
        `${meal.date} ${meal.time}`,
        meal.waves.length,
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
          <td colSpan={9}>Tổng hợp đồng</td>
          <td className="is-num">{formatMoney(contract.total)}</td>
        </>
      }
    />
  );
}
