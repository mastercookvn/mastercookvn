"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";

export function StaffFormDialog() {
  const [open, setOpen] = useState(false);
  const showToast = useToast();

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Thêm nhân viên
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Thêm nhân viên"
        confirmLabel="Lưu hồ sơ"
        onConfirm={() => showToast("Đã lưu hồ sơ, trạng thái Đang làm")}
      >
        <TextField id="staff-name" label="Họ tên" />
        <TextField
          id="staff-phone"
          label="Số điện thoại"
          type="tel"
          hint="Không trùng hồ sơ nhân sự khác."
        />
        <SelectField
          id="staff-type"
          label="Loại"
          options={["Cố định", "Thời vụ"]}
          defaultValue="Thời vụ"
        />
        <SelectField
          id="staff-position"
          label="Vị trí"
          options={["Bếp", "Phục vụ", "Vận chuyển", "Kiểm đếm"]}
          defaultValue="Phục vụ"
        />
      </Dialog>
    </>
  );
}
