"use client";

import { Field } from "@/components/ui/Field";
import { TextField } from "@/components/ui/TextField";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { TRAY_WINDOW_MINUTES } from "@/constants/booking";
import { fromMinutes, toMinutes } from "@/lib/servingWaves";
import type { EstimateMeal } from "@/mocks/demoStore";

export function TrayFields({
  meal,
  index,
  onChange,
}: {
  meal: EstimateMeal;
  index: number;
  onChange: (patch: Partial<EstimateMeal>) => void;
}) {
  const [tray] = meal.waves;

  return (
    <div className="l-grid l-grid-3">
      <TextField
        id={`tray-count-${index}`}
        label="Số mâm"
        type="number"
        inputMode="numeric"
        min={1}
        hint="Đặt từ 1 mâm."
        value={tray.tables}
        onChange={(event) =>
          onChange({
            waves: [{ ...tray, tables: Number(event.target.value) }],
          })
        }
      />
      <TextField
        id={`tray-guests-${index}`}
        label="Người mỗi mâm"
        type="number"
        min={10}
        value={meal.guestsPerTable}
        onChange={(event) =>
          onChange({ guestsPerTable: Number(event.target.value) })
        }
      />
      <Field id={`tray-time-${index}`} label="Giờ giao mâm">
        <TimeSelect
          id={`tray-time-${index}`}
          value={tray.from}
          onChange={(from) =>
            onChange({
              waves: [
                {
                  ...tray,
                  from,
                  to: fromMinutes(toMinutes(from) + TRAY_WINDOW_MINUTES),
                },
              ],
            })
          }
        />
      </Field>
    </div>
  );
}
