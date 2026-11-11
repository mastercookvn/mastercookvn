"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { SETTLEMENT_STATUS } from "@/constants/statuses";
import { formatMoney, formatNumber } from "@/lib/format";
import {
  CONTRACT_COMPANY,
  CONTRACT_WEDDING,
  SETTLEMENT_COMPANY,
} from "@/mocks/contracts";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import {
  MINIMUM_DEPOSIT_LABEL,
  minimumDeposit,
} from "@/features/contracts/lib/contractState";

import { AllocationPreview } from "./AllocationPreview";
import { AmountDueCard } from "./AmountDueCard";

const PAYMENT_METHODS = ["Tiền mặt", "Chuyển khoản"];

const parseAmount = (text: string) => Number(text.replace(/\D/g, ""));

/** On a contract page the contract is fixed by the URL. */
export function RecordPaymentForm({
  contractNumber: fixedContract,
}: {
  contractNumber?: string;
}) {
  const depositPaidAmount = useDemoState((state) => state.depositPaidAmount);
  const settlementPaid = useDemoState((state) => state.settlementPaidAmount);
  const usedVouchers = useDemoState((state) => state.paymentVouchers);
  const issued = useDemoState((state) => state.contractIssued);
  const showToast = useToast();

  const [contractNumber, setContractNumber] = useState(
    fixedContract ?? CONTRACT_WEDDING.number
  );
  const isSettlement = contractNumber === CONTRACT_COMPANY.number;
  const contract = isSettlement ? CONTRACT_COMPANY : CONTRACT_WEDDING;

  const total = isSettlement
    ? SETTLEMENT_COMPANY.settlementTotal
    : CONTRACT_WEDDING.total;
  const paid = isSettlement
    ? SETTLEMENT_COMPANY.paid + settlementPaid
    : depositPaidAmount;
  const due = isSettlement
    ? SETTLEMENT_COMPANY.balance - settlementPaid
    : Math.max(minimumDeposit(CONTRACT_WEDDING) - paid, 0);

  const [amountText, setAmountText] = useState(() => formatNumber(due));
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [receivedOn, setReceivedOn] = useState("05/11/2026");
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

  const changeContract = (next: string) => {
    setContractNumber(next);
    setSubmitted(false);
    const nextIsSettlement = next === CONTRACT_COMPANY.number;
    setAmountText(
      formatNumber(
        nextIsSettlement
          ? SETTLEMENT_COMPANY.balance - settlementPaid
          : Math.max(minimumDeposit(CONTRACT_WEDDING) - depositPaidAmount, 0)
      )
    );
  };

  const record = () => {
    setSubmitted(true);
    if (amountError || voucherError) return;

    if (isSettlement) {
      const nextPaid = readDemoState().settlementPaidAmount + amount;
      updateDemoState({
        settlementPaidAmount: nextPaid,
        settlementStatus:
          nextPaid >= SETTLEMENT_COMPANY.balance
            ? SETTLEMENT_STATUS.Paid
            : readDemoState().settlementStatus,
      });
    } else {
      const nextPaid = readDemoState().depositPaidAmount + amount;
      updateDemoState({
        depositPaidAmount: nextPaid,
        depositPaid: nextPaid >= minimumDeposit(CONTRACT_WEDDING),
      });
    }
    updateDemoState({
      paymentVouchers: [...usedVouchers, voucher.trim().toUpperCase()],
    });
    setVoucher("");
    setVoucherPhotos([]);
    setSubmitted(false);
    showToast(
      `Đã ghi ${formatMoney(amount)} (${method}) cho ${contract.number}, chứng từ ${voucher.trim()}`
    );
  };

  return (
    <>
      <PanelHeader title="Ghi nhận thu tiền" />
      <div className="l-grid l-grid-main">
        <section className="card l-stack">
          <div className="l-grid l-grid-2">
            <SelectField
              disabled={fixedContract !== undefined}
              id="payment-contract"
              label="Hợp đồng"
              options={[
                {
                  value: CONTRACT_WEDDING.number,
                  label: `${CONTRACT_WEDDING.number} · Cọc`,
                },
                {
                  value: CONTRACT_COMPANY.number,
                  label: `${CONTRACT_COMPANY.number} · Quyết toán`,
                },
              ]}
              value={contractNumber}
              onValueChange={(value) => changeContract(value)}
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
              options={PAYMENT_METHODS}
              value={method}
              onValueChange={(value) => setMethod(value)}
            />
            <TextField
              id="payment-date"
              label="Ngày nhận"
              value={receivedOn}
              onChange={(event) => setReceivedOn(event.target.value)}
            />
            <TextField
              id="payment-voucher"
              label="Mã chứng từ"
              placeholder="CT-1105-03"
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
