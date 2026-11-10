import { MoneyRow } from "@/components/ui/MoneyRow";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatMoney } from "@/lib/format";
import { CHICKEN_COST } from "@/mocks/inventory";

export function SuggestedPrice() {
  return (
    <MoneyRow
      label="Giá gợi ý (chi phí / 35%)"
      value={formatMoney(CHICKEN_COST / BUSINESS_SETTINGS.foodCostTarget)}
      total
    />
  );
}
