"use client";

import { RefundIcon } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import { resetDemoState } from "@/mocks/demoStore";

/** Sample data now survives reloads, so testers need a way back to the start. */
export function ResetDemoButton() {
  const showToast = useToast();

  return (
    <button
      type="button"
      title="Đặt lại dữ liệu mẫu"
      onClick={() => {
        resetDemoState();
        showToast("Đã đặt lại toàn bộ dữ liệu mẫu", "info");
      }}
    >
      <RefundIcon size={16} />
      <span className="workspace-label">Đặt lại dữ liệu mẫu</span>
    </button>
  );
}
