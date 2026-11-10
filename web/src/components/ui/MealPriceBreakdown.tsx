import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatDecimal, formatMoney, formatPercent } from "@/lib/format";
import type { MealPrice } from "@/lib/pricing";

import { MoneyRow } from "./MoneyRow";

export function MealPriceBreakdown({ price }: { price: MealPrice }) {
  return (
    <>
      <MoneyRow
        label={`Tiền món (hệ số ${formatDecimal(price.factor)})`}
        value={formatMoney(price.dishAmount)}
      />
      <MoneyRow label="Dịch vụ" value={formatMoney(price.serviceAmount)} />
      {price.surcharge ? (
        <MoneyRow label="Phụ thu" value={formatMoney(price.surcharge)} />
      ) : null}
      <MoneyRow
        label={`Thuế ${formatPercent(BUSINESS_SETTINGS.taxRate, 0)}`}
        value={formatMoney(price.taxAmount)}
      />
      {price.roundingDifference ? (
        <MoneyRow
          label="Chênh lệch làm tròn"
          value={formatMoney(price.roundingDifference)}
        />
      ) : null}
      <MoneyRow label="Tổng bữa" value={formatMoney(price.total)} total />
    </>
  );
}
