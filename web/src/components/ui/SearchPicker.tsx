"use client";

import { useId, useState, type ReactNode } from "react";

import { CloseIcon, SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { formatMoney } from "@/lib/format";
import type { MediaKey } from "@/lib/media";

const MAX_RESULTS = 8;

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

export type PickerOption = {
  id: string;
  name: string;
  meta: string;
  price: number;
  priceUnit?: string;
  imageKey?: MediaKey;
};

function PickerRow({
  option,
  fallbackIcon,
  children,
}: {
  option: PickerOption;
  fallbackIcon: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <span className="picker-thumb">
        <MediaImage
          imageKey={option.imageKey}
          alt=""
          sizes="44px"
          fallback={fallbackIcon}
        />
      </span>
      <span className="l-stack min-w-0 gap-0">
        <b>{option.name}</b>
        <small>{option.meta}</small>
      </span>
      <span className="picker-option-price">
        {formatMoney(option.price)}
        {option.priceUnit ? <small> / {option.priceUnit}</small> : null}
      </span>
      {children}
    </>
  );
}

/** Search-as-you-type dropdown with photos; a long catalogue never needs a wall of checkboxes. */
export function SearchPicker({
  options,
  selectedIds,
  onChange,
  label,
  placeholder,
  emptyText,
  fallbackIcon,
}: {
  options: PickerOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label: string;
  placeholder: string;
  emptyText: string;
  fallbackIcon: ReactNode;
}) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const needle = normalize(query.trim());
  const results = options
    .filter((option) => !selectedIds.includes(option.id))
    .filter(
      (option) =>
        needle === "" ||
        normalize(`${option.name} ${option.meta}`).includes(needle)
    )
    .slice(0, MAX_RESULTS);
  const selected = selectedIds
    .map((id) => options.find((option) => option.id === id))
    .filter((option): option is PickerOption => option !== undefined);

  const add = (option: PickerOption) => {
    onChange([...selectedIds, option.id]);
    setQuery("");
    setHighlight(0);
  };

  return (
    <div className="search-picker">
      <div className="search-picker-field">
        <SearchIcon size={16} />
        <input
          className="input"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-label={label}
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setHighlight(Math.min(highlight + 1, results.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setHighlight(Math.max(highlight - 1, 0));
            } else if (event.key === "Enter" && results[highlight]) {
              event.preventDefault();
              add(results[highlight]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {open && results.length > 0 ? (
          <ul id={listId} role="listbox" className="search-picker-list">
            {results.map((option, index) => (
              <li
                key={option.id}
                role="option"
                aria-selected={index === highlight}
                className="picker-option"
                onMouseEnter={() => setHighlight(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  add(option);
                }}
              >
                <PickerRow option={option} fallbackIcon={fallbackIcon} />
              </li>
            ))}
          </ul>
        ) : null}
        {open && needle !== "" && results.length === 0 ? (
          <p className="search-picker-list search-picker-empty">
            Không có kết quả khớp “{query.trim()}”.
          </p>
        ) : null}
      </div>

      {selected.length === 0 ? (
        <p className="text-small text-soft">{emptyText}</p>
      ) : (
        <ol className="picker-chosen">
          {selected.map((option) => (
            <li key={option.id} className="picker-option">
              <PickerRow option={option} fallbackIcon={fallbackIcon}>
                <Button
                  size="sm"
                  variant="text"
                  aria-label={`Bỏ ${option.name}`}
                  onClick={() =>
                    onChange(selectedIds.filter((id) => id !== option.id))
                  }
                >
                  <CloseIcon size={16} />
                </Button>
              </PickerRow>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
