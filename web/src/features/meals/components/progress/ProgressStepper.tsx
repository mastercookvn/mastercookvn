"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MEAL_STATUS_META } from "@/constants/labels";
import { MEAL_PROGRESS, MEAL_STATUS } from "@/constants/statuses";
import { servingStaffNeeded } from "@/lib/pricing";
import { useDemoState } from "@/mocks/demoStore";
import type { OperationMeal } from "@/mocks/operationMeals";

import { advanceMeal } from "../../lib/mealActions";
import { advanceLabel } from "../../lib/nextStep";

import { ProgressHistory } from "./ProgressHistory";

export function ProgressStepper({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const issued = useDemoState(
    (state) => state.equipmentIssued[meal.id] ?? false
  );
  const servers = useDemoState(
    (state) =>
      (state.assignments[meal.id] ?? []).filter(
        (row) => row.position === "Phục vụ"
      ).length
  );
  const showToast = useToast();
  const stage = MEAL_PROGRESS.indexOf(status);
  const action = advanceLabel(status);
  const serversNeeded = servingStaffNeeded(meal.setupTables);
  const issuedForStage =
    issued || stage > MEAL_PROGRESS.indexOf(MEAL_STATUS.Preparing);

  return (
    <div className="l-grid l-grid-2">
      <section className="card l-stack gap-2">
        <h3 className="card-title card-title-flush">Trước khi chuyển bước</h3>
        <div className="check-row">
          <span>
            Phục vụ {servers} / {serversNeeded} người
          </span>
          {servers >= serversNeeded ? (
            <Badge tone="good">Đủ</Badge>
          ) : (
            <Badge tone="wait">Thiếu {serversNeeded - servers}</Badge>
          )}
        </div>
        <div className="check-row">
          <span>Phiếu xuất dụng cụ</span>
          {issuedForStage ? (
            <Badge tone="good">Đã xuất</Badge>
          ) : (
            <Badge tone="wait">Chưa xuất</Badge>
          )}
        </div>
        {action ? (
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const next = advanceMeal(meal.id);
              showToast(`Đã ghi: ${MEAL_STATUS_META[next].label}`);
            }}
          >
            {action}
          </Button>
        ) : (
          <p className="text-soft text-small">
            Bước tiếp theo do thủ kho kiểm đếm hoặc kế toán quyết toán.
          </p>
        )}
        <p className="text-small text-soft">
          Không nhảy bước, không lùi trạng thái. Không bắt đầu phục vụ khi hợp
          đồng chưa có hiệu lực.
        </p>
      </section>
      <ProgressHistory stage={stage} />
    </div>
  );
}
