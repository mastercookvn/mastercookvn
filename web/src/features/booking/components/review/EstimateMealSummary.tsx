"use client";

import type { ReactNode } from "react";

import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import { formatWeekdayDate, parseDayMonthYear } from "@/lib/format";
import { formatLunarLong, solarToLunar } from "@/lib/lunar";
import { describeWaves } from "@/lib/servingWaves";
import { useDemoState, type EstimateMeal } from "@/mocks/demoStore";

import { mealTitle } from "@/features/booking/lib/mealTitle";

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
  const services = useDemoState((state) => state.services);
  const menuSets = useDemoState((state) => state.menuSets);
  const date = parseDayMonthYear(meal.date);
  const menu =
    meal.mode === MENU_MODE.Set
      ? (menuSets.find((set) => set.id === meal.setId)?.name ?? "Chưa chọn set")
      : `Tự chọn ${meal.dishIds.length} món: ${dishes
          .filter((dish) => meal.dishIds.includes(dish.id))
          .map((dish) => dish.name)
          .join(", ")}`;
  const chosenServices = services.filter((service) =>
    meal.serviceIds.includes(service.id)
  );

  return (
    <section className="card meal-summary">
      <header className="l-between">
        <div>
          <h3 className="meal-summary-title">
            {mealTitle(meal, `Bữa ${index + 1}`)}
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
        {meal.format === SERVING_FORMAT.Trays ? (
          <div>
            <dt>Đặt mâm</dt>
            <dd>
              {meal.waves[0].tables} mâm, giao lúc {meal.waves[0].from}
              <small>{meal.guestsPerTable} người mỗi mâm</small>
            </dd>
          </div>
        ) : (
          <div>
            <dt>Lượt đãi</dt>
            <dd>
              {meal.waves
                .map((wave) => `${wave.from}–${wave.to} (${wave.tables} bàn)`)
                .join(", ")}
              <small>{describeWaves(meal.waves, meal.guestsPerTable)}</small>
            </dd>
          </div>
        )}
        <div>
          <dt>Thực đơn</dt>
          <dd>{menu}</dd>
        </div>
        <div>
          <dt>Dịch vụ</dt>
          <dd>
            {chosenServices.length
              ? chosenServices.map((service) => service.name).join(", ")
              : "Không"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
