"use client";

import type { ReactNode } from "react";

import { WarningIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { DishPicker } from "@/components/ui/DishPicker";
import { EventDatePicker } from "@/components/ui/EventDatePicker";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { ServingWavesEditor } from "@/components/ui/ServingWavesEditor";
import { TextField } from "@/components/ui/TextField";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { waveSpan } from "@/lib/servingWaves";
import {
  DEFAULT_DISH_IDS,
  useDemoState,
  type EstimateMeal,
} from "@/mocks/demoStore";

import type { MealEstimate } from "@/features/booking/lib/estimate";

import { MenuModeSwitch } from "./MenuModeSwitch";
import { MenuSetSelect } from "./MenuSetSelect";
import { ServicePicker } from "./ServicePicker";

function MealSection({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="meal-section">
      <div className="meal-section-head">
        <span className="meal-section-number">{number}</span>
        <div>
          <h4>{title}</h4>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      <div className="meal-section-body">{children}</div>
    </div>
  );
}

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
  const dishes = useDemoState((state) => state.dishes).filter(
    (dish) => dish.active
  );

  return (
    <section className="card meal-card">
      <header className="meal-card-head">
        <div>
          <span className="eyebrow">Bữa {index + 1}</span>
          <h3>{meal.name.trim() || "Chưa đặt tên bữa"}</h3>
          <p>
            {meal.date} · {waveSpan(meal.waves)}
          </p>
        </div>
        {removable ? (
          <Button size="sm" variant="text" onClick={onRemove}>
            Bỏ bữa này
          </Button>
        ) : null}
      </header>

      <MealSection number={1} title="Tên bữa và địa điểm">
        <div className="l-grid l-grid-2">
          <TextField
            id={`estimate-name-${index}`}
            label="Tên bữa"
            placeholder="Ví dụ: Tiệc cưới nhà gái"
            value={meal.name}
            onChange={(event) => onChange({ name: event.target.value })}
          />
          <TextField
            id={`estimate-address-${index}`}
            label="Địa chỉ tổ chức"
            hint={`Phục vụ trong bán kính ${BUSINESS_SETTINGS.serviceRadiusKm} km.`}
            placeholder="Số nhà, đường, quận"
            value={meal.address}
            onChange={(event) => onChange({ address: event.target.value })}
          />
        </div>
      </MealSection>

      <MealSection
        number={2}
        title="Ngày tổ chức"
        description="Chọn trên lịch dương, hoặc nhập ngày âm để xem ngày dương tương ứng."
      >
        <EventDatePicker
          id={`estimate-date-${index}`}
          value={meal.date}
          onChange={(date) => onChange({ date })}
        />
      </MealSection>

      <MealSection
        number={3}
        title="Lượt đãi"
        description="Khách không đến cùng lúc. Chia bữa thành các lượt trên cùng số bàn bố trí, ví dụ 9h–11h, 11h–13h."
      >
        <TextField
          id={`estimate-guests-${index}`}
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
          idPrefix={`estimate-${index}`}
          waves={meal.waves}
          guestsPerTable={meal.guestsPerTable}
          onChange={(waves) => onChange({ waves })}
        />
      </MealSection>

      <MealSection
        number={4}
        title="Thực đơn"
        description="Mỗi bữa dùng một set có sẵn hoặc tự chọn từ 6 món."
      >
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
            dishes={dishes}
            selectedIds={meal.dishIds}
            onChange={(dishIds) => onChange({ dishIds })}
            label="Tìm món để thêm vào thực đơn"
            emptyText="Chưa chọn món nào, gõ tên món để tìm."
          />
        )}
      </MealSection>

      <MealSection number={5} title="Dịch vụ đi kèm">
        <ServicePicker
          selected={meal.serviceIds}
          onChange={(serviceIds) => onChange({ serviceIds })}
        />
      </MealSection>

      <footer className="meal-card-foot">
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
      </footer>
    </section>
  );
}
