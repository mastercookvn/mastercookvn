"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatMoney, formatNumber } from "@/lib/format";

export function RecordRefundDialog({ remaining }: { remaining: number }) {
  const [open, setOpen] = useState(false);
  const showToast = useToast();

  return (
    <>
      <Button size="sm" variant="primary" onClick={() => setOpen(true)}>
        Ghi hoàn
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Ghi nhận hoàn tiền"
        confirmLabel="Ghi giao dịch hoàn"
        onConfirm={() => showToast("Đã ghi giao dịch hoàn, cập nhật số dư")}
      >
        <TextField
          id="refund-amount"
          label="Số tiền đã hoàn (đ)"
          defaultValue={formatNumber(remaining)}
          hint={`Không vượt số còn phải hoàn: ${formatMoney(remaining)}`}
        />
        <SelectField
          id="refund-method"
          label="Phương thức"
          options={["Chuyển khoản", "Tiền mặt"]}
          defaultValue="Chuyển khoản"
        />
        <TextField
          id="refund-date"
          label="Ngày hoàn"
          defaultValue="05/11/2026"
        />
        <TextField
          id="refund-proof"
          label="Biên nhận (bắt buộc)"
          defaultValue="bien-nhan.jpg"
        />
      </Dialog>
    </>
  );
}
