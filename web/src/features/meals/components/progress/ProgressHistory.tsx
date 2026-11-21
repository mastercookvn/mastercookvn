import { MoneyRow } from "@/components/ui/MoneyRow";

const NOT_RECORDED = "—";

export function ProgressHistory({ stage }: { stage: number }) {
  return (
    <section className="card">
      <h3 className="card-title">Lịch sử</h3>
      {/* Recorded times and actors come from the meal history API. */}
      <MoneyRow label="Đã xác nhận" value={NOT_RECORDED} />
      {stage >= 1 ? (
        <MoneyRow label="Đang chuẩn bị" value={NOT_RECORDED} />
      ) : null}
      {stage >= 2 ? (
        <MoneyRow label="Đang phục vụ" value="Theo thời điểm ghi" />
      ) : null}
    </section>
  );
}
