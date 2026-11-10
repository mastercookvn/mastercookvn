import type { ReactNode } from "react";

import { Tabs } from "@/components/ui/Tabs";
import {
  WORKSPACE_SCREENS,
  canViewScreen,
  visibleTabs,
  type WorkspaceScreenKey,
} from "@/constants/permissions";
import { getStaffRoles } from "@/lib/auth";

import { NoPermissionState } from "./NoPermissionState";

/** Hidden tabs never reach the browser. The API still checks permissions. */
export async function WorkspaceTabs({
  screen,
  panels,
  showTitle = true,
  header,
  headerGap = "gap-2",
}: {
  screen: WorkspaceScreenKey;
  panels: Record<string, ReactNode>;
  showTitle?: boolean;
  header?: ReactNode;
  headerGap?: string;
}) {
  const roles = await getStaffRoles();
  const tabs = visibleTabs(screen, roles);

  if (!canViewScreen(screen, roles) || tabs.length === 0) {
    return <NoPermissionState roles={roles} />;
  }

  return (
    <Tabs
      items={tabs.map(({ value, label }) => ({ value, label }))}
      panelClassName="tab-panel workspace-panel"
      panels={Object.fromEntries(
        tabs.map((tab) => [tab.value, panels[tab.value]]),
      )}
      headerClassName={`l-stack ${headerGap}`}
      header={
        <>
          {showTitle ? (
            <h1 className="h1-compact">{WORKSPACE_SCREENS[screen].title}</h1>
          ) : null}
          {header}
        </>
      }
    />
  );
}
