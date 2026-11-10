import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

export function ContractTotals({
  total,
  paid,
}: {
  total: number;
  paid: number;
}) {
  return (
    <div className="card l-stack">
      <MoneyRow label="Tổng hợp đồng" value={formatMoney(total)} total />
      <MoneyRow label="Cọc tối thiểu 50%" value={formatMoney(total * 0.5)} />
      <MoneyRow label="Đã thu" value={formatMoney(paid)} />
    </div>
  );
}
