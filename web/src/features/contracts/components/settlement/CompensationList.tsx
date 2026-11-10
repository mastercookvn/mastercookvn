import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

export function CompensationList() {
  return (
    <>
      <h3 className="card-title card-title-flush mt-2 text-15-5">Bồi thường</h3>
      <MoneyRow label="Bát ăn sứ: 6 × 15.000 đ" value={formatMoney(90000)} />
      <MoneyRow label="Ghế nhựa: 1 × 120.000 đ" value={formatMoney(120000)} />
    </>
  );
}
