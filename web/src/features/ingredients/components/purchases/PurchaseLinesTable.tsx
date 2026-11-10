import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney } from "@/lib/format";

import { PriceDeviationFlag } from "./PriceDeviationFlag";

const LINES = [
  {
    name: "Thịt ba chỉ heo",
    quantity: 50,
    unit: "kg",
    price: 119000,
    current: 115000,
  },
  { name: "Tôm sú", quantity: 20, unit: "kg", price: 252000, current: 230000 },
  {
    name: "Rau củ các loại",
    quantity: 40,
    unit: "kg",
    price: 26000,
    current: 26000,
  },
];

export function PurchaseLinesTable() {
  const total = LINES.reduce(
    (sum, line) => sum + line.quantity * line.price,
    0,
  );

  return (
    <DataTable
      columns={[
        "Nguyên liệu",
        num("Lượng"),
        "Đơn vị chuẩn",
        num("Đơn giá"),
        num("Giá hiện hành"),
        num("Thành tiền"),
        "",
      ]}
      rows={LINES.map((line) => [
        line.name,
        line.quantity,
        line.unit,
        formatMoney(line.price),
        formatMoney(line.current),
        formatMoney(line.quantity * line.price),
        <PriceDeviationFlag
          key="flag"
          price={line.price}
          current={line.current}
        />,
      ])}
      foot={
        <>
          <td colSpan={5}>Tổng phiếu</td>
          <td className="is-num">{formatMoney(total)}</td>
          <td />
        </>
      }
    />
  );
}
