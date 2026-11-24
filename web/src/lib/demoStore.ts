"use client";

// In-memory placeholder for backend state, kept in localStorage so a reload or a
// second tab (staff and customer side by side) sees the same records.
import { useSyncExternalStore } from "react";

import {
  MENU_MODE,
  SERVING_FORMAT,
  type MenuMode,
  type ServingFormat,
} from "@/constants/booking";
import {
  SETTLEMENT_STATUS,
  type MealStatus,
  type OrderStatus,
  type PaymentPurpose,
  type SettlementStatus,
} from "@/constants/statuses";
import type { PriceProposalDecision } from "@/constants/priceProposal";
import type { RecipeLine } from "@/lib/pricing";
import type { MediaKey } from "@/lib/media";
import type { ServingWave } from "@/lib/servingWaves";

import type { CatalogDish, MenuSet, Service } from "@/models/catalog";
import type {
  CountReport,
  EquipmentPurchase,
  EquipmentType,
} from "@/models/equipment";
import type { Ingredient, Purchase } from "@/models/inventory";
import type { Assignment } from "@/models/operations";
import type { Staff, StaffAccount } from "@/models/people";

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

export type BookingContact = {
  name: string;
  phone: string;
  note: string;
};

/** Amount the customer locked in before the QR code is shown. */
export type PaymentIntent = {
  purpose: PaymentPurpose;
  amount: number;
  /** Transfer content of the pending transaction the current QR pays (BR08). */
  reference: string;
  createdAt: string;
  /** Epoch ms after which the QR is void and a new one is needed (TS07). */
  qrExpiresAt?: number;
};

/** An order the customer sent from the booking page, before any contract. */
export type SubmittedOrder = {
  code: string;
  /** Idempotency key of the submission that created it; a resend returns this order. */
  submissionKey: string;
  submittedAt: string;
  eventType: string;
  contact?: BookingContact;
  meals: EstimateMeal[];
  total: number;
};

const NEW_ESTIMATE_MEAL: EstimateMeal = {
  format: SERVING_FORMAT.Waves,
  name: "",
  date: "",
  address: "",
  guestsPerTable: 10,
  waves: [{ from: "17:30", to: "20:30", tables: 10 }],
  mode: MENU_MODE.Set,
  setId: "",
  dishIds: [],
  serviceIds: [],
};

const INITIAL_STATE = {
  estimate: [NEW_ESTIMATE_MEAL],
  contractConfirmed: false,
  depositPaid: false,
  depositPaidAmount: 0,
  paymentIntents: {} as Record<string, PaymentIntent>,
  settlementStatus: SETTLEMENT_STATUS.Draft as SettlementStatus,
  settlementPaidAmount: 0,
  paymentVouchers: [] as string[],
  addendumConfirmed: false,
  /** Meal size and value after an applied addendum, by contract number (BR09). */
  appliedAddenda: {} as Record<string, { tables: number; total: number }>,
  mealCancelled: false,
  reviewSubmitted: false,
  /** Consultant decisions by order code; missing means the sample status. */
  orderStatuses: {} as Record<string, OrderStatus>,
  /** Surveyed distance by `${orderCode}:${mealIndex}` (BR01, BR07). */
  surveyDistances: {} as Record<string, number>,
  contractIssued: false,
  paperSigned: false,
  periodClosed: false,
  priceDecisions: {} as Record<number, PriceProposalDecision>,
  mealStatuses: {} as Record<string, MealStatus>,
  equipmentIssued: {} as Record<string, boolean>,
  assignments: {} as Record<string, Assignment[]>,
  dishes: [] as CatalogDish[],
  menuSets: [] as MenuSet[],
  services: [] as Service[],
  eventTypes: [] as string[],
  staff: [] as Staff[],
  staffAccounts: [] as StaffAccount[],
  ingredients: [] as Ingredient[],
  recipes: {} as Record<string, RecipeLine[]>,
  purchases: [] as Purchase[],
  equipment: [] as EquipmentType[],
  equipmentPurchases: [] as EquipmentPurchase[],
  countReports: {} as Record<string, CountReport>,
  /** BR08: online confirmation is the signed-in account agreeing to one contract version. */
  contractConfirmation: null as null | {
    accountName: string;
    accountPhone: string;
    version: number;
    confirmedAt: string;
  },
  /** Photos uploaded in this browser, by media key, until the presigned upload API exists. */
  mediaUploads: {} as Record<MediaKey, string>,
  bookingEventType: "",
  bookingContact: { name: "", phone: "", note: "" } as BookingContact,
  submittedOrders: [] as SubmittedOrder[],
  /** Kept across retries of one booking until it is accepted, so a resend cannot create a second order. */
  bookingSubmissionKey: null as string | null,
};

export type DemoState = typeof INITIAL_STATE;

const DRAFT_KEY = "mastercook.estimate-draft.v4";
const STATE_KEY = "mastercook.demo-state.v4";

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

export { NEW_ESTIMATE_MEAL };
