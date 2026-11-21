import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

import type { RevenueReport } from "../../lib/revenueReport";

export function CashFlowCard({
  period,
  cashFlow,
}: {
  period: string;
  cashFlow: RevenueReport["cashFlow"];
}) {
  return (
    <Card>
      <CardTitle>Thu, hoàn, giữ lại trong {period}</CardTitle>
      <MoneyRow label="Tiền thu" value={formatMoney(cashFlow.received)} />
      <MoneyRow label="Tiền hoàn" value={formatMoney(cashFlow.refunded)} />
      <MoneyRow
        label="Tiền giữ lại do hủy"
        value={formatMoney(cashFlow.retained)}
      />
      <MoneyRow
        label="Bồi thường dụng cụ"
        value={formatMoney(cashFlow.compensation)}
      />
    </Card>
  );
}
