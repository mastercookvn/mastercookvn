"use client";

// In-memory placeholder for backend state, kept in localStorage so a reload or a
// second tab (staff and customer side by side) sees the same sample data.
import { useSyncExternalStore } from "react";

import {
  MENU_MODE,
  SERVING_FORMAT,
  type MenuMode,
  type ServingFormat,
} from "@/constants/booking";
import {
  MEAL_STATUS,
  SETTLEMENT_STATUS,
  type MealStatus,
  type OrderStatus,
  type PaymentPurpose,
  type SettlementStatus,
} from "@/constants/statuses";
import type { MediaKey } from "@/lib/media";
import type { ServingWave } from "@/lib/servingWaves";

import {
  DISHES,
  EVENT_TYPES,
  MENU_SETS,
  SERVICES,
  type Dish,
  type MenuSet,
  type Service,
} from "./catalog";
import {
  EQUIPMENT,
  type CountReport,
  type EquipmentPurchase,
} from "./equipment";
import { DISH_RECIPES, INGREDIENTS, type Purchase } from "./inventory";
import { MEAL_ASSIGNMENTS } from "./operationMeals";
import {
  STAFF,
  STAFF_ACCOUNTS,
  type StaffAccount,
  type StaffMember,
} from "./people";

export type EstimateMeal = {
  format: ServingFormat;
  name: string;
  /** Solar date, dd/MM/yyyy. A lunar pick is converted before it lands here. */
  date: string;
  address: string;
  guestsPerTable: number;
  /** Trays keep a single entry: delivery window and number of trays. */
  waves: ServingWave[];
  mode: MenuMode;
  setId: string;
  dishIds: string[];
  serviceIds: string[];
};

export type CatalogDish = Dish & {
  active: boolean;
};

export type BookingContact = {
  name: string;
  phone: string;
  note: string;
};

/** Amount the customer locked in before the QR code is shown. */
export type PaymentIntent = {
  purpose: PaymentPurpose;
  amount: number;
  reference: string;
  createdAt: string;
};

/** An order the customer sent from the booking page, before any contract. */
export type SubmittedOrder = {
  code: string;
  submittedAt: string;
  eventType: string;
  contact?: BookingContact;
  meals: EstimateMeal[];
  total: number;
};

const DEFAULT_DISH_IDS = ["goi", "chagio", "ga", "bo", "lauthai", "traicay"];

const INITIAL_STATE = {
  estimate: [
    {
      format: SERVING_FORMAT.Waves,
      name: "Tiệc cưới nhà gái",
      date: "14/12/2026",
      address: "24 Nguyễn Gia Trí, Bình Thạnh, TP.HCM",
      guestsPerTable: 10,
      waves: [
        { from: "11:00", to: "12:00", tables: 10 },
        { from: "12:00", to: "13:00", tables: 10 },
        { from: "13:00", to: "14:00", tables: 10 },
      ],
      mode: MENU_MODE.Set,
      setId: "hysu",
      dishIds: DEFAULT_DISH_IDS,
      serviceIds: ["don", "cong"],
    },
  ] as EstimateMeal[],
  contractConfirmed: false,
  depositPaid: false,
  depositPaidAmount: 0,
  paymentIntents: {} as Record<string, PaymentIntent>,
  settlementStatus: SETTLEMENT_STATUS.Draft as SettlementStatus,
  settlementPaidAmount: 0,
  paymentVouchers: ["CT-1104-01", "CT-1104-02"],
  addendumConfirmed: false,
  /** Meal size and value after an applied addendum, by contract number (BR09). */
  appliedAddenda: {} as Record<string, { tables: number; total: number }>,
  mealCancelled: false,
  reviewSubmitted: false,
  /** Consultant decisions by order code; missing means the sample status. */
  orderStatuses: {} as Record<string, OrderStatus>,
  /** Surveyed distance by `${orderCode}:${mealIndex}` (BR01, BR07). */
  surveyDistances: {} as Record<string, number>,
  simulateShortage: false,
  contractIssued: false,
  paperSigned: false,
  periodClosed: false,
  priceDecisions: {} as Record<number, string>,
  mealStatuses: {
    "0120": MEAL_STATUS.AwaitingCount,
    "0115": MEAL_STATUS.Confirmed,
    "0128": MEAL_STATUS.Preparing,
  } as Record<string, MealStatus>,
  equipmentIssued: {} as Record<string, boolean>,
  assignments: MEAL_ASSIGNMENTS,
  dishes: DISHES.map((dish) => ({ ...dish, active: true })) as CatalogDish[],
  menuSets: MENU_SETS as MenuSet[],
  services: SERVICES as Service[],
  eventTypes: EVENT_TYPES as string[],
  staff: STAFF as StaffMember[],
  staffAccounts: STAFF_ACCOUNTS as StaffAccount[],
  ingredients: INGREDIENTS,
  recipes: DISH_RECIPES,
  purchases: [] as Purchase[],
  equipment: EQUIPMENT,
  equipmentPurchases: [] as EquipmentPurchase[],
  countReports: {} as Record<string, CountReport>,
  /** Customer's drawn signature when confirming the contract online. */
  contractSignature: null as null | {
    name: string;
    image: string;
    signedAt: string;
  },
  /** Photos uploaded in this browser, by media key, until the presigned upload API exists. */
  mediaUploads: {} as Record<MediaKey, string>,
  bookingEventType: "Cưới hỏi",
  bookingContact: { name: "", phone: "", note: "" } as BookingContact,
  submittedOrders: [] as SubmittedOrder[],
};

