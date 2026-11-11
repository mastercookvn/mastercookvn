import { cookies } from "next/headers";
import Link from "next/link";

import { LogoMark } from "@/components/brand/LogoMark";
import { canViewScreen } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";
import { getStaffRoles } from "@/lib/auth";

import { WorkspaceBackdrop } from "./WorkspaceBackdrop";
import { WORKSPACE_NAV } from "./workspaceNav";
import { WorkspaceNavLinks, type WorkspaceNavGroup } from "./WorkspaceNavLinks";
import { WorkspaceSidebarFooter } from "./WorkspaceSidebarFooter";
import { WorkspaceSidebarToggle } from "./WorkspaceSidebarToggle";
import { SIDEBAR_COOKIE, SIDEBAR_STATE } from "./sidebarState";

export async function WorkspaceSidebar() {
  const roles = await getStaffRoles();
  const sidebarState =
    (await cookies()).get(SIDEBAR_COOKIE)?.value === SIDEBAR_STATE.Collapsed
      ? SIDEBAR_STATE.Collapsed
      : SIDEBAR_STATE.Expanded;

  const groups: WorkspaceNavGroup[] = WORKSPACE_NAV.map((group) => ({
    label: group.label,
    items: group.items
      .filter((item) => canViewScreen(item.screen, roles))
      .map(({ href, label, icon }) => ({ href, label, icon })),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <aside
        className="workspace-sidebar"
        id="workspace-sidebar"
        data-state={sidebarState}
      >
        <Link href={ROUTES.workspace} className="workspace-logo">
          <LogoMark size={28} />
          <span className="workspace-label">
            <b>MasterCook</b>
            <span>Quản trị vận hành</span>
          </span>
        </Link>
        <WorkspaceNavLinks groups={groups} />
        <WorkspaceSidebarFooter />
      </aside>
      <WorkspaceSidebarToggle initial={sidebarState} />
      <WorkspaceBackdrop />
    </>
  );
}
