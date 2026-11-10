import { DataTable, num } from "@/components/ui/DataTable";
import { formatMoney, formatPercent } from "@/lib/format";
import { PRICE_PROPOSALS } from "@/mocks/inventory";

import { ProposalDecisionButtons } from "./ProposalDecisionButtons";

export function PriceProposalTable() {
  return (
    <DataTable
      columns={[
        "Nguyên liệu",
        num("Giá hiện hành"),
        num("Giá đề xuất"),
        num("Chênh lệch"),
        "Món bị ảnh hưởng",
        "Quyết định",
      ]}
      rows={PRICE_PROPOSALS.map((row, index) => {
        const change = row.proposed / row.current - 1;
        return [
          <>
            {row.name} <span className="text-soft">/{row.unit}</span>
          </>,
          formatMoney(row.current),
          formatMoney(row.proposed),
          `${change >= 0 ? "+" : ""}${formatPercent(change)}`,
          <span key="dishes" className="text-small">
            {row.dishes}
          </span>,
          <ProposalDecisionButtons key="decision" index={index} />,
        ];
      })}
    />
  );
}
