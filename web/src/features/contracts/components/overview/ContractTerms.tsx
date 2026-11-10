import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { formatMoney } from "@/lib/format";

export function ContractTerms() {
  return (
    <Card stack>
      <CardTitle className="card-title-flush">Điều khoản chính</CardTitle>
      <ul className="text-small text-soft list-disc pl-[18px]">
        <li>
          Đổi món khi còn ít nhất 5 ngày, đổi số bàn khi còn ít nhất 3 ngày,
          không dời ngày.
        </li>
        <li>
          Hoàn cọc khi hủy: từ 30 ngày 100%, 15 đến dưới 30 ngày 50%, dưới 15
          ngày 0%.
        </li>
        <li>
          Bồi thường dụng cụ theo đơn giá chốt: bát {formatMoney(15000)}, ghế{" "}
          {formatMoney(120000)}, bàn tròn {formatMoney(1200000)}.
        </li>
        <li>Khách chuẩn bị mặt bằng và điều kiện phục vụ theo khảo sát.</li>
      </ul>
    </Card>
  );
}
