import { ToastButton } from "@/components/ui/ToastButton";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { ON_BEHALF_PRICE } from "@/mocks/orders";

export function OrderSummary() {
  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Tóm tắt</h3>
      <MealPriceBreakdown price={ON_BEHALF_PRICE} />
      <ToastButton
        variant="primary"
        message="Đã tạo đơn DH-0151, trạng thái Chờ xác nhận"
      >
        Tạo đơn
      </ToastButton>
      <p className="text-small text-soft">
        Khách đăng ký sau bằng cùng SĐT sẽ thấy đơn này.
      </p>
    </aside>
  );
}
