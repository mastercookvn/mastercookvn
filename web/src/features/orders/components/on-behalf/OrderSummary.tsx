import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { ON_BEHALF_PRICE } from "@/mocks/orders";

export function OrderSummary() {
  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Tóm tắt</h3>
      <MealPriceBreakdown price={ON_BEHALF_PRICE} />
      <p className="text-small text-soft">
        Khách đăng ký sau bằng cùng SĐT sẽ thấy đơn này.
      </p>
    </aside>
  );
}
