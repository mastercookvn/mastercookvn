import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney, formatNumber } from "@/lib/format";
import { SETTLEMENT_COMPANY as settlement } from "@/mocks/contracts";

/** BR11. Shared by the accountant sheet and the customer's invoice. */
export function SettlementLines({
  settlementPaid,
}: {
  settlementPaid: number;
}) {
  return (
    <div className="invoice-lines">
      <MoneyRow
        label="Giá trị bữa hiện hành (gồm phụ lục)"
        value={formatMoney(settlement.mealValue)}
      />
      {settlement.compensationLines.map((line) => (
        <MoneyRow
          key={line.name}
          label={`Bồi thường ${line.name.toLowerCase()}: ${formatNumber(line.quantity)} × ${formatMoney(line.price)}`}
          value={formatMoney(line.quantity * line.price)}
        />
      ))}
      <MoneyRow
        label="Tổng quyết toán"
        value={formatMoney(settlement.settlementTotal)}
        total
      />
      <MoneyRow
        label="Trừ tiền đã thu trước (cọc)"
        value={`− ${formatMoney(settlement.paid)}`}
      />
      {settlementPaid > 0 ? (
        <MoneyRow
          label="Trừ tiền đã thu khi quyết toán"
          value={`− ${formatMoney(settlementPaid)}`}
        />
      ) : null}
      <MoneyRow
        label="Cộng tiền đã hoàn"
        value={`+ ${formatMoney(settlement.refunded)}`}
      />
      <MoneyRow
        label="Số dư cần thanh toán"
        value={formatMoney(settlement.balance - settlementPaid)}
        total
      />
    </div>
  );
}
