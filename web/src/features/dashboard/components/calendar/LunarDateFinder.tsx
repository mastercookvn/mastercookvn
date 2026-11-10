"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { SelectField } from "@/components/ui/SelectField";
import { LUNAR_MONTH_NAMES, lunarToSolar } from "@/lib/lunar";

const LUNAR_DAYS = Array.from({ length: 30 }, (_, index) => String(index + 1));

const WEEKDAY_NAMES = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

const formatSolar = (date: Date) =>
  `${WEEKDAY_NAMES[date.getDay()]}, ${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

/** Families give the anniversary as a lunar date; this finds this year's solar day. */
export function LunarDateFinder({
  year,
  onShow,
}: {
  year: number;
  onShow: (date: Date) => void;
}) {
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("10");
  const [leap, setLeap] = useState(false);

  const solar = lunarToSolar(Number(day), Number(month), year, leap);

  return (
    <section className="lunar-finder" aria-label="Tìm ngày giỗ theo âm lịch">
      <div className="lunar-finder-title">
        <b>Tính ngày giỗ theo âm lịch</b>
        <small>Nhập ngày âm khách báo, xem ngày dương năm {year}.</small>
      </div>
      <SelectField
        id="lunar-day"
        label="Ngày âm"
        options={LUNAR_DAYS}
        value={day}
        onValueChange={setDay}
      />
      <SelectField
        id="lunar-month"
        label="Tháng âm"
        options={LUNAR_MONTH_NAMES.map((name, index) => ({
          value: String(index + 1),
          label: `Tháng ${name}`,
        }))}
        value={month}
        onValueChange={setMonth}
      />
      <CheckboxLabel
        checked={leap}
        onChange={(event) => setLeap(event.target.checked)}
      >
        Tháng nhuận
      </CheckboxLabel>
      <div className="lunar-finder-result" aria-live="polite">
        {solar ? (
          <>
            <span>Ngày dương</span>
            <b>{formatSolar(solar)}</b>
          </>
        ) : (
          <span>
            {leap
              ? `Năm ${year} không có tháng ${month} nhuận.`
              : "Tháng âm này không có ngày 30."}
          </span>
        )}
      </div>
      <Button disabled={!solar} onClick={() => solar && onShow(solar)}>
        Xem tuần đó
      </Button>
    </section>
  );
}
