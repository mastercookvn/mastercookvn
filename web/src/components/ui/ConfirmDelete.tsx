"use client";

import { Dialog } from "./Dialog";

export type DeleteTarget = { name: string; onConfirm: () => void } | null;

/** Deleting cannot be undone, so every delete in the workspace asks first. */
export function ConfirmDelete({
  target,
  kind,
  onClose,
}: {
  target: DeleteTarget;
  kind: string;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={target !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={`Xóa ${kind}?`}
      confirmLabel="Xóa vĩnh viễn"
      confirmVariant="danger"
      onConfirm={() => {
        target?.onConfirm();
        onClose();
      }}
    >
      <p>
        <b>{target?.name}</b> sẽ bị xóa khỏi danh mục và không khôi phục được.
      </p>
    </Dialog>
  );
}
