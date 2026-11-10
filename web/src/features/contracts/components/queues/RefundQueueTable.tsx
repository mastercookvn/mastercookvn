import { DataTable, num } from "@/components/ui/DataTable";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatMoney } from "@/lib/format";

import { RecordRefundDialog } from "./RecordRefundDialog";

const ROWS = [
  {
    number: "HD-2026-0105",
    source: "Hủy bữa 09/11/2026",
    due: 6500000,
    refunded: 0,
  },
  {
    number: "HD-2026-0088",
    source: "Tiền về sau khi hết hạn",
    due: 16200000,
    refunded: 11200000,
  },
];

export function RefundQueueTable() {
  return (
    <>
      <PanelHeader
        title="Khoản phải hoàn"
        subtitle="Trả tiền ngoài hệ thống trước, rồi ghi giao dịch hoàn kèm bằng chứng"
      />
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
