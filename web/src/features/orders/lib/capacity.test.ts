import { describe, expect, it } from "vitest";

import { STAFF_POSITION } from "@/constants/staffing";
import { MEAL_STATUS } from "@/constants/statuses";
import type { OrderMeal } from "@/models/orders";

import { staffCapacityRows } from "./capacity";

const meal: OrderMeal = {
  name: "Tiệc giỗ",
  date: "28/11/2026",
  time: "11:00–13:30",
  address: "15 Nguyễn Trãi, Quận 5",
  setName: "Set",
  waves: [{ from: "11:00", to: "13:30", tables: 8 }],
  guestsPerTable: 10,
  servingTables: 8,
  setupTables: 8,
  status: MEAL_STATUS.Planned,
  price: null,
};
const server = (name: string) => ({
  name,
  position: STAFF_POSITION.Server,
  active: true,
});

describe("staffCapacityRows", () => {
  it("is short when active servers do not cover the tables set up at once", () => {
    const row = staffCapacityRows(meal, [server("An")], {}).find(
      (item) => item.position === STAFF_POSITION.Server
    );

    expect(row).toMatchObject({ needed: 3, active: 1, short: true });
  });

  it("ignores staff who stopped working", () => {
    const staff = ["An", "Bình", "Chi"].map(server);
    const covered = staffCapacityRows(meal, staff, {});
    const oneStopped = staffCapacityRows(
      meal,
      staff.map((member, index) => ({ ...member, active: index > 0 })),
      {}
    );
    const servers = (rows: typeof covered) =>
      rows.find((item) => item.position === STAFF_POSITION.Server);

    expect(servers(covered)?.short).toBe(false);
    expect(servers(oneStopped)?.short).toBe(true);
  });
});
