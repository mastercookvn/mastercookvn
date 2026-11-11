"use client";

import { Alert } from "@/components/ui/Alert";
import { PAYMENT_PURPOSE } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import type { Contract } from "@/mocks/contracts";
import {
  paymentIntentKey,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

import { AllocationPreview } from "./AllocationPreview";
import { PaymentCheckout, type PaymentOption } from "./PaymentCheckout";

export function PaymentPanel({ contract }: { contract: Contract }) {
  const paidAmount = useDemoState((state) => state.depositPaidAmount);
  const intent = useDemoState(
    (state) =>
      state.paymentIntents[
        paymentIntentKey(contract.number, PAYMENT_PURPOSE.Deposit)
      ]
  );
  const issued = useDemoState((state) => state.contractIssued);
  const deposit = minimumDeposit(contract);

  if (!issued) {
    return (
      <Alert tone="wait">
        Cơ sở chưa phát hành hợp đồng. Bạn ký và thanh toán cọc được sau khi tư
        vấn chốt giá, hạn cọc và phát hành.
      </Alert>
    );
  }

  if (paidAmount > 0) {
    return (
      <Alert tone="good">
        Đã nhận {formatMoney(paidAmount)}
        {paidAmount > deposit
          ? `, trong đó ${formatMoney(paidAmount - deposit)} vượt mức tối thiểu được ghi là trả trước`
          : ""}
        . Phần còn lại {formatMoney(contract.total - paidAmount)} thanh toán khi
        quyết toán từng bữa.
      </Alert>
    );
  }

  const options: PaymentOption[] = [
    {
      value: "minimum",
      label: MINIMUM_DEPOSIT_LABEL,
      amount: deposit,
      hint: "Mức thấp nhất để hợp đồng có hiệu lực.",
    },
    {
      value: "custom",
      label: "Trả nhiều hơn mức tối thiểu",
      amount: deposit,
      range: { min: deposit, max: contract.total },
      hint: "Hệ thống tự ghi phần dư là trả trước, trừ dần khi quyết toán.",
    },
    {
      value: "full",
      label: "Thanh toán toàn bộ hợp đồng",
      amount: contract.total,
      hint: "Phần vượt mức cọc là trả trước, được hoàn đủ nếu hủy bữa.",
    },
  ].filter((option) => option.value === "minimum" || deposit < contract.total);

  return (
    <div className="l-grid l-grid-2">
      <PaymentCheckout
        contractNumber={contract.number}
        purpose={PAYMENT_PURPOSE.Deposit}
        referencePrefix={`COC-${contract.number.slice(-4)}`}
        options={options}
        onPaid={(paid) =>
          updateDemoState({ depositPaid: true, depositPaidAmount: paid.amount })
        }
      />
      <section className="card l-stack">
        <h3 className="card-title card-title-flush">Phân bổ theo bữa</h3>
        <AllocationPreview
          contract={contract}
          amount={intent?.amount ?? deposit}
        />
        <p className="text-small text-soft">
          Tiền được chia theo giá trị từng bữa để tính khi sửa, hủy hoặc quyết
          toán.
        </p>
      </section>
    </div>
  );
}
