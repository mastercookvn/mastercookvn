"use client";

import { Button } from "@/components/ui/Button";
import { EventDatePicker } from "@/components/ui/EventDatePicker";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ServingWavesEditor } from "@/components/ui/ServingWavesEditor";
import { TextField } from "@/components/ui/TextField";
import {
  SERVING_FORMAT,
  SERVING_FORMAT_LABEL,
  TRAY_WINDOW_MINUTES,
  type ServingFormat,
} from "@/constants/booking";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { fromMinutes, nextWave, toMinutes } from "@/lib/servingWaves";
import type { EstimateMeal } from "@/mocks/demoStore";

import { BookingMealCard } from "../flow/BookingMealCard";

import { TrayFields } from "./TrayFields";

const FORMAT_OPTIONS = Object.values(SERVING_FORMAT).map((value) => ({
  value,
  label: SERVING_FORMAT_LABEL[value],
}));

export function MealInfoCard({
  meal,
  index,
  errors,
  removable,
  onChange,
  onRemove,
}: {
  meal: EstimateMeal;
  index: number;
  errors: string[];
  removable: boolean;
  onChange: (patch: Partial<EstimateMeal>) => void;
  onRemove: () => void;
}) {
  const switchFormat = (format: ServingFormat) => {
    const first = meal.waves[0] ?? nextWave([]);
    onChange({
      format,
      name: format === SERVING_FORMAT.Trays ? "" : meal.name,
      waves: [
        format === SERVING_FORMAT.Trays
          ? {
              ...first,
              to: fromMinutes(toMinutes(first.from) + TRAY_WINDOW_MINUTES),
            }
          : first,
      ],
    });
  };

  return (
    <BookingMealCard
      meal={meal}
      index={index}
      errors={errors}
      showHeader={false}
    >
      <div className="meal-field-group">
        <div className="l-between">
          <h4>Hình thức</h4>
          {removable ? (
            <Button size="sm" variant="text" onClick={onRemove}>
              Bỏ bữa này
            </Button>
          ) : null}
        </div>
        <SegmentedControl
          label="Hình thức tổ chức"
          options={FORMAT_OPTIONS}
          value={meal.format}
          onChange={switchFormat}
        />
        <p className="text-small text-soft">
          {meal.format === SERVING_FORMAT.Trays
            ? "Món nấu sẵn giao tận nơi theo mâm, mỗi mâm là một bàn ăn chuẩn. Đặt từ 1 mâm."
            : "Khách đến theo từng lượt đãi trên cùng số bàn bố trí, ví dụ 9h–11h, 11h–13h."}
        </p>
      </div>

      {meal.format === SERVING_FORMAT.Trays ? (
        <div className="meal-field-group">
          <h4>Giao mâm</h4>
          <TrayFields meal={meal} index={index} onChange={onChange} />
          <TextField
            id={`meal-address-${index}`}
            label="Địa chỉ giao"
            hint={`Giao trong bán kính ${BUSINESS_SETTINGS.serviceRadiusKm} km.`}
            placeholder="Số nhà, đường, quận"
            value={meal.address}
            onChange={(event) => onChange({ address: event.target.value })}
          />
          <EventDatePicker
            id={`meal-date-${index}`}
            value={meal.date}
            onChange={(date) => onChange({ date })}
          />
        </div>
      ) : (
        <>
          <div className="meal-field-group">
            <h4>Tên bữa và địa điểm</h4>
            <div className="l-grid l-grid-2">
              <TextField
                id={`meal-name-${index}`}
                label="Tên bữa"
                placeholder="Ví dụ: Tiệc cưới nhà gái"
                value={meal.name}
                onChange={(event) => onChange({ name: event.target.value })}
              />
              <TextField
                id={`meal-address-${index}`}
                label="Địa chỉ tổ chức"
                hint={`Phục vụ trong bán kính ${BUSINESS_SETTINGS.serviceRadiusKm} km.`}
                placeholder="Số nhà, đường, quận"
                value={meal.address}
                onChange={(event) => onChange({ address: event.target.value })}
              />
            </div>
          </div>

          <div className="meal-field-group">
            <h4>Ngày tổ chức</h4>
            <EventDatePicker
              id={`meal-date-${index}`}
              value={meal.date}
              onChange={(date) => onChange({ date })}
            />
          </div>

          <div className="meal-field-group">
            <h4>Lượt đãi</h4>
            <TextField
              id={`meal-guests-${index}`}
              label="Người mỗi bàn"
              type="number"
              min={10}
              className="max-w-[160px]"
              value={meal.guestsPerTable}
              onChange={(event) =>
                onChange({ guestsPerTable: Number(event.target.value) })
              }
            />
            <ServingWavesEditor
              idPrefix={`meal-${index}`}
              waves={meal.waves}
              guestsPerTable={meal.guestsPerTable}
              onChange={(waves) => onChange({ waves })}
            />
          </div>
        </>
      )}
    </BookingMealCard>
  );
}
