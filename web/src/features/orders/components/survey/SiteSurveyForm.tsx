"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { servingStaffNeeded } from "@/lib/pricing";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { SERVICE_RADIUS_KM, SURVEY_QUESTIONS } from "@/mocks/orders";

import {
  surveyKey,
  useWorkspaceOrder,
  type WorkspaceOrder,
} from "@/features/orders/lib/useOrders";

/** UC-DT-03: each meal has its own survey and distance, even at the same address. */
function SurveyForMeal({ order }: { order: WorkspaceOrder }) {
  const [mealIndex, setMealIndex] = useState(0);
  const meal = order.mealDetails[mealIndex];
  const key = surveyKey(order.code, mealIndex);
  const saved = useDemoState((state) => state.surveyDistances[key]);
  const km = saved ?? meal.distanceKm;
  const showToast = useToast();
  const outOfRange = km !== undefined && km > SERVICE_RADIUS_KM;
  const nextIndex = (mealIndex + 1) % order.mealDetails.length;
  const day = meal.date.slice(0, 5);

  const saveDistance = (value: number) =>
    updateDemoState({
      surveyDistances: { ...readDemoState().surveyDistances, [key]: value },
    });

  return (
    <section className="card l-stack">
      {order.mealDetails.length > 1 ? (
        <SegmentedControl
          label="Bữa đang khảo sát"
          options={order.mealDetails.map((item, index) => ({
            value: String(index),
            label: `Bữa ${index + 1} · ${item.date}`,
          }))}
          value={String(mealIndex)}
          onChange={(value) => setMealIndex(Number(value))}
        />
      ) : null}
      <div className="l-between">
        <h3 className="card-title card-title-flush">
          Bữa {mealIndex + 1}: {meal.address}
        </h3>
        {order.mealDetails.length > 1 ? (
          <Button
            size="sm"
            onClick={() =>
              showToast(
                `Đã chép câu trả lời sang bữa ${nextIndex + 1} để sửa tiếp`
              )
            }
          >
            Chép sang bữa {nextIndex + 1}
          </Button>
        ) : null}
      </div>
      <div key={key} className="l-grid l-grid-3">
        {SURVEY_QUESTIONS.map(([question, answer], index) => (
          <TextField
            key={question}
            id={`survey-${index}`}
            label={question}
            defaultValue={answer}
          />
        ))}
      </div>
      <div key={`${key}-plan`} className="l-grid l-grid-4 is-loose">
        <Field
          id="survey-km"
          label="Khoảng cách (km)"
          error={
            outOfRange ? `Ngoài phạm vi ${SERVICE_RADIUS_KM} km` : undefined
          }
          hint={`Tối đa ${SERVICE_RADIUS_KM} km, tra thủ công`}
        >
          <input
            id="survey-km"
            type="number"
            step={0.5}
            className={outOfRange ? "input has-error" : "input"}
            value={km ?? ""}
            placeholder="Chưa khảo sát"
            onChange={(event) => saveDistance(Number(event.target.value))}
          />
        </Field>
        <TextField
          id="survey-tool-from"
          label="Dụng cụ từ"
          defaultValue={`${day} 06:00`}
        />
        <TextField
          id="survey-tool-to"
          label="Dụng cụ đến"
          defaultValue={`${day} 17:00`}
        />
        <TextField id="survey-surcharge" label="Phụ thu (đ)" defaultValue="0" />
        <TextField
          id="survey-work-from"
          label="Giờ làm từ"
          defaultValue={`${day} 07:00`}
        />
        <TextField
          id="survey-work-to"
          label="Giờ làm đến"
          defaultValue={`${day} 15:30`}
        />
        <TextField
          id="survey-servers"
          label="Phục vụ (gợi ý)"
          defaultValue={servingStaffNeeded(meal.setupTables)}
        />
        <TextField
          id="survey-kitchen"
          label="Bếp, vận chuyển"
          defaultValue="3, 2"
        />
      </div>
      <TextareaField
        key={`${key}-note`}
        id="survey-note"
        label="Ghi chú hiện trạng"
        defaultValue="Trời mưa cần che rạp sân sau."
      />
      <div className="l-row justify-end">
        <Button
          variant="primary"
          disabled={km === undefined}
          onClick={() => showToast(`Đã lưu khảo sát bữa ${mealIndex + 1}`)}
        >
          Lưu khảo sát
        </Button>
      </div>
    </section>
  );
}

export function SiteSurveyForm({ code }: { code: string }) {
  const order = useWorkspaceOrder(code);
  return order && order.mealDetails.length ? (
    <SurveyForMeal order={order} />
  ) : null;
}
