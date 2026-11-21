import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney } from "@/lib/format";

import type { PendingAddendum } from "../../lib/contractRepository";

export function BeforeAfterTable({
  addendum,
  firstColumn = "",
}: {
  addendum: PendingAddendum;
  firstColumn?: string;
}) {
  return (
    <DataTable
      columns={[firstColumn, num("Trước"), num("Sau")]}
      rows={[
        ["Số bàn ăn", addendum.tablesBefore, addendum.tablesAfter],
        [
          "Giá trị bữa",
          formatMoney(addendum.totalBefore),
          formatMoney(addendum.totalAfter),
        ],
      ]}
    />
  );
}
