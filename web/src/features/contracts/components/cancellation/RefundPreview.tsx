import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import {
  CANCELLATION_HOUSEWARMING as result,
  CONTRACT_HOUSEWARMING,
} from "@/mocks/contracts";

export function RefundPreview({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <MoneyRow
        label={compact ? "Đã thu phân bổ" : "Đã thu phân bổ cho bữa"}
        value={formatMoney(CONTRACT_HOUSEWARMING.paid)}
      />
      <MoneyRow
        label={
          compact
            ? "Căn cứ cọc"
            : "Căn cứ cọc (nhỏ hơn giữa 50% giá trị bữa và tiền đã thu)"
        }
        value={formatMoney(result.basis)}
      />
      <MoneyRow
        label={result.tierLabel}
        value={formatMoney(result.basis * result.rate)}
      />
      <MoneyRow
        label={compact ? "Trả trước vượt" : "Trả trước vượt cọc, hoàn đủ"}
        value={formatMoney(result.prepaidExcess)}
      />
      <MoneyRow
        label={compact ? "Phải hoàn" : "Tiền được hoàn"}
        value={formatMoney(result.refund)}
        total
      />
      <MoneyRow
        label={compact ? "Giữ lại" : "Cơ sở giữ lại"}
        value={formatMoney(result.retained)}
      />
    </>
  );
}
