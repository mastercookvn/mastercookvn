"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "./Button";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  confirmLabel: string;
  confirmVariant?: ComponentProps<typeof Button>["variant"];
  onConfirm: () => void;
  children: ReactNode;
};

/** M13. Portals into the surface wrapper to keep its tokens. */
export function Dialog({
  open,
  onOpenChange,
  title,
  confirmLabel,
  confirmVariant = "primary",
  onConfirm,
  children,
}: DialogProps) {
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialog-backdrop" />
        <BaseDialog.Popup className="dialog">
          <BaseDialog.Title className="dialog-title">{title}</BaseDialog.Title>
          <div className="l-stack">{children}</div>
          <div className="l-row justify-end">
            <BaseDialog.Close className="btn">Quay lại</BaseDialog.Close>
            <Button
              variant={confirmVariant}
              onClick={() => {
                onOpenChange(false);
                onConfirm();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
