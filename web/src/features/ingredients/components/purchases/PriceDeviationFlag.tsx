import { Badge } from "@/components/ui/Badge";
import { formatPercent } from "@/lib/format";

export function PriceDeviationFlag({
  price,
  current,
}: {
  price: number;
  current: number;
}) {
  if (price === current) return null;
  return <Badge tone="wait">Lệch {formatPercent(price / current - 1)}</Badge>;
}
