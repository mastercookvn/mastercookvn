"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { SelectField } from "@/components/ui/SelectField";
import { formatWeekdayDate } from "@/lib/format";
import {
  LUNAR_MONTHS,
  daysInLunarMonth,
  leapMonthOf,
  lunarMonthLabel,
  lunarToSolar,
} from "@/lib/lunar";

/** Families give the anniversary as a lunar date; this finds this year's solar day. */
export function LunarDateFinder({
  year,
  onShow,
}: {
  year: number;
  onShow: (date: Date) => void;
}) {
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(10);
  const [leapPicked, setLeapPicked] = useState(false);

  const hasLeap = leapMonthOf(year) === month;
  const leap = hasLeap && leapPicked;
  const dayCount = daysInLunarMonth(month, year, leap);
  const solar = lunarToSolar(Math.min(day, dayCount), month, year, leap);

  return (
    <section className="lunar-finder" aria-label="Tìm ngày giỗ theo âm lịch">
      <div className="lunar-finder-title">
        <b>Tính ngày giỗ theo âm lịch</b>
        <small>Năm {year}</small>
      </div>
      <SelectField
        id="lunar-day"
        label="Ngày âm"
        options={Array.from({ length: dayCount }, (_, index) =>
          String(index + 1)
        )}
        value={String(Math.min(day, dayCount))}
        onValueChange={(value) => setDay(Number(value))}
      />
      <SelectField
        id="lunar-month"
        label="Tháng âm"
        options={LUNAR_MONTHS.map((value) => ({
          value: String(value),
          label: lunarMonthLabel(value),
        }))}
        value={String(month)}
        onValueChange={(value) => setMonth(Number(value))}
      />
      <CheckboxLabel
        checked={leap}
        disabled={!hasLeap}
        onChange={(event) => setLeapPicked(event.target.checked)}
      >
        Tháng nhuận
      </CheckboxLabel>
      <div className="lunar-finder-result" aria-live="polite">
        <span>Ngày dương</span>
        <b>{solar ? formatWeekdayDate(solar) : "Không có ngày này"}</b>
      </div>
      <Button disabled={!solar} onClick={() => solar && onShow(solar)}>
        Xem tuần đó
      </Button>
    </section>
  );
}
