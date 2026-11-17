"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { LIVE_VALIDATION_MODE } from "@/lib/validation";
import {
  updateDemoState,
  useDemoState,
  type BookingContact,
} from "@/mocks/demoStore";

import { bookingContactSchema } from "@/features/booking/lib/estimate";

export function ContactStep({
  contact,
  signedIn,
  showErrors,
}: {
  contact: BookingContact;
  signedIn: boolean;
  showErrors: boolean;
}) {
  const saved = useDemoState((state) => state.bookingContact);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingContactSchema),
    mode: LIVE_VALIDATION_MODE,
    values: contact,
    resetOptions: { keepErrors: true },
  });
  const update = (patch: Partial<BookingContact>) =>
    updateDemoState({ bookingContact: { ...saved, ...patch } });

  useEffect(() => {
    if (showErrors) void trigger();
  }, [showErrors, trigger]);

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Thông tin người đặt</h3>
      <p className="text-small text-soft">
        {signedIn
          ? "Lấy từ tài khoản đăng nhập. Tư vấn gọi số này để hẹn khảo sát."
          : "Khi gửi đơn, bạn đăng nhập bằng chính số điện thoại này để theo dõi đơn."}
      </p>
      <div className="l-grid l-grid-2">
        <TextField
          id="contact-name"
          label="Họ tên"
          autoComplete="name"
          placeholder="Nguyễn Thị Mai"
          readOnly={signedIn}
          {...register("name", {
            onChange: (event) => update({ name: event.target.value }),
          })}
          error={errors.name?.message}
        />
        <TextField
          id="contact-phone"
          label="Số điện thoại"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0903 123 456"
          readOnly={signedIn}
          {...register("phone", {
            onChange: (event) => update({ phone: event.target.value }),
          })}
          error={errors.phone?.message}
        />
      </div>
      <TextareaField
        id="contact-note"
        label="Ghi chú cho tư vấn"
        placeholder="Ví dụ: gọi sau 18 giờ, nhà trong hẻm xe tải nhỏ vào được"
        {...register("note", {
          onChange: (event) => update({ note: event.target.value }),
        })}
      />
    </section>
  );
}
