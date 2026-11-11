"use client";

import { useState } from "react";

import { ChevronLeftIcon } from "@/components/icons";

import {
  SIDEBAR_COOKIE,
  SIDEBAR_STATE,
  type SidebarState,
} from "./sidebarState";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function WorkspaceSidebarToggle({ initial }: { initial: SidebarState }) {
  const [state, setState] = useState(initial);
  const collapsed = state === SIDEBAR_STATE.Collapsed;

  const toggle = () => {
    const next = collapsed ? SIDEBAR_STATE.Expanded : SIDEBAR_STATE.Collapsed;
    setState(next);
    document
      .getElementById("workspace-sidebar")
      ?.setAttribute("data-state", next);
    document.cookie = `${SIDEBAR_COOKIE}=${next}; path=/admin; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  };

  return (
    <button
      type="button"
      className="workspace-sidebar-toggle"
      aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
      aria-controls="workspace-sidebar"
      aria-expanded={!collapsed}
      title={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
      onClick={toggle}
    >
      <ChevronLeftIcon size={16} />
    </button>
  );
}
