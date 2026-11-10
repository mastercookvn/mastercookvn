import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney, formatNumber } from "@/lib/format";
import { SETTLEMENT_COMPANY } from "@/mocks/contracts";

export function CompensationList() {
  return (
    <>
      <h3 className="card-title card-title-flush mt-2 text-15-5">Bồi thường</h3>
      {SETTLEMENT_COMPANY.compensationLines.map((line) => (
        <MoneyRow
          key={line.name}
          label={`${line.name}: ${formatNumber(line.quantity)} × ${formatMoney(line.price)}`}
          value={formatMoney(line.quantity * line.price)}
        />
      ))}
    </>
  );
}
