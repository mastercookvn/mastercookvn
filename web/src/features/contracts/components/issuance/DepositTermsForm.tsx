import { Alert } from "@/components/ui/Alert";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

export function DepositTermsForm() {
  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Mức cọc</h3>
      <MoneyRow label="Tổng hợp đồng" value={formatMoney(contract.total)} />
      <MoneyRow
        label={MINIMUM_DEPOSIT_LABEL}
        value={formatMoney(minimumDeposit(contract))}
        total
      />
      <Alert tone="info">
        Đây là mức sàn, không phải số cố định. Khách được chuyển nhiều hơn, tối
        đa bằng tổng hợp đồng. Hệ thống tự phân bổ phần dư vào các bữa như tiền
        trả trước.
      </Alert>
    </section>
  );
}
