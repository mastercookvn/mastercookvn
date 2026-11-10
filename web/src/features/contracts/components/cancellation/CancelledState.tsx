import { RefundIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatMoney } from "@/lib/format";
import {
  CANCELLATION_HOUSEWARMING as result,
  MEAL_HOUSEWARMING as meal,
} from "@/mocks/contracts";

export function CancelledState() {
  return (
    <EmptyState>
      <RefundIcon size={44} />
      <h3 className="text-18 font-semibold">Đã hủy bữa {meal.date}</h3>
      <p className="text-soft">
        Kế toán sẽ hoàn {formatMoney(result.refund)} và ghi nhận trên hồ sơ của
        bạn.
      </p>
    </EmptyState>
  );
}
