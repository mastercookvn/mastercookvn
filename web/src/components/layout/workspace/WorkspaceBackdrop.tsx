"use client";

export function WorkspaceBackdrop() {
  return (
    <div
      className="workspace-backdrop"
      aria-hidden
      onClick={() =>
        document
          .getElementById("workspace-sidebar")
          ?.classList.remove("is-open")
      }
    />
  );
}
