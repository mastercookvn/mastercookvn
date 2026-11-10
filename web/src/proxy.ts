import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/constants/routes";
import { parseSession, SESSION_COOKIE } from "@/lib/session";

// Optimistic redirects only. Pages and the backend enforce permissions.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);
  const needsStaff = pathname.startsWith(ROUTES.workspace);

  if (session?.kind === "staff" && !needsStaff) {
    return NextResponse.redirect(new URL(ROUTES.workspace, request.url));
  }

  if (!session || (needsStaff && session.kind !== "staff")) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
