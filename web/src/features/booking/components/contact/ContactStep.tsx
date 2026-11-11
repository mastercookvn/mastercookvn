"use client";

import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import {
  updateDemoState,
  useDemoState,
  type BookingContact,
} from "@/mocks/demoStore";

import { contactErrors } from "@/features/booking/lib/estimate";

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
  const errors = showErrors ? contactErrors(contact) : null;
  const update = (patch: Partial<BookingContact>) =>
    updateDemoState({ bookingContact: { ...saved, ...patch } });

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
          readOnly={signedIn}
          value={contact.name}
          error={errors?.name}
          onChange={(event) => update({ name: event.target.value })}
        />
        <TextField
          id="contact-phone"
          label="Số điện thoại"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          readOnly={signedIn}
          value={contact.phone}
          error={errors?.phone}
          onChange={(event) => update({ phone: event.target.value })}
        />
      </div>
      <TextareaField
        id="contact-note"
        label="Ghi chú cho tư vấn"
        placeholder="Ví dụ: gọi sau 18 giờ, nhà trong hẻm xe tải nhỏ vào được"
        value={contact.note}
        onChange={(event) => update({ note: event.target.value })}
      />
    </section>
  );
}
