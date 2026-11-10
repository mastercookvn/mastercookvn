import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";

const CHECKS = [
  ["Đổi bàn: còn ít nhất 3 ngày", "Đạt"],
  ["Đổi món: còn ít nhất 5 ngày", "Đạt"],
  ["Tài nguyên cho phần tăng", "Đủ"],
  ["Bữa không có phụ lục chờ khác", "Đạt"],
];

export function AddendumChecks() {
  return (
    <DataTable
      columns={["Kiểm tra", "Kết quả"]}
      rows={CHECKS.map(([label, result]) => [
        label,
        <Badge key="result" tone="good">
          {result}
        </Badge>,
      ])}
    />
  );
}
