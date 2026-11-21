import { describe, expect, it } from "vitest";

import { MENU_MODE, SERVING_FORMAT } from "@/constants/booking";
import { formatDayMonthYear } from "@/lib/format";
import { lunarToSolar } from "@/lib/lunar";
import { NEW_ESTIMATE_MEAL, type EstimateMeal } from "@/lib/demoStore";
import type { Dish, MenuSet } from "@/models/catalog";

import {
  contactErrors,
  estimateMeal,
  isHoliday,
  mealInfoErrors,
  mealMenuErrors,
} from "./estimate";

const dish = (id: string, price: number): Dish => ({
  id,
  name: id,
  category: "main",
  price,
  description: "",
});

const DISHES = [
  dish("goi", 320000),
  dish("chagio", 280000),
  dish("ga", 420000),
  dish("bo", 520000),
  dish("lauthai", 520000),
  dish("traicay", 150000),
];

const MENU_SETS: MenuSet[] = [
  {
    id: "sumvay",
    name: "Set Sum Vầy",
    suitableFor: "Họp mặt",
    description: "",
    dishIds: ["goi", "chagio", "ga", "traicay"],
    imageDishId: "ga",
  },
];

const catalog = { dishes: DISHES, menuSets: MENU_SETS, services: [] };

const meal = (patch: Partial<EstimateMeal>): EstimateMeal => ({
  ...NEW_ESTIMATE_MEAL,
  date: "20/12/2026",
  address: "12 Lê Lợi, Quận 1",
  setId: "sumvay",
  ...patch,
});

describe("booking estimate", () => {
  it("prices a single tray order", () => {
    const tray = meal({
      format: SERVING_FORMAT.Trays,
      waves: [{ from: "10:00", to: "11:00", tables: 1 }],
    });

    expect(mealInfoErrors(tray)).toEqual([]);
    expect(estimateMeal(tray, catalog).price?.total).toBeGreaterThan(0);
  });

  it("asks for at least one tray", () => {
    const tray = meal({
      format: SERVING_FORMAT.Trays,
      waves: [{ from: "10:00", to: "11:00", tables: 0 }],
    });

    expect(mealInfoErrors(tray)).toEqual([
      "Chọn giờ giao và số mâm, ít nhất 1 mâm.",
    ]);
  });

  it("keeps menu problems out of the event step", () => {
    const custom = meal({ mode: MENU_MODE.Custom, dishIds: ["goi"] });

    expect(mealInfoErrors(custom)).toEqual([]);
    expect(mealMenuErrors(custom, catalog)).toHaveLength(1);
    expect(estimateMeal(custom, catalog).errors).toHaveLength(1);
  });

  it("requires an address", () => {
    expect(mealInfoErrors(meal({ address: " " }))).toContain(
      "Vui lòng nhập địa chỉ."
    );
    expect(mealInfoErrors(meal({ address: "Q1" }))).toContain(
      "Địa chỉ cần ít nhất 5 ký tự, gồm số nhà, đường, phường/quận."
    );
  });

  it("validates the contact phone", () => {
    expect(
      contactErrors({ name: "Mai", phone: "0903 123 456", note: "" })
    ).toEqual({ name: null, phone: null });
    expect(contactErrors({ name: "", phone: "123", note: "" })).toEqual({
      name: "Vui lòng nhập họ tên.",
      phone: "Số di động gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09.",
    });
    expect(
      contactErrors({ name: "Mai 9", phone: "0903 abc 456", note: "" })
    ).toEqual({
      name: "Họ tên chỉ gồm chữ cái và khoảng trắng.",
      phone: "Số điện thoại chỉ gồm chữ số.",
    });
  });

  it("prices a set from the current dish prices in the admin catalog", () => {
    const set = meal({ mode: MENU_MODE.Set, setId: "sumvay" });
    const raised = {
      ...catalog,
      dishes: DISHES.map((dish) =>
        dish.id === "ga" ? { ...dish, price: dish.price + 100000 } : dish
      ),
    };

    expect(estimateMeal(set, raised).price?.dishAmount).toBe(
      (estimateMeal(set, catalog).price?.dishAmount ?? 0) + 100000 * 10
    );
  });

  it("rejects a set that is no longer served", () => {
    const stopped = {
      ...catalog,
      menuSets: MENU_SETS.map((set) =>
        set.id === "sumvay" ? { ...set, active: false } : set
      ),
    };

    expect(
      mealMenuErrors(meal({ mode: MENU_MODE.Set, setId: "sumvay" }), stopped)
    ).toEqual(["Set Sum Vầy đã ngưng phục vụ, hãy chọn set khác."]);
  });

  it("does not count stopped dishes toward the six-dish minimum", () => {
    const sixDishes = ["goi", "chagio", "ga", "bo", "lauthai", "traicay"];
    const stopped = {
      ...catalog,
      dishes: DISHES.map((dish) => ({ ...dish, active: dish.id !== "bo" })),
    };

    expect(
      mealMenuErrors(
        meal({ mode: MENU_MODE.Custom, dishIds: sixDishes }),
        stopped
      )
    ).toHaveLength(2);
  });

  it("knows solar and lunar holidays", () => {
    const tet = lunarToSolar(1, 1, 2027);
    const hungKings = lunarToSolar(10, 3, 2027);

    expect(isHoliday("30/04/2027")).toBe(true);
    expect(tet && isHoliday(formatDayMonthYear(tet))).toBe(true);
    expect(hungKings && isHoliday(formatDayMonthYear(hungKings))).toBe(true);
    expect(isHoliday("15/06/2027")).toBe(false);
  });
});
