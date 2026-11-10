import type { BadgeTone } from "@/constants/labels";

import { CalendarEventChip } from "./CalendarEventChip";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const EVENTS: Record<number, [string, BadgeTone]> = {
  1: ["DH-0120, 9 bàn", "wait"],
  15: ["Họp mặt, 20 bàn", "good"],
  22: ["Tân gia, 12 bàn", "good"],
  28: ["Sinh nhật, 8 bàn", "wait"],
};
// 01/11/2026 is a Sunday and weeks start on Monday.
const LEADING_DAYS = 6;
const CELL_COUNT = 42;
const TODAY = 5;

export function MealCalendar() {
  return (
    <div className="calendar">
      {WEEKDAYS.map((day) => (
        <div key={day} className="calendar-cell is-head">
          {day}
        </div>
      ))}
      {Array.from({ length: CELL_COUNT }, (_, index) => {
        const day = index - LEADING_DAYS + 1;
        const inMonth = day >= 1 && day <= 30;
        const label = inMonth ? day : day < 1 ? 31 + day : day - 30;
        const event = inMonth ? EVENTS[day] : undefined;
        return (
          <div
            key={index}
            className={`calendar-cell ${inMonth ? "" : "is-outside"} ${day === TODAY ? "is-today" : ""}`}
          >
            <span>{label}</span>
            {event ? (
              <CalendarEventChip label={event[0]} tone={event[1]} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
