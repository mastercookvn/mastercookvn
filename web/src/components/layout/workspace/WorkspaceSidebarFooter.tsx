import Link from "next/link";

import { HomeIcon, LogoutIcon } from "@/components/icons";
import { ROLE_LABEL } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/features/auth/actions";
import { getStaffSession } from "@/lib/auth";

import { ResetDemoButton } from "./ResetDemoButton";

/** Utility links first, then who is signed in with sign out beside the name. */
export async function WorkspaceSidebarFooter() {
  const session = await getStaffSession();
  const name = session?.name ?? "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = (
    words.length > 1
      ? `${words[0][0]}${words[words.length - 1][0]}`
      : (words[0]?.slice(0, 2) ?? "")
  ).toUpperCase();
  const roles = session?.roles.map((role) => ROLE_LABEL[role]).join(", ");

  return (
    <div className="workspace-sidebar-foot">
      <nav className="workspace-foot-links" aria-label="Tiện ích">
        <Link href={ROUTES.home} title="Xem trang bán hàng">
          <HomeIcon size={16} />
          <span className="workspace-label">Xem trang bán hàng</span>
        </Link>
        <ResetDemoButton />
      </nav>
      <div className="workspace-user" title={`${name} · ${roles}`}>
        <span className="workspace-avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="workspace-label workspace-user-text">
          <b>{name}</b>
          <span>{roles}</span>
        </span>
        <form action={logout.bind(null, ROUTES.login)}>
          <button
            type="submit"
            className="workspace-icon-button"
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogoutIcon size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
