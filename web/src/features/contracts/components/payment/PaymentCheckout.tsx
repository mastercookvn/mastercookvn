"use client";

import { useState } from "react";

import { QrIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { QrPlaceholder } from "@/components/ui/QrPlaceholder";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import type { PaymentPurpose } from "@/constants/statuses";
import { formatMoney, formatNumber } from "@/lib/format";
import {
  paymentIntentKey,
  readDemoState,
  updateDemoState,
  useDemoState,
  type PaymentIntent,
} from "@/mocks/demoStore";

export type PaymentOption = {
  value: string;
  label: string;
  amount: number;
  hint?: string;
  /** The customer types any amount in this range instead of a fixed amount. */
  range?: { min: number; max: number };
};

const parseAmount = (text: string) => Number(text.replace(/\D/g, "")) || 0;

function removeIntent(key: string) {
  const remaining = { ...readDemoState().paymentIntents };
  delete remaining[key];
  updateDemoState({ paymentIntents: remaining });
}

/**
 * The customer first saves the amount to pay, then asks for the QR code of that
 * exact amount. The QR never changes while the customer is still choosing.
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
  const [selected, setSelected] = useState(options[0].value);
  const [qrVisible, setQrVisible] = useState(false);
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
              const createdAt = new Date().toLocaleString("vi-VN");
              updateDemoState({
                paymentIntents: {
                  ...readDemoState().paymentIntents,
                  [key]: {
                    purpose,
                    amount: amountToPay,
                    reference: `${referencePrefix}-${Date.now().toString(36).toUpperCase()}`,
                    createdAt,
                  },
                },
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

      {qrVisible ? (
        <div className="l-stack items-center text-center">
          <QrPlaceholder seed={`${intent.reference}${intent.amount}`} />
          <span className="text-small text-soft">
            Quét bằng ứng dụng ngân hàng. Số tiền và nội dung đã điền sẵn theo
            số đã lưu. Mã QR này chỉ minh họa, chưa chốt nhà cung cấp.
          </span>
          <Alert tone="info" className="w-full text-left">
            Trang tự cập nhật khi nhận kết quả từ dịch vụ thanh toán, không cần
            bấm báo đã trả.
          </Alert>
          <div className="l-row justify-center">
            <Button onClick={() => setQrVisible(false)}>Ẩn mã QR</Button>
            {/* Simulated until GET /me/payments/{id} exists (V7). */}
            <Button
              variant="inverse"
              onClick={() => {
                removeIntent(key);
                setQrVisible(false);
                onPaid(intent);
                showToast("Đã nhận thanh toán thành công");
              }}
            >
              Giả lập: dịch vụ báo thành công
            </Button>
          </div>
        </div>
      ) : (
        <div className="l-between">
          {options.length > 1 ? (
            <Button
              variant="text"
              onClick={() => {
                removeIntent(key);
                showToast("Đã hủy số tiền đã lưu, bạn có thể chọn lại", "info");
              }}
            >
              Đổi số tiền
            </Button>
          ) : (
            <span />
          )}
          <Button variant="primary" onClick={() => setQrVisible(true)}>
            <QrIcon size={18} />
            Thanh toán
          </Button>
        </div>
      )}
    </section>
  );
}
