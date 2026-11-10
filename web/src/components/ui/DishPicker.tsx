"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { BowlIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/format";
import { DISH_CATEGORY_LABEL, dishPhoto } from "@/mocks/catalog";
import type { CatalogDish } from "@/mocks/demoStore";

const MAX_RESULTS = 8;

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

function DishThumb({ dish }: { dish: CatalogDish }) {
  const photo = dishPhoto(dish);
  return (
    <span className="dish-thumb">
      {photo ? (
        <Image src={photo} alt="" fill sizes="44px" className="object-cover" />
      ) : (
        <BowlIcon size={18} />
      )}
    </span>
  );
}

/** Search-as-you-type picker; a long menu never needs a wall of checkboxes. */
export function DishPicker({
  dishes,
  selectedIds,
  onChange,
  label = "Tìm món để thêm vào set",
  emptyText = "Chưa chọn món nào.",
}: {
  dishes: CatalogDish[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label?: string;
  emptyText?: string;
}) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const needle = normalize(query.trim());
  const results = dishes
    .filter((dish) => !selectedIds.includes(dish.id))
    .filter(
      (dish) =>
        needle === "" ||
        normalize(
          `${dish.name} ${DISH_CATEGORY_LABEL[dish.category]}`
        ).includes(needle)
    )
    .slice(0, MAX_RESULTS);
  const selected = selectedIds
    .map((id) => dishes.find((dish) => dish.id === id))
    .filter((dish): dish is CatalogDish => dish !== undefined);

  const add = (dish: CatalogDish) => {
    onChange([...selectedIds, dish.id]);
    setQuery("");
    setHighlight(0);
  };

  return (
    <div className="dish-picker">
      <div className="dish-picker-search">
        <SearchIcon size={16} />
        <input
          className="input"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-label={label}
          placeholder="Tìm món theo tên hoặc loại, ví dụ: lẩu"
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
          <ul id={listId} role="listbox" className="dish-picker-list">
            {results.map((dish, index) => (
              <li
                key={dish.id}
                role="option"
                aria-selected={index === highlight}
                className="dish-option"
                onMouseEnter={() => setHighlight(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  add(dish);
                }}
              >
                <DishThumb dish={dish} />
                <span className="l-stack min-w-0 gap-0">
                  <b>{dish.name}</b>
                  <small>{DISH_CATEGORY_LABEL[dish.category]}</small>
                </span>
                <span className="dish-option-price">
                  {formatMoney(dish.price)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {open && needle !== "" && results.length === 0 ? (
          <p className="dish-picker-list dish-picker-empty">
            Không có món nào khớp “{query.trim()}”.
          </p>
        ) : null}
      </div>

      {selected.length === 0 ? (
        <p className="text-small text-soft">{emptyText}</p>
      ) : (
        <ol className="dish-chosen">
          {selected.map((dish) => (
            <li key={dish.id} className="dish-option">
              <DishThumb dish={dish} />
              <span className="l-stack min-w-0 gap-0">
                <b>{dish.name}</b>
                <small>{DISH_CATEGORY_LABEL[dish.category]}</small>
              </span>
              <span className="dish-option-price">
                {formatMoney(dish.price)}
              </span>
              <Button
                size="sm"
                variant="text"
                aria-label={`Bỏ ${dish.name}`}
                onClick={() =>
                  onChange(selectedIds.filter((id) => id !== dish.id))
                }
              >
                <CloseIcon size={16} />
              </Button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
