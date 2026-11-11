"use client";

import { useState } from "react";

import { CarrotIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useMediaSrc } from "@/components/ui/MediaImage";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/format";
import { MEDIA_FOLDER, newMediaKey } from "@/lib/media";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import { INGREDIENT_UNITS, type Ingredient } from "@/mocks/inventory";

export function IngredientForm({
  formId,
  ingredient,
  onSaved,
}: {
  formId: string;
  ingredient: Ingredient | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [name, setName] = useState(ingredient?.name ?? "");
  const [unit, setUnit] = useState(ingredient?.unit ?? INGREDIENT_UNITS[0]);
  const [priceText, setPriceText] = useState(
    ingredient ? formatNumber(ingredient.price) : ""
  );
  const savedImage = useMediaSrc(ingredient?.imageKey);
  /** Undefined keeps the saved photo, null removes it, a data URL replaces it. */
  const [upload, setUpload] = useState<string | null | undefined>(undefined);
  const image = upload === undefined ? savedImage : upload;
  const [submitted, setSubmitted] = useState(false);

  const price = Number(priceText.replace(/\D/g, ""));
  const duplicate = readDemoState().ingredients.some(
    (other) =>
      other.name !== ingredient?.name &&
      other.name.toLowerCase() === name.trim().toLowerCase()
  );
  const nameError =
    name.trim() === ""
      ? "Nhập tên nguyên liệu"
      : duplicate
        ? "Đã có nguyên liệu này"
        : null;
  const priceError = price <= 0 ? "Nhập giá hiện hành" : null;

  const save = () => {
    setSubmitted(true);
    if (nameError || priceError) return;
    const current = readDemoState();
    const newKey = upload ? newMediaKey(MEDIA_FOLDER.Ingredients) : undefined;
    const imageKey = upload === undefined ? ingredient?.imageKey : newKey;
    const mediaUploads =
      upload && newKey
        ? { ...current.mediaUploads, [newKey]: upload }
        : current.mediaUploads;
    if (ingredient) {
      const renamed = (line: { ingredient: string; quantity: number }) =>
        line.ingredient === ingredient.name
          ? { ...line, ingredient: name.trim() }
          : line;
      updateDemoState({
        ingredients: current.ingredients.map((other) =>
          other.name === ingredient.name
            ? { ...other, name: name.trim(), unit, price, imageKey }
            : other
        ),
        mediaUploads,
        recipes: Object.fromEntries(
          Object.entries(current.recipes).map(([dishId, lines]) => [
            dishId,
            lines.map(renamed),
          ])
        ),
      });
      showToast(
        price === ingredient.price
          ? `Đã lưu ${name.trim()}`
          : `Đã đổi giá ${name.trim()}. Giá gợi ý của các món dùng nguyên liệu này đã cập nhật.`
      );
      onSaved();
      return;
    }
    updateDemoState({
      ingredients: [
        { name: name.trim(), unit, price, usedIn: "Chưa dùng", imageKey },
        ...current.ingredients,
      ],
      mediaUploads,
    });
    showToast(`Đã thêm ${name.trim()}. Dùng được ngay trong phiếu nhập.`);
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
      <ImageUploadField
        id="ingredient-image"
        label="Ảnh nguyên liệu"
        value={image}
        alt={name || "Ảnh nguyên liệu"}
        onChange={setUpload}
        placeholder={<CarrotIcon size={30} />}
      />
      <TextField
        id="ingredient-name"
        label="Tên nguyên liệu"
        placeholder="Mực ống"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={submitted ? nameError : null}
      />
      <div className="l-grid l-grid-2">
        <SelectField
          id="ingredient-unit"
          label="Đơn vị chuẩn"
          options={INGREDIENT_UNITS}
          value={unit}
          onValueChange={(value) => setUnit(value)}
        />
        <TextField
          id="ingredient-price"
          label="Giá hiện hành (đ / đơn vị)"
          inputMode="numeric"
          value={priceText}
          onChange={(event) =>
            setPriceText(
              formatNumber(Number(event.target.value.replace(/\D/g, "")))
            )
          }
          error={submitted ? priceError : null}
        />
      </div>
    </form>
  );
}
