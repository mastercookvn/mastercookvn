"use client";

import { CalendarIcon, PinIcon } from "@/components/icons";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MealStatus } from "@/constants/statuses";
import type { Meal } from "@/mocks/contracts";

export function MealSummaryCard({
  meal,
  index,
  status,
}: {
  meal: Meal;
  index: number;
  status: MealStatus;
}) {
  return (
    <section className="card l-stack">
      <div className="l-between">
        <h3 className="card-title card-title-flush">
          Bữa {index + 1}: {meal.name}
        </h3>
        <StatusBadge domain="meal" status={status} />
      </div>
      <p className="text-small text-soft">
        <CalendarIcon size={16} /> {meal.date}, {meal.time} &nbsp;{" "}
        <PinIcon size={16} /> {meal.address}
        <br />
        {meal.servingTables} bàn ăn, {meal.guestsPerTable} người mỗi bàn,{" "}
        {meal.setupTables} bàn bố trí
      </p>
      <p className="text-small">
        <b>{meal.setName}:</b> {meal.dishNames.join(", ")}
      </p>
      <p className="text-small">
        <b>Dịch vụ:</b>{" "}
        {meal.services.map((service) => service.name).join(", ")}
      </p>
      <div className="max-w-[420px]">
        <MealPriceBreakdown price={meal.price} />
      </div>
    </section>
  );
}
