"use client";

import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { CUSTOMER } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

export function PaperSignatureForm() {
  const showToast = useToast();

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Ghi nhận ký giấy tại quầy</h3>
      <div className="l-grid l-grid-3">
        <TextField id="signer" label="Người ký" defaultValue={CUSTOMER.name} />
        <TextField
          id="signed-at"
          label="Thời điểm ký"
          defaultValue="05/11/2026 15:00"
        />
        <TextField
          id="signed-file"
          label="Tệp bản ký (bắt buộc)"
          defaultValue="hd-0142-da-ky.pdf"
        />
      </div>
      <div className="l-row justify-end">
        <Button
          variant="primary"
          onClick={() => {
            updateDemoState({ paperSigned: true });
            showToast("Đã lưu bản ký giấy");
          }}
        >
          Lưu bản ký
        </Button>
      </div>
    </section>
  );
}
