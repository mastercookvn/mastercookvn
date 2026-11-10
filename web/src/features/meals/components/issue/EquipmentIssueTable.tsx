"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { ExportButton } from "@/components/ui/ExportButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { EQUIPMENT_ISSUE_STATUS, MEAL_STATUS } from "@/constants/statuses";
import { formatNumber } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import {
  EQUIPMENT,
  equipmentDemand,
  equipmentFormula,
} from "@/mocks/equipment";
import { type OperationMeal } from "@/mocks/operationMeals";

import { MealStageNotice } from "@/features/meals/components/MealStageNotice";

export function EquipmentIssueTable({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const issued = useDemoState(
    (state) => state.equipmentIssued[meal.id] ?? false
  );
  const showToast = useToast();
  const needed = EQUIPMENT.map((item) =>
    equipmentDemand(item, meal.guests, meal.setupTables, 1)
  );
  const [quantities, setQuantities] = useState(needed);

  if (status !== MEAL_STATUS.Preparing && !issued) {
    return (
      <MealStageNotice message="Phiếu xuất mở khi bữa ở trạng thái Đang chuẩn bị." />
    );
  }

  const overReady = EQUIPMENT.map(
    (item, index) => quantities[index] > item.ready
  );
  const hasProblem = overReady.some(Boolean);

  return (
    <>
      <div className="l-between">
        <p className="text-soft text-small">
          Tính từ {meal.guests} người và {meal.setupTables} bàn bố trí. Không
          lấn giữ của bữa khác.
        </p>
        <div className="l-row gap-2">
          <ExportButton
            fileName={`phieu-xuat-${meal.orderCode}`}
            columns={["Dụng cụ", "Cần", "Sẵn sàng", "Thực xuất"]}
            rows={EQUIPMENT.map((item, index) => [
              item.name,
              needed[index],
              item.ready,
              quantities[index],
            ])}
          />
          {issued ? (
            <StatusBadge
              domain="equipmentIssue"
              status={EQUIPMENT_ISSUE_STATUS.Issued}
            />
          ) : (
            <>
              <Button onClick={() => setQuantities(needed)}>
                Đặt lại theo công thức
              </Button>
              <Button
                variant="primary"
                disabled={hasProblem}
                title={hasProblem ? "Có dòng vượt số sẵn sàng" : undefined}
                onClick={() => {
                  updateDemoState({
                    equipmentIssued: {
                      ...readDemoState().equipmentIssued,
                      [meal.id]: true,
                    },
                  });
                  showToast("Đã xuất. Sẵn sàng giảm, đang sử dụng tăng.");
                }}
              >
                Xác nhận xuất
              </Button>
            </>
          )}
        </div>
      </div>
      <DataTable
        columns={[
          "Dụng cụ",
          "Công thức",
          num("Cần"),
          num("Sẵn sàng"),
          num("Thực xuất"),
        ]}
        rows={EQUIPMENT.map((item, index) => [
          item.name,
          <span key="formula" className="text-small text-soft">
            {equipmentFormula(item)}
          </span>,
          formatNumber(needed[index]),
          formatNumber(item.ready),
          issued ? (
            formatNumber(quantities[index])
          ) : (
            <input
              key="issued"
              id={`issue-${index}`}
              inputMode="numeric"
              className={
                overReady[index] ? "input-cell has-error" : "input-cell"
              }
              value={quantities[index]}
              aria-label={`Thực xuất ${item.name}`}
              aria-invalid={overReady[index]}
              onChange={(event) =>
                setQuantities(
                  quantities.map((quantity, i) =>
                    i === index
                      ? Number(event.target.value.replace(/\D/g, ""))
                      : quantity
                  )
                )
              }
            />
          ),
        ])}
      />
      {hasProblem && !issued ? (
        <p className="field-error">Số thực xuất không được vượt số sẵn sàng.</p>
      ) : null}
    </>
  );
}
