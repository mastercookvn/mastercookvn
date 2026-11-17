"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { UserIcon } from "@/components/icons";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import {
  LIVE_VALIDATION_MODE,
  optionalAddressSchema,
  personNameSchema,
  phoneSchema,
  toLocalPhone,
} from "@/lib/validation";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import {
  STAFF_GENDER,
  STAFF_GENDERS,
  STAFF_GENDER_LABEL,
  STAFF_POSITION,
  STAFF_POSITIONS,
  STAFF_POSITION_LABEL,
  STAFF_TYPE,
  STAFF_TYPES,
  STAFF_TYPE_LABEL,
  type StaffPosition,
} from "@/constants/staffing";
import type { Staff } from "@/mocks/people";

const optionalDate = z
  .string()
  .trim()
  .regex(/^(\d{2}\/\d{2}\/\d{4})?$/, "Dạng dd/mm/yyyy");

/** UC-NS-01 2e: name and phone are required, and the phone belongs to one staff profile. */
const staffSchema = (ownPhone: string) =>
  z.object({
    name: personNameSchema,
    phone: phoneSchema.refine(
      (phone) =>
        phone === ownPhone ||
        !readDemoState().staff.some(
          (other) => toLocalPhone(other.phone) === phone
        ),
      "Trùng hồ sơ nhân sự khác"
    ),
    birthDate: optionalDate,
    address: optionalAddressSchema,
    emergencyContact: z.string().trim(),
    startDate: optionalDate,
    note: z.string().trim(),
  });

/** Add with `member` null; edit the whole profile otherwise. */
export function StaffForm({
  formId,
  member,
  onSaved,
}: {
  formId: string;
  member: Staff | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [photo, setPhoto] = useState<string | null>(member?.photo ?? null);
  const [gender, setGender] = useState<(typeof STAFF_GENDERS)[number]>(
    member?.gender ?? STAFF_GENDER.Male
  );
  const [type, setType] = useState<(typeof STAFF_TYPES)[number]>(
    member?.type ?? STAFF_TYPE.Temporary
  );
  const [position, setPosition] = useState(
    member?.position ?? STAFF_POSITION.Server
  );
  const ownPhone = toLocalPhone(member?.phone ?? "");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchema(ownPhone)),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      name: member?.name ?? "",
      phone: member?.phone ?? "",
      birthDate: member?.birthDate ?? "",
      address: member?.address ?? "",
      emergencyContact: member?.emergencyContact ?? "",
      startDate: member?.startDate ?? "",
      note: member?.note ?? "",
    },
  });

  const name = useWatch({ control, name: "name" });

  const save = handleSubmit((values) => {
    const digits = values.phone;
    const profile: Staff = {
      name: values.name,
      phone: `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
      type,
      position,
      active: member?.active ?? true,
      hasAccount: member?.hasAccount ?? false,
      photo: photo ?? undefined,
      gender,
      birthDate: values.birthDate,
      address: values.address.trim(),
      startDate: values.startDate,
      emergencyContact: values.emergencyContact,
      note: values.note,
    };
    const staff = readDemoState().staff;
    updateDemoState({
      staff: member
        ? staff.map((other) =>
            toLocalPhone(other.phone) === ownPhone ? profile : other
          )
        : [profile, ...staff],
    });
    showToast(
      member
        ? `Đã lưu hồ sơ ${profile.name}`
        : `Đã thêm ${profile.name}, trạng thái Đang làm`
    );
    onSaved();
  });

  return (
    <form id={formId} className="l-stack gap-5" noValidate onSubmit={save}>
      <fieldset className="form-section">
        <legend>Thông tin cơ bản</legend>
        <ImageUploadField
          id="staff-photo"
          label="Ảnh chân dung"
          value={photo}
          alt={name || "Ảnh nhân viên"}
          onChange={setPhoto}
          placeholder={<UserIcon size={30} />}
        />
        <div className="l-grid l-grid-2">
          <TextField
            id="staff-name"
            label="Họ tên"
            autoComplete="name"
            {...register("name")}
            error={errors.name?.message}
          />
          <TextField
            id="staff-phone"
            label="Số điện thoại"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <SelectField
            id="staff-gender"
            label="Giới tính"
            options={STAFF_GENDERS.map((value) => ({
              value,
              label: STAFF_GENDER_LABEL[value],
            }))}
            value={gender}
            onValueChange={(value) =>
              setGender(value as (typeof STAFF_GENDERS)[number])
            }
          />
          <TextField
            id="staff-birth"
            label="Ngày sinh"
            placeholder="dd/mm/yyyy"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />
        </div>
        <TextField
          id="staff-address"
          label="Địa chỉ"
          placeholder="Số nhà, đường, phường/quận"
          {...register("address")}
          error={errors.address?.message}
        />
        <TextField
          id="staff-emergency"
          label="Liên hệ khẩn cấp"
          placeholder="Vợ: 0912 111 222"
          {...register("emergencyContact")}
        />
      </fieldset>

      <fieldset className="form-section">
        <legend>Công việc</legend>
        <div className="l-grid l-grid-2">
          <SelectField
            id="staff-position"
            label="Vị trí"
            options={STAFF_POSITIONS.map((value) => ({
              value,
              label: STAFF_POSITION_LABEL[value],
            }))}
            value={position}
            onValueChange={(value) => setPosition(value as StaffPosition)}
          />
          <SelectField
            id="staff-type"
            label="Loại hợp đồng"
            options={STAFF_TYPES.map((value) => ({
              value,
              label: STAFF_TYPE_LABEL[value],
            }))}
            value={type}
            onValueChange={(value) =>
              setType(value as (typeof STAFF_TYPES)[number])
            }
          />
          <TextField
            id="staff-start"
            label="Ngày vào làm"
            placeholder="dd/mm/yyyy"
            {...register("startDate")}
            error={errors.startDate?.message}
          />
        </div>
        <TextareaField id="staff-note" label="Ghi chú" {...register("note")} />
      </fieldset>
    </form>
  );
}
