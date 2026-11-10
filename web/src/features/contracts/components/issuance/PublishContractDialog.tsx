"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

export function PublishContractDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const showToast = useToast();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Phát hành hợp đồng"
      confirmLabel="Phát hành"
      onConfirm={() => {
        updateDemoState({ contractIssued: true });
        showToast("Đã phát hành. Báo khách qua Zalo hoặc điện thoại.");
      }}
    >
      <p className="text-soft">
        Tổng {formatMoney(contract.total)}, cọc tối thiểu{" "}
        {formatMoney(contract.total * 0.5)}, hạn cọc {contract.depositDeadline}.
        Sau khi phát hành không sửa được nội dung, chỉ điều chỉnh bằng phụ lục.
      </p>
    </Dialog>
  );
}
