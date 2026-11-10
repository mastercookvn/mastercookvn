"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { servingStaffNeeded } from "@/lib/pricing";
import { MEAL_WEDDING as meal } from "@/mocks/contracts";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";
import { SERVICE_RADIUS_KM, SURVEY_QUESTIONS } from "@/mocks/orders";

export function SiteSurveyForm() {
  const km = useDemoState((state) => state.surveyDistanceKm);
  const showToast = useToast();
  const outOfRange = km > SERVICE_RADIUS_KM;

  return (
    <section className="card l-stack">
      <div className="l-between">
        <h3 className="card-title card-title-flush">Bữa 1: {meal.address}</h3>
        <Button
          size="sm"
          onClick={() =>
            showToast("Đã chép câu trả lời sang bữa 2 để sửa tiếp")
          }
        >
          Chép sang bữa 2
        </Button>
      </div>
      <div className="l-grid l-grid-3">
        {SURVEY_QUESTIONS.map(([question, answer], index) => (
          <TextField
            key={question}
            id={`survey-${index}`}
            label={question}
            defaultValue={answer}
          />
        ))}
      </div>
      <div className="l-grid l-grid-4 is-loose">
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
            value={km}
            onChange={(event) =>
              updateDemoState({ surveyDistanceKm: Number(event.target.value) })
            }
          />
        </Field>
        <TextField
          id="survey-tool-from"
          label="Dụng cụ từ"
          defaultValue="14/12 06:00"
        />
        <TextField
          id="survey-tool-to"
          label="Dụng cụ đến"
          defaultValue="14/12 17:00"
        />
        <TextField id="survey-surcharge" label="Phụ thu (đ)" defaultValue="0" />
        <TextField
          id="survey-work-from"
          label="Giờ làm từ"
          defaultValue="14/12 07:00"
        />
        <TextField
          id="survey-work-to"
          label="Giờ làm đến"
          defaultValue="14/12 15:30"
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
        id="survey-note"
        label="Ghi chú hiện trạng"
        defaultValue="Trời mưa cần che rạp sân sau."
      />
      <div className="l-row justify-end">
        <Button
          variant="primary"
          onClick={() => showToast("Đã lưu khảo sát bữa 1")}
        >
          Lưu khảo sát
        </Button>
      </div>
    </section>
  );
}
