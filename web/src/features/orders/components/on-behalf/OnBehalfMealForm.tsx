"use client";

import { useFormContext } from "react-hook-form";

import { DishPicker } from "@/components/ui/DishPicker";
import { EventDatePicker } from "@/components/ui/EventDatePicker";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SelectField } from "@/components/ui/SelectField";
import { ServicePicker } from "@/components/ui/ServicePicker";
import { ServingWavesEditor } from "@/components/ui/ServingWavesEditor";
import { TextField } from "@/components/ui/TextField";
import {
  MENU_MODE,
  MENU_MODE_LABEL,
  SERVING_FORMAT,
  SERVING_FORMAT_LABEL,
} from "@/constants/booking";
import { useDemoState, type EstimateMeal } from "@/lib/demoStore";

import { TrayFields } from "@/features/booking/components/event/TrayFields";
import { MenuSetSelect } from "@/features/booking/components/menu/MenuSetSelect";
import { mealMenuErrors } from "@/features/booking/lib/estimate";
import { withServingFormat } from "@/features/booking/lib/mealForm";

import type { OnBehalfFields } from "./onBehalfSchema";

const FORMAT_OPTIONS = Object.values(SERVING_FORMAT).map((value) => ({
  value,
  label: SERVING_FORMAT_LABEL[value],
}));

const MENU_MODE_OPTIONS = Object.values(MENU_MODE).map((value) => ({
  value,
  label: MENU_MODE_LABEL[value],
}));

const MEAL_INDEX = 0;

/** Same choices as the customer booking: served waves or trays, set or custom menu. */
export function OnBehalfMealForm({
  meal,
  onChange,
}: {
  meal: EstimateMeal;
  onChange: (patch: Partial<EstimateMeal>) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnBehalfFields>();
  const allDishes = useDemoState((state) => state.dishes);
  const menuSets = useDemoState((state) => state.menuSets);
  const eventTypes = useDemoState((state) => state.eventTypes);
  const services = useDemoState((state) => state.services);
  const menuErrors = mealMenuErrors(meal, {
    dishes: allDishes,
    menuSets,
    services,
  });
  const isTrays = meal.format === SERVING_FORMAT.Trays;

  return (
    <section className="card l-stack gap-5">
      <h3 className="card-title card-title-flush">Bữa 1</h3>

      <fieldset className="form-section">
        <legend>Hình thức</legend>
        <SegmentedControl
          label="Hình thức tổ chức"
          options={FORMAT_OPTIONS}
          value={meal.format}
          onChange={(format) => onChange(withServingFormat(meal, format))}
        />
        <div className="l-grid l-grid-2">
          <SelectField
            id="behalf-event"
            label="Loại tiệc"
            options={eventTypes}
          />
          {isTrays ? null : (
            <TextField
              id="behalf-meal-name"
              label="Tên bữa"
              placeholder="Ví dụ: Tiệc cưới nhà gái"
              value={meal.name}
              onChange={(event) => onChange({ name: event.target.value })}
            />
          )}
        </div>
        <TextField
          id="behalf-address"
          label={isTrays ? "Địa chỉ giao" : "Địa chỉ tổ chức"}
          placeholder="Số nhà, đường, phường/quận"
          {...register("address", {
            onChange: (event) => onChange({ address: event.target.value }),
          })}
          error={errors.address?.message}
        />
      </fieldset>

      <fieldset className="form-section">
        <legend>{isTrays ? "Ngày giao" : "Ngày tổ chức"}</legend>
        <EventDatePicker
          id="behalf-date"
          value={meal.date}
          onChange={(date) => onChange({ date })}
        />
      </fieldset>

      <fieldset className="form-section">
        <legend>{isTrays ? "Giao mâm" : "Lượt đãi"}</legend>
        {isTrays ? (
          <TrayFields meal={meal} index={MEAL_INDEX} onChange={onChange} />
        ) : (
          <>
            <TextField
              id="behalf-guests"
              label="Người mỗi bàn"
              type="number"
              inputMode="numeric"
              min={10}
              className="max-w-[160px]"
              value={meal.guestsPerTable}
              onChange={(event) =>
                onChange({ guestsPerTable: Number(event.target.value) })
              }
            />
            <ServingWavesEditor
              idPrefix="behalf"
              waves={meal.waves}
              guestsPerTable={meal.guestsPerTable}
              onChange={(waves) => onChange({ waves })}
            />
          </>
        )}
      </fieldset>

      <fieldset className="form-section">
        <legend>Thực đơn</legend>
        <SegmentedControl
          label="Cách chọn thực đơn"
          options={MENU_MODE_OPTIONS}
          value={meal.mode}
          onChange={(mode) => onChange({ mode })}
        />
        {meal.mode === MENU_MODE.Set ? (
          <MenuSetSelect
            id="behalf-set"
            value={meal.setId}
            onChange={(setId) => onChange({ setId })}
          />
        ) : (
          <DishPicker
            dishes={allDishes.filter((dish) => dish.active)}
            selectedIds={meal.dishIds}
            onChange={(dishIds) => onChange({ dishIds })}
            label="Tìm món để thêm vào thực đơn"
            emptyText="Chưa chọn món nào, gõ tên món để tìm. Cần ít nhất 6 món."
          />
        )}
        {menuErrors.map((error) => (
          <p key={error} className="field-error" role="status">
            {error}
          </p>
        ))}
      </fieldset>

      <fieldset className="form-section">
        <legend>Dịch vụ</legend>
        <ServicePicker
          selected={meal.serviceIds}
          onChange={(serviceIds) => onChange({ serviceIds })}
        />
      </fieldset>
    </section>
  );
}
