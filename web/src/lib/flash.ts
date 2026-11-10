/**
 * One-shot notices for actions that end in a redirect, where the page that
 * would show the toast unmounts. The server sets the cookie; the next page
 * shows the notice and clears it.
 */
export const FLASH_COOKIE = "flash";

export type FlashTone = "success" | "error" | "info";

export const FLASH_MESSAGES = {
  login: {
    tone: "success",
    message: "Đăng nhập thành công. Chào mừng {name}!",
  },
  register: {
    tone: "success",
    message: "Đã xác nhận số điện thoại và tạo tài khoản. Chào {name}!",
  },
  logout: { tone: "info", message: "Bạn đã đăng xuất. Hẹn gặp lại!" },
} as const satisfies Record<string, { tone: FlashTone; message: string }>;

export type FlashKey = keyof typeof FLASH_MESSAGES;

type Flash = { key: FlashKey; name?: string };

export function encodeFlash(flash: Flash) {
  return encodeURIComponent(JSON.stringify(flash));
}

export function readFlash(raw: string | undefined) {
  if (!raw) return null;
  try {
    const { key, name } = JSON.parse(decodeURIComponent(raw)) as Flash;
    const entry = FLASH_MESSAGES[key];
    if (!entry) return null;
    return {
      tone: entry.tone,
      message: entry.message.replace("{name}", name || "bạn"),
    };
  } catch {
    return null;
  }
}
