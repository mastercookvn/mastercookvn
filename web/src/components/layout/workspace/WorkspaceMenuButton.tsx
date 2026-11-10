"use client";

import { BurgerIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export function WorkspaceMenuButton() {
  return (
    <Button
      size="sm"
      className="workspace-menu-button"
      aria-label="Mở menu"
      onClick={() =>
        document
          .getElementById("workspace-sidebar")
          ?.classList.toggle("is-open")
      }
    >
      <BurgerIcon size={15} />
    </Button>
  );
}
