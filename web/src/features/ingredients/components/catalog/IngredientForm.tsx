"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { CarrotIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useMediaSrc } from "@/components/ui/MediaImage";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/format";
import { MEDIA_FOLDER, newMediaKey } from "@/lib/media";
import {
  amountTextSchema,
  LIVE_VALIDATION_MODE,
  parseAmountText,
  requiredTextSchema,
} from "@/lib/validation";
import { readDemoState, updateDemoState } from "@/lib/demoStore";
import { INGREDIENT_UNITS } from "@/constants/inventory";
import { type Ingredient } from "@/models/inventory";

const ingredientSchema = (ownName: string | undefined) =>
  z.object({
    name: requiredTextSchema("tên nguyên liệu").refine(
      (name) =>
        !readDemoState().ingredients.some(
          (other) =>
            other.name !== ownName &&
            other.name.toLowerCase() === name.toLowerCase()
        ),
      "Đã có nguyên liệu này"
    ),
    price: amountTextSchema("Nhập giá hiện hành"),
  });

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
  const [unit, setUnit] = useState(ingredient?.unit ?? INGREDIENT_UNITS[0]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ingredientSchema(ingredient?.name)),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      name: ingredient?.name ?? "",
      price: ingredient ? formatNumber(ingredient.price) : "",
    },
  });
  const name = useWatch({ control, name: "name" });
  const savedImage = useMediaSrc(ingredient?.imageKey);
  /** Undefined keeps the saved photo, null removes it, a data URL replaces it. */
  const [upload, setUpload] = useState<string | null | undefined>(undefined);
  const image = upload === undefined ? savedImage : upload;
  const save = handleSubmit(({ name: savedName, price }) => {
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
          ? { ...line, ingredient: savedName }
          : line;
      updateDemoState({
        ingredients: current.ingredients.map((other) =>
          other.name === ingredient.name
            ? { ...other, name: savedName, unit, price, imageKey }
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
          ? `Đã lưu ${savedName}`
          : `Đã đổi giá ${savedName}. Giá gợi ý của các món dùng nguyên liệu này đã cập nhật.`
      );
      onSaved();
      return;
    }
    updateDemoState({
      ingredients: [
        { name: savedName, unit, price, usedIn: "Chưa dùng", imageKey },
        ...current.ingredients,
      ],
      mediaUploads,
    });
    showToast(`Đã thêm ${savedName}. Dùng được ngay trong phiếu nhập.`);
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
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
        {...register("name")}
        error={errors.name?.message}
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
          {...register("price", {
            onChange: (event) =>
              setValue(
                "price",
                formatNumber(parseAmountText(event.target.value))
              ),
          })}
          error={errors.price?.message}
        />
      </div>
    </form>
  );
}
