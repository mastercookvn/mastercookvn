import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney } from "@/lib/format";

import { RecordRefundDialog } from "./RecordRefundDialog";

type RefundRow = {
  number: string;
  source: string;
  due: number;
  refunded: number;
};

// Placeholder until the refunds API exists.
const ROWS: RefundRow[] = [];

export function RefundQueueTable() {
  return (
    <>
      <PanelHeader title="Khoản phải hoàn" count={ROWS.length} />
      <DataTable
        columns={[
          "Hợp đồng",
          "Nguồn phát sinh",
          num("Phải hoàn"),
          num("Đã hoàn"),
          num("Còn lại"),
          "",
        ]}
        rows={ROWS.map((row) => [
          <span key="number" className="text-code">
            {row.number}
          </span>,
          row.source,
          formatMoney(row.due),
          formatMoney(row.refunded),
          formatMoney(row.due - row.refunded),
          <RecordRefundDialog
            key="action"
            remaining={row.due - row.refunded}
          />,
        ])}
      />
      <section className="card l-stack max-w-[640px]">
        <h3 className="card-title card-title-flush">Cách phân biệt</h3>
        <p className="text-soft text-small">
          Hoàn nhiều lần được, mỗi lần một giao dịch mới. Khoản tự đóng khi đã
          hoàn đủ. Số hoàn không vượt số còn phải hoàn và luôn cần bằng chứng.
        </p>
      </section>
    </>
  );
}
