"use client";

import { WarningIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { DEFAULT_DISH_IDS, type EstimateMeal } from "@/mocks/demoStore";

import type { MealEstimate } from "@/features/booking/lib/estimate";

import { DishPicker } from "./DishPicker";
import { MealSizeFields } from "./MealSizeFields";
import { MenuModeSwitch } from "./MenuModeSwitch";
import { MenuSetSelect } from "./MenuSetSelect";
import { ServicePicker } from "./ServicePicker";

export function MealCard({
  meal,
  index,
  estimate,
  removable,
  onChange,
  onRemove,
}: {
  meal: EstimateMeal;
  index: number;
  estimate: MealEstimate;
  removable: boolean;
  onChange: (patch: Partial<EstimateMeal>) => void;
  onRemove: () => void;
}) {
  return (
    <section className="card l-stack">
      <div className="l-between">
        <h3 className="text-17 font-semibold">Bữa {index + 1}</h3>
        {removable ? (
          <Button size="sm" onClick={onRemove}>
            Bỏ bữa này
          </Button>
        ) : null}
      </div>
      <MealSizeFields meal={meal} index={index} onChange={onChange} />
      <MenuModeSwitch
        mode={meal.mode}
        onChange={(mode) =>
          onChange({
            mode,
            dishIds:
              mode === "custom" && !meal.dishIds.length
                ? DEFAULT_DISH_IDS
                : meal.dishIds,
          })
        }
      />
      {meal.mode === "set" ? (
        <MenuSetSelect
          id={`estimate-set-${index}`}
          value={meal.setId}
          onChange={(setId) => onChange({ setId })}
        />
      ) : (
        <DishPicker
          selected={meal.dishIds}
          onChange={(dishIds) => onChange({ dishIds })}
        />
      )}
      <ServicePicker
        selected={meal.serviceIds}
        onChange={(serviceIds) => onChange({ serviceIds })}
      />
      {estimate.errors ? (
        <Alert tone="error">
          <WarningIcon size={18} />
          <span>{estimate.errors.join(" ")}</span>
        </Alert>
      ) : (
        <>
          <div className="w-full max-w-[420px]">
            <MealPriceBreakdown price={estimate.price} />
          </div>
          {estimate.isHoliday ? (
            <Alert tone="wait">
              Ngày này có phụ thu lễ theo danh sách cố định (mức minh họa 5%
              tiền món).
            </Alert>
          ) : null}
        </>
      )}
    </section>
  );
}
