"use client";

import { useState } from "react";

import { QrIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { VietQrCode } from "@/components/ui/VietQrCode";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import type { PaymentPurpose } from "@/constants/statuses";
import { useNow } from "@/hooks/useNow";
import { env } from "@/lib/env";
import { formatMoney, formatNumber } from "@/lib/format";
import {
  paymentIntentKey,
  readDemoState,
  updateDemoState,
  useDemoState,
  type PaymentIntent,
} from "@/lib/demoStore";

export type PaymentOption = {
  value: string;
  label: string;
  amount: number;
  hint?: string;
  /** The customer types any amount in this range instead of a fixed amount. */
  range?: { min: number; max: number };
};

const QR_VALIDITY_MS = BUSINESS_SETTINGS.qrValidityMinutes * 60 * 1000;

const parseAmount = (text: string) => Number(text.replace(/\D/g, "")) || 0;

const newReference = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}`;

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function removeIntent(key: string) {
  const remaining = { ...readDemoState().paymentIntents };
  delete remaining[key];
  updateDemoState({ paymentIntents: remaining });
}

function saveIntent(key: string, intent: PaymentIntent) {
  updateDemoState({
    paymentIntents: { ...readDemoState().paymentIntents, [key]: intent },
  });
}

/**
 * The customer first saves the amount to pay, then asks for the QR code of that
 * exact amount. Each QR is one pending transaction, valid for TS07; repeated
 * clicks reuse it and a success is recorded once per reference.
 */
export function PaymentCheckout({
  contractNumber,
  purpose,
  referencePrefix,
  options,
  onPaid,
}: {
  contractNumber: string;
  purpose: PaymentPurpose;
  referencePrefix: string;
  options: PaymentOption[];
  onPaid: (intent: PaymentIntent) => void;
}) {
  const key = paymentIntentKey(contractNumber, purpose);
  const intent = useDemoState((state) => state.paymentIntents[key]);
  const now = useNow();
  const [selected, setSelected] = useState(options[0].value);
  const [qrHidden, setQrHidden] = useState(false);
  const [customText, setCustomText] = useState("");
  const showToast = useToast();
  const chosen =
    options.find((option) => option.value === selected) ?? options[0];
  const amountToPay = chosen.range ? parseAmount(customText) : chosen.amount;
  const rangeError = !chosen.range
    ? null
    : amountToPay < chosen.range.min
      ? `Tối thiểu ${formatMoney(chosen.range.min)}`
      : amountToPay > chosen.range.max
        ? `Tối đa ${formatMoney(chosen.range.max)}`
        : null;

  const bankBin = env.NEXT_PUBLIC_PAYMENT_BANK_BIN;
  const accountNumber = env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER;
  const accountName = env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME;

  if (!intent) {
    return (
      <section className="card l-stack">
        <h3 className="card-title card-title-flush">
          {options.length > 1
            ? "Chọn số tiền thanh toán"
            : "Số tiền thanh toán"}
        </h3>
        <div className="pay-options" role="radiogroup">
          {options.map((option) => (
            <label key={option.value} className="pay-option">
              <input
                type="radio"
                name={key}
                value={option.value}
                checked={option.value === chosen.value}
                onChange={() => setSelected(option.value)}
              />
              <b>{option.label}</b>
              <span className="price">
                {option.range ? "Tự nhập" : formatMoney(option.amount)}
              </span>
              {option.hint ? <small>{option.hint}</small> : null}
            </label>
          ))}
        </div>
        {chosen.range ? (
          <TextField
            id={`${key}-custom-amount`}
            label="Số tiền bạn muốn trả (đ)"
            inputMode="numeric"
            placeholder={formatNumber(chosen.range.min)}
            value={customText}
            onChange={(event) =>
              setCustomText(
                event.target.value === ""
                  ? ""
                  : formatNumber(parseAmount(event.target.value))
              )
            }
            error={customText === "" ? null : rangeError}
            hint={`Từ ${formatMoney(chosen.range.min)} đến ${formatMoney(chosen.range.max)}. Phần trên mức tối thiểu được tính là trả trước.`}
          />
        ) : null}
        <p className="text-small text-soft">
          Số tiền được lưu lại trong đơn để bạn xem lại bất cứ lúc nào. Mã QR
          chỉ tạo khi bạn bấm Thanh toán.
        </p>
        <div className="l-row justify-end">
          <Button
            variant="primary"
            disabled={rangeError !== null}
            onClick={() => {
              if (readDemoState().paymentIntents[key]) return;
              saveIntent(key, {
                purpose,
                amount: amountToPay,
                reference: newReference(referencePrefix),
                createdAt: new Date().toLocaleString("vi-VN"),
              });
              showToast(`Đã lưu: bạn cần trả ${formatMoney(amountToPay)}`);
            }}
          >
            Lưu số tiền cần trả
          </Button>
        </div>
      </section>
    );
  }

  const qrExpiresAt = intent.qrExpiresAt;
  const qrLive = qrExpiresAt !== undefined && now !== null && now < qrExpiresAt;
  const qrExpired =
    qrExpiresAt !== undefined && now !== null && now >= qrExpiresAt;

  const openQr = () => {
    setQrHidden(false);
    const current = readDemoState().paymentIntents[key];
    if (!current) return;
    if (current.qrExpiresAt !== undefined && Date.now() < current.qrExpiresAt) {
      return;
    }
    saveIntent(key, {
      ...current,
      // The first QR uses the reference shown since saving; an expired one
      // is a void transaction, so its replacement gets a new reference.
      reference:
        current.qrExpiresAt === undefined
          ? current.reference
          : newReference(referencePrefix),
      qrExpiresAt: Date.now() + QR_VALIDITY_MS,
    });
  };

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Bạn cần trả</h3>
      <div className="pay-due">
        <span>Số tiền đã lưu lúc {intent.createdAt}</span>
        <div className="amount-lg">{formatMoney(intent.amount)}</div>
        <span className="text-code">
          Nội dung chuyển khoản {intent.reference}
        </span>
      </div>

      {qrLive && !qrHidden ? (
        <div className="l-stack items-center text-center">
          {bankBin && accountNumber ? (
            <>
              <VietQrCode
                bankBin={bankBin}
                accountNumber={accountNumber}
                amount={intent.amount}
                purpose={intent.reference}
              />
              <span className="text-small">
                {accountName ? <b>{accountName}</b> : null}
                {accountName ? " · " : null}
                Số tài khoản <span className="text-code">{accountNumber}</span>
              </span>
            </>
          ) : (
            <Alert tone="error" className="w-full text-left">
              Cơ sở chưa cấu hình tài khoản nhận tiền nên chưa tạo được mã QR.
              Vui lòng liên hệ tư vấn hoặc kế toán.
            </Alert>
          )}
          <span className="text-small text-soft">
            Quét bằng ứng dụng ngân hàng. Số tiền và nội dung đã điền sẵn, vui
            lòng không sửa. Mã hết hạn sau{" "}
            <b className="countdown">{formatRemaining(qrExpiresAt - now)}</b>.
          </span>
          <Alert tone="info" className="w-full text-left">
            Trang tự cập nhật khi nhận kết quả từ dịch vụ thanh toán, không cần
            bấm báo đã trả.
          </Alert>
          <div className="l-row justify-center">
            <Button onClick={() => setQrHidden(true)}>Ẩn mã QR</Button>
            {/* Simulated until GET /me/payments/{id} exists. */}
            <Button
              variant="inverse"
              onClick={() => {
                const current = readDemoState().paymentIntents[key];
                if (current?.reference !== intent.reference) return;
                removeIntent(key);
                onPaid(current);
                showToast("Đã nhận thanh toán thành công");
              }}
            >
              Giả lập: dịch vụ báo thành công
            </Button>
          </div>
        </div>
      ) : (
        <>
          {qrExpired ? (
            <Alert tone="wait">
              Mã QR đã hết hạn sau {BUSINESS_SETTINGS.qrValidityMinutes} phút.
              Nếu chưa chuyển khoản, bấm Tạo mã QR mới. Nếu đã chuyển theo mã
              cũ, đừng chuyển lại, kế toán sẽ đối soát.
            </Alert>
          ) : null}
          <div className="l-between">
            {options.length > 1 && !qrLive ? (
              <Button
                variant="text"
                onClick={() => {
                  removeIntent(key);
                  showToast(
                    "Đã hủy số tiền đã lưu, bạn có thể chọn lại",
                    "info"
                  );
                }}
              >
                Đổi số tiền
              </Button>
            ) : (
              <span />
            )}
            <Button variant="primary" disabled={now === null} onClick={openQr}>
              <QrIcon size={18} />
              {qrExpired
                ? "Tạo mã QR mới"
                : qrLive
                  ? "Hiện mã QR"
                  : "Thanh toán"}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
