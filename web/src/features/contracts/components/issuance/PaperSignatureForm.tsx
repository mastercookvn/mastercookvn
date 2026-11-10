"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { CUSTOMER } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

export function PaperSignatureForm() {
  const showToast = useToast();
  const [pages, setPages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Ghi nhận ký giấy tại quầy</h3>
      <div className="l-grid l-grid-2">
        <TextField id="signer" label="Người ký" defaultValue={CUSTOMER.name} />
        <TextField
          id="signed-at"
          label="Thời điểm ký"
          defaultValue="05/11/2026 15:00"
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
          onClick={() => {
            setSubmitted(true);
            if (pages.length === 0) return;
            updateDemoState({ paperSigned: true });
            showToast(`Đã lưu bản ký giấy, ${pages.length} trang`);
          }}
        >
          Lưu bản ký
        </Button>
      </div>
    </section>
  );
}
