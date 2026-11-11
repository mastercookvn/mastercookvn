import { STAFF_POSITIONS } from "@/constants/staffing";
import type { ServingWave } from "@/lib/servingWaves";
import { waveTotals } from "@/lib/servingWaves";
import { staffingDemand } from "@/lib/staffingPlan";
import {
  equipmentDemand,
  heldByOverlappingMeals,
  type EquipmentType,
} from "@/mocks/equipment";

/** Added tables are spread over the waves one by one, from the first wave. */
export function wavesWithAddedTables(
  waves: readonly ServingWave[],
  added: number
): ServingWave[] {
  const next = waves.map((wave) => ({ ...wave }));
  for (let index = 0; index < added && next.length > 0; index++) {
    next[index % next.length].tables += 1;
  }
  return next;
}

/** BR09, BR12, BR13: what the bigger meal would lack once every overlapping meal is counted. */
export function addedTablesShortages({
  waves,
  guestsPerTable,
  added,
  staff,
  busyStaff,
  equipment,
}: {
  waves: readonly ServingWave[];
  guestsPerTable: number;
  added: number;
  staff: readonly { name: string; position: string; active: boolean }[];
  /** Names already working another meal at the same time. */
  busyStaff: readonly string[];
  equipment: readonly EquipmentType[];
}): string[] {
  if (added <= 0) return [];
  const after = wavesWithAddedTables(waves, added);
  const { servingTables, setupTables } = waveTotals(after);
  const demand = staffingDemand(after, guestsPerTable);

  const staffShort = STAFF_POSITIONS.flatMap((position) => {
    const available = staff.filter(
      (member) =>
        member.active &&
        member.position === position &&
        !busyStaff.includes(member.name)
    ).length;
    const missing = demand[position] - available;
    return missing > 0 ? [`Thiếu ${missing} ${position.toLowerCase()}`] : [];
  });

  const equipmentShort = equipment.flatMap((item) => {
    if (item.rate === null) return [];
    const needed = equipmentDemand(
      item,
      servingTables * guestsPerTable,
      setupTables,
      0
    );
    const available =
      item.owned - item.damaged - heldByOverlappingMeals(item.name);
    const missing = needed - available;
    return missing > 0
      ? [`Thiếu ${missing} ${item.unit} ${item.name.toLowerCase()}`]
      : [];
  });

  return [...staffShort, ...equipmentShort];
}
