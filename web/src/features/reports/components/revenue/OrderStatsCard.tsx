import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { MoneyRow } from "@/components/ui/MoneyRow";

export function OrderStatsCard() {
  return (
    <Card>
      <CardTitle>Tình hình đơn trong 10/2026</CardTitle>
      <MoneyRow label="Đơn hoàn tất" value="14" />
      <MoneyRow label="Đơn đang thực hiện" value="6" />
      <MoneyRow label="Đơn hủy, từ chối, hết hạn" value="3" />
      <MoneyRow label="Tỷ lệ hủy" value="13,0%" />
    </Card>
  );
}
