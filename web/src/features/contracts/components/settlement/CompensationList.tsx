import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney, formatNumber } from "@/lib/format";

import type { CompensationLine } from "../../lib/settlement";

export function CompensationList({ lines }: { lines: CompensationLine[] }) {
  if (!lines.length) return null;

  return (
    <>
      <h3 className="card-title card-title-flush mt-2 text-15-5">Bồi thường</h3>
      {lines.map((line) => (
        <MoneyRow
          key={line.name}
          label={`${line.name}: ${formatNumber(line.quantity)} × ${formatMoney(line.price)}`}
          value={formatMoney(line.quantity * line.price)}
        />
      ))}
    </>
  );
}
