"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { ROUTES } from "@/constants/routes";
import { ORDER_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { SERVICE_RADIUS_KM } from "@/mocks/orders";

import { useAcceptanceChecks } from "@/features/orders/lib/acceptance";
import {
  useWorkspaceOrder,
  type WorkspaceOrder,
} from "@/features/orders/lib/useOrders";

import { AcceptanceCondition } from "./AcceptanceCondition";
import { AcceptOrderDialog } from "./AcceptOrderDialog";
import { RejectOrderDialog } from "./RejectOrderDialog";

function Rail({ order }: { order: WorkspaceOrder }) {
  const checks = useAcceptanceChecks(order);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const allSurveyed = checks.surveyed === checks.mealCount;
  const canAccept =
    allSurveyed &&
    !checks.outOfRange &&
    !checks.equipmentShort &&
    !checks.staffShort;

  return (
    <aside className="card l-stack gap-2">
      <h3 className="card-title card-title-flush">Quyết định nhận đơn</h3>
      <AcceptanceCondition
        label="Khảo sát"
        ok={allSurveyed}
        note={`${checks.surveyed}/${checks.mealCount} bữa`}
      />
      <AcceptanceCondition
        label={`Phạm vi ${SERVICE_RADIUS_KM} km`}
        ok={allSurveyed && !checks.outOfRange}
        note={
          checks.outOfRange
            ? `${checks.farthest} km`
            : allSurveyed
              ? "Trong phạm vi"
              : "Chưa đủ khảo sát"
        }
      />
      <AcceptanceCondition
        label="Dụng cụ"
        ok={!checks.equipmentShort}
        note={checks.equipmentShort ? "Thiếu" : "Đủ"}
      />
      <AcceptanceCondition
        label="Nhân sự"
        ok={!checks.staffShort}
        note={checks.staffShort ? "Thiếu" : "Đủ"}
      />
      <MoneyRow label="Tổng đơn" value={formatMoney(order.total)} total />
      {order.status === ORDER_STATUS.Pending ? (
        <>
          <Button
            variant="primary"
            disabled={!canAccept}
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
      {order.status === ORDER_STATUS.Accepted ? (
        order.contractNumber ? (
          <ButtonLink
            href={ROUTES.workspaceContract(order.contractNumber)}
            variant="primary"
          >
            Mở hợp đồng {order.contractNumber}
          </ButtonLink>
        ) : (
          <p className="text-small text-soft">
            Đã nhận, giữ chỗ 24 giờ. Dữ liệu mẫu chưa có hợp đồng lập từ đơn
            này.
          </p>
        )
      ) : null}
      <AcceptOrderDialog
        order={order}
        open={acceptOpen}
        onOpenChange={setAcceptOpen}
      />
      <RejectOrderDialog
        order={order}
        open={rejectOpen}
        onOpenChange={setRejectOpen}
      />
    </aside>
  );
}

export function AcceptanceRail({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  return order ? <Rail order={order} /> : null;
}
