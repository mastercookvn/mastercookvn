"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useQueryParam } from "@/hooks/useQueryParam";
import { updateDemoState } from "@/mocks/demoStore";

/** Simulated until GET /me/payments/{id} exists (V7). */
export function PaymentStatusPoller() {
  const [, setTab] = useQueryParam("tab");
  const showToast = useToast();

  return (
    <Button
      variant="inverse"
      onClick={() => {
        updateDemoState({ depositPaid: true });
        setTab(null);
        showToast("Đã nhận thanh toán thành công");
      }}
    >
      Giả lập: dịch vụ báo thành công
    </Button>
  );
}
