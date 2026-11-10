// A meal (bữa) can be served in several waves (lượt đãi): 400 guests invited
// from 9h to 15h do not sit down at once, they come in turns on the same set
// of tables. Tables eaten drive the menu price, tables set up at once drive
// furniture and serving staff (BR04, BR12).

export type ServingWave = {
  from: string;
  to: string;
  tables: number;
};

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export const toMinutes = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

export const fromMinutes = (minutes: number) =>
  `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function waveTotals(waves: readonly ServingWave[]) {
  return {
    servingTables: waves.reduce((sum, wave) => sum + wave.tables, 0),
    setupTables: Math.max(0, ...waves.map((wave) => wave.tables)),
  };
}

/** "11:00–14:00" from the first wave start to the last wave end. */
export function waveSpan(waves: readonly ServingWave[]) {
  if (waves.length === 0) return "";
  return `${waves[0].from}–${waves[waves.length - 1].to}`;
}

export function waveErrors(waves: readonly ServingWave[]): string[] {
  if (waves.length === 0) return ["Cần ít nhất một lượt đãi."];

  const errors: string[] = [];
  waves.forEach((wave, index) => {
    const label = `Lượt ${index + 1}`;
    if (!TIME.test(wave.from) || !TIME.test(wave.to)) {
      errors.push(`${label}: giờ theo dạng HH:MM.`);
      return;
    }
    if (toMinutes(wave.to) <= toMinutes(wave.from)) {
      errors.push(`${label}: giờ kết thúc phải sau giờ bắt đầu.`);
    }
    if (!Number.isInteger(wave.tables) || wave.tables < 1) {
      errors.push(`${label}: cần ít nhất 1 bàn.`);
    }
    const previous = waves[index - 1];
    if (
      previous &&
      TIME.test(previous.to) &&
      toMinutes(wave.from) < toMinutes(previous.to)
    ) {
      errors.push(`${label} bắt đầu trước khi lượt ${index} kết thúc.`);
    }
  });
  return errors;
}

/** Next wave starts where the last one ended and lasts as long. */
export function nextWave(waves: readonly ServingWave[]): ServingWave {
  const last = waves.at(-1);
  if (!last || !TIME.test(last.from) || !TIME.test(last.to)) {
    return { from: "11:00", to: "13:00", tables: 10 };
  }
  const length = Math.max(30, toMinutes(last.to) - toMinutes(last.from));
  return {
    from: last.to,
    to: fromMinutes(toMinutes(last.to) + length),
    tables: last.tables,
  };
}

/** "3 lượt · 30 bàn ăn · 300 khách · bố trí 10 bàn" */
export function describeWaves(
  waves: readonly ServingWave[],
  guestsPerTable: number
) {
  const { servingTables, setupTables } = waveTotals(waves);
  return `${waves.length} lượt · ${servingTables} bàn ăn · ${servingTables * guestsPerTable} khách · bố trí ${setupTables} bàn`;
}
