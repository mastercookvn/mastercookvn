"use client";

import { useState } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToastButton } from "@/components/ui/ToastButton";
import { INVENTORY_PERIOD_STATUS } from "@/constants/statuses";
import { EmptyState } from "@/components/ui/EmptyState";

import {
  currentInventoryPeriod,
  type InventoryPeriod,
} from "../../lib/inventoryPeriod";

export function StocktakeTable() {
  const period = currentInventoryPeriod();

  if (!period) {
    return (
      <>
        <PanelHeader title="Kiểm kê" />
        <EmptyState>Chưa có kỳ nguyên liệu cần kiểm kê.</EmptyState>
      </>
    );
  }

  return <PeriodStocktake period={period} />;
}

function PeriodStocktake({ period }: { period: InventoryPeriod }) {
  const [counts, setCounts] = useState(
    period.lines.map((line) => line.closingQty)
  );

  return (
    <>
      <PanelHeader
        title={`Kiểm kê tháng ${period.month}`}
        actions={
          <>
            <StatusBadge
              domain="inventoryPeriod"
              status={INVENTORY_PERIOD_STATUS.AwaitingClose}
            />
            <ExportButton
              fileName={`kiem-ke-${period.month.replace("/", "-")}`}
              columns={[
                "Nguyên liệu",
                "Đơn vị",
                "Tồn đầu",
                "Tổng nhập",
                "Tối đa",
                "Lượng thực tế",
              ]}
              rows={period.lines.map((line, index) => [
                line.name,
                line.unit,
                line.openingQty,
                line.purchasedQty,
                line.maxQty,
                counts[index],
              ])}
            />
            <ToastButton variant="primary" message="Đã chuyển kỳ sang Chờ chốt">
              Gửi kế toán chốt
            </ToastButton>
          </>
        }
      />
      <DataTable
        columns={[
          "Nguyên liệu",
          num("Tồn đầu"),
          num("Tổng nhập"),
          num("Tối đa"),
          num("Lượng thực tế"),
          "Ghi chú",
        ]}
        rows={period.lines.map((line, index) => {
          const tooHigh = counts[index] > line.maxQty;
          return [
            <>
              {line.name} <span className="text-soft">({line.unit})</span>
            </>,
            line.openingQty,
            line.purchasedQty,
            line.maxQty,
            <input
              key="count"
              id={`stocktake-${index}`}
              type="number"
              className={tooHigh ? "input-cell has-error" : "input-cell"}
              value={counts[index]}
              aria-label={`Lượng thực tế ${line.name}`}
              onChange={(event) =>
                setCounts(
                  counts.map((count, i) =>
                    i === index ? Number(event.target.value) : count
                  )
                )
              }
            />,
            tooHigh ? (
              <span key="note" className="text-small font-semibold text-error">
                Vượt đầu + nhập
              </span>
            ) : (
              <span key="note" className="text-soft text-small">
                Hợp lệ
              </span>
            ),
          ];
        })}
      />
    </>
  );
}
