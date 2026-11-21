"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { LIVE_VALIDATION_MODE, personNameSchema } from "@/lib/validation";
import { updateDemoState } from "@/lib/demoStore";

/** UC-HD-02 1a: signer and time typed by the consultant, scan pages required (1f). */
const paperSignatureSchema = z.object({
  signer: personNameSchema,
  signedAt: z
    .string()
    .trim()
    .regex(
      /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
      "Thời điểm theo dạng dd/mm/yyyy hh:mm."
    ),
});

export function PaperSignatureForm({ signer }: { signer: string }) {
  const showToast = useToast();
  const [pages, setPages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paperSignatureSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { signer, signedAt: "" },
  });
  const save = handleSubmit(() => {
    if (pages.length === 0) return;
    updateDemoState({ paperSigned: true });
    showToast(`Đã lưu bản ký giấy, ${pages.length} trang`);
  });

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Ghi nhận ký giấy tại quầy</h3>
      <div className="l-grid l-grid-2">
        <TextField
          id="signer"
          label="Người ký"
          {...register("signer")}
          error={errors.signer?.message}
        />
        <TextField
          id="signed-at"
          label="Thời điểm ký"
          placeholder="dd/mm/yyyy hh:mm"
          {...register("signedAt")}
          error={errors.signedAt?.message}
        />
      </div>
      <PhotoGalleryField
        id="signed-pages"
        label="Ảnh chụp các trang hợp đồng đã ký (bắt buộc)"
        photos={pages}
        onChange={setPages}
        max={10}
        hint="Chụp đủ các trang có chữ ký, rõ nét, không lóa."
      />
      {submitted && pages.length === 0 ? (
        <p className="field-error" role="alert">
          Cần ít nhất một ảnh bản ký.
        </p>
      ) : null}
      <div className="l-row justify-end">
        <Button
          variant="primary"
          onClick={(event) => {
            setSubmitted(true);
            void save(event);
          }}
        >
          Lưu bản ký
        </Button>
      </div>
    </section>
  );
}
