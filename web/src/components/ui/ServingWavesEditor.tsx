"use client";

import { CloseIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  describeWaves,
  fromMinutes,
  nextWave,
  type ServingWave,
} from "@/lib/servingWaves";

const MINUTES_PER_DAY = 24 * 60;
const TIME_STEP_MINUTES = 15;

/** 24-hour slots; a native time input follows the OS clock and may show AM/PM. */
const TIME_OPTIONS = Array.from(
  { length: MINUTES_PER_DAY / TIME_STEP_MINUTES },
  (_, index) => fromMinutes(index * TIME_STEP_MINUTES)
);

const timeOptionsWith = (time: string) =>
  TIME_OPTIONS.includes(time) ? TIME_OPTIONS : [...TIME_OPTIONS, time].sort();

/**
 * One bữa, several lượt đãi on the same tables: 400 invited guests arrive in
 * turns, they never sit down all at once.
 */
export function ServingWavesEditor({
  idPrefix,
  waves,
  guestsPerTable,
  onChange,
}: {
  idPrefix: string;
  waves: ServingWave[];
  guestsPerTable: number;
  onChange: (waves: ServingWave[]) => void;
}) {
  const update = (index: number, patch: Partial<ServingWave>) =>
    onChange(
      waves.map((wave, i) => (i === index ? { ...wave, ...patch } : wave))
    );

  return (
    <div className="waves">
      <div className="waves-head" aria-hidden="true">
        <span>Lượt</span>
        <span>Từ</span>
        <span>Đến</span>
        <span>Số bàn</span>
        <span>Khách</span>
        <span />
      </div>
      <ol className="waves-list">
        {waves.map((wave, index) => {
          const id = `${idPrefix}-wave-${index}`;
          return (
            <li key={index} className="waves-row">
              <span className="waves-index">
                <span className="visually-hidden">Lượt </span>
                {index + 1}
              </span>
              <div className="waves-field waves-from">
                <label htmlFor={`${id}-from`}>Từ</label>
                <Select
                  id={`${id}-from`}
                  options={timeOptionsWith(wave.from)}
                  value={wave.from}
                  onValueChange={(from) => update(index, { from })}
                />
              </div>
              <div className="waves-field waves-to">
                <label htmlFor={`${id}-to`}>Đến</label>
                <Select
                  id={`${id}-to`}
                  options={timeOptionsWith(wave.to)}
                  value={wave.to}
                  onValueChange={(to) => update(index, { to })}
                />
              </div>
              <div className="waves-field waves-tables">
                <label htmlFor={`${id}-tables`}>Số bàn</label>
                <input
                  id={`${id}-tables`}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="input"
                  value={wave.tables}
                  onChange={(event) =>
                    update(index, { tables: Number(event.target.value) })
                  }
                />
              </div>
              <output className="waves-guests" htmlFor={`${id}-tables`}>
                {wave.tables * guestsPerTable} khách
              </output>
              {waves.length > 1 ? (
                <Button
                  size="sm"
                  variant="text"
                  className="waves-remove"
                  aria-label={`Bỏ lượt ${index + 1}`}
                  onClick={() => onChange(waves.filter((_, i) => i !== index))}
                >
                  <CloseIcon size={16} />
                </Button>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="l-between">
        <Button size="sm" onClick={() => onChange([...waves, nextWave(waves)])}>
          <PlusIcon size={16} />
          Thêm lượt đãi
        </Button>
        <span className="waves-total">
          {describeWaves(waves, guestsPerTable)}
        </span>
      </div>
    </div>
  );
}
