import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatPercent } from "@/lib/format";

import type { RevenueReport } from "../../lib/revenueReport";

export function OrderStatsCard({
  period,
  orderStats,
}: {
  period: string;
  orderStats: RevenueReport["orderStats"];
}) {
  const total =
    orderStats.completed + orderStats.inProgress + orderStats.cancelled;

  return (
    <Card>
      <CardTitle>Tình hình đơn trong {period}</CardTitle>
      <MoneyRow label="Đơn hoàn tất" value={String(orderStats.completed)} />
      <MoneyRow
        label="Đơn đang thực hiện"
        value={String(orderStats.inProgress)}
      />
      <MoneyRow
        label="Đơn hủy, từ chối, hết hạn"
        value={String(orderStats.cancelled)}
      />
      <MoneyRow
        label="Tỷ lệ hủy"
        value={total ? formatPercent(orderStats.cancelled / total) : "—"}
      />
    </Card>
  );
}
