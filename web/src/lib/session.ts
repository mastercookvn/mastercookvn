import type { Role } from "@/constants/roles";

export const SESSION_COOKIE = "session";

export type Session =
  | { kind: "customer"; name: string; phone: string }
  | { kind: "staff"; name: string; roles: Role[] };

export function encodeSession(session: Session) {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Session;
  } catch {
    return null;
  }
}
