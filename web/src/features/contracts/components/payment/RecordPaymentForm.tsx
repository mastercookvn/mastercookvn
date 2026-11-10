import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { formatNumber } from "@/lib/format";
import {
  CONTRACT_HOUSEWARMING,
  CONTRACT_WEDDING as contract,
} from "@/mocks/contracts";

import { AllocationTable } from "./AllocationTable";
import { AmountDueCard } from "./AmountDueCard";
import { RecordPaymentButton } from "./RecordPaymentButton";

export function RecordPaymentForm() {
  const amount = contract.total * 0.5;

  return (
    <>
      <PanelHeader
        title="Ghi nhận thu tiền"
        subtitle="Tiền mặt hoặc chuyển khoản ngoài luồng QR"
      />
      <div className="l-grid l-grid-main">
        <section className="card l-stack">
          <div className="l-grid l-grid-2">
            <SelectField
              id="payment-contract"
              label="Hợp đồng"
              options={[contract.number, CONTRACT_HOUSEWARMING.number]}
              defaultValue={contract.number}
            />
            <SelectField
              id="payment-kind"
              label="Loại khoản"
              options={["Cọc", "Cọc bổ sung", "Quyết toán"]}
              defaultValue="Cọc"
            />
            <TextField
              id="payment-amount"
              label="Số tiền thực nhận (đ)"
              defaultValue={formatNumber(amount)}
            />
            <SelectField
              id="payment-method"
              label="Phương thức"
              options={["Tiền mặt", "Chuyển khoản"]}
              defaultValue="Chuyển khoản"
            />
            <TextField
              id="payment-date"
              label="Ngày nhận"
              defaultValue="05/11/2026"
            />
            <TextField
              id="payment-voucher"
              label="Mã chứng từ"
              defaultValue="CT-1105-03"
              hint="Không được trùng mã đã ghi."
            />
            <TextField
              id="payment-file"
              label="Ảnh chứng từ (nếu có)"
              defaultValue="ck-0142.jpg"
            />
          </div>
          <h3 className="card-title card-title-flush mt-2 text-15-5">
            Phân bổ theo bữa
          </h3>
          <AllocationTable amount={amount} />
          <div className="l-row justify-end">
            <RecordPaymentButton />
          </div>
        </section>
        <AmountDueCard />
      </div>
    </>
  );
}
