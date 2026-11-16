"use client";

import { Select } from "@/components/ui/Select";
import { fromMinutes } from "@/lib/servingWaves";

const MINUTES_PER_DAY = 24 * 60;
const TIME_STEP_MINUTES = 15;

/** 24-hour slots; a native time input follows the OS clock and may show AM/PM. */
const TIME_OPTIONS = Array.from(
  { length: MINUTES_PER_DAY / TIME_STEP_MINUTES },
  (_, index) => fromMinutes(index * TIME_STEP_MINUTES)
);

export function TimeSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (time: string) => void;
}) {
  return (
    <Select
      id={id}
      options={
        TIME_OPTIONS.includes(value)
          ? TIME_OPTIONS
          : [...TIME_OPTIONS, value].sort()
      }
      value={value}
      onValueChange={onChange}
    />
  );
}
