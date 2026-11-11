/** How a meal is served. Trays (đặt mâm) are delivered food only, from a single table. */
export const SERVING_FORMAT = {
  Waves: "waves",
  Trays: "trays",
} as const;

export type ServingFormat =
  (typeof SERVING_FORMAT)[keyof typeof SERVING_FORMAT];

export const SERVING_FORMAT_LABEL: Record<ServingFormat, string> = {
  [SERVING_FORMAT.Waves]: "Tiệc có phục vụ",
  [SERVING_FORMAT.Trays]: "Đặt mâm",
};

export const MENU_MODE = {
  Set: "set",
  Custom: "custom",
} as const;

export type MenuMode = (typeof MENU_MODE)[keyof typeof MENU_MODE];

export const BOOKING_STEP = {
  Event: "event",
  Contact: "contact",
  Menu: "menu",
  Services: "services",
  Review: "review",
  Sent: "sent",
} as const;

export type BookingStep = (typeof BOOKING_STEP)[keyof typeof BOOKING_STEP];

/** A tray order is stored as one serving window, so pricing treats trays as eaten tables (BR03). */
export const TRAY_WINDOW_MINUTES = 60;
