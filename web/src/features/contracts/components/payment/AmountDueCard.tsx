import { Alert } from "@/components/ui/Alert";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

export function AmountDueCard({
  total,
  dueLabel,
  due,
  paid,
}: {
  total: number;
  dueLabel: string;
  due: number;
  paid: number;
}) {
  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Số cần thu</h3>
      <MoneyRow label="Tổng phải trả" value={formatMoney(total)} />
      <MoneyRow label={dueLabel} value={formatMoney(due)} total />
      <MoneyRow label="Đã thu" value={formatMoney(paid)} />
      <MoneyRow label="Tối đa nhận" value={formatMoney(total - paid)} />
      <Alert tone="wait">
        Chỉ ghi khi đã nhận tiền thực tế. Hợp đồng hết hạn vẫn ghi tiền nhưng
        không khôi phục chỗ, hệ thống tạo khoản phải hoàn.
      </Alert>
    </aside>
  );
}
