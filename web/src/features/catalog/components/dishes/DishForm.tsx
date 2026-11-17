"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useMediaSrc } from "@/components/ui/MediaImage";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatMoney, formatNumber, formatPercent } from "@/lib/format";
import { MEDIA_FOLDER, newMediaKey } from "@/lib/media";
import { recipeCost, suggestedDishPrice } from "@/lib/pricing";
import {
  amountTextSchema,
  LIVE_VALIDATION_MODE,
  parseAmountText,
  requiredTextSchema,
} from "@/lib/validation";
import { DISH_CATEGORY_LABEL, type DishCategory } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
  type CatalogDish,
} from "@/mocks/demoStore";

import { parseRecipe, RecipeTable, type DraftRecipeLine } from "./RecipeTable";

export const NEW_DISH_ID = "new";

const newDishId = () => `mon-${Date.now().toString(36)}`;

const dishSchema = z.object({
  name: requiredTextSchema("tên món"),
  description: z.string().trim(),
  price: amountTextSchema("Nhập giá bán"),
});

export function DishForm({
  formId,
  dish,
  onSaved,
}: {
  formId: string;
  dish: CatalogDish | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [category, setCategory] = useState<DishCategory>(
    dish?.category ?? "main"
  );
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dishSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      name: dish?.name ?? "",
      description: dish?.description ?? "",
      price: dish ? formatNumber(dish.price) : "",
    },
  });
  const name = useWatch({ control, name: "name" });
  const price = parseAmountText(useWatch({ control, name: "price" }));
  const savedImage = useMediaSrc(dish?.imageKey);
  /** Undefined keeps the saved photo, null removes it, a data URL replaces it. */
  const [upload, setUpload] = useState<string | null | undefined>(undefined);
  const image = upload === undefined ? savedImage : upload;
  const ingredients = useDemoState((state) => state.ingredients);
  const [recipe, setRecipe] = useState<DraftRecipeLine[]>(() =>
    (dish ? (readDemoState().recipes[dish.id] ?? []) : []).map((line) => ({
      ingredient: line.ingredient,
      quantity: String(line.quantity).replace(".", ","),
    }))
  );
  const parsedRecipe = parseRecipe(recipe);
  const cost = recipeCost(parsedRecipe, ingredients);
  const suggested = suggestedDishPrice(cost);
  const target = BUSINESS_SETTINGS.foodCostTarget;
  const save = handleSubmit((values) => {
    const { dishes, recipes, mediaUploads } = readDemoState();
    const imageKey = upload ? newMediaKey(MEDIA_FOLDER.Dishes) : undefined;
    const fields = {
      ...values,
      category,
      imageKey: upload === undefined ? dish?.imageKey : imageKey,
    };
    const uploads =
      upload && imageKey
        ? { ...mediaUploads, [imageKey]: upload }
        : mediaUploads;

    if (dish) {
      updateDemoState({
        dishes: dishes.map((current) =>
          current.id === dish.id ? { ...current, ...fields } : current
        ),
        recipes: { ...recipes, [dish.id]: parsedRecipe },
        mediaUploads: uploads,
      });
      showToast("Đã lưu. Hợp đồng đã chốt giữ giá cũ.");
      onSaved();
      return;
    }

    const id = newDishId();
    updateDemoState({
      dishes: [{ id, active: true, ...fields }, ...dishes],
      recipes: { ...recipes, [id]: parsedRecipe },
      mediaUploads: uploads,
    });
    showToast(`Đã thêm món ${fields.name}`);
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <ImageUploadField
        id="dish-image"
        label="Ảnh món"
        value={image}
        alt={name || "Ảnh món"}
        onChange={setUpload}
      />
      <TextField
        id="dish-name"
        label="Tên món"
        {...register("name")}
        error={errors.name?.message}
      />
      <SelectField
        id="dish-category"
        label="Loại món"
        options={Object.entries(DISH_CATEGORY_LABEL).map(([value, label]) => ({
          value,
          label,
        }))}
        value={category}
        onValueChange={(value) => setCategory(value as DishCategory)}
      />
      <TextareaField
        id="dish-description"
        label="Mô tả"
        {...register("description")}
      />
      <fieldset className="form-section">
        <legend>Định lượng cho 1 bàn chuẩn 10 người</legend>
        <RecipeTable
          lines={recipe}
          ingredients={ingredients}
          onChange={setRecipe}
        />
        <dl className="price-breakdown">
          <div>
            <dt>Chi phí nguyên liệu ước tính (giá hiện hành)</dt>
            <dd>{formatMoney(cost)}</dd>
          </div>
          <div>
            <dt>Food cost mục tiêu chung</dt>
            <dd>{formatPercent(target, 0)}</dd>
          </div>
          <div className="is-strong">
            <dt>Giá gợi ý = chi phí / {formatPercent(target, 0)}</dt>
            <dd>{cost > 0 ? formatMoney(suggested) : "Nhập định lượng"}</dd>
          </div>
        </dl>
      </fieldset>
      <TextField
        id="dish-price"
        label="Giá bán (đ / bàn chuẩn)"
        inputMode="numeric"
        {...register("price", {
          onChange: (event) =>
            setValue(
              "price",
              formatNumber(parseAmountText(event.target.value))
            ),
        })}
        error={errors.price?.message}
        hint="Quản lý chấp nhận giá gợi ý hoặc nhập giá khác. Hợp đồng đã chốt giữ giá cũ."
      />
      {cost > 0 ? (
        <div className="l-row gap-2">
          <Button
            size="sm"
            disabled={price === suggested}
            onClick={() =>
              setValue("price", formatNumber(suggested), {
                shouldValidate: true,
              })
            }
          >
            Dùng giá gợi ý {formatMoney(suggested)}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
