"use client";

import { Field } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

export function LunarDatePicker({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const showToast = useToast();

  return (
    <Field
      id={id}
      label="Ngày tổ chức"
      hint={
        <>
          dd/MM/yyyy.{" "}
          <a
            href="#"
            className="underline"
            onClick={(event) => {
              event.preventDefault();
              showToast(
                "Bản thật có bộ chọn ngày âm, hệ thống lưu ngày dương",
                "info",
              );
            }}
          >
            Chọn theo âm lịch
          </a>
        </>
      }
    >
      <input
        id={id}
        type="text"
        inputMode="numeric"
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}
