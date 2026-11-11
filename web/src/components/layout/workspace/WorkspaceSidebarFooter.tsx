import Link from "next/link";

import { HomeIcon, LogoutIcon } from "@/components/icons";
import { ROLE_LABEL } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/features/auth/actions";
import { getStaffSession } from "@/lib/auth";

import { ResetDemoButton } from "./ResetDemoButton";

export async function WorkspaceSidebarFooter() {
  const session = await getStaffSession();

  return (
    <div className="workspace-sidebar-foot">
      <div className="workspace-label">
        <b>{session?.name}</b>
        <span>{session?.roles.map((role) => ROLE_LABEL[role]).join(", ")}</span>
      </div>
      <Link href={ROUTES.home} title="Xem trang bán hàng">
        <HomeIcon size={15} />
        <span className="workspace-label">Xem trang bán hàng</span>
      </Link>
      <ResetDemoButton />
      <form action={logout.bind(null, ROUTES.login)}>
        <button type="submit" title="Đăng xuất">
          <LogoutIcon size={15} />
          <span className="workspace-label">Đăng xuất</span>
        </button>
      </form>
    </div>
  );
}
