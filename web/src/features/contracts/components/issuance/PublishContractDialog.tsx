"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING as contract } from "@/mocks/contracts";
import { updateDemoState } from "@/mocks/demoStore";

import { minimumDeposit } from "@/features/contracts/lib/contractState";

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
        showToast(
          "Đã phát hành. Khách thấy hợp đồng và số tiền cọc trong tài khoản."
        );
      }}
    >
      <p className="text-soft">
        Tổng {formatMoney(contract.total)}, cọc tối thiểu{" "}
        {formatMoney(minimumDeposit(contract))}, hạn cọc{" "}
        {contract.depositDeadline}. Sau khi phát hành không sửa được nội dung,
        chỉ điều chỉnh bằng phụ lục.
      </p>
    </Dialog>
  );
}
