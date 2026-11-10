import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";
import { INVENTORY_PERIOD as period } from "@/mocks/inventory";

export function PeriodValuationTable() {
  return (
    <DataTable
      columns={[
        "Nguyên liệu",
        num("Giá trị đầu"),
        num("Giá trị nhập"),
        num("Đơn giá tồn"),
        num("Lượng cuối"),
        num("Giá trị cuối"),
        num("Tiêu thụ"),
      ]}
      rows={period.lines.map((line) => [
        line.name,
        formatMoney(line.openingValue),
        formatMoney(line.purchasedValue),
        formatMoney(line.unitCost),
        `${line.closingQty} ${line.unit}`,
        formatMoney(line.closingValue),
        formatMoney(line.consumed),
      ])}
      foot={
        <>
          <td colSpan={6}>Tổng chi phí tiêu thụ</td>
          <td className="is-num">{formatMoney(period.cost)}</td>
        </>
      }
    />
  );
}
