import { PotIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";

export function EquipmentPolicyCard() {
  return (
    <Card stack>
      <CardTitle className="card-title-flush">
        <PotIcon size={22} /> Dụng cụ, bồi thường
      </CardTitle>
      <p className="text-soft">
        Bàn ghế, bát đũa, ly, nồi lẩu được tính theo số người và bàn bố trí. Sau
        tiệc, nhân viên đối chiếu dụng cụ. Bồi thường bằng số hư, mất do khách
        chịu nhân đơn giá đã chốt.
      </p>
    </Card>
  );
}
