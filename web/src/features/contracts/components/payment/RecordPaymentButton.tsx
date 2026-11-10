"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { updateDemoState } from "@/mocks/demoStore";

export function RecordPaymentButton() {
  const showToast = useToast();

  return (
    <Button
      variant="primary"
      onClick={() => {
        updateDemoState({ depositPaid: true, depositPercent: 50 });
        showToast("Đã ghi giao dịch thành công, cập nhật hiệu lực hợp đồng");
      }}
    >
      Ghi giao dịch
    </Button>
  );
}
