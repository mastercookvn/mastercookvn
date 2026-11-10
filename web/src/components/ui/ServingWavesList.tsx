import { describeWaves, type ServingWave } from "@/lib/servingWaves";

export function ServingWavesList({
  waves,
  guestsPerTable,
}: {
  waves: readonly ServingWave[];
  guestsPerTable: number;
}) {
  return (
    <div className="wave-list">
      <ol>
        {waves.map((wave, index) => (
          <li key={index}>
            <span className="wave-list-index">Lượt {index + 1}</span>
            <b>
              {wave.from}–{wave.to}
            </b>
            <span>
              {wave.tables} bàn · {wave.tables * guestsPerTable} khách
            </span>
          </li>
        ))}
      </ol>
      <small>{describeWaves(waves, guestsPerTable)}</small>
    </div>
  );
}
