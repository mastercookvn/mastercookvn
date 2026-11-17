"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { DishPicker } from "@/components/ui/DishPicker";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatMoney } from "@/lib/format";
import { LIVE_VALIDATION_MODE, requiredTextSchema } from "@/lib/validation";
import type { MenuSet } from "@/mocks/catalog";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";

const MINIMUM_DISHES = 3;

const menuSetSchema = (ownId: string | undefined) =>
  z.object({
    name: requiredTextSchema("tên set").refine(
      (name) =>
        !readDemoState().menuSets.some(
          (other) =>
            other.id !== ownId &&
            other.name.toLowerCase() === name.toLowerCase()
        ),
      "Đã có set cùng tên"
    ),
    suitableFor: z.string().trim(),
    description: z.string().trim(),
    dishIds: z
      .array(z.string())
      .min(MINIMUM_DISHES, `Chọn ít nhất ${MINIMUM_DISHES} món`),
  });

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuSetSchema(set?.id)),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      name: set?.name ?? "",
      suitableFor: set?.suitableFor ?? "",
      description: set?.description ?? "",
      dishIds: set?.dishIds ?? [],
    },
  });
  const dishIds = useWatch({ control, name: "dishIds" });

  const price = dishes
    .filter((dish) => dishIds.includes(dish.id))
    .reduce((sum, dish) => sum + dish.price, 0);

  const save = handleSubmit((values) => {
    const sets = readDemoState().menuSets;
    const fields = { ...values, imageDishId: values.dishIds[0] };
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
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <TextField
        id="set-name"
        label="Tên set"
        placeholder="Set Đoàn Viên"
        {...register("name")}
        error={errors.name?.message}
      />
      <TextField
        id="set-suitable"
        label="Phù hợp cho"
        placeholder="Họp mặt, sinh nhật"
        {...register("suitableFor")}
      />
      <TextareaField
        id="set-description"
        label="Mô tả ngắn"
        {...register("description")}
      />
      <div className="l-stack gap-2">
        <span className="field-legend">
          Món trong set ({dishIds.length} đã chọn)
        </span>
        <Controller
          control={control}
          name="dishIds"
          render={({ field }) => (
            <DishPicker
              dishes={dishes}
              selectedIds={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.dishIds ? (
          <p className="field-error" role="alert">
            {errors.dishIds.message}
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
