"use client";

import { useRef, useState, type KeyboardEvent } from "react";

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
  LUNAR_MONTHS,
  daysInLunarMonth,
  formatLunarLong,
  formatLunarShort,
  leapMonthOf,
  lunarMonthLabel,
  lunarToSolar,
  monthGrid,
  solarToLunar,
} from "@/lib/lunar";
import { ARROW_KEYS, findSpatialTarget } from "@/lib/spatialFocus";
import { cn } from "@/lib/utils";

const CALENDAR_MODE = {
  Solar: "solar",
  Lunar: "lunar",
} as const;

type CalendarMode = (typeof CALENDAR_MODE)[keyof typeof CALENDAR_MODE];

const WEEKDAY_HEADERS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const DAYS_PER_WEEK = 7;

const LUNAR_MONTH_OPTIONS = LUNAR_MONTHS.map((month) => ({
  value: String(month),
  label: lunarMonthLabel(month),
}));

const sameDay = (a: Date | null, b: Date) =>
  a !== null &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

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
  const gridRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<CalendarMode>(CALENDAR_MODE.Solar);
  const [view, setView] = useState({
    year: anchor.getFullYear(),
    month: anchor.getMonth(),
  });
  const [focused, setFocused] = useState<Date | null>(null);

  const selectedLunar = selected ? solarToLunar(selected) : null;

  const pick = (date: Date) => {
    onChange(formatDayMonthYear(date));
    setView({ year: date.getFullYear(), month: date.getMonth() });
  };

  const lunarDay = selectedLunar?.day ?? 1;
  const lunarMonth = selectedLunar?.month ?? 1;
  const lunarYear = selectedLunar?.year ?? today.getFullYear();
  const lunarLeap = selectedLunar?.isLeap ?? false;

  /** A day past the end of a short month falls back to its last day. */
  const pickLunar = (
    day: number,
    month: number,
    year: number,
    leap: boolean
  ) => {
    const leapExists = leap && leapMonthOf(year) === month;
    const lastDay = daysInLunarMonth(month, year, leapExists);
    const solar = lunarToSolar(Math.min(day, lastDay), month, year, leapExists);
    if (solar) pick(solar);
  };

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const lunarDayOptions = Array.from(
    { length: daysInLunarMonth(lunarMonth, lunarYear, lunarLeap) },
    (_, index) => ({ value: String(index + 1), label: `Ngày ${index + 1}` })
  );
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
  const hasLeapMonth = leapMonthOf(lunarYear) === lunarMonth;

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const cells = monthGrid(view.year, view.month);
  const isPickable = (date: Date) => date >= startOfToday;
  const tabStop =
    [focused, selected, today]
      .map((candidate) =>
        cells.find(
          (cell) => sameDay(candidate, cell.solar) && isPickable(cell.solar)
        )
      )
      .find(Boolean) ??
    cells.find((cell) => cell.isCurrentMonth && isPickable(cell.solar));
  const weeks = Array.from({ length: cells.length / DAYS_PER_WEEK }, (_, row) =>
    cells.slice(row * DAYS_PER_WEEK, (row + 1) * DAYS_PER_WEEK)
  );

  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (
      !ARROW_KEYS.includes(event.key) ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.defaultPrevented ||
      !target.matches(".event-date-day") ||
      !gridRef.current
    ) {
      return;
    }
    const candidates = Array.from(
      gridRef.current.querySelectorAll<HTMLButtonElement>(
        ".event-date-day:not(:disabled)"
      )
    );
    const next = findSpatialTarget(target, candidates, event.key);
    if (!next) return;
    event.preventDefault();
    next.focus();
    next.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div className="event-date" id={id}>
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

      {mode === CALENDAR_MODE.Lunar ? (
        <fieldset className="event-date-lunar">
          <legend className="visually-hidden">Ngày âm lịch</legend>
          <Select
            aria-label="Ngày âm"
            options={lunarDayOptions}
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
            disabled={!hasLeapMonth}
            onChange={(event) =>
              pickLunar(lunarDay, lunarMonth, lunarYear, event.target.checked)
            }
          >
            Tháng nhuận
            {hasLeapMonth ? null : (
              <small className="text-soft">
                (năm {lunarYear} không nhuận tháng {lunarMonth})
              </small>
            )}
          </CheckboxLabel>
        </fieldset>
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
        <b id={`${id}-month`} aria-live="polite">
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

      <div
        ref={gridRef}
        className="event-date-grid"
        role="grid"
        aria-labelledby={`${id}-month`}
        onKeyDown={moveFocus}
      >
        <div role="row" className="event-date-row">
          {WEEKDAY_HEADERS.map((name) => (
            <span key={name} className="event-date-weekday" role="columnheader">
              {name}
            </span>
          ))}
        </div>
        {weeks.map((week) => (
          <div
            key={week[0].solar.toISOString()}
            role="row"
            className="event-date-row"
          >
            {week.map(({ solar, lunar, isCurrentMonth }) => (
              <button
                key={solar.toISOString()}
                type="button"
                role="gridcell"
                tabIndex={tabStop && sameDay(tabStop.solar, solar) ? 0 : -1}
                disabled={!isPickable(solar)}
                aria-selected={sameDay(selected, solar)}
                aria-label={`${formatWeekdayDate(solar)}, âm lịch ${formatLunarLong(lunar)}`}
                className={cn(
                  "event-date-day",
                  !isCurrentMonth && "is-outside",
                  sameDay(today, solar) && "is-today"
                )}
                onFocus={() => setFocused(solar)}
                onClick={() => pick(solar)}
              >
                <span>{solar.getDate()}</span>
                <small className={cn(lunar.day === 1 && "is-new-month")}>
                  {lunar.day === 1 ? formatLunarShort(lunar) : lunar.day}
                </small>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="event-date-result" aria-live="polite">
        {selected && selectedLunar ? (
          <>
            <span>
              <small>Dương lịch</small>
              <b>{formatWeekdayDate(selected)}</b>
            </span>
            <span>
              <small>Âm lịch</small>
              <b>
                {formatLunarLong(selectedLunar)}, năm {selectedLunar.year}
                {selectedLunar.yearCanChi
                  ? ` (${selectedLunar.yearCanChi})`
                  : null}
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
