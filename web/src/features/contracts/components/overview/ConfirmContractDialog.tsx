"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { useToast } from "@/components/ui/Toast";
import type { Contract } from "@/models/contracts";
import { updateDemoState } from "@/lib/demoStore";

import { ISSUED_CONTRACT_VERSION } from "@/features/contracts/lib/contractState";

const now = () =>
  new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** BR08, UC-HD-02: the signed-in account agrees to the issued version. No OTP, no drawn or digital signature. */
export function ConfirmContractDialog({
  contract,
  open,
  onOpenChange,
}: {
  contract: Contract;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const showToast = useToast();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  const confirm = () => {
    setSubmitted(true);
    if (!agreed) return;
    updateDemoState({
      contractConfirmed: true,
      contractConfirmation: {
        accountName: contract.customerName,
        accountPhone: contract.customerPhone,
        version: ISSUED_CONTRACT_VERSION,
        confirmedAt: now(),
      },
    });
    showToast("Đã xác nhận hợp đồng. Bước tiếp theo là đặt cọc.");
    onOpenChange(false);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialog-backdrop" />
        <BaseDialog.Popup className="dialog">
          <BaseDialog.Title className="dialog-title">
            Xác nhận đồng ý hợp đồng
          </BaseDialog.Title>
          <BaseDialog.Description className="text-small text-soft">
            Bạn xác nhận bằng tài khoản đang đăng nhập. Hệ thống lưu tài khoản,
            thời điểm và phiên bản hợp đồng bạn đồng ý.
          </BaseDialog.Description>
          <div className="l-stack gap-1">
            <MoneyRow label="Tài khoản" value={contract.customerName} />
            <MoneyRow label="Số điện thoại" value={contract.customerPhone} />
            <MoneyRow
              label="Phiên bản hợp đồng"
              value={ISSUED_CONTRACT_VERSION}
            />
          </div>
          <CheckboxLabel
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          >
            Tôi đã đọc và đồng ý nội dung, giá đã chốt, điều khoản cọc và hủy
            của hợp đồng phiên bản {ISSUED_CONTRACT_VERSION}.
          </CheckboxLabel>
          {submitted && !agreed ? (
            <span className="field-error">
              Đánh dấu đồng ý với nội dung hợp đồng
            </span>
          ) : null}
          <div className="l-row justify-end">
            <BaseDialog.Close className="btn">Để sau</BaseDialog.Close>
            <Button variant="primary" onClick={confirm}>
              Xác nhận đồng ý
            </Button>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
