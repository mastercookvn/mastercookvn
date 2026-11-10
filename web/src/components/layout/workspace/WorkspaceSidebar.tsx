import Link from "next/link";

import { LogoMark } from "@/components/brand/LogoMark";
import { canViewScreen } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";
import { getStaffRoles } from "@/lib/auth";

import { WorkspaceBackdrop } from "./WorkspaceBackdrop";
import { WORKSPACE_NAV } from "./workspaceNav";
import { WorkspaceNavLinks, type WorkspaceNavGroup } from "./WorkspaceNavLinks";
import { WorkspaceSidebarFooter } from "./WorkspaceSidebarFooter";

export async function WorkspaceSidebar() {
  const roles = await getStaffRoles();

  const groups: WorkspaceNavGroup[] = WORKSPACE_NAV.map((group) => ({
    label: group.label,
    items: group.items
      .filter((item) => canViewScreen(item.screen, roles))
      .map(({ href, label, icon }) => ({ href, label, icon })),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <aside className="workspace-sidebar" id="workspace-sidebar">
        <Link href={ROUTES.workspace} className="workspace-logo">
          <LogoMark size={28} tone="dark" />
          <span>
            <b>MasterCook</b>
            <span>Quản trị vận hành</span>
          </span>
        </Link>
        <WorkspaceNavLinks groups={groups} />
        <WorkspaceSidebarFooter />
      </aside>
      <WorkspaceBackdrop />
    </>
  );
}
