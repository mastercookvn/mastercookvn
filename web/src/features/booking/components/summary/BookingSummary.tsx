"use client";

import type { ReactNode } from "react";

import { NumberTicker } from "@/components/motion/NumberTicker";
import { Alert } from "@/components/ui/Alert";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import type { EstimateMeal } from "@/mocks/demoStore";

import { mealTitle } from "@/features/booking/lib/mealTitle";

import {
  MINIMUM_DEPOSIT_RATE,
  type MealEstimate,
} from "@/features/booking/lib/estimate";

export function BookingSummary({
  meals,
  estimates,
  problems,
  children,
}: {
  meals: EstimateMeal[];
  estimates: MealEstimate[];
  problems: string[];
  children: ReactNode;
}) {
  const total = Math.round(
    estimates.reduce((sum, item) => sum + (item.price?.total ?? 0), 0)
  );

  return (
    <aside className="card l-stack sticky-side">
      <h3 className="card-title card-title-flush">Tạm tính</h3>
      {estimates.map((item, index) => (
        <MoneyRow
          key={index}
          label={mealTitle(meals[index], `Bữa ${index + 1}`)}
          value={
            item.price ? formatMoney(item.price.total) : "Chưa đủ thông tin"
          }
        />
      ))}
      <MoneyRow label="Tổng" value={<NumberTicker value={total} />} total />
      <MoneyRow
        label={`Cọc tối thiểu ${MINIMUM_DEPOSIT_RATE * 100}%`}
        value={formatMoney(total * MINIMUM_DEPOSIT_RATE)}
      />
      <p className="text-small text-soft">
        Số tạm tính, chưa phải cam kết. Giá chỉ chốt khi cơ sở phát hành hợp
        đồng.
      </p>
      {problems.length ? (
        <Alert tone="error">
          <ul className="l-stack gap-1">
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </Alert>
      ) : null}
      {children}
    </aside>
  );
}
