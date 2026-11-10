"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Mascot, type MascotMood } from "@/components/brand/Mascot";
import { CloseIcon } from "@/components/icons";
import { FLASH_COOKIE, readFlash, type FlashTone } from "@/lib/flash";

export type ToastTone = FlashTone;

const TOAST_MS = { success: 3200, info: 3600, error: 5200 } as const;

const MOOD: Record<ToastTone, MascotMood> = {
  success: "happy",
  info: "info",
  error: "oops",
};

type Toast = { id: number; message: string; tone: ToastTone };

type ShowToast = (message: string, tone?: ToastTone) => void;

const ToastContext = createContext<ShowToast>(() => {});

function readFlashCookie() {
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${FLASH_COOKIE}=`))
    ?.slice(FLASH_COOKIE.length + 1);
  if (raw === undefined) return null;
  document.cookie = `${FLASH_COOKIE}=; Max-Age=0; path=/`;
  return readFlash(raw);
}

/** Shows the notice left by a server action that redirected here. */
function FlashListener({ show }: { show: ShowToast }) {
  const pathname = usePathname();
  useEffect(() => {
    const flash = readFlashCookie();
    if (flash) show(flash.message, flash.tone);
  }, [pathname, show]);
  return null;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const nextId = useRef(0);

  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback<ShowToast>((message, tone = "success") => {
    clearTimeout(timer.current);
    nextId.current += 1;
    setToast({ id: nextId.current, message, tone });
    timer.current = setTimeout(() => setToast(null), TOAST_MS[tone]);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <FlashListener show={show} />
      {toast ? (
        <div
          key={toast.id}
          className={`toast toast-${toast.tone}`}
          role={toast.tone === "error" ? "alert" : "status"}
        >
          <Mascot mood={MOOD[toast.tone]} size={68} className="toast-mascot" />
          <p className="toast-bubble">{toast.message}</p>
          <button
            type="button"
            className="toast-close"
            aria-label="Đóng thông báo"
            onClick={dismiss}
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

/** `showToast(message, tone?)`: tone defaults to "success". */
export function useToast() {
  return useContext(ToastContext);
}
