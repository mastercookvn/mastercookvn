import Link from "next/link";

import { HomeIcon, LogoutIcon } from "@/components/icons";
import { ROLE_LABEL } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/features/auth/actions";
import { getStaffSession } from "@/lib/auth";

export async function WorkspaceSidebarFooter() {
  const session = await getStaffSession();

  return (
    <div className="workspace-sidebar-foot">
      <div>
        <b>{session?.name}</b>
        <span>{session?.roles.map((role) => ROLE_LABEL[role]).join(", ")}</span>
      </div>
      <Link href={ROUTES.home}>
        <HomeIcon size={15} />
        Xem trang bán hàng
      </Link>
      <form action={logout.bind(null, ROUTES.login)}>
        <button type="submit">
          <LogoutIcon size={15} />
          Đăng xuất
        </button>
      </form>
    </div>
  );
}
