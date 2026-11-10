import { Alert } from "@/components/ui/Alert";
import { servingStaffNeeded } from "@/lib/pricing";

export function TableTermsNote() {
  return (
    <Alert tone="info">
      Số bàn ăn là căn cứ tính tiền món, số bàn bố trí là số bàn đặt cùng lúc.
      Ví dụ 30 bàn ăn trên 10 bàn bố trí phục vụ cuốn chiếu cần khoảng{" "}
      {servingStaffNeeded(10)} người phục vụ.
    </Alert>
  );
}
