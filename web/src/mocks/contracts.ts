import { DEMO_TODAY, BUSINESS_SETTINGS } from "@/constants/settings";
import {
  CONTRACT_STATUS,
  MEAL_STATUS,
  type ContractStatus,
  type MealStatus,
} from "@/constants/statuses";
import {
  calculateCancellation,
  calculateMealPrice,
  type MealPrice,
} from "@/lib/pricing";

import {
  menuSetById,
  menuSetDishNames,
  menuSetPrice,
  serviceById,
  type Service,
} from "./catalog";

export type MealService = Service & { quantity: number };

export type Meal = {
  name: string;
  eventType: string;
  startsAt: string;
  date: string;
  time: string;
  address: string;
  distanceKm: number;
  servingTables: number;
  guestsPerTable: number;
  setupTables: number;
  setName: string;
  dishNames: string[];
  services: MealService[];
  status: MealStatus;
  price: MealPrice;
};

export type Contract = {
  number: string;
  orderCode: string;
  status: ContractStatus;
  meals: Meal[];
  total: number;
  paid: number;
  depositDeadline?: string;
};

export const CUSTOMER = { name: "Trần Thị Mai", phone: "0903 123 456" };

const withService = (id: string, quantity = 1): MealService => ({
  ...serviceById(id),
  quantity,
});

type MealInput = Omit<Meal, "setName" | "dishNames" | "price"> & {
  setId: string;
};

function createMeal({ setId, ...meal }: MealInput): Meal {
  const set = menuSetById(setId);
  return {
    ...meal,
    setName: set.name,
    dishNames: menuSetDishNames(set),
    price: calculateMealPrice({
      dishesTotal: menuSetPrice(set),
      servingTables: meal.servingTables,
      guestsPerTable: meal.guestsPerTable,
      services: meal.services,
    }),
  };
}

export const MEAL_WEDDING = createMeal({
  name: "Tiệc cưới nhà gái",
  eventType: "Cưới hỏi",
  startsAt: "2026-12-14T11:00:00+07:00",
  date: "14/12/2026",
  time: "11:00–14:00",
  address: "24 Nguyễn Gia Trí, Bình Thạnh, TP.HCM",
  distanceKm: 9.5,
  servingTables: 30,
  guestsPerTable: 10,
  setupTables: 10,
  setId: "hysu",
  services: [withService("don"), withService("cong")],
  status: MEAL_STATUS.Planned,
});

export const MEAL_ANNOUNCEMENT = createMeal({
  name: "Tiệc báo hỷ nhà trai",
  eventType: "Cưới hỏi",
  startsAt: "2026-12-20T17:30:00+07:00",
  date: "20/12/2026",
  time: "17:30–20:30",
  address: "108 Lê Văn Việt, Thủ Đức, TP.HCM",
  distanceKm: 17,
  servingTables: 15,
  guestsPerTable: 12,
  setupTables: 8,
  setId: "sumvay",
  services: [withService("don")],
  status: MEAL_STATUS.Planned,
});

export const MEAL_HOUSEWARMING = createMeal({
  name: "Tiệc tân gia",
  eventType: "Tân gia",
  startsAt: "2026-11-22T10:30:00+07:00",
  date: "22/11/2026",
  time: "10:30–13:30",
  address: "57 Phan Xích Long, Phú Nhuận, TP.HCM",
  distanceKm: 6,
  servingTables: 12,
  guestsPerTable: 10,
  setupTables: 6,
  setId: "tatnien",
  services: [withService("don")],
  status: MEAL_STATUS.Preparing,
});

export const MEAL_COMPANY = createMeal({
  name: "Tiệc họp mặt công ty",
  eventType: "Họp mặt",
  startsAt: "2026-10-25T17:00:00+07:00",
  date: "25/10/2026",
  time: "17:00–20:00",
  address: "12 Trường Sa, Phú Nhuận, TP.HCM",
  distanceKm: 5,
  servingTables: 10,
  guestsPerTable: 10,
  setupTables: 10,
  setId: "tatnien",
  services: [withService("don")],
  status: MEAL_STATUS.AwaitingSettlement,
});

export const daysUntil = (iso: string) =>
  Math.floor((new Date(iso).getTime() - DEMO_TODAY.getTime()) / 864e5);

export const CONTRACT_WEDDING: Contract = {
  number: "HD-2026-0142",
  orderCode: "DH-0142",
  status: CONTRACT_STATUS.AwaitingConfirmationAndDeposit,
  meals: [MEAL_WEDDING, MEAL_ANNOUNCEMENT],
  total: MEAL_WEDDING.price.total + MEAL_ANNOUNCEMENT.price.total,
  paid: 0,
  depositDeadline: "06/11/2026 08:30",
};

export const CONTRACT_HOUSEWARMING: Contract = {
  number: "HD-2026-0128",
  orderCode: "DH-0128",
  status: CONTRACT_STATUS.Active,
  meals: [MEAL_HOUSEWARMING],
  total: MEAL_HOUSEWARMING.price.total,
  paid: 18000000,
};

export const CONTRACT_BIRTHDAY: Contract = {
  number: "HD-2026-0089",
  orderCode: "DH-0089",
  status: CONTRACT_STATUS.Completed,
  meals: [
    {
      ...MEAL_COMPANY,
      name: "Tiệc sinh nhật",
      date: "18/10/2026",
      status: MEAL_STATUS.Completed,
    },
  ],
  total: 23328000,
  paid: 23328000,
};

export const CONTRACTS = [
  CONTRACT_WEDDING,
  CONTRACT_HOUSEWARMING,
  CONTRACT_BIRTHDAY,
];

export const contractByNumber = (number: string) =>
  CONTRACTS.find((contract) => contract.number === number);

/** BR10, section 9.2. */
export const CANCELLATION_HOUSEWARMING = calculateCancellation({
  mealValue: MEAL_HOUSEWARMING.price.total,
  paid: CONTRACT_HOUSEWARMING.paid,
  daysLeft: daysUntil(MEAL_HOUSEWARMING.startsAt),
});

/** BR09, section 9.4. */
export const ADDENDUM_HOUSEWARMING = (() => {
  const after = calculateMealPrice({
    dishesTotal: menuSetPrice(menuSetById("tatnien")),
    servingTables: 17,
    guestsPerTable: 10,
    services: MEAL_HOUSEWARMING.services,
  });
  const difference = after.total - MEAL_HOUSEWARMING.price.total;
  return {
    number: "PL-0128-01",
    tablesBefore: 12,
    tablesAfter: 17,
    totalBefore: MEAL_HOUSEWARMING.price.total,
    totalAfter: after.total,
    difference,
    extraDeposit: difference * BUSINESS_SETTINGS.minimumDepositRate,
  };
})();

/** BR11, section 9.5. */
export const SETTLEMENT_COMPANY = (() => {
  const compensation = 90000 + 120000;
  const settlementTotal = MEAL_COMPANY.price.total + compensation;
  const paid = 12000000;
  const refunded = 0;
  return {
    mealValue: MEAL_COMPANY.price.total,
    compensation,
    settlementTotal,
    paid,
    refunded,
    balance: settlementTotal - paid + refunded,
  };
})();
