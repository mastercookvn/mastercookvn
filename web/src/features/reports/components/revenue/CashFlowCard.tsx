import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

export function CashFlowCard() {
  return (
    <Card>
      <CardTitle>Thu, hoàn, giữ lại trong 10/2026</CardTitle>
      <MoneyRow label="Tiền thu" value={formatMoney(402000000)} />
      <MoneyRow label="Tiền hoàn" value={formatMoney(11500000)} />
      <MoneyRow label="Tiền giữ lại do hủy" value={formatMoney(6200000)} />
      <MoneyRow label="Bồi thường dụng cụ" value={formatMoney(840000)} />
    </Card>
  );
}
