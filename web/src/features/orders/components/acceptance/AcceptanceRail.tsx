"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { ROUTES } from "@/constants/routes";
import { ORDER_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";
import { capacityRows } from "@/mocks/equipment";
import { SERVICE_RADIUS_KM } from "@/mocks/orders";

import { AcceptanceCondition } from "./AcceptanceCondition";
import { AcceptOrderDialog } from "./AcceptOrderDialog";
import { RejectOrderDialog } from "./RejectOrderDialog";

export function AcceptanceRail() {
  const status = useDemoState((state) => state.orderStatus);
  const km = useDemoState((state) => state.surveyDistanceKm);
  const shortage = useDemoState((state) => state.simulateShortage);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const outOfRange = km > SERVICE_RADIUS_KM;
  const short = capacityRows(shortage).some((row) => row.short);

  return (
    <aside className="card l-stack gap-2">
      <h3 className="card-title card-title-flush">Quyết định nhận đơn</h3>
      <AcceptanceCondition label="Khảo sát" ok note="2/2 bữa" />
      <AcceptanceCondition
        label={`Phạm vi ${SERVICE_RADIUS_KM} km`}
        ok={!outOfRange}
        note={outOfRange ? `${km} km` : "Trong phạm vi"}
      />
      <AcceptanceCondition
        label="Dụng cụ"
        ok={!short}
        note={short ? "Thiếu" : "Đủ"}
      />
      <AcceptanceCondition label="Nhân sự" ok note="Đủ" />
      <MoneyRow
        label="Tổng đơn"
        value={formatMoney(CONTRACT_WEDDING.total)}
        total
      />
      {status === ORDER_STATUS.Pending ? (
        <>
          <Button
            variant="primary"
            disabled={short || outOfRange}
            onClick={() => setAcceptOpen(true)}
          >
            Nhận đơn, giữ chỗ 24 giờ
          </Button>
          <Button variant="danger" onClick={() => setRejectOpen(true)}>
            Từ chối đơn
          </Button>
          <p className="text-small text-soft">
            Nhận toàn đơn, không nhận một phần.
          </p>
        </>
      ) : null}
      {status === ORDER_STATUS.Accepted ? (
        <>
          <ButtonLink
            href={ROUTES.workspaceContract(CONTRACT_WEDDING.number)}
            variant="primary"
          >
            Lập hợp đồng
          </ButtonLink>
          <p className="text-small text-soft">Giữ chỗ đến 06/11/2026 08:30.</p>
        </>
      ) : null}
      <AcceptOrderDialog open={acceptOpen} onOpenChange={setAcceptOpen} />
      <RejectOrderDialog open={rejectOpen} onOpenChange={setRejectOpen} />
    </aside>
  );
}
