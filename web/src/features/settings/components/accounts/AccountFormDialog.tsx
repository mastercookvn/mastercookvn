"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { ROLE_LABEL } from "@/constants/roles";

export function AccountFormDialog() {
  const [open, setOpen] = useState(false);
  const showToast = useToast();

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Tạo tài khoản
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Tạo tài khoản nội bộ"
        confirmLabel="Tạo tài khoản"
        onConfirm={() => showToast("Đã tạo tài khoản và gán vai trò")}
      >
        <TextField id="account-name" label="Họ tên" />
        <TextField
          id="account-phone"
          label="Số điện thoại"
          type="tel"
          hint="Trùng SĐT sẽ mở tài khoản đã có để thêm vai trò."
        />
        <TextField id="account-password" label="Mật khẩu tạm" type="password" />
        <div className="l-stack gap-1">
          {Object.values(ROLE_LABEL).map((label) => (
            <CheckboxLabel key={label}>{label}</CheckboxLabel>
          ))}
        </div>
      </Dialog>
    </>
  );
}
