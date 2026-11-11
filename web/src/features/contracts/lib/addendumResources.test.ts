import { describe, expect, it } from "vitest";

import { EQUIPMENT } from "@/mocks/equipment";
import { STAFF } from "@/mocks/people";

import {
  addedTablesShortages,
  wavesWithAddedTables,
} from "./addendumResources";

const WAVES = [
  { from: "10:30", to: "12:00", tables: 6 },
  { from: "12:00", to: "13:30", tables: 6 },
];

describe("addendum resources", () => {
  it("spreads added tables over the waves", () => {
    expect(wavesWithAddedTables(WAVES, 3).map((wave) => wave.tables)).toEqual([
      8, 7,
    ]);
  });

  it("needs no check when tables do not grow", () => {
    expect(
      addedTablesShortages({
        waves: WAVES,
        guestsPerTable: 10,
        added: 0,
        staff: [],
        busyStaff: [],
        equipment: EQUIPMENT,
      })
    ).toEqual([]);
  });

  it("reports missing staff once everyone is busy elsewhere", () => {
    const shortages = addedTablesShortages({
      waves: WAVES,
      guestsPerTable: 10,
      added: 5,
      staff: STAFF,
      busyStaff: STAFF.map((member) => member.name),
      equipment: EQUIPMENT,
    });

    expect(shortages.some((line) => line.includes("phục vụ"))).toBe(true);
  });
});
