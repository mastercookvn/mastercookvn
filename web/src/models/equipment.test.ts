import { describe, expect, it } from "vitest";

import { EQUIPMENT_BASIS } from "@/constants/equipment";

import {
  equipmentDemand,
  equipmentFormula,
  type EquipmentType,
} from "./equipment";

const bowl: EquipmentType = {
  name: "Bát",
  unit: "cái",
  basis: EQUIPMENT_BASIS.Person,
  rate: 1,
  reserve: 0.1,
  minimum: 0,
  compensation: 0,
  purchasePrice: 0,
  owned: 0,
  ready: 0,
  inUse: 0,
  damaged: 0,
};

describe("equipment demand", () => {
  it("applies the rate and reserve to the basis", () => {
    expect(equipmentDemand(bowl, 100, 10, 0)).toBe(110);
    expect(equipmentFormula(bowl)).toBe("1 × người + 10% dự trù");
  });

  it("uses the manual quantity when there is no rate", () => {
    expect(equipmentDemand({ ...bowl, rate: null }, 100, 10, 2)).toBe(2);
    expect(equipmentFormula({ ...bowl, rate: null })).toBe("Nhập theo bữa");
  });
});
