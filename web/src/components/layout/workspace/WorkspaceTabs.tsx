import type { ReactNode } from "react";

import { Tabs } from "@/components/ui/Tabs";
import {
  canViewScreen,
  visibleTabs,
  type WorkspaceScreenKey,
} from "@/constants/permissions";
import { getStaffRoles } from "@/lib/auth";

import { NoPermissionState } from "./NoPermissionState";
import { PageHeader } from "./PageHeader";

/** Hidden tabs never reach the browser. The API still checks permissions. */
export async function WorkspaceTabs({
  screen,
  panels,
  showTitle = true,
  header,
  headerGap = "gap-2",
  only,
}: {
  screen: WorkspaceScreenKey;
  panels: Record<string, ReactNode>;
  showTitle?: boolean;
  header?: ReactNode;
  headerGap?: string;
  /** Tabs that apply to this record's stage; role filtering still applies. */
  only?: readonly string[];
}) {
  const roles = await getStaffRoles();
  const tabs = visibleTabs(screen, roles).filter(
    (tab) => !only || only.includes(tab.value)
  );

  if (!canViewScreen(screen, roles) || tabs.length === 0) {
    return <NoPermissionState roles={roles} />;
  }

  const title = (
    <>
      {showTitle ? <PageHeader screen={screen} /> : null}
      {header}
    </>
  );

  if (tabs.length === 1) {
    return (
      <>
        <div className={`l-stack ${headerGap}`}>{title}</div>
        <div className="workspace-panel">{panels[tabs[0].value]}</div>
      </>
    );
  }

  return (
    <Tabs
      items={tabs.map(({ value, label }) => ({ value, label }))}
      panelClassName="tab-panel workspace-panel"
      panels={Object.fromEntries(
        tabs.map((tab) => [tab.value, panels[tab.value]])
      )}
      headerClassName={`l-stack ${headerGap}`}
      header={title}
    />
  );
}
