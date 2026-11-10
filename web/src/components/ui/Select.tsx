"use client";

import { Select as BaseSelect } from "@base-ui/react/select";

import { CheckIcon, ChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type SelectOption = string | { value: string; label: string };

export type SelectProps = {
  id?: string;
  name?: string;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Styled listbox. Portals into the surface wrapper so it keeps its tokens. */
export function Select({
  id,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Chọn",
  disabled,
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  const items = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );
  const container =
    typeof document === "undefined"
      ? undefined
      : (document.querySelector<HTMLElement>("[data-surface]") ?? undefined);

  return (
    <BaseSelect.Root
      items={items}
      name={name}
      value={value === "" ? null : value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(next) => {
        if (typeof next === "string") onValueChange?.(next);
      }}
    >
      <BaseSelect.Trigger
        id={id}
        aria-label={ariaLabel}
        className={cn("input select-trigger", className)}
      >
        <BaseSelect.Value className="select-value" placeholder={placeholder} />
        <BaseSelect.Icon className="select-icon">
          <ChevronIcon size={16} className="rotate-90" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal container={container}>
        <BaseSelect.Positioner
          className="select-positioner"
          sideOffset={6}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="select-popup">
            <BaseSelect.List>
              {items.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  className="select-item"
                >
                  <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="select-check">
                    <CheckIcon size={15} />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
