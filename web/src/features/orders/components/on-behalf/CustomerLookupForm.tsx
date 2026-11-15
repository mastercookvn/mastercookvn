"use client";

import { useFormContext } from "react-hook-form";

import { Alert } from "@/components/ui/Alert";
import { TextField } from "@/components/ui/TextField";

import type { OnBehalfFields } from "./onBehalfSchema";

export function CustomerLookupForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnBehalfFields>();

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Hồ sơ khách</h3>
      <div className="l-grid l-grid-2">
        <TextField
          id="behalf-phone"
          label="Số điện thoại"
          type="tel"
          inputMode="tel"
          {...register("customerPhone")}
          error={errors.customerPhone?.message}
        />
        <TextField
          id="behalf-customer-name"
          label="Họ tên"
          {...register("customerName")}
          error={errors.customerName?.message}
        />
      </div>
      <Alert tone="wait">
        SĐT này đã thuộc hồ sơ &quot;Nguyễn Minh Đức&quot;. Kiểm tra đúng người
        trước khi dùng, hệ thống không tạo hồ sơ thứ hai.
      </Alert>
    </section>
  );
}
