"use client";

import { Button } from "@/components/ui/Button";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { BOOKING_STEP, type BookingStep } from "@/constants/booking";
import type { BookingContact, EstimateMeal } from "@/mocks/demoStore";

import type { MealEstimate } from "@/features/booking/lib/estimate";

import { EstimateMealSummary } from "./EstimateMealSummary";

export function OrderReview({
  meals,
  estimates,
  contact,
  onEdit,
}: {
  meals: EstimateMeal[];
  estimates: MealEstimate[];
  contact: BookingContact;
  onEdit: (step: BookingStep) => void;
}) {
  return (
    <>
      <section className="card meal-summary">
        <header className="l-between">
          <h3 className="meal-summary-title">Người đặt</h3>
          <Button
            size="sm"
            variant="text"
            onClick={() => onEdit(BOOKING_STEP.Contact)}
          >
            Sửa
          </Button>
        </header>
        <dl className="meal-summary-facts">
          <div>
            <dt>Họ tên</dt>
            <dd>{contact.name}</dd>
          </div>
          <div>
            <dt>Điện thoại</dt>
            <dd>{contact.phone}</dd>
          </div>
          {contact.note.trim() ? (
            <div>
              <dt>Ghi chú</dt>
              <dd>{contact.note}</dd>
            </div>
          ) : null}
        </dl>
      </section>
      {meals.map((meal, index) => {
        const price = estimates[index].price;
        return (
          <div key={index} className="l-stack gap-2">
            <EstimateMealSummary
              meal={meal}
              index={index}
              aside={
                <Button
                  size="sm"
                  variant="text"
                  onClick={() => onEdit(BOOKING_STEP.Event)}
                >
                  Sửa
                </Button>
              }
            />
            {price ? (
              <div className="card">
                <div className="max-w-[420px]">
                  <MealPriceBreakdown price={price} />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
