import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

export function ContractTotals({
  total,
  paid,
  deposit,
}: {
  total: number;
  paid: number;
  deposit?: { label: string; amount: number };
}) {
  return (
    <div className="card l-stack">
      <MoneyRow label="Tổng hợp đồng" value={formatMoney(total)} total />
      {deposit ? (
        <MoneyRow label={deposit.label} value={formatMoney(deposit.amount)} />
      ) : null}
      <MoneyRow label="Đã thu" value={formatMoney(paid)} />
      <MoneyRow label="Còn lại" value={formatMoney(total - paid)} />
    </div>
  );
}
