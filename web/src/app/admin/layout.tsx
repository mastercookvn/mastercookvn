import { Suspense } from "react";

import { WorkspaceSidebar } from "@/components/layout/workspace/WorkspaceSidebar";
import { WorkspaceTopbar } from "@/components/layout/workspace/WorkspaceTopbar";
import { ToastProvider } from "@/components/ui/Toast";

export default function WorkspaceLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div data-surface="workspace">
      <ToastProvider>
        <div className="workspace-frame">
          <Suspense fallback={<aside className="workspace-sidebar" />}>
            <WorkspaceSidebar />
          </Suspense>
          <div className="workspace-body">
            <WorkspaceTopbar />
            <main className="workspace-main">{children}</main>
          </div>
        </div>
      </ToastProvider>
    </div>
  );
}
