import { describe, expect, it } from "vitest";

import { PRICE_PROPOSAL_DECISION } from "@/constants/priceProposal";
import {
  STAFF_GENDER,
  STAFF_POSITION,
  STAFF_POSITION_LABEL,
  STAFF_TYPE,
} from "@/constants/staffing";
import {
  EQUIPMENT_BASIS,
  EQUIPMENT_BASIS_LABEL,
  equipmentDemand,
  equipmentFormula,
  EQUIPMENT,
} from "@/mocks/equipment";
import { normalizeSavedState, type DemoState } from "@/mocks/demoStore";

describe("saved demo terminology", () => {
  it("normalizes legacy fields without changing unrelated data", () => {
    const saved = JSON.parse(
      JSON.stringify({
        staff: [
          {
            name: "Tâm",
            position: "Phục vụ",
            type: "Thời vụ",
            gender: "Nam",
            note: "Giữ lại",
          },
        ],
        assignments: {
          "0120": [
            {
              staff: "Tâm",
              position: "Phục vụ",
              task: "Khu A",
              hours: "09:00–14:00",
            },
          ],
        },
        equipment: [{ ...EQUIPMENT[0], basis: "Người" }],
        priceDecisions: { 0: "Đã chỉnh giá" },
        bookingEventType: "Tiệc gia đình",
      })
    ) as Partial<DemoState>;
    const result = normalizeSavedState(saved);
    expect(result.staff?.[0]).toMatchObject({
      position: STAFF_POSITION.Server,
      type: STAFF_TYPE.Temporary,
      gender: STAFF_GENDER.Male,
      note: "Giữ lại",
    });
    expect(result.assignments?.["0120"][0].position).toBe(
      STAFF_POSITION.Server
    );
    expect(result.priceDecisions?.[0]).toBe(PRICE_PROPOSAL_DECISION.Adjusted);
    expect(result.bookingEventType).toBe("Tiệc gia đình");
    const item = result.equipment![0];
    expect(item.basis).toBe(EQUIPMENT_BASIS.Person);
    expect(equipmentDemand(item, 100, 10, 0)).toBe(110);
    expect(equipmentFormula(item)).toContain("người");
    expect(STAFF_POSITION_LABEL[STAFF_POSITION.Server]).toBe("Phục vụ");
    expect(EQUIPMENT_BASIS_LABEL[item.basis]).toBe("Người");
    expect(normalizeSavedState(result)).toEqual(result);
  });
});
