"use client";

import { useState } from "react";

import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import type { EquipmentType } from "@/mocks/equipment";

const DAMAGE_ACTION = {
  Restore: "restore",
  Discard: "discard",
} as const;
type DamageAction = (typeof DAMAGE_ACTION)[keyof typeof DAMAGE_ACTION];

const DAMAGE_ACTION_LABEL: Record<DamageAction, string> = {
  [DAMAGE_ACTION.Restore]: "Phục hồi về sẵn sàng",
  [DAMAGE_ACTION.Discard]: "Loại bỏ khỏi sở hữu",
};

export function DamageHandlingForm({
  formId,
  item,
  onSaved,
}: {
  formId: string;
  item: EquipmentType;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [action, setAction] = useState<DamageAction>(DAMAGE_ACTION.Restore);
  const [quantityText, setQuantityText] = useState("");
  const [reason, setReason] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const quantity = Number(quantityText.replace(/\D/g, "")) || 0;
  const quantityError =
    quantity <= 0
      ? "Nhập số lượng"
      : quantity > item.damaged
        ? `Không vượt lượng hư hiện có (${item.damaged})`
        : null;
  const reasonError = reason.trim() ? null : "Nhập lý do";

  const save = () => {
    setSubmitted(true);
    if (quantityError || reasonError) return;
    updateDemoState({
      equipment: readDemoState().equipment.map((candidate) =>
        candidate.name !== item.name
          ? candidate
          : action === DAMAGE_ACTION.Restore
            ? {
                ...candidate,
                damaged: candidate.damaged - quantity,
                ready: candidate.ready + quantity,
              }
            : {
                ...candidate,
                damaged: candidate.damaged - quantity,
                owned: candidate.owned - quantity,
              }
      ),
    });
    showToast(
      `${DAMAGE_ACTION_LABEL[action]}: ${quantity} ${item.unit} ${item.name.toLowerCase()}`
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
      <SelectField
        id="damage-action"
        label="Cách xử lý"
        options={Object.values(DAMAGE_ACTION).map((value) => ({
          value,
          label: DAMAGE_ACTION_LABEL[value],
        }))}
        value={action}
        onValueChange={(value) => setAction(value as DamageAction)}
      />
      <TextField
        id="damage-quantity"
        label={`Số lượng (${item.unit})`}
        inputMode="numeric"
        value={quantityText}
        onChange={(event) => setQuantityText(event.target.value)}
        error={submitted ? quantityError : null}
        hint={`Đang hư ${item.damaged} ${item.unit}.`}
      />
      <TextField
        id="damage-reason"
        label="Lý do"
        placeholder="Đã vá men, dùng lại được"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        error={submitted ? reasonError : null}
      />
      <PhotoGalleryField
        id="damage-photos"
        label="Ảnh tình trạng dụng cụ"
        photos={photos}
        onChange={setPhotos}
        hint="Chụp trước khi phục hồi hoặc loại bỏ để đối chiếu sau này."
      />
    </form>
  );
}
