"use client";

import { Field } from "@/components/ui/Field";
import type { EstimateMeal } from "@/mocks/demoStore";

import { LunarDatePicker } from "./LunarDatePicker";

type NumericKey = "servingTables" | "guestsPerTable" | "setupTables";

const FIELDS: { key: NumericKey; label: string; min: number }[] = [
  { key: "servingTables", label: "Số bàn ăn", min: 1 },
  { key: "guestsPerTable", label: "Người mỗi bàn", min: 10 },
  { key: "setupTables", label: "Bàn bố trí cùng lúc", min: 1 },
];

export function MealSizeFields({
  meal,
  index,
  onChange,
}: {
  meal: EstimateMeal;
  index: number;
  onChange: (patch: Partial<EstimateMeal>) => void;
}) {
  return (
    <div className="l-grid l-grid-4">
      <LunarDatePicker
        id={`estimate-date-${index}`}
        value={meal.date}
        onChange={(date) => onChange({ date })}
      />
      {FIELDS.map(({ key, label, min }) => {
        const id = `estimate-${key}-${index}`;
        return (
          <Field key={key} id={id} label={label}>
            <input
              id={id}
              type="number"
              min={min}
              className="input"
              value={meal[key]}
              onChange={(event) =>
                onChange({ [key]: Number(event.target.value) })
              }
            />
          </Field>
        );
      })}
    </div>
  );
}
