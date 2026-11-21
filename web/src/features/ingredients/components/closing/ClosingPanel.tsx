"use client";

import { Suspense, useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { INVENTORY_PERIOD_STATUS } from "@/constants/statuses";
import { useQueryParam } from "@/hooks/useQueryParam";
import { formatPercent } from "@/lib/format";
import { useDemoState } from "@/lib/demoStore";
import { EmptyState } from "@/components/ui/EmptyState";

import { currentInventoryPeriod } from "../../lib/inventoryPeriod";

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
  const period = currentInventoryPeriod();

  if (!period) {
    return (
      <>
        <PanelHeader title="Chốt kỳ food cost" />
        <EmptyState>Chưa có kỳ nguyên liệu cần chốt.</EmptyState>
      </>
    );
  }

  return (
    <>
      <PanelHeader
        title={`Chốt kỳ food cost ${period.month}`}
        actions={
          <>
            <ExportButton
              fileName={`food-cost-${period.month.replace("/", "-")}`}
              columns={[
                "Nguyên liệu",
                "Giá trị đầu (đ)",
                "Giá trị nhập (đ)",
                "Đơn giá tồn (đ)",
                "Lượng cuối",
                "Đơn vị",
                "Giá trị cuối (đ)",
                "Tiêu thụ (đ)",
              ]}
              rows={period.lines.map((line) => [
                line.name,
                line.openingValue,
                line.purchasedValue,
                Math.round(line.unitCost),
                line.closingQty,
                line.unit,
                line.closingValue,
                line.consumed,
              ])}
            />
            <StatusBadge
              domain="inventoryPeriod"
              status={
                closed
                  ? INVENTORY_PERIOD_STATUS.Closed
                  : INVENTORY_PERIOD_STATUS.AwaitingClose
              }
            />
            {closed ? (
              <ToastButton message="Mở lại kỳ, phải chốt lại cả các kỳ sau">
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
      <PeriodKpis period={period} />
      <PeriodValuationTable period={period} />
      {closed ? (
        <Alert tone="info">
          Đã chốt. Quản lý cơ sở có thể dùng {formatPercent(period.foodCost)}{" "}
          làm mục tiêu tháng sau, giữ{" "}
          {formatPercent(BUSINESS_SETTINGS.foodCostTarget, 0)} hoặc nhập mức
          khác trong Tham số nghiệp vụ. Hệ thống không tự ghi đè mục tiêu.
        </Alert>
      ) : null}
      <ClosePeriodDialog
        month={period.month}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
