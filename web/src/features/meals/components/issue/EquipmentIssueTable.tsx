"use client";

import { Button } from "@/components/ui/Button";
import { DataTable, num } from "@/components/ui/DataTable";
import { ToastButton } from "@/components/ui/ToastButton";
import { MEAL_STATUS } from "@/constants/statuses";
import { formatNumber } from "@/lib/format";
import { useDemoState } from "@/mocks/demoStore";
import {
  EQUIPMENT,
  equipmentDemand,
  equipmentFormula,
} from "@/mocks/equipment";
import { type OperationMeal } from "@/mocks/operationMeals";

import { MealStageNotice } from "@/features/meals/components/MealStageNotice";

export function EquipmentIssueTable({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);

  if (status !== MEAL_STATUS.Preparing) {
    return (
      <MealStageNotice message="Phiếu xuất mở khi bữa ở trạng thái Đang chuẩn bị." />
    );
  }

  return (
    <>
      <div className="l-between">
        <p className="text-soft text-small">
          Tính từ {meal.guests} người và {meal.setupTables} bàn bố trí. Không
          lấn giữ của bữa khác.
        </p>
        <div className="l-row gap-2">
          <Button>Hủy phiếu</Button>
          <ToastButton
            variant="primary"
            message="Đã xuất. Sẵn sàng giảm, đang sử dụng tăng."
          >
            Xác nhận xuất
          </ToastButton>
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
        rows={EQUIPMENT.map((item, index) => {
          const needed = equipmentDemand(
            item,
            meal.guests,
            meal.setupTables,
            1,
          );
          return [
            item.name,
            <span key="formula" className="text-small text-soft">
              {equipmentFormula(item)}
            </span>,
            formatNumber(needed),
            formatNumber(item.ready),
            <input
              key="issued"
              id={`issue-${index}`}
              className="input-cell"
              defaultValue={needed}
              aria-label={`Thực xuất ${item.name}`}
            />,
          ];
        })}
      />
    </>
  );
}
