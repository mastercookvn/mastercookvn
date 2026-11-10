"use client";

import { useState } from "react";

import { CrateIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import {
  EQUIPMENT_BASIS,
  type EquipmentBasis,
  type EquipmentType,
} from "@/mocks/equipment";
import { formatNumber } from "@/lib/format";

const MANUAL_BASIS: EquipmentBasis = "Nhập theo bữa";

const parseInteger = (text: string) => Number(text.replace(/\D/g, "")) || 0;
const parseDecimal = (text: string) => Number(text.replace(",", ".")) || 0;

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
  const [name, setName] = useState(item?.name ?? "");
  const [unit, setUnit] = useState(item?.unit ?? "cái");
  const [basis, setBasis] = useState<EquipmentBasis>(
    item?.basis ?? EQUIPMENT_BASIS[0]
  );
  const [rateText, setRateText] = useState(
    item?.rate ? String(item.rate).replace(".", ",") : "1"
  );
  const [reserveText, setReserveText] = useState(
    item ? String(Math.round((item.reserve ?? 0) * 100)) : "10"
  );
  const [minimumText, setMinimumText] = useState(
    item ? String(item.minimum) : ""
  );
  const [priceText, setPriceText] = useState(
    item ? formatNumber(item.purchasePrice) : ""
  );
  const [compensationText, setCompensationText] = useState(
    item ? formatNumber(item.compensation) : ""
  );
  const [image, setImage] = useState<string | null>(item?.image ?? null);
  const [submitted, setSubmitted] = useState(false);

  const manual = basis === MANUAL_BASIS;
  const duplicate = readDemoState().equipment.some(
    (other) =>
      other.name !== item?.name &&
      other.name.toLowerCase() === name.trim().toLowerCase()
  );
  const errors = {
    name: !name.trim()
      ? "Nhập tên dụng cụ"
      : duplicate
        ? "Đã có dụng cụ cùng tên"
        : null,
    unit: unit.trim() ? null : "Nhập đơn vị",
    rate: manual || parseDecimal(rateText) > 0 ? null : "Định mức lớn hơn 0",
    minimum: parseInteger(minimumText) > 0 ? null : "Nhập tồn tối thiểu",
    price: parseInteger(priceText) > 0 ? null : "Nhập giá mua",
    compensation:
      parseInteger(compensationText) > 0 ? null : "Nhập giá bồi thường",
  };

  const save = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    const fields = {
      name: name.trim(),
      image: image ?? undefined,
      unit: unit.trim(),
      basis,
      rate: manual ? null : parseDecimal(rateText),
      reserve:
        manual || parseDecimal(reserveText) === 0
          ? null
          : parseDecimal(reserveText) / 100,
      minimum: parseInteger(minimumText),
      compensation: parseInteger(compensationText),
      purchasePrice: parseInteger(priceText),
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={submitted ? errors.name : null}
        />
        <TextField
          id="equipment-unit"
          label="Đơn vị"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          error={submitted ? errors.unit : null}
        />
        <SelectField
          id="equipment-basis"
          label="Cơ sở định mức"
          options={[...EQUIPMENT_BASIS]}
          value={basis}
          onValueChange={(value) => setBasis(value as EquipmentBasis)}
        />
        {manual ? null : (
          <>
            <TextField
              id="equipment-rate"
              label={`Định mức / ${basis.toLowerCase()}`}
              inputMode="decimal"
              value={rateText}
              onChange={(event) => setRateText(event.target.value)}
              error={submitted ? errors.rate : null}
            />
            <TextField
              id="equipment-reserve"
              label="Dự trù (%)"
              inputMode="numeric"
              value={reserveText}
              onChange={(event) => setReserveText(event.target.value)}
            />
          </>
        )}
        <TextField
          id="equipment-minimum"
          label="Tồn tối thiểu"
          inputMode="numeric"
          value={minimumText}
          onChange={(event) => setMinimumText(event.target.value)}
          error={submitted ? errors.minimum : null}
        />
        <TextField
          id="equipment-price"
          label="Giá mua (đ)"
          inputMode="numeric"
          value={priceText}
          onChange={(event) => setPriceText(event.target.value)}
          error={submitted ? errors.price : null}
        />
        <TextField
          id="equipment-compensation"
          label="Giá bồi thường (đ)"
          inputMode="numeric"
          value={compensationText}
          onChange={(event) => setCompensationText(event.target.value)}
          error={submitted ? errors.compensation : null}
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
