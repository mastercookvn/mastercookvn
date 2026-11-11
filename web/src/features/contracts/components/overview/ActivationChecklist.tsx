"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useDemoState } from "@/mocks/demoStore";

import { ConfirmContractDialog } from "./ConfirmContractDialog";

export function ActivationChecklist() {
  const confirmed = useDemoState((state) => state.contractConfirmed);
  const deposited = useDemoState((state) => state.depositPaid);
  const signature = useDemoState((state) => state.contractSignature);
  const issued = useDemoState((state) => state.contractIssued);
  const [, setTab] = useQueryParam("tab");
  const [dialogOpen, setDialogOpen] = useState(false);

  // BR08: the facility issues first; the customer confirms an issued contract.
  if (!issued) {
    return (
      <Alert tone="wait">
        Cơ sở chưa phát hành hợp đồng. Bạn ký và thanh toán cọc được sau khi tư
        vấn chốt giá, hạn cọc và phát hành.
      </Alert>
    );
  }

  return (
    <div className="card l-stack">
      <h3 className="card-title card-title-flush">Cần hoàn tất cả hai việc</h3>
      <div className="l-between">
        {confirmed ? (
          <Badge tone="good">
            {signature
              ? `Đã ký online lúc ${signature.signedAt}`
              : "Đã xác nhận"}
          </Badge>
        ) : (
          <>
            <Badge tone="wait">Chưa xác nhận</Badge>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDialogOpen(true)}
            >
              Ký xác nhận hợp đồng
            </Button>
          </>
        )}
      </div>
      <div className="l-between">
        {deposited ? (
          <Badge tone="good">Đủ cọc</Badge>
        ) : (
          <>
            <Badge tone="wait">Chưa cọc</Badge>
            <Button
              variant="inverse"
              size="sm"
              onClick={() => setTab("payment")}
            >
              Thanh toán cọc
            </Button>
          </>
        )}
      </div>
      {signature ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URL from the signature pad
        <img
          className="signature-image"
          src={signature.image}
          alt={`Chữ ký của ${signature.name}`}
        />
      ) : null}
      <p className="text-small text-soft">
        Làm việc nào trước cũng được. Có thể ký giấy tại quầy thay vì xác nhận
        online.
      </p>
      <ConfirmContractDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
