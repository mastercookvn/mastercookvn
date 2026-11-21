"use client";

import { useFormContext } from "react-hook-form";

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
    </section>
  );
}
