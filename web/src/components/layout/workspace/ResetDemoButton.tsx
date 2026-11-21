"use client";

import { RefundIcon } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import { resetDemoState } from "@/lib/demoStore";

/** Local records survive reloads until the backend exists, so testers need a way to clear them. */
export function ResetDemoButton() {
  const showToast = useToast();

  return (
    <button
      type="button"
      title="Xóa dữ liệu cục bộ"
      onClick={() => {
        resetDemoState();
        showToast("Đã xóa toàn bộ dữ liệu cục bộ", "info");
      }}
    >
      <RefundIcon size={16} />
      <span className="workspace-label">Xóa dữ liệu cục bộ</span>
    </button>
  );
}
