import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import {
  MEAL_COMPANY as meal,
  SETTLEMENT_COMPANY as settlement,
} from "@/mocks/contracts";

export function SettlementSheet() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">
        DH-0097 · {meal.name} · {meal.date}
      </h3>
      <MoneyRow
        label="Giá trị bữa hiện hành (gồm phụ lục)"
        value={formatMoney(settlement.mealValue)}
      />
      <MoneyRow
        label="Bồi thường dụng cụ"
        value={formatMoney(settlement.compensation)}
      />
      <MoneyRow
        label="Tổng quyết toán"
        value={formatMoney(settlement.settlementTotal)}
        total
      />
      <MoneyRow
        label="Trừ tiền đã thu phân bổ"
        value={`− ${formatMoney(settlement.paid)}`}
      />
      <MoneyRow
        label="Cộng tiền đã hoàn"
        value={`+ ${formatMoney(settlement.refunded)}`}
      />
      <MoneyRow label="Số dư" value={formatMoney(settlement.balance)} total />
      <Alert tone="wait">
        Số dư dương: cần thu đủ trước khi đóng bữa. Số dư âm thì ghi hoàn.
      </Alert>
      <div className="l-row justify-end">
        <ButtonLink href="?tab=payment">Thu phần còn lại</ButtonLink>
        <Button variant="primary" disabled title="Số dư phải bằng 0">
          Xác nhận hoàn tất bữa
        </Button>
      </div>
    </section>
  );
}
