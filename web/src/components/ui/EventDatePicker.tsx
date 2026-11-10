"use client";

import { useState } from "react";

import { ChevronIcon } from "@/components/icons";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { Select } from "@/components/ui/Select";
import { DEMO_TODAY } from "@/constants/settings";
import {
  formatDayMonthYear,
  formatWeekdayDate,
  parseDayMonthYear,
} from "@/lib/format";
import {
  LUNAR_MONTH_NAMES,
  formatLunarLong,
  lunarToSolar,
  solarToLunar,
} from "@/lib/lunar";
import { cn } from "@/lib/utils";

const CALENDAR_MODE = {
  Solar: "solar",
  Lunar: "lunar",
} as const;

type CalendarMode = (typeof CALENDAR_MODE)[keyof typeof CALENDAR_MODE];

const WEEKDAY_HEADERS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const LUNAR_DAY_OPTIONS = Array.from({ length: 30 }, (_, index) => ({
  value: String(index + 1),
  label: `Ngày ${index + 1}`,
}));

const LUNAR_MONTH_OPTIONS = LUNAR_MONTH_NAMES.map((name, index) => ({
  value: String(index + 1),
  label: `Tháng ${name}`,
}));

const sameDay = (a: Date | null, b: Date) =>
  a !== null &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** Monday-first grid of the month, padded with the neighbouring days. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from(
    { length: 42 },
    (_, index) => new Date(year, month, index - offset + 1)
  );
}

/**
 * Event date with the month laid out. Families often give a lunar date (đám
 * giỗ, ngày lành), so it can be entered in lunar; the stored value is solar.
 */
export function EventDatePicker({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = parseDayMonthYear(value);
  const today = DEMO_TODAY;
  const anchor = selected ?? today;

  const [mode, setMode] = useState<CalendarMode>(CALENDAR_MODE.Solar);
  const [view, setView] = useState({
    year: anchor.getFullYear(),
    month: anchor.getMonth(),
  });

  const selectedLunar = selected ? solarToLunar(selected) : null;
  const [lunarError, setLunarError] = useState<string | null>(null);

  const pick = (date: Date) => {
    onChange(formatDayMonthYear(date));
    setView({ year: date.getFullYear(), month: date.getMonth() });
    setLunarError(null);
  };

  const pickLunar = (
    day: number,
    month: number,
    year: number,
    leap: boolean
  ) => {
    const solar = lunarToSolar(day, month, year, leap);
    if (!solar) {
      setLunarError(
        leap
          ? `Năm âm ${year} không có tháng ${LUNAR_MONTH_NAMES[month - 1]} nhuận.`
          : `Tháng ${LUNAR_MONTH_NAMES[month - 1]} năm âm ${year} không có ngày ${day}.`
      );
      return;
    }
    pick(solar);
  };

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const lunarDay = selectedLunar?.day ?? 1;
  const lunarMonth = selectedLunar?.month ?? 1;
  const lunarYear = selectedLunar?.year ?? today.getFullYear();
  const lunarLeap = selectedLunar?.leap ?? false;
  const lunarYearOptions = [
    ...new Set([
      lunarYear,
      today.getFullYear(),
      today.getFullYear() + 1,
      today.getFullYear() + 2,
    ]),
  ]
    .sort((a, b) => a - b)
    .map(String);
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="event-date" id={id}>
      <div className="event-date-head">
        <div className="segmented" role="group" aria-label="Loại lịch">
          <button
            type="button"
            aria-pressed={mode === CALENDAR_MODE.Solar}
            onClick={() => setMode(CALENDAR_MODE.Solar)}
          >
            Dương lịch
          </button>
          <button
            type="button"
            aria-pressed={mode === CALENDAR_MODE.Lunar}
            onClick={() => setMode(CALENDAR_MODE.Lunar)}
          >
            Âm lịch
          </button>
        </div>
      </div>

      {mode === CALENDAR_MODE.Lunar ? (
        <div className="event-date-lunar">
          <Select
            aria-label="Ngày âm"
            options={LUNAR_DAY_OPTIONS}
            value={String(lunarDay)}
            onValueChange={(day) =>
              pickLunar(Number(day), lunarMonth, lunarYear, lunarLeap)
            }
          />
          <Select
            aria-label="Tháng âm"
            options={LUNAR_MONTH_OPTIONS}
            value={String(lunarMonth)}
            onValueChange={(month) =>
              pickLunar(lunarDay, Number(month), lunarYear, lunarLeap)
            }
          />
          <Select
            aria-label="Năm âm"
            options={lunarYearOptions}
            value={String(lunarYear)}
            onValueChange={(year) =>
              pickLunar(lunarDay, lunarMonth, Number(year), lunarLeap)
            }
          />
          <CheckboxLabel
            checked={lunarLeap}
            onChange={(event) =>
              pickLunar(lunarDay, lunarMonth, lunarYear, event.target.checked)
            }
          >
            Tháng nhuận
          </CheckboxLabel>
        </div>
      ) : null}

      <div className="event-date-month">
        <button
          type="button"
          className="event-date-nav"
          aria-label="Tháng trước"
          onClick={() => shiftMonth(-1)}
        >
          <ChevronIcon size={16} className="rotate-180" />
        </button>
        <b>
          Tháng {view.month + 1}, {view.year}
        </b>
        <button
          type="button"
          className="event-date-nav"
          aria-label="Tháng sau"
          onClick={() => shiftMonth(1)}
        >
          <ChevronIcon size={16} />
        </button>
      </div>

      <div className="event-date-grid" role="grid">
        {WEEKDAY_HEADERS.map((name) => (
          <span key={name} className="event-date-weekday" role="columnheader">
            {name}
          </span>
        ))}
        {monthGrid(view.year, view.month).map((date) => {
          const lunar = solarToLunar(date);
          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              disabled={date < startOfToday}
              aria-selected={sameDay(selected, date)}
              aria-label={`${formatWeekdayDate(date)}, âm lịch ${formatLunarLong(lunar)}`}
              className={cn(
                "event-date-day",
                date.getMonth() !== view.month && "is-outside",
                sameDay(today, date) && "is-today"
              )}
              onClick={() => pick(date)}
            >
              <span>{date.getDate()}</span>
              <small className={cn(lunar.day === 1 && "is-new-month")}>
                {lunar.day === 1 ? `1/${lunar.month}` : lunar.day}
              </small>
            </button>
          );
        })}
      </div>

      <div className="event-date-result" aria-live="polite">
        {lunarError ? (
          <span className="field-error">{lunarError}</span>
        ) : selected && selectedLunar ? (
          <>
            <span>
              <small>Dương lịch</small>
              <b>{formatWeekdayDate(selected)}</b>
            </span>
            <span>
              <small>Âm lịch</small>
              <b>
                {formatLunarLong(selectedLunar)}, năm {selectedLunar.year}
              </b>
            </span>
          </>
        ) : (
          <span className="text-soft">Chọn một ngày trên lịch.</span>
        )}
      </div>
    </div>
  );
}
