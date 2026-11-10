"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_TODAY } from "@/constants/settings";
import { formatLunarLong, solarToLunar } from "@/lib/lunar";
import { CALENDAR_EVENTS, type CalendarEvent } from "@/mocks/calendar";

import { CalendarEventChip } from "./CalendarEventChip";
import { LunarDateFinder } from "./LunarDateFinder";

export const CALENDAR_VIEW = {
  Week: "week",
  Month: "month",
} as const;
export type CalendarView = (typeof CALENDAR_VIEW)[keyof typeof CALENDAR_VIEW];

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const WEEKDAY_NAMES = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];
const DAYS_PER_WEEK = 7;
const MONTH_CELLS = 42;

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const mondayIndex = (date: Date) => (date.getDay() + 6) % 7;

const startOfWeek = (date: Date) => addDays(date, -mondayIndex(date));

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const shortDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;

const eventsOn = (date: Date): CalendarEvent[] =>
  CALENDAR_EVENTS.filter((event) => event.date === isoDate(date)).sort(
    (first, second) => first.time.localeCompare(second.time)
  );

/** Day 1 shows the month too, as printed Vietnamese calendars do. */
const lunarLabel = (date: Date) => {
  const lunar = solarToLunar(date);
  return lunar.day === 1
    ? `1/${lunar.month}${lunar.leap ? "N" : ""}`
    : String(lunar.day);
};

const isLunarMark = (date: Date) => {
  const { day } = solarToLunar(date);
  return day === 1 || day === 15;
};

