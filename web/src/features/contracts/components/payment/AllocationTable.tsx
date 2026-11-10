import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney, formatNumber } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";

export function AllocationTable({ amount }: { amount: number }) {
  return (
    <DataTable
      columns={[
        "Bữa",
        num("Giá trị"),
        num("Phân bổ"),
        num("Cọc bắt buộc"),
        num("Trả trước"),
      ]}
      rows={contract.meals.map((meal, index) => [
        `Bữa ${index + 1}, ${meal.date}`,
        formatMoney(meal.price.total),
        <input
          key="allocation"
          id={`allocation-${index}`}
          className="input-cell"
          defaultValue={formatNumber(meal.price.total * 0.5)}
          aria-label={`Phân bổ bữa ${index + 1}`}
        />,
        formatMoney(meal.price.total * 0.5),
        formatMoney(0),
      ])}
      foot={
        <>
          <td colSpan={2}>Tổng phân bổ phải bằng số tiền</td>
          <td className="is-num">{formatMoney(amount)}</td>
          <td className="is-num">{formatMoney(amount)}</td>
          <td className="is-num">{formatMoney(0)}</td>
        </>
      }
    />
  );
}
