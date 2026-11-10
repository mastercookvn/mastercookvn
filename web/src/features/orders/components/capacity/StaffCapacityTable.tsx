import { Badge } from "@/components/ui/Badge";
import { DataTable, num } from "@/components/ui/DataTable";

const ROWS = [
  ["Phục vụ", 4, 2, 9],
  ["Bếp", 3, 2, 6],
  ["Vận chuyển", 2, 1, 4],
];

export function StaffCapacityTable() {
  return (
    <DataTable
      columns={[
        "Vị trí",
        num("Nhu cầu bữa"),
        num("Chồng giờ"),
        num("Đang làm"),
        "Kết quả",
      ]}
      rows={ROWS.map((row) => [
        ...row,
        <Badge key="result" tone="good">
          Đủ
        </Badge>,
      ])}
    />
  );
}
