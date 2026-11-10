"use client";

import { useState } from "react";

import { FlowerIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/format";
import type { Service } from "@/mocks/catalog";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

const parseAmount = (text: string) => Number(text.replace(/\D/g, ""));

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
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [unit, setUnit] = useState(service?.unit ?? "gói");
  const [priceText, setPriceText] = useState(
    service ? formatNumber(service.price) : ""
  );
  const [image, setImage] = useState<string | null>(
    service
      ? (readDemoState().serviceImages[service.id] ?? service.image ?? null)
      : null
  );
  const [submitted, setSubmitted] = useState(false);

  const price = parseAmount(priceText);
  const duplicate = readDemoState().services.some(
    (other) =>
      other.id !== service?.id &&
      other.name.toLowerCase() === name.trim().toLowerCase()
  );
  const errors = {
    name: !name.trim()
      ? "Nhập tên dịch vụ"
      : duplicate
        ? "Đã có dịch vụ cùng tên"
        : null,
    unit: unit.trim() ? null : "Nhập đơn vị tính",
    price: price > 0 ? null : "Nhập đơn giá",
  };

  const save = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;

    const current = readDemoState();
    const id = service?.id ?? `dv-${Date.now().toString(36)}`;
    const fields = {
      name: name.trim(),
      description: description.trim(),
      unit: unit.trim(),
      price,
    };
    const images = { ...current.serviceImages };
    if (image?.startsWith("data:")) images[id] = image;
    if (!image) delete images[id];

    updateDemoState({
      services: service
        ? current.services.map((other) =>
            other.id === id ? { ...other, ...fields } : other
          )
        : [{ id, ...fields }, ...current.services],
      serviceImages: images,
    });
    showToast(
      service ? `Đã lưu ${fields.name}` : `Đã thêm dịch vụ ${fields.name}`
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
      <ImageUploadField
        id="service-image"
        label="Ảnh dịch vụ"
        value={image}
        alt={name || "Ảnh dịch vụ"}
        onChange={setImage}
        placeholder={<FlowerIcon size={30} />}
        hint="Hiển thị trên trang Dịch vụ cho khách. JPG, PNG hoặc WebP, tối đa 5 MB."
      />
      <TextField
        id="service-name"
        label="Tên dịch vụ"
        placeholder="Ban nhạc acoustic"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={submitted ? errors.name : null}
      />
      <TextareaField
        id="service-description"
        label="Mô tả"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="l-grid l-grid-2">
        <TextField
          id="service-unit"
          label="Đơn vị tính"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          error={submitted ? errors.unit : null}
        />
        <TextField
          id="service-price"
          label="Đơn giá (đ)"
          inputMode="numeric"
          value={priceText}
          onChange={(event) =>
            setPriceText(formatNumber(parseAmount(event.target.value)))
          }
          error={submitted ? errors.price : null}
        />
      </div>
    </form>
  );
}
