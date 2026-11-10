import {
  STAFF_POSITION,
  STAFF_POSITIONS,
  STAFFING_RULES,
  type StaffPosition,
} from "@/constants/staffing";

import {
  fromMinutes,
  toMinutes,
  waveTotals,
  type ServingWave,
} from "./servingWaves";

export type StaffingDemand = Record<StaffPosition, number>;

export type PlannedShift = {
  staff: string;
  position: string;
  task: string;
  hours: string;
};

export type StaffCandidate = {
  name: string;
  position: string;
  permanent: boolean;
  active: boolean;
};

/** Someone already booked elsewhere, e.g. another meal the same day. */
export type BusyShift = { staff: string; hours: string };

/**
 * Servers follow the busiest wave (tables set up at once, BR12); cooks follow
 * every guest of every wave; drivers follow the furniture to carry.
 */
export function staffingDemand(
  waves: readonly ServingWave[],
  guestsPerTable: number
): StaffingDemand {
  const { servingTables, setupTables } = waveTotals(waves);
  const guests = servingTables * guestsPerTable;
  return {
    [STAFF_POSITION.Server]: Math.ceil(
      setupTables / STAFFING_RULES.tablesPerServer
    ),
    [STAFF_POSITION.Cook]: Math.max(
      1,
      Math.ceil(guests / STAFFING_RULES.guestsPerCook)
    ),
    [STAFF_POSITION.Driver]: Math.max(
      1,
      Math.ceil(setupTables / STAFFING_RULES.setupTablesPerDriver)
    ),
    [STAFF_POSITION.Counter]: STAFFING_RULES.counters,
  };
}

export function shiftHours(
  waves: readonly ServingWave[],
  position: StaffPosition
) {
  if (waves.length === 0) return "";
  const { before, after } = STAFFING_RULES.shift[position];
  const firstStart = toMinutes(waves[0].from);
  const lastEnd = toMinutes(waves[waves.length - 1].to);
  const anchor = position === STAFF_POSITION.Counter ? lastEnd : firstStart;
  const start = Math.max(0, anchor - before);
  const end = Math.min(24 * 60 - 1, lastEnd + after);
  return `${fromMinutes(start)}–${fromMinutes(end)}`;
}

export const hoursOverlap = (a: string, b: string) => {
  const [aStart, aEnd] = a.split("–").map(toMinutes);
  const [bStart, bEnd] = b.split("–").map(toMinutes);
  return aStart < bEnd && bStart < aEnd;
};

function taskFor(position: StaffPosition, slot: number, setupTables: number) {
  if (position === STAFF_POSITION.Server) {
    const first = slot * STAFFING_RULES.tablesPerServer + 1;
    const last = Math.min(
      (slot + 1) * STAFFING_RULES.tablesPerServer,
      setupTables
    );
    return first === last ? `Bàn ${first}` : `Bàn ${first}–${last}`;
  }
  if (position === STAFF_POSITION.Cook) {
    return slot === 0 ? "Bếp chính" : "Phụ bếp";
  }
  if (position === STAFF_POSITION.Driver) return "Chở dụng cụ, bàn ghế";
  return "Kiểm đếm, thu hồi dụng cụ";
}

/**
 * First draft for the manager to adjust. Fills each slot with an active
 * person of that position who is free in the shift, permanent staff first;
 * a slot nobody can fill stays empty instead of borrowing another position.
 */
export function proposeStaffing({
  waves,
  guestsPerTable,
  staff,
  busy,
}: {
  waves: readonly ServingWave[];
  guestsPerTable: number;
  staff: readonly StaffCandidate[];
  busy: readonly BusyShift[];
}): PlannedShift[] {
  const demand = staffingDemand(waves, guestsPerTable);
  const { setupTables } = waveTotals(waves);
  const taken = new Set<string>();
  const byPermanentFirst = [...staff].sort(
    (a, b) => Number(b.permanent) - Number(a.permanent)
  );

  return STAFF_POSITIONS.flatMap((position) => {
    const hours = shiftHours(waves, position);
    return Array.from({ length: demand[position] }, (_, slot) => {
      const person = byPermanentFirst.find(
        (member) =>
          member.active &&
          member.position === position &&
          !taken.has(member.name) &&
          !busy.some(
            (shift) =>
              shift.staff === member.name && hoursOverlap(shift.hours, hours)
          )
      );
      if (person) taken.add(person.name);
      return {
        staff: person?.name ?? "",
        position,
        task: taskFor(position, slot, setupTables),
        hours,
      };
    });
  });
}

/** Problems that block saving: an empty name or one person in two shifts at once. */
export function staffingErrors(
  plan: readonly PlannedShift[],
  busy: readonly BusyShift[]
): string[] {
  const errors: string[] = [];
  const TIME_RANGE = /^([01]\d|2[0-3]):[0-5]\d–([01]\d|2[0-3]):[0-5]\d$/;
  plan.forEach((row, index) => {
    const label = `Dòng ${index + 1}`;
    if (!row.staff) {
      errors.push(`${label}: chọn nhân viên hoặc bỏ dòng này.`);
      return;
    }
    if (!TIME_RANGE.test(row.hours)) {
      errors.push(`${label}: giờ làm theo dạng HH:MM–HH:MM.`);
      return;
    }
    const [start, end] = row.hours.split("–").map(toMinutes);
    if (end <= start) {
      errors.push(`${label}: giờ kết thúc phải sau giờ bắt đầu.`);
      return;
    }
    const clash = plan
      .slice(0, index)
      .find(
        (other) =>
          other.staff === row.staff &&
          TIME_RANGE.test(other.hours) &&
          hoursOverlap(other.hours, row.hours)
      );
    if (clash) {
      errors.push(`${row.staff} bị xếp hai ca chồng giờ trong bữa này.`);
      return;
    }
    const elsewhere = busy.find(
      (shift) =>
        shift.staff === row.staff && hoursOverlap(shift.hours, row.hours)
    );
    if (elsewhere) {
      errors.push(`${row.staff} đã có ca ${elsewhere.hours} ở bữa khác.`);
    }
  });
  return errors;
}
