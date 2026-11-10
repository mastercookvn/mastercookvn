"use client";

import { CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { formatMoney } from "@/lib/format";
import {
  INGREDIENT_UNITS,
  purchaseTotal,
  type Ingredient,
} from "@/mocks/inventory";

import { PriceDeviationFlag } from "./PriceDeviationFlag";

export type DraftLine = {
  ingredient: string;
  unit: string;
  quantity: string;
  price: string;
};

const toNumber = (text: string) => Number(text.replace(",", ".")) || 0;

export const sameName = (first: string, second: string) =>
  first.trim().toLowerCase() === second.trim().toLowerCase();

export const parseLines = (lines: DraftLine[]) =>
  lines.map((line) => ({
    ingredient: line.ingredient.trim(),
    unit: line.unit,
    quantity: toNumber(line.quantity),
    price: Number(line.price.replace(/\D/g, "")) || 0,
  }));

/** The storekeeper types what was bought; a known name only pre-fills unit and price. */
export function PurchaseLinesTable({
  lines,
  ingredients,
  onChange,
}: {
  lines: DraftLine[];
  ingredients: Ingredient[];
  onChange: (lines: DraftLine[]) => void;
}) {
  const parsed = parseLines(lines);
  const ingredientOf = (name: string) =>
    ingredients.find((ingredient) => sameName(ingredient.name, name));
  const update = (index: number, patch: Partial<DraftLine>) =>
    onChange(
      lines.map((line, i) => (i === index ? { ...line, ...patch } : line))
    );

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">Nguyên liệu mua</h3>
      <div className="purchase-lines">
        <div className="purchase-line is-ingredient is-head" aria-hidden="true">
          <span>Tên nguyên liệu</span>
          <span>Đơn vị</span>
          <span className="is-num">Lượng</span>
          <span className="is-num">Đơn giá (đ)</span>
          <span className="is-num">Thành tiền</span>
          <span />
        </div>
        {lines.map((line, index) => {
          const known = line.ingredient.trim()
            ? ingredientOf(line.ingredient)
            : undefined;
          const duplicate =
            line.ingredient.trim() !== "" &&
            lines.findIndex((other) =>
              sameName(other.ingredient, line.ingredient)
            ) !== index;
          return (
            <div key={index} className="purchase-line is-ingredient">
              <label className="purchase-line-field purchase-line-name">
                <span>Tên nguyên liệu</span>
                <input
                  className={
                    line.ingredient === "" || line.ingredient.trim()
                      ? "input-cell"
                      : "input-cell has-error"
                  }
                  placeholder="Ví dụ: Mực ống"
                  value={line.ingredient}
                  onChange={(event) => {
                    const match = ingredientOf(event.target.value);
                    update(index, {
                      ingredient: event.target.value,
                      ...(match
                        ? { unit: match.unit, price: String(match.price) }
                        : {}),
                    });
                  }}
                />
                {duplicate ? (
                  <small className="field-error">Trùng dòng phía trên</small>
                ) : line.ingredient.trim() === "" ? null : known ? (
                  <small className="text-soft">
                    Giá hiện hành {formatMoney(known.price)} / {known.unit}{" "}
                    <PriceDeviationFlag
                      price={parsed[index].price}
                      current={known.price}
                    />
                  </small>
                ) : (
                  <small className="text-soft">
                    Nguyên liệu mới, sẽ thêm vào danh mục khi lưu.
                  </small>
                )}
              </label>
              <label className="purchase-line-field">
                <span>Đơn vị</span>
                <Select
                  aria-label={`Đơn vị dòng ${index + 1}`}
                  options={INGREDIENT_UNITS}
                  value={line.unit}
                  onValueChange={(unit) => update(index, { unit })}
                />
              </label>
              <label className="purchase-line-field">
                <span>Lượng</span>
                <input
                  inputMode="decimal"
                  className={
                    line.quantity === "" || parsed[index].quantity > 0
                      ? "input-cell"
                      : "input-cell has-error"
                  }
                  placeholder="0"
                  value={line.quantity}
                  onChange={(event) =>
                    update(index, { quantity: event.target.value })
                  }
                />
              </label>
              <label className="purchase-line-field">
                <span>Đơn giá (đ)</span>
                <input
                  inputMode="numeric"
                  className={
                    line.price === "" || parsed[index].price > 0
                      ? "input-cell"
                      : "input-cell has-error"
                  }
                  placeholder="0"
                  value={line.price}
                  onChange={(event) =>
                    update(index, { price: event.target.value })
                  }
                />
              </label>
              <span className="purchase-line-total">
                {formatMoney(parsed[index].quantity * parsed[index].price)}
              </span>
              <Button
                size="sm"
                variant="text"
                aria-label={`Xóa dòng ${index + 1}`}
                disabled={lines.length === 1}
                onClick={() => onChange(lines.filter((_, i) => i !== index))}
              >
                <CloseIcon size={16} />
              </Button>
            </div>
          );
        })}
      </div>
      <p className="purchase-sum self-end">
        Tổng phiếu <b>{formatMoney(purchaseTotal(parsed))}</b>
      </p>
    </section>
  );
}
