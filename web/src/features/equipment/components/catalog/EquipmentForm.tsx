"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { CrateIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/format";
import {
  amountTextSchema,
  LIVE_VALIDATION_MODE,
  requiredTextSchema,
} from "@/lib/validation";
import { readDemoState, updateDemoState } from "@/lib/demoStore";
import {
  EQUIPMENT_BASIS,
  EQUIPMENT_BASES,
  EQUIPMENT_BASIS_LABEL,
  type EquipmentBasis,
} from "@/constants/equipment";
import { type EquipmentType } from "@/models/equipment";

const parseDecimal = (text: string) => Number(text.replace(",", ".")) || 0;

/** Rate and reserve unregister on the manual basis, so they are optional here. */
const equipmentSchema = (ownName: string | undefined) =>
  z.object({
    name: requiredTextSchema("tên dụng cụ").refine(
      (name) =>
        !readDemoState().equipment.some(
          (other) =>
            other.name !== ownName &&
            other.name.toLowerCase() === name.toLowerCase()
        ),
      "Đã có dụng cụ cùng tên"
    ),
    unit: requiredTextSchema("đơn vị"),
    rate: z
      .string()
      .transform(parseDecimal)
      .pipe(z.number().positive("Định mức lớn hơn 0"))
      .optional(),
    reserve: z.string().transform(parseDecimal).optional(),
    minimum: amountTextSchema("Nhập tồn tối thiểu"),
    purchasePrice: amountTextSchema("Nhập giá mua"),
    compensation: amountTextSchema("Nhập giá bồi thường"),
  });

export function EquipmentForm({
  formId,
  item,
  canEditCompensation,
  onSaved,
}: {
  formId: string;
  item: EquipmentType | null;
  canEditCompensation: boolean;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [basis, setBasis] = useState<EquipmentBasis>(
    item?.basis ?? EQUIPMENT_BASIS.Person
  );
  const [image, setImage] = useState<string | null>(item?.image ?? null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(equipmentSchema(item?.name)),
    mode: LIVE_VALIDATION_MODE,
    shouldUnregister: true,
    defaultValues: {
      name: item?.name ?? "",
      unit: item?.unit ?? "cái",
      rate: item?.rate ? String(item.rate).replace(".", ",") : "1",
      reserve: item ? String(Math.round((item.reserve ?? 0) * 100)) : "10",
      minimum: item ? String(item.minimum) : "",
      purchasePrice: item ? formatNumber(item.purchasePrice) : "",
      compensation: item ? formatNumber(item.compensation) : "",
    },
  });
  const name = useWatch({ control, name: "name" });
  const manual = basis === EQUIPMENT_BASIS.Manual;

  const save = handleSubmit((values) => {
    const fields = {
      name: values.name,
      image: image ?? undefined,
      unit: values.unit,
      basis,
      rate: manual ? null : (values.rate ?? null),
      reserve: manual || !values.reserve ? null : values.reserve / 100,
      minimum: values.minimum,
      compensation: values.compensation,
      purchasePrice: values.purchasePrice,
    };
    const equipment = readDemoState().equipment;
    updateDemoState({
      equipment: item
        ? equipment.map((other) =>
            other.name === item.name ? { ...other, ...fields } : other
          )
        : [
            { ...fields, owned: 0, ready: 0, inUse: 0, damaged: 0 },
            ...equipment,
          ],
    });
    showToast(
      item
        ? `Đã lưu ${fields.name}`
        : `Đã thêm ${fields.name}. Nhập mua để có tồn kho.`
    );
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <ImageUploadField
        id="equipment-image"
        label="Ảnh dụng cụ"
        value={image}
        alt={name || "Ảnh dụng cụ"}
        onChange={setImage}
        placeholder={<CrateIcon size={30} />}
      />
      <div className="l-grid l-grid-2">
        <TextField
          id="equipment-name"
          label="Tên dụng cụ"
          {...register("name")}
          error={errors.name?.message}
        />
        <TextField
          id="equipment-unit"
          label="Đơn vị"
          {...register("unit")}
          error={errors.unit?.message}
        />
        <SelectField
          id="equipment-basis"
          label="Cơ sở định mức"
          options={EQUIPMENT_BASES.map((value) => ({
            value,
            label: EQUIPMENT_BASIS_LABEL[value],
          }))}
          value={basis}
          onValueChange={(value) => setBasis(value as EquipmentBasis)}
        />
        {manual ? null : (
          <>
            <TextField
              id="equipment-rate"
              label={`Định mức / ${EQUIPMENT_BASIS_LABEL[basis].toLowerCase()}`}
              inputMode="decimal"
              {...register("rate")}
              error={errors.rate?.message}
            />
            <TextField
              id="equipment-reserve"
              label="Dự trù (%)"
              inputMode="numeric"
              {...register("reserve")}
            />
          </>
        )}
        <TextField
          id="equipment-minimum"
          label="Tồn tối thiểu"
          inputMode="numeric"
          {...register("minimum")}
          error={errors.minimum?.message}
        />
        <TextField
          id="equipment-price"
          label="Giá mua (đ)"
          inputMode="numeric"
          {...register("purchasePrice")}
          error={errors.purchasePrice?.message}
        />
        <TextField
          id="equipment-compensation"
          label="Giá bồi thường (đ)"
          inputMode="numeric"
          {...register("compensation")}
          error={errors.compensation?.message}
          disabled={item !== null && !canEditCompensation}
          hint={
            item !== null && !canEditCompensation
              ? "Chỉ Quản lý cơ sở được sửa giá bồi thường."
              : undefined
          }
        />
      </div>
    </form>
  );
}
