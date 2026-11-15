"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { FlowerIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useMediaSrc } from "@/components/ui/MediaImage";
import { TextareaField } from "@/components/ui/TextareaField";
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
import type { Service } from "@/mocks/catalog";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

const newServiceId = () => `dv-${Date.now().toString(36)}`;

const serviceSchema = (ownId: string | undefined) =>
  z.object({
    name: requiredTextSchema("tên dịch vụ").refine(
      (name) =>
        !readDemoState().services.some(
          (other) =>
            other.id !== ownId &&
            other.name.toLowerCase() === name.toLowerCase()
        ),
      "Đã có dịch vụ cùng tên"
    ),
    description: z.string().trim(),
    unit: requiredTextSchema("đơn vị tính"),
    price: amountTextSchema("Nhập đơn giá"),
  });

export function ServiceForm({
  formId,
  service,
  onSaved,
}: {
  formId: string;
  service: Service | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const savedImage = useMediaSrc(service?.imageKey);
  /** Undefined keeps the saved photo, null removes it, a data URL replaces it. */
  const [upload, setUpload] = useState<string | null | undefined>(undefined);
  const image = upload === undefined ? savedImage : upload;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema(service?.id)),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      name: service?.name ?? "",
      description: service?.description ?? "",
      unit: service?.unit ?? "gói",
      price: service ? formatNumber(service.price) : "",
    },
  });
  const name = useWatch({ control, name: "name" });

  const save = handleSubmit((values) => {
    const current = readDemoState();
    const id = service?.id ?? newServiceId();
    const imageKey = upload ? newMediaKey(MEDIA_FOLDER.Services) : undefined;
    const fields = {
      ...values,
      imageKey: upload === undefined ? service?.imageKey : imageKey,
    };

    updateDemoState({
      services: service
        ? current.services.map((other) =>
            other.id === id ? { ...other, ...fields } : other
          )
        : [{ id, ...fields }, ...current.services],
      mediaUploads:
        upload && imageKey
          ? { ...current.mediaUploads, [imageKey]: upload }
          : current.mediaUploads,
    });
    showToast(
      service ? `Đã lưu ${fields.name}` : `Đã thêm dịch vụ ${fields.name}`
    );
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <ImageUploadField
        id="service-image"
        label="Ảnh dịch vụ"
        value={image}
        alt={name || "Ảnh dịch vụ"}
        onChange={setUpload}
        placeholder={<FlowerIcon size={30} />}
        hint="Hiển thị trên trang Dịch vụ cho khách. JPG, PNG hoặc WebP, tối đa 5 MB."
      />
      <TextField
        id="service-name"
        label="Tên dịch vụ"
        placeholder="Ban nhạc acoustic"
        {...register("name")}
        error={errors.name?.message}
      />
      <TextareaField
        id="service-description"
        label="Mô tả"
        {...register("description")}
      />
      <div className="l-grid l-grid-2">
        <TextField
          id="service-unit"
          label="Đơn vị tính"
          {...register("unit")}
          error={errors.unit?.message}
        />
        <TextField
          id="service-price"
          label="Đơn giá (đ)"
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
