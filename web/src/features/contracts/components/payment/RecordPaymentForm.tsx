"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_LABEL,
  PAYMENT_METHOD_OPTIONS,
  type PaymentMethod,
} from "@/constants/payment";
import { formatMoney, formatNumber } from "@/lib/format";
import type { Contract } from "@/models/contracts";
import { readDemoState, updateDemoState, useDemoState } from "@/lib/demoStore";

import {
  isAwaitingSettlement,
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";
import { buildSettlement } from "@/features/contracts/lib/settlement";

import { AllocationPreview } from "./AllocationPreview";
import { AmountDueCard } from "./AmountDueCard";

const parseAmount = (text: string) => Number(text.replace(/\D/g, ""));

export function RecordPaymentForm({ contract }: { contract: Contract }) {
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const usedVouchers = useDemoState((state) => state.paymentVouchers);
  const issued = useDemoState((state) => state.contractIssued);
  const showToast = useToast();

  const isSettlement = isAwaitingSettlement(contract);
  const settlement = buildSettlement(contract);

  const total = isSettlement ? settlement.settlementTotal : contract.total;
  const paid = isSettlement
    ? settlement.paid + settlementPaid
    : depositPaidAmount;
  const due = isSettlement
    ? settlement.balance - settlementPaid
    : Math.max(minimumDeposit(contract) - paid, 0);

  const [amountText, setAmountText] = useState(() => formatNumber(due));
  const [method, setMethod] = useState<PaymentMethod>(PAYMENT_METHOD.Cash);
  const [receivedOn, setReceivedOn] = useState("");
  const [voucher, setVoucher] = useState("");
  const [voucherPhotos, setVoucherPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const amount = parseAmount(amountText);
  const amountError =
    !isSettlement && !issued
      ? "Hợp đồng chưa phát hành, chưa thu cọc được"
      : amount <= 0
        ? "Nhập số tiền thực nhận"
        : amount > total - paid
          ? `Vượt số còn phải trả ${formatMoney(total - paid)}`
          : null;
  const voucherError =
    voucher.trim() === ""
      ? "Nhập mã chứng từ"
      : usedVouchers.includes(voucher.trim().toUpperCase())
        ? "Mã chứng từ đã được ghi"
        : null;

  const record = () => {
    setSubmitted(true);
    if (amountError || voucherError) return;

    if (isSettlement) {
      const nextPaid = readDemoState().settlementPaidAmount + amount;
      updateDemoState({
        settlementPaidAmount: nextPaid,
        settlementStatus:
          nextPaid >= settlement.balance
            ? SETTLEMENT_STATUS.Paid
            : readDemoState().settlementStatus,
      });
    } else {
      const nextPaid = readDemoState().depositPaidAmount + amount;
      updateDemoState({
        depositPaidAmount: nextPaid,
        depositPaid: nextPaid >= minimumDeposit(contract),
      });
    }
    updateDemoState({
      paymentVouchers: [...usedVouchers, voucher.trim().toUpperCase()],
    });
    setVoucher("");
    setVoucherPhotos([]);
    setSubmitted(false);
    showToast(
      `Đã ghi ${formatMoney(amount)} (${PAYMENT_METHOD_LABEL[method]}) cho ${contract.number}, chứng từ ${voucher.trim()}`
    );
  };

  return (
    <>
      <PanelHeader title="Ghi nhận thu tiền" />
      <div className="l-grid l-grid-main">
        <section className="card l-stack">
          <div className="l-grid l-grid-2">
            <TextField
              id="payment-contract"
              label="Hợp đồng"
              value={`${contract.number} · ${isSettlement ? "Quyết toán" : "Cọc"}`}
              readOnly
            />
            <TextField
              id="payment-amount"
              label="Số tiền thực nhận (đ)"
              inputMode="numeric"
              value={amountText}
              onChange={(event) =>
                setAmountText(formatNumber(parseAmount(event.target.value)))
              }
              error={submitted ? amountError : null}
              hint={
                isSettlement
                  ? undefined
                  : "Khách chuyển dư so với mức tối thiểu vẫn ghi đủ, phần dư tính là trả trước."
              }
            />
            <SelectField
              id="payment-method"
              label="Phương thức"
              options={PAYMENT_METHOD_OPTIONS}
              value={method}
              onValueChange={(value) => setMethod(value as PaymentMethod)}
            />
            <TextField
              id="payment-date"
              label="Ngày nhận"
              placeholder="dd/MM/yyyy"
              value={receivedOn}
              onChange={(event) => setReceivedOn(event.target.value)}
            />
            <TextField
              id="payment-voucher"
              label="Mã chứng từ"
              placeholder="CT-..."
              value={voucher}
              onChange={(event) => setVoucher(event.target.value)}
              error={submitted ? voucherError : null}
              hint="Không được trùng mã đã ghi."
            />
          </div>
          <PhotoGalleryField
            id="payment-voucher-photos"
            label="Ảnh chứng từ"
            photos={voucherPhotos}
            onChange={setVoucherPhotos}
            max={3}
            hint="Phiếu thu có chữ ký hoặc ảnh chụp màn hình chuyển khoản."
          />
          <h3 className="card-title card-title-flush mt-2 text-15-5">
            Phân bổ theo bữa
          </h3>
          <AllocationPreview contract={contract} amount={amount} />
          <div className="l-row justify-end">
            <Button
              variant="primary"
              onClick={record}
              disabled={total - paid <= 0}
            >
              Ghi giao dịch
            </Button>
          </div>
        </section>
        <AmountDueCard
          total={total}
          dueLabel={
            isSettlement
              ? "Số dư quyết toán"
              : `${MINIMUM_DEPOSIT_LABEL} còn thiếu`
          }
          due={due}
          paid={paid}
        />
      </div>
    </>
  );
}
