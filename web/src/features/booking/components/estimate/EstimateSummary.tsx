"use client";

import { BowlIcon } from "@/components/icons";
import { NumberTicker } from "@/components/motion/NumberTicker";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { formatMoney } from "@/lib/format";

import {
  MINIMUM_DEPOSIT_RATE,
  type MealEstimate,
} from "@/features/booking/lib/estimate";

export function EstimateSummary({
  estimates,
  onContinue,
}: {
  estimates: MealEstimate[];
  onContinue: () => void;
}) {
  const total = Math.round(
    estimates.reduce((sum, item) => sum + (item.price?.total ?? 0), 0),
  );
  const hasError = estimates.some((item) => item.errors);

  return (
    <aside className="card l-stack sticky-side">
      <div className="l-row flex-nowrap">
        <BowlIcon size={30} />
        <h3 className="text-17 font-semibold">Tổng tạm tính</h3>
      </div>
      {estimates.map((item, index) => (
        <MoneyRow
          key={index}
          label={`Bữa ${index + 1}`}
          value={item.price ? formatMoney(item.price.total) : "Cần sửa"}
        />
      ))}
      <MoneyRow label="Tổng" value={<NumberTicker value={total} />} total />
      <MoneyRow
        label={`Cọc tối thiểu ${MINIMUM_DEPOSIT_RATE * 100}%`}
        value={formatMoney(total * MINIMUM_DEPOSIT_RATE)}
      />
      <Alert tone="wait">
        Đây là số tạm tính, chưa phải cam kết. Giá chỉ chốt khi cơ sở phát hành
        hợp đồng.
      </Alert>
      <Button variant="primary" disabled={hasError} onClick={onContinue}>
        Đặt tiệc với lựa chọn này
      </Button>
    </aside>
  );
}
