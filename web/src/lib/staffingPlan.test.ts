import { describe, expect, it } from "vitest";

import { STAFF_POSITION } from "@/constants/staffing";

import {
  proposeStaffing,
  shiftHours,
  staffingDemand,
  staffingErrors,
  type StaffCandidate,
} from "./staffingPlan";

const ROLLING = [
  { from: "09:00", to: "11:00", tables: 14 },
  { from: "11:00", to: "13:00", tables: 14 },
  { from: "13:00", to: "15:00", tables: 12 },
];

const person = (
  name: string,
  position: string,
  permanent = true,
  active = true
): StaffCandidate => ({ name, position, permanent, active });

describe("staffingDemand", () => {
  it("sizes servers by the busiest wave and cooks by every guest", () => {
    expect(staffingDemand(ROLLING, 10)).toEqual({
      [STAFF_POSITION.Server]: 5,
      [STAFF_POSITION.Cook]: 3,
      [STAFF_POSITION.Driver]: 1,
      [STAFF_POSITION.Counter]: 1,
    });
  });

  it("never asks for zero cooks or drivers", () => {
    expect(
      staffingDemand([{ from: "18:00", to: "20:00", tables: 1 }], 10)
    ).toMatchObject({
      [STAFF_POSITION.Server]: 1,
      [STAFF_POSITION.Cook]: 1,
      [STAFF_POSITION.Driver]: 1,
    });
  });
});

describe("shiftHours", () => {
  it("covers set-up before the first wave and clean-up after the last", () => {
    expect(shiftHours(ROLLING, STAFF_POSITION.Server)).toBe("07:30–16:00");
    expect(shiftHours(ROLLING, STAFF_POSITION.Counter)).toBe("15:00–16:30");
  });
});

describe("proposeStaffing", () => {
  const staff = [
    person("Tâm", STAFF_POSITION.Server, false),
    person("Trang", STAFF_POSITION.Server),
    person("Lan", STAFF_POSITION.Server, true, false),
    person("Hùng", STAFF_POSITION.Cook),
  ];

  it("fills permanent staff first and leaves unfillable slots empty", () => {
    const plan = proposeStaffing({
      waves: [{ from: "18:00", to: "21:00", tables: 7 }],
      guestsPerTable: 10,
      staff,
      busy: [],
    });
    const servers = plan.filter(
      (row) => row.position === STAFF_POSITION.Server
    );
    expect(servers.map((row) => row.staff)).toEqual(["Trang", "Tâm", ""]);
    expect(servers.map((row) => row.task)).toEqual([
      "Bàn 1–3",
      "Bàn 4–6",
      "Bàn 7",
    ]);
  });

  it("skips people already busy in an overlapping shift", () => {
    const plan = proposeStaffing({
      waves: [{ from: "18:00", to: "21:00", tables: 3 }],
      guestsPerTable: 10,
      staff,
      busy: [{ staff: "Trang", hours: "15:00–19:00" }],
    });
    expect(
      plan.find((row) => row.position === STAFF_POSITION.Server)?.staff
    ).toBe("Tâm");
  });
});

describe("staffingErrors", () => {
  it("rejects empty names and double-booked people", () => {
    expect(
      staffingErrors(
        [
          { staff: "", position: "Bếp", task: "", hours: "10:00–12:00" },
          { staff: "Tâm", position: "Phục vụ", task: "", hours: "10:00–12:00" },
          { staff: "Tâm", position: "Phục vụ", task: "", hours: "11:00–13:00" },
          { staff: "Hùng", position: "Bếp", task: "", hours: "10:00–12:00" },
        ],
        [{ staff: "Hùng", hours: "11:30–14:00" }]
      )
    ).toEqual([
      "Dòng 1: chọn nhân viên hoặc bỏ dòng này.",
      "Tâm bị xếp hai ca chồng giờ trong bữa này.",
      "Hùng đã có ca 11:30–14:00 ở bữa khác.",
    ]);
  });
});
