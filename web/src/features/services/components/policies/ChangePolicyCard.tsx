import { BowlIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";

export function ChangePolicyCard() {
  return (
    <Card stack>
      <CardTitle className="card-title-flush">
        <BowlIcon size={22} /> Đổi món, đổi số bàn
      </CardTitle>
      <p className="text-soft">
        Đổi món đã chọn khi còn ít nhất 5 ngày, không thêm món mới. Tăng, giảm
        bàn khi còn ít nhất 3 ngày, giảm tối đa 15% số bàn ký ban đầu. Tăng trên
        3 bàn cần cọc bổ sung 50% phần tăng. Không dời ngày tiệc.
      </p>
    </Card>
  );
}
