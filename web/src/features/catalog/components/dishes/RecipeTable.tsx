"use client";

import { CloseIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { formatMoney } from "@/lib/format";
import type { Ingredient } from "@/mocks/inventory";

export type DraftRecipeLine = { ingredient: string; quantity: string };

export const parseRecipe = (lines: DraftRecipeLine[]) =>
  lines
    .map((line) => ({
      ingredient: line.ingredient,
      quantity: Number(line.quantity.replace(",", ".")) || 0,
    }))
    .filter((line) => line.ingredient && line.quantity > 0);

/** Định lượng for one standard table; cost uses the current ingredient price. */
export function RecipeTable({
  lines,
  ingredients,
  onChange,
}: {
  lines: DraftRecipeLine[];
  ingredients: Ingredient[];
  onChange: (lines: DraftRecipeLine[]) => void;
}) {
  const priceOf = (name: string) =>
    ingredients.find((ingredient) => ingredient.name === name);
  const update = (index: number, patch: Partial<DraftRecipeLine>) =>
    onChange(
      lines.map((line, i) => (i === index ? { ...line, ...patch } : line))
    );
  const unused =
    ingredients.find(
      (ingredient) => !lines.some((line) => line.ingredient === ingredient.name)
    ) ?? ingredients[0];

  return (
    <div className="l-stack gap-2">
      <div className="recipe-lines">
        <div className="recipe-line is-head" aria-hidden="true">
          <span>Nguyên liệu</span>
          <span className="is-num">Lượng</span>
          <span className="is-num">Giá hiện hành</span>
          <span className="is-num">Chi phí</span>
          <span />
        </div>
        {lines.map((line, index) => {
          const ingredient = priceOf(line.ingredient);
          const quantity = Number(line.quantity.replace(",", ".")) || 0;
          return (
            <div key={index} className="recipe-line">
              <Select
                aria-label={`Nguyên liệu dòng ${index + 1}`}
                options={ingredients.map((option) => option.name)}
                value={line.ingredient}
                onValueChange={(value) => update(index, { ingredient: value })}
              />
              <label className="recipe-quantity">
                <input
                  className="input-cell"
                  inputMode="decimal"
                  aria-label={`Lượng dòng ${index + 1}`}
                  placeholder="0"
                  value={line.quantity}
                  onChange={(event) =>
                    update(index, { quantity: event.target.value })
                  }
                />
                <span>{ingredient?.unit}</span>
              </label>
              <span className="is-num text-soft">
                {ingredient ? formatMoney(ingredient.price) : "Chưa có giá"}
              </span>
              <b className="is-num">
                {formatMoney(quantity * (ingredient?.price ?? 0))}
              </b>
              <Button
                size="sm"
                variant="text"
                aria-label={`Xóa dòng ${index + 1}`}
                onClick={() => onChange(lines.filter((_, i) => i !== index))}
              >
                <CloseIcon size={16} />
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        size="sm"
        className="self-start"
        disabled={ingredients.length === 0}
        onClick={() =>
          onChange([...lines, { ingredient: unused?.name ?? "", quantity: "" }])
        }
      >
        <PlusIcon size={16} />
        Thêm nguyên liệu
      </Button>
    </div>
  );
}
