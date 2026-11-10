"use client";

import { useState } from "react";

import { DishPicker } from "@/components/ui/DishPicker";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatMoney } from "@/lib/format";
import type { MenuSet } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

const MINIMUM_DISHES = 3;

export function MenuSetForm({
  formId,
  set,
  onSaved,
}: {
  formId: string;
  set: MenuSet | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const allDishes = useDemoState((state) => state.dishes);
  const dishes = allDishes.filter((dish) => dish.active);
  const [name, setName] = useState(set?.name ?? "");
  const [suitableFor, setSuitableFor] = useState(set?.suitableFor ?? "");
  const [description, setDescription] = useState(set?.description ?? "");
  const [dishIds, setDishIds] = useState<string[]>(set?.dishIds ?? []);
  const [submitted, setSubmitted] = useState(false);

  const price = dishes
    .filter((dish) => dishIds.includes(dish.id))
    .reduce((sum, dish) => sum + dish.price, 0);
  const duplicate = readDemoState().menuSets.some(
    (other) =>
      other.id !== set?.id &&
      other.name.toLowerCase() === name.trim().toLowerCase()
  );
  const errors = {
    name: !name.trim()
      ? "Nhập tên set"
      : duplicate
        ? "Đã có set cùng tên"
        : null,
    dishes:
      dishIds.length >= MINIMUM_DISHES
        ? null
        : `Chọn ít nhất ${MINIMUM_DISHES} món`,
  };

  const save = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    const sets = readDemoState().menuSets;
    const fields = {
      name: name.trim(),
      suitableFor: suitableFor.trim(),
      description: description.trim(),
      dishIds,
      imageDishId: dishIds[0],
    };
    updateDemoState({
      menuSets: set
        ? sets.map((other) =>
            other.id === set.id ? { ...other, ...fields } : other
          )
        : [{ id: `set-${sets.length + 1}`, ...fields }, ...sets],
    });
    showToast(
      `${set ? "Đã lưu" : "Đã thêm"} ${fields.name}, ${formatMoney(price)} / bàn chuẩn`
    );
    onSaved();
  };

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <TextField
        id="set-name"
        label="Tên set"
        placeholder="Set Đoàn Viên"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={submitted ? errors.name : null}
      />
      <TextField
        id="set-suitable"
        label="Phù hợp cho"
        placeholder="Họp mặt, sinh nhật"
        value={suitableFor}
        onChange={(event) => setSuitableFor(event.target.value)}
      />
      <TextareaField
        id="set-description"
        label="Mô tả ngắn"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="l-stack gap-2">
        <span className="field-legend">
          Món trong set ({dishIds.length} đã chọn)
        </span>
        <DishPicker
          dishes={dishes}
          selectedIds={dishIds}
          onChange={setDishIds}
        />
        {submitted && errors.dishes ? (
          <p className="field-error" role="alert">
            {errors.dishes}
          </p>
        ) : null}
      </div>
      <p className="purchase-sum">
        Giá set / bàn chuẩn <b>{formatMoney(price)}</b>
      </p>
      <p className="text-small text-soft">
        Bằng tổng giá các món, không cộng lợi nhuận lần nữa.
      </p>
    </form>
  );
}
