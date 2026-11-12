"use client";

import { Menu } from "@base-ui/react/menu";

import { MoreIcon } from "@/components/icons";

export type RowMenuItem = {
  label: string;
  onSelect: () => void;
  danger?: boolean;
  disabled?: boolean;
};

/** The "⋯" actions of one row: edit, deactivate, delete. Never triggers the row click. */
export function RowMenu({
  label,
  items,
}: {
  label: string;
  items: RowMenuItem[];
}) {
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  return (
    <span
      className="row-menu"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <Menu.Root>
        <Menu.Trigger className="row-menu-trigger" aria-label={label}>
          <MoreIcon size={18} />
        </Menu.Trigger>
        <Menu.Portal container={container}>
          <Menu.Positioner
            className="select-positioner"
            sideOffset={4}
            align="end"
          >
            <Menu.Popup className="select-popup row-menu-popup">
              {items.map((item) => (
                <Menu.Item
                  key={item.label}
                  className={
                    item.danger ? "select-item row-menu-danger" : "select-item"
                  }
                  disabled={item.disabled}
                  onClick={item.onSelect}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </span>
  );
}
