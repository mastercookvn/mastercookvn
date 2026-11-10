"use client";

import { useToast } from "@/components/ui/Toast";
import { resetDemoState } from "@/mocks/demoStore";

/** Sample data now survives reloads, so testers need a way back to the start. */
export function ResetDemoButton() {
  const showToast = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        resetDemoState();
        showToast("Đã đặt lại toàn bộ dữ liệu mẫu", "info");
      }}
    >
      Đặt lại dữ liệu mẫu
    </button>
  );
}
