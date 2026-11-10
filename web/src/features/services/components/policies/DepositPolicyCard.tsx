import { CoinIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";

export function DepositPolicyCard() {
  return (
    <Card stack>
      <CardTitle className="card-title-flush">
        <CoinIcon size={22} /> Đặt cọc
      </CardTitle>
      <p className="text-soft">
        Cọc từ 50% đến 100% tổng hợp đồng trong 24 giờ sau khi cơ sở nhận tiệc.
        Hợp đồng có hiệu lực khi bạn đã xác nhận và đủ cọc bắt buộc. Quá hạn thì
        chỗ được nhả, khoản đã thu được hoàn lại.
      </p>
    </Card>
  );
}