export function MealCalendar() {
  const today = startOfDay(DEMO_TODAY);
  const [view, setView] = useState<CalendarView>(CALENDAR_VIEW.Week);
  const [anchor, setAnchor] = useState(today);
  const [showFinder, setShowFinder] = useState(false);

  const weekStart = startOfWeek(anchor);
  const weekDays = Array.from({ length: DAYS_PER_WEEK }, (_, index) =>
    addDays(weekStart, index)
  );
  const monthFirst = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const monthGridStart = startOfWeek(monthFirst);
  const monthDays = Array.from({ length: MONTH_CELLS }, (_, index) =>
    addDays(monthGridStart, index)
  );

  const title =
    view === CALENDAR_VIEW.Week
      ? `Tuần ${shortDate(weekDays[0])} – ${shortDate(weekDays[6])}/${weekDays[6].getFullYear()}`
      : `Tháng ${anchor.getMonth() + 1}/${anchor.getFullYear()}`;

  const move = (step: number) =>
    setAnchor(
      view === CALENDAR_VIEW.Week
        ? addDays(anchor, step * DAYS_PER_WEEK)
        : new Date(anchor.getFullYear(), anchor.getMonth() + step, 1)
    );

  const weekEventCount = weekDays.reduce(
    (count, day) => count + eventsOn(day).length,
    0
  );

  return (
    <section className="l-stack gap-3">
      <div className="calendar-toolbar">
        <div className="l-row gap-2">
          <Button
            size="sm"
            aria-label={
              view === CALENDAR_VIEW.Week ? "Tuần trước" : "Tháng trước"
            }
            onClick={() => move(-1)}
          >
            <ChevronIcon size={16} className="rotate-180" />
          </Button>
          <Button size="sm" onClick={() => setAnchor(today)}>
            Hôm nay
          </Button>
          <Button
            size="sm"
            aria-label={view === CALENDAR_VIEW.Week ? "Tuần sau" : "Tháng sau"}
            onClick={() => move(1)}
          >
            <ChevronIcon size={16} />
          </Button>
          <h2 className="calendar-title" aria-live="polite">
            {title}
          </h2>
        </div>
        <div className="l-row gap-2">
          <Button
            size="sm"
            aria-pressed={showFinder}
            onClick={() => setShowFinder(!showFinder)}
          >
            {showFinder ? "Ẩn tính ngày giỗ" : "Tính ngày giỗ (âm lịch)"}
          </Button>
          <div className="segmented" role="group" aria-label="Chế độ xem lịch">
            <button
              type="button"
              aria-pressed={view === CALENDAR_VIEW.Week}
              onClick={() => setView(CALENDAR_VIEW.Week)}
            >
              Tuần
            </button>
            <button
              type="button"
              aria-pressed={view === CALENDAR_VIEW.Month}
              onClick={() => setView(CALENDAR_VIEW.Month)}
            >
              Tháng
            </button>
          </div>
        </div>
      </div>

      {showFinder ? (
        <LunarDateFinder
          year={anchor.getFullYear()}
          onShow={(date) => {
            setAnchor(date);
            setView(CALENDAR_VIEW.Week);
          }}
        />
      ) : null}

      {view === CALENDAR_VIEW.Week ? (
        <>
          <div className="calendar-week">
            {weekDays.map((day, index) => {
              const events = eventsOn(day);
              const isToday = isoDate(day) === isoDate(today);
              return (
                <div
                  key={isoDate(day)}
                  className={`calendar-week-day ${isToday ? "is-today" : ""}`}
                >
                  <div className="calendar-week-head">
                    <span>
                      {WEEKDAY_NAMES[index]}
                      {isToday ? " · Hôm nay" : ""}
                    </span>
                    <b>{shortDate(day)}</b>
                    <small
                      className={
                        isLunarMark(day)
                          ? "calendar-lunar is-mark"
                          : "calendar-lunar"
                      }
                      title={formatLunarLong(solarToLunar(day))}
                    >
                      {lunarLabel(day)} ÂL
                    </small>
                  </div>
                  <div className="calendar-week-events">
                    {events.length === 0 ? (
                      <span className="calendar-week-empty">Trống</span>
                    ) : (
                      events.map((event) => (
                        <Link
                          key={`${event.date}-${event.time}-${event.title}`}
                          href={event.href}
                          className={`calendar-week-event tone-${event.tone}`}
                        >
                          <span className="calendar-event-time">
                            <i className="calendar-dot" aria-hidden="true" />
                            {event.time}
                          </span>
                          <b>{event.title}</b>
                          <small>
                            {event.tables} bàn · {event.address}
                          </small>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-small text-soft">
            {weekEventCount > 0
              ? `${weekEventCount} lịch trong tuần`
              : "Tuần này chưa có tiệc"}
          </p>
        </>
      ) : (
        <div className="calendar-scroll">
          <div className="calendar">
            {WEEKDAYS.map((day) => (
              <div key={day} className="calendar-cell is-head">
                {day}
              </div>
            ))}
            {monthDays.map((day) => {
              const inMonth = day.getMonth() === anchor.getMonth();
              const isToday = isoDate(day) === isoDate(today);
              return (
                <div
                  key={isoDate(day)}
                  className={`calendar-cell ${inMonth ? "" : "is-outside"} ${isToday ? "is-today" : ""}`}
                >
                  <div className="calendar-cell-head">
                    <button
                      type="button"
                      className="calendar-day-link"
                      aria-label={`Xem tuần có ngày ${shortDate(day)}`}
                      onClick={() => {
                        setAnchor(day);
                        setView(CALENDAR_VIEW.Week);
                      }}
                    >
                      {day.getDate()}
                    </button>
                    <small
                      className={
                        isLunarMark(day)
                          ? "calendar-lunar is-mark"
                          : "calendar-lunar"
                      }
                      title={formatLunarLong(solarToLunar(day))}
                    >
                      {lunarLabel(day)}
                    </small>
                  </div>
                  {eventsOn(day).map((event) => (
                    <CalendarEventChip
                      key={`${event.time}-${event.title}`}
                      time={event.time}
                      title={event.title}
                      tone={event.tone}
                      href={event.href}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="l-row gap-4">
        <Badge tone="good">Đã xác nhận</Badge>
        <Badge tone="wait">Chờ xử lý</Badge>
        <Badge tone="info">Khảo sát</Badge>
      </div>
    </section>
  );
}
