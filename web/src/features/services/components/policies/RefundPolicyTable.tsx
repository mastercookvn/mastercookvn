import { DataTable } from "@/components/ui/DataTable";

const ROWS = [
  ["Chưa cọc", "Hủy miễn phí ngay"],
  ["Còn ít nhất 30 ngày", "100%, phí xử lý mặc định 0 đ"],
  ["Còn 15 đến dưới 30 ngày", "50%"],
  ["Còn dưới 15 ngày", "0%"],
  ["Đến giờ bắt đầu, khách không có mặt", "0%"],
];

export function RefundPolicyTable() {
  return (
    <div className="l-stack">
      <h3 className="text-17 font-semibold">Hoàn cọc khi hủy bữa</h3>
      <DataTable
        columns={["Thời điểm hủy", "Hoàn phần cọc bắt buộc"]}
        rows={ROWS}
      />
      <p className="text-small text-soft">
        Phần trả vượt cọc bắt buộc luôn được hoàn đủ. Các bữa khác trong hợp
        đồng vẫn tiếp tục.
      </p>
    </div>
  );
}
