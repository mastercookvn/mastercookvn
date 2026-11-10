"use client";

import { formatMoney } from "@/lib/format";

export function DepositSlider({
  percent,
  amount,
  minimumDeposit,
  onChange,
}: {
  percent: number;
  amount: number;
  minimumDeposit: number;
  onChange: (percent: number) => void;
}) {
  return (
    <>
      <div>
        <label htmlFor="deposit-percent" className="text-small">
          Tỷ lệ cọc: <b>{percent}%</b>
        </label>
        <input
          id="deposit-percent"
          type="range"
          className="range"
          min={50}
          max={100}
          step={5}
          value={percent}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
      <div className="amount-lg">{formatMoney(amount)}</div>
      <p className="text-small text-soft">
        Mức bắt buộc 50% là {formatMoney(minimumDeposit)}. Phần vượt được ghi là
        trả trước và hoàn đủ nếu hủy bữa.
      </p>
    </>
  );
}
