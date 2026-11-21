"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { CloseIcon } from "@/components/icons";
import { formatMoney } from "@/lib/format";
import type { Dish, MenuSet } from "@/models/catalog";

import { ChooseSetButton } from "./ChooseSetButton";
import { MenuSetDishList } from "./MenuSetDishList";

/** The whole card opens it; the trigger's hit area is stretched over the card in CSS. */
export function MenuSetDetailsDialog({
  set,
  dishes,
  price,
}: {
  set: MenuSet;
  dishes: Dish[];
  price: number;
}) {
  const [open, setOpen] = useState(false);
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  return (
    <BaseDialog.Root open={open} onOpenChange={setOpen}>
      <BaseDialog.Trigger className="btn btn-text set-card-open">
        Xem chi tiết {set.dishIds.length} món
      </BaseDialog.Trigger>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialog-backdrop" />
        <BaseDialog.Popup className="dialog dialog-set">
          <header className="dialog-set-head">
            <div className="l-stack gap-1">
              <BaseDialog.Title className="dialog-title">
                {set.name}
              </BaseDialog.Title>
              <BaseDialog.Description className="text-small text-soft">
                {formatMoney(price)} một bàn 10 người · {set.dishIds.length} món
                · {set.suitableFor}
              </BaseDialog.Description>
            </div>
            <BaseDialog.Close className="dialog-close" aria-label="Đóng">
              <CloseIcon size={18} />
            </BaseDialog.Close>
          </header>
          <div className="dialog-set-body">
            {set.description ? (
              <p className="text-small text-soft">{set.description}</p>
            ) : null}
            <MenuSetDishList dishes={dishes} />
          </div>
          <footer className="dialog-set-foot">
            <BaseDialog.Close className="btn">Đóng</BaseDialog.Close>
            <ChooseSetButton setId={set.id} />
          </footer>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
