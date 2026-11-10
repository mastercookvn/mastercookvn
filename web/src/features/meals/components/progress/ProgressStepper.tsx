"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MEAL_STATUS_META } from "@/constants/labels";
import { MEAL_PROGRESS } from "@/constants/statuses";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";
import type { OperationMeal } from "@/mocks/operationMeals";

import { ProgressHistory } from "./ProgressHistory";

const NEXT_ACTION: Record<number, string> = {
  0: "Bắt đầu chuẩn bị",
  1: "Bắt đầu phục vụ",
  2: "Kết thúc phục vụ",
};

export function ProgressStepper({ meal }: { meal: OperationMeal }) {
  const statuses = useDemoState((state) => state.mealStatuses);
  const showToast = useToast();
  const stage = MEAL_PROGRESS.indexOf(statuses[meal.id]);
  const action = NEXT_ACTION[stage];

  return (
    <>
      <div className="progress-steps">
        {MEAL_PROGRESS.map((status, index) => (
          <div
            key={status}
            className={
              index < stage
                ? "is-done"
                : index === stage
                  ? "is-active"
                  : undefined
            }
          >
            {MEAL_STATUS_META[status].label}
          </div>
        ))}
      </div>
      <div className="l-grid l-grid-2">
        <section className="card l-stack gap-2">
          <h3 className="card-title card-title-flush">Bước tiếp theo</h3>
          {action ? (
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  updateDemoState({
                    mealStatuses: {
                      ...statuses,
                      [meal.id]: MEAL_PROGRESS[stage + 1],
                    },
                  });
                  showToast("Đã ghi tiến độ");
                }}
              >
                {action}
              </Button>
            </div>
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
    </>
  );
}
