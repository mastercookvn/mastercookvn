import "server-only";

import { cookies } from "next/headers";

import type { Role } from "@/constants/roles";

import { parseSession, SESSION_COOKIE, type Session } from "./session";

// Placeholder until the backend session lands (V11). The cookie holds no secret.
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return parseSession(store.get(SESSION_COOKIE)?.value);
}

export async function getStaffSession() {
  const session = await getSession();
  return session?.kind === "staff" ? session : null;
}

export async function getStaffRoles(): Promise<Role[]> {
  const session = await getStaffSession();
  return session?.roles ?? [];
}
