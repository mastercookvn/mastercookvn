import { MoneyRow } from "@/components/ui/MoneyRow";

export function ProgressHistory({ stage }: { stage: number }) {
  return (
    <section className="card">
      <h3 className="card-title">Lịch sử</h3>
      <MoneyRow label="Đã xác nhận" value="02/11/2026 10:12 · Hệ thống" />
      {stage >= 1 ? (
        <MoneyRow
          label="Đang chuẩn bị"
          value="05/11/2026 09:00 · Hoàng Anh Khoa"
        />
      ) : null}
      {stage >= 2 ? (
        <MoneyRow label="Đang phục vụ" value="Theo thời điểm ghi" />
      ) : null}
    </section>
  );
}
