"use client";

import { Suspense, useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import { INVENTORY_PERIOD_STATUS } from "@/constants/statuses";
import { useQueryParam } from "@/hooks/useQueryParam";
import { formatPercent } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import { INVENTORY_PERIOD as period } from "@/mocks/inventory";

import { ClosePeriodDialog } from "./ClosePeriodDialog";
import { PeriodKpis } from "./PeriodKpis";
import { PeriodValuationTable } from "./PeriodValuationTable";

function ReturnToStocktakeButton() {
  const [, setTab] = useQueryParam("tab");
  return <Button onClick={() => setTab("stocktake")}>Trả về kiểm kê</Button>;
}

export function ClosingPanel() {
  const closed = useDemoState((state) => state.periodClosed);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <PanelHeader
        title={`Chốt kỳ food cost ${period.month}`}
        subtitle="Định giá tồn bình quân gia quyền tháng"
        actions={
          <>
            <StatusBadge
              domain="inventoryPeriod"
              status={
                closed
                  ? INVENTORY_PERIOD_STATUS.Closed
                  : INVENTORY_PERIOD_STATUS.AwaitingClose
              }
            />
            {closed ? (
              <ToastButton message="Bản mẫu: mở lại kỳ, phải chốt lại cả các kỳ sau">
                Mở lại kỳ
              </ToastButton>
            ) : (
              <>
                <Suspense fallback={null}>
                  <ReturnToStocktakeButton />
                </Suspense>
                <Button variant="primary" onClick={() => setDialogOpen(true)}>
                  Chốt kỳ
                </Button>
              </>
            )}
          </>
        }
      />
      <PeriodKpis />
      <PeriodValuationTable />
      {closed ? (
        <Alert tone="info">
          Đã chốt. Quản lý cơ sở có thể dùng {formatPercent(period.foodCost)}{" "}
          làm mục tiêu tháng sau, giữ 35% hoặc nhập mức khác trong Tham số
          nghiệp vụ.
        </Alert>
      ) : null}
      <ClosePeriodDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
