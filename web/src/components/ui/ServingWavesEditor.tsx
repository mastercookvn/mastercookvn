"use client";

import { CloseIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { describeWaves, nextWave, type ServingWave } from "@/lib/servingWaves";

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
              <span className="waves-index">{index + 1}</span>
              <input
                id={`${id}-from`}
                type="time"
                step={900}
                className="input"
                aria-label={`Lượt ${index + 1} bắt đầu`}
                value={wave.from}
                onChange={(event) =>
                  update(index, { from: event.target.value })
                }
              />
              <input
                id={`${id}-to`}
                type="time"
                step={900}
                className="input"
                aria-label={`Lượt ${index + 1} kết thúc`}
                value={wave.to}
                onChange={(event) => update(index, { to: event.target.value })}
              />
              <input
                id={`${id}-tables`}
                type="number"
                min={1}
                className="input"
                aria-label={`Lượt ${index + 1} số bàn`}
                value={wave.tables}
                onChange={(event) =>
                  update(index, { tables: Number(event.target.value) })
                }
              />
              <span className="waves-guests">
                {wave.tables * guestsPerTable}
              </span>
              {waves.length > 1 ? (
                <Button
                  size="sm"
                  variant="text"
                  aria-label={`Bỏ lượt ${index + 1}`}
                  onClick={() => onChange(waves.filter((_, i) => i !== index))}
                >
                  <CloseIcon size={16} />
                </Button>
              ) : (
                <span />
              )}
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
