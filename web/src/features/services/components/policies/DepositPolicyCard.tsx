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
        Cọc tối thiểu 50% tổng hợp đồng trong 24 giờ sau khi cơ sở nhận tiệc.
        Bạn có thể chuyển nhiều hơn, hệ thống tự ghi phần dư là trả trước và trừ
        khi quyết toán. Hợp đồng có hiệu lực khi bạn đã xác nhận và đủ mức tối
        thiểu. Quá hạn thì chỗ được nhả, khoản đã thu được hoàn lại.
      </p>
    </Card>
  );
}
