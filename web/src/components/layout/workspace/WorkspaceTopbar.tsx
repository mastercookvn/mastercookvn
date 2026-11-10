import { Suspense } from "react";

import { SearchIcon } from "@/components/icons";

import { WorkspaceBreadcrumb } from "./WorkspaceBreadcrumb";
import { WorkspaceMenuButton } from "./WorkspaceMenuButton";

export function WorkspaceTopbar() {
  return (
    <header className="workspace-topbar">
      <WorkspaceMenuButton />
      <div className="workspace-breadcrumb">
        <Suspense fallback={null}>
          <WorkspaceBreadcrumb />
        </Suspense>
      </div>
      <div className="workspace-search">
        <SearchIcon size={15} />
        <input
          id="global-search"
          type="text"
          className="input"
          placeholder="Tìm mã đơn, hợp đồng, SĐT khách"
          aria-label="Tìm kiếm"
        />
      </div>
    </header>
  );
}
