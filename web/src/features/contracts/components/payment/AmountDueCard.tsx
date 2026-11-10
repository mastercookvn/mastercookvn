"use client";

import { Alert } from "@/components/ui/Alert";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

export function AmountDueCard() {
  const deposited = useDemoState((state) => state.depositPaid);
  const deposit = contract.total * 0.5;

  return (
    <aside className="card l-stack">
      <h3 className="card-title card-title-flush">Số cần thu</h3>
      <MoneyRow label="Tổng hợp đồng" value={formatMoney(contract.total)} />
      <MoneyRow label="Cọc bắt buộc" value={formatMoney(deposit)} />
      <MoneyRow label="Đã thu" value={formatMoney(deposited ? deposit : 0)} />
      <MoneyRow label="Tối đa nhận" value={formatMoney(contract.total)} />
      <Alert tone="wait">
        Chỉ ghi khi đã nhận tiền thực tế. Hợp đồng hết hạn vẫn ghi tiền nhưng
        không khôi phục chỗ, hệ thống tạo khoản phải hoàn.
      </Alert>
    </aside>
  );
}
