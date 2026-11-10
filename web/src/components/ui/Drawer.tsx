"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactNode } from "react";

import { CloseIcon } from "@/components/icons";

import { Button } from "./Button";

export const DRAWER_SIZE = { Medium: "md", Large: "lg" } as const;

export type DrawerSize = (typeof DRAWER_SIZE)[keyof typeof DRAWER_SIZE];

/**
 * Every create or edit form in the workspace opens here, so "Thêm ..." always
 * behaves the same way. The form inside owns its fields and validation; the
 * footer submit button targets it through `formId`.
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  formId,
  submitLabel,
  size = DRAWER_SIZE.Medium,
  footerStart,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  formId: string;
  submitLabel: string;
  size?: DrawerSize;
  footerStart?: ReactNode;
  children: ReactNode;
}) {
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialog-backdrop" />
        <BaseDialog.Popup className={`drawer is-${size}`}>
          <header className="drawer-head">
            <div className="l-stack gap-0.5">
              <BaseDialog.Title className="drawer-title">
                {title}
              </BaseDialog.Title>
              {description ? (
                <BaseDialog.Description className="text-small text-soft">
                  {description}
                </BaseDialog.Description>
              ) : null}
            </div>
            <BaseDialog.Close className="drawer-close" aria-label="Đóng">
              <CloseIcon size={20} />
            </BaseDialog.Close>
          </header>
          <div className="drawer-body">{children}</div>
          <footer className="drawer-foot">
            <div className="l-row gap-2">{footerStart}</div>
            <div className="l-row gap-2">
              <BaseDialog.Close className="btn">Hủy</BaseDialog.Close>
              <Button variant="primary" type="submit" form={formId}>
                {submitLabel}
              </Button>
            </div>
          </footer>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
