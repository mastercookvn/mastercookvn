"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MealPriceBreakdown } from "@/components/ui/MealPriceBreakdown";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING } from "@/mocks/contracts";

export function OrderReview({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="l-grid l-grid-main">
      <div className="l-stack">
        {CONTRACT_WEDDING.meals.map((meal, index) => (
          <section key={meal.name} className="card l-stack">
            <h3 className="card-title card-title-flush">
              Bữa {index + 1}: {meal.name}
            </h3>
            <p className="text-small text-soft">
              {meal.date}, {meal.time} · {meal.address}
              <br />
              {meal.servingTables} bàn ăn, {meal.guestsPerTable} người mỗi bàn,{" "}
              {meal.setupTables} bàn bố trí · {meal.setName}
            </p>
            <div className="max-w-[420px]">
              <MealPriceBreakdown price={meal.price} />
            </div>
          </section>
        ))}
      </div>
      <aside className="card l-stack sticky-side">
        <h3 className="card-title card-title-flush">Tổng đơn</h3>
        <MoneyRow
          label="Tổng"
          value={formatMoney(CONTRACT_WEDDING.total)}
          total
        />
        <Alert tone="wait">
          Gửi đơn chưa giữ chỗ. Tư vấn sẽ gọi khảo sát rồi xác nhận nhận tiệc.
        </Alert>
        <Button variant="primary" onClick={onSubmit}>
          Gửi đơn
        </Button>
        <Button onClick={onBack}>Sửa lại</Button>
      </aside>
    </div>
  );
}
