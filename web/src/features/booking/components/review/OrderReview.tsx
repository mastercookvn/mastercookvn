"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { DEMO_TODAY } from "@/constants/settings";
import { formatDayMonthYear, formatMoney } from "@/lib/format";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

import {
  MINIMUM_DEPOSIT_RATE,
  estimateMeal,
} from "@/features/booking/lib/estimate";

import { EstimateMealSummary } from "./EstimateMealSummary";

const FIRST_ONLINE_ORDER = 143;

export function OrderReview({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const meals = useDemoState((state) => state.estimate);
  const dishes = useDemoState((state) => state.dishes);
  const estimates = meals.map((meal) => estimateMeal(meal, dishes));
  const total = estimates.reduce(
    (sum, estimate) => sum + (estimate.price?.total ?? 0),
    0
  );
  const hasError = estimates.some((estimate) => estimate.errors);

  const submit = () => {
    const { submittedOrders, bookingEventType } = readDemoState();
    // Placeholder for POST /orders, which assigns the real code.
    const code = `DH-${String(FIRST_ONLINE_ORDER + submittedOrders.length).padStart(4, "0")}`;
    updateDemoState({
      submittedOrders: [
        {
          code,
          submittedAt: formatDayMonthYear(DEMO_TODAY),
          eventType: bookingEventType,
          meals,
          total,
        },
        ...submittedOrders,
      ],
    });
    onSubmit();
  };

  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack gap-4">
        {meals.map((meal, index) => {
          const estimate = estimates[index];
          return (
            <div key={index} className="l-stack gap-2">
              <EstimateMealSummary meal={meal} index={index} />
              <div className="card">
                {estimate.price ? (
                  <div className="max-w-[420px]">
                    <MealPriceBreakdown price={estimate.price} />
                  </div>
                ) : (
                  <Alert tone="error">{estimate.errors.join(" ")}</Alert>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <aside className="card l-stack sticky-side">
        <h3 className="card-title card-title-flush">Tổng đơn</h3>
        {estimates.map((estimate, index) => (
          <MoneyRow
            key={index}
            label={meals[index].name.trim() || `Bữa ${index + 1}`}
            value={
              estimate.price ? formatMoney(estimate.price.total) : "Cần sửa"
            }
          />
        ))}
        <MoneyRow label="Tổng" value={formatMoney(total)} total />
        <MoneyRow
          label={`Cọc tối thiểu ${MINIMUM_DEPOSIT_RATE * 100}%`}
          value={formatMoney(total * MINIMUM_DEPOSIT_RATE)}
        />
        <Alert tone="wait">
          Gửi đơn chưa giữ chỗ. Tư vấn sẽ gọi khảo sát rồi xác nhận nhận tiệc.
        </Alert>
        <Button variant="primary" disabled={hasError} onClick={submit}>
          Gửi đơn
        </Button>
        <Button onClick={onBack}>Sửa lại</Button>
      </aside>
    </div>
  );
}
