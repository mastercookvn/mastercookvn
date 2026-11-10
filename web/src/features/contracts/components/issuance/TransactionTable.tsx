import { DataTable, num } from "@/components/ui/DataTable";

export function TransactionTable() {
  return (
    <DataTable
      columns={[
        "Mã giao dịch",
        "Loại",
        "Phương thức",
        num("Số tiền"),
        "Thời điểm",
        "Trạng thái",
      ]}
      rows={[
        [
          <span key="empty" className="text-soft">
            Chưa có giao dịch
          </span>,
          "",
          "",
          "",
          "",
          "",
        ],
      ]}
    />
  );
}