export type DemoState = typeof INITIAL_STATE;

const DRAFT_KEY = "mastercook.estimate-draft.v3";
const STATE_KEY = "mastercook.demo-state.v2";

let state = INITIAL_STATE;
let loaded = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

function readSavedState(): Partial<DemoState> {
  try {
    const saved = window.localStorage.getItem(STATE_KEY);
    return saved ? (JSON.parse(saved) as Partial<DemoState>) : {};
  } catch (error) {
    console.warn("Ignoring unreadable demo state", error);
    return {};
  }
}

function loadSavedState() {
  if (loaded) return;
  loaded = true;
  state = { ...state, ...readSavedState() };
  try {
    const draft = window.localStorage.getItem(DRAFT_KEY);
    if (draft)
      state = { ...state, estimate: JSON.parse(draft) as EstimateMeal[] };
  } catch (error) {
    console.warn("Ignoring unreadable estimate draft", error);
  }
  window.addEventListener("storage", (event) => {
    if (event.key !== STATE_KEY) return;
    state = { ...INITIAL_STATE, estimate: state.estimate, ...readSavedState() };
    notify();
  });
}

function saveState() {
  const { estimate, ...rest } = state;
  try {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(rest));
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(estimate));
  } catch (error) {
    // Usually the storage quota after several photo uploads; the state stays in memory.
    console.warn("Could not save demo state", error);
  }
}

function subscribe(listener: () => void) {
  loadSavedState();
  listeners.add(listener);
  listener();
  return () => {
    listeners.delete(listener);
  };
}

export function updateDemoState(patch: Partial<DemoState>) {
  state = { ...state, ...patch };
  saveState();
  notify();
}

/** Returns the current state, for event handlers that build the next patch. */
export function readDemoState(): DemoState {
  return state;
}

export function resetDemoState() {
  state = INITIAL_STATE;
  saveState();
  notify();
}

export function useDemoState<T>(selector: (current: DemoState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(INITIAL_STATE)
  );
}

/** False until this browser's saved state is read, so pages do not report missing records too early. */
export function useDemoLoaded(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => loaded,
    () => false
  );
}

export function selectEstimateSet(setId: string) {
  const [first, ...rest] = state.estimate;
  updateDemoState({
    estimate: [{ ...first, mode: MENU_MODE.Set, setId }, ...rest],
  });
}

export const paymentIntentKey = (
  contractNumber: string,
  purpose: PaymentPurpose
) => `${contractNumber}:${purpose}`;

export const NEW_ESTIMATE_MEAL: EstimateMeal = {
  format: SERVING_FORMAT.Waves,
  name: "",
  date: "20/12/2026",
  address: "",
  guestsPerTable: 10,
  waves: [{ from: "17:30", to: "20:30", tables: 10 }],
  mode: MENU_MODE.Set,
  setId: "sumvay",
  dishIds: [],
  serviceIds: ["don"],
};

export { DEFAULT_DISH_IDS };
