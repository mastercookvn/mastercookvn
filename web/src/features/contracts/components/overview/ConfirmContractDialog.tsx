"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { CUSTOMER } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

const now = () =>
  new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** BR08: online confirmation by the account holder, with a drawn signature. */
export function ConfirmContractDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const showToast = useToast();
  const [name, setName] = useState(CUSTOMER.name);
  const [signature, setSignature] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: name.trim() ? null : "Nhập họ tên người ký",
    signature: signature ? null : "Ký tên vào ô bên trên",
    agreed: agreed ? null : "Đánh dấu đồng ý với nội dung hợp đồng",
  };
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  const confirm = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean) || !signature) return;
    updateDemoState({
      contractConfirmed: true,
      contractSignature: {
        name: name.trim(),
        image: signature,
        signedAt: now(),
      },
    });
    showToast("Đã ký và xác nhận hợp đồng. Bước tiếp theo là đặt cọc.");
    onOpenChange(false);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialog-backdrop" />
        <BaseDialog.Popup className="dialog dialog-wide">
          <BaseDialog.Title className="dialog-title">
            Ký xác nhận hợp đồng
          </BaseDialog.Title>
          <BaseDialog.Description className="text-small text-soft">
            Chữ ký có giá trị như ký giấy tại quầy. Hệ thống lưu tài khoản, thời
            điểm và phiên bản hợp đồng bạn ký.
          </BaseDialog.Description>
          <TextField
            id="contract-signer"
            label="Họ tên người ký"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={submitted ? errors.name : null}
          />
          <SignaturePad
            id="contract-signature"
            label="Chữ ký"
            value={signature}
            onChange={setSignature}
            error={submitted ? errors.signature : null}
          />
          <CheckboxLabel
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          >
            Tôi đã đọc và đồng ý nội dung, giá đã chốt, điều khoản cọc và hủy
            của hợp đồng phiên bản 1.
          </CheckboxLabel>
          {submitted && errors.agreed ? (
            <span className="field-error">{errors.agreed}</span>
          ) : null}
          <div className="l-row justify-end">
            <BaseDialog.Close className="btn">Để sau</BaseDialog.Close>
            <Button variant="primary" onClick={confirm}>
              Ký và xác nhận
            </Button>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
