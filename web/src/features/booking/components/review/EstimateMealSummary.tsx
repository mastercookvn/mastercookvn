"use client";

import type { ReactNode } from "react";

import { formatWeekdayDate, parseDayMonthYear } from "@/lib/format";
import { formatLunarLong, solarToLunar } from "@/lib/lunar";
import { describeWaves } from "@/lib/servingWaves";
import { menuSetById, serviceById } from "@/mocks/catalog";
import { useDemoState, type EstimateMeal } from "@/mocks/demoStore";

export function EstimateMealSummary({
  meal,
  index,
  aside,
}: {
  meal: EstimateMeal;
  index: number;
  aside?: ReactNode;
}) {
  const dishes = useDemoState((state) => state.dishes);
  const date = parseDayMonthYear(meal.date);
  const menu =
    meal.mode === "set"
      ? `Set ${menuSetById(meal.setId).name}`
      : `Tự chọn ${meal.dishIds.length} món: ${dishes
          .filter((dish) => meal.dishIds.includes(dish.id))
          .map((dish) => dish.name)
          .join(", ")}`;

  return (
    <section className="card meal-summary">
      <header className="l-between">
        <div>
          <span className="eyebrow">Bữa {index + 1}</span>
          <h3 className="meal-summary-title">
            {meal.name.trim() || "Chưa đặt tên bữa"}
          </h3>
        </div>
        {aside}
      </header>
      <dl className="meal-summary-facts">
        <div>
          <dt>Ngày</dt>
          <dd>
            {date ? formatWeekdayDate(date) : meal.date}
            {date ? (
              <small>Âm lịch: {formatLunarLong(solarToLunar(date))}</small>
            ) : null}
          </dd>
        </div>
        <div>
          <dt>Địa chỉ</dt>
          <dd>{meal.address.trim() || "Chưa nhập"}</dd>
        </div>
        <div>
          <dt>Lượt đãi</dt>
          <dd>
            {meal.waves
              .map((wave) => `${wave.from}–${wave.to} (${wave.tables} bàn)`)
              .join(", ")}
            <small>{describeWaves(meal.waves, meal.guestsPerTable)}</small>
          </dd>
        </div>
        <div>
          <dt>Thực đơn</dt>
          <dd>{menu}</dd>
        </div>
        <div>
          <dt>Dịch vụ</dt>
          <dd>
            {meal.serviceIds.length
              ? meal.serviceIds.map((id) => serviceById(id).name).join(", ")
              : "Không"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
