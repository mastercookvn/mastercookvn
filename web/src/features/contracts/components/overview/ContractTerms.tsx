import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";

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
        <li>Bồi thường dụng cụ theo đơn giá chốt trong hợp đồng.</li>
        <li>Khách chuẩn bị mặt bằng và điều kiện phục vụ theo khảo sát.</li>
      </ul>
    </Card>
  );
}
