"use client";

import { useState } from "react";

import { CloseIcon, PlusIcon, UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import { STAFF_POSITIONS } from "@/mocks/operationMeals";
import {
  STAFF_GENDERS,
  STAFF_TYPES,
  type StaffMember,
  type WorkExperience,
} from "@/mocks/people";

const PHONE = /^0\d{9}$/;
const DATE = /^\d{2}\/\d{2}\/\d{4}$/;

const BLANK_EXPERIENCE: WorkExperience = { place: "", role: "", period: "" };

const digitsOf = (phone: string) => phone.replace(/\D/g, "");

/** Add with `member` null; edit the whole profile and CV otherwise. */
export function StaffForm({
  formId,
  member,
  onSaved,
}: {
  formId: string;
  member: StaffMember | null;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [photo, setPhoto] = useState<string | null>(member?.photo ?? null);
  const [name, setName] = useState(member?.name ?? "");
  const [phone, setPhone] = useState(member?.phone ?? "");
  const [gender, setGender] = useState<(typeof STAFF_GENDERS)[number]>(
    member?.gender ?? STAFF_GENDERS[0]
  );
  const [birthDate, setBirthDate] = useState(member?.birthDate ?? "");
  const [address, setAddress] = useState(member?.address ?? "");
  const [emergencyContact, setEmergencyContact] = useState(
    member?.emergencyContact ?? ""
  );
  const [type, setType] = useState<(typeof STAFF_TYPES)[number]>(
    member?.type ?? STAFF_TYPES[1]
  );
  const [position, setPosition] = useState(
    member?.position ?? STAFF_POSITIONS[0]
  );
  const [startDate, setStartDate] = useState(member?.startDate ?? "");
  const [skills, setSkills] = useState(member?.skills?.join(", ") ?? "");
  const [experience, setExperience] = useState<WorkExperience[]>(
    member?.experience?.length ? member.experience : [BLANK_EXPERIENCE]
  );
  const [certificates, setCertificates] = useState(member?.certificates ?? "");
  const [cvFiles, setCvFiles] = useState<string[]>(member?.cvFiles ?? []);
  const [note, setNote] = useState(member?.note ?? "");
  const [submitted, setSubmitted] = useState(false);

  const digits = digitsOf(phone);
  const errors = {
    name: name.trim() ? null : "Nhập họ tên",
    phone: !PHONE.test(digits)
      ? "Số điện thoại gồm 10 số, bắt đầu bằng 0"
      : readDemoState().staff.some(
            (other) =>
              digitsOf(other.phone) === digits &&
              digitsOf(other.phone) !== digitsOf(member?.phone ?? "")
          )
        ? "Trùng hồ sơ nhân sự khác"
        : null,
    birthDate:
      birthDate === "" || DATE.test(birthDate) ? null : "Dạng dd/mm/yyyy",
    startDate:
      startDate === "" || DATE.test(startDate) ? null : "Dạng dd/mm/yyyy",
  };

  const updateExperience = (index: number, patch: Partial<WorkExperience>) =>
    setExperience(
      experience.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );

  const save = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    const profile: StaffMember = {
      name: name.trim(),
      phone: `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
      type,
      position,
      active: member?.active ?? true,
      hasAccount: member?.hasAccount ?? false,
      photo: photo ?? undefined,
      gender,
      birthDate,
      address: address.trim(),
      startDate,
      emergencyContact: emergencyContact.trim(),
      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      experience: experience.filter((row) => row.place.trim()),
      certificates: certificates.trim(),
      cvFiles,
      note: note.trim(),
    };
    const staff = readDemoState().staff;
    updateDemoState({
      staff: member
        ? staff.map((other) =>
            digitsOf(other.phone) === digitsOf(member.phone) ? profile : other
          )
        : [profile, ...staff],
    });
    showToast(
      member
        ? `Đã lưu hồ sơ ${profile.name}`
        : `Đã thêm ${profile.name}, trạng thái Đang làm`
    );
    onSaved();
  };

  return (
    <form
      id={formId}
      className="l-stack gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={submitted ? errors.name : null}
          />
          <TextField
            id="staff-phone"
            label="Số điện thoại"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            error={submitted ? errors.phone : null}
          />
          <SelectField
            id="staff-gender"
            label="Giới tính"
            options={STAFF_GENDERS}
            value={gender}
            onValueChange={(value) =>
              setGender(value as (typeof STAFF_GENDERS)[number])
            }
          />
          <TextField
            id="staff-birth"
            label="Ngày sinh"
            placeholder="dd/mm/yyyy"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            error={submitted ? errors.birthDate : null}
          />
        </div>
        <TextField
          id="staff-address"
          label="Địa chỉ"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <TextField
          id="staff-emergency"
          label="Liên hệ khẩn cấp"
          placeholder="Vợ: 0912 111 222"
          value={emergencyContact}
          onChange={(event) => setEmergencyContact(event.target.value)}
        />
      </fieldset>

      <fieldset className="form-section">
        <legend>Công việc</legend>
        <div className="l-grid l-grid-2">
          <SelectField
            id="staff-position"
            label="Vị trí"
            options={STAFF_POSITIONS}
            value={position}
            onValueChange={setPosition}
          />
          <SelectField
            id="staff-type"
            label="Loại hợp đồng"
            options={STAFF_TYPES}
            value={type}
            onValueChange={(value) =>
              setType(value as (typeof STAFF_TYPES)[number])
            }
          />
          <TextField
            id="staff-start"
            label="Ngày vào làm"
            placeholder="dd/mm/yyyy"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            error={submitted ? errors.startDate : null}
          />
          <TextField
            id="staff-skills"
            label="Kỹ năng"
            placeholder="Bếp chính, món Á"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            hint="Cách nhau bằng dấu phẩy."
          />
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>CV, kinh nghiệm làm việc</legend>
        <div className="l-stack gap-2">
          {experience.map((row, index) => (
            <div key={index} className="experience-row">
              <input
                className="input"
                aria-label={`Nơi làm việc ${index + 1}`}
                placeholder="Nơi làm việc"
                value={row.place}
                onChange={(event) =>
                  updateExperience(index, { place: event.target.value })
                }
              />
              <input
                className="input"
                aria-label={`Vị trí ${index + 1}`}
                placeholder="Vị trí"
                value={row.role}
                onChange={(event) =>
                  updateExperience(index, { role: event.target.value })
                }
              />
              <input
                className="input"
                aria-label={`Thời gian ${index + 1}`}
                placeholder="2019–2022"
                value={row.period}
                onChange={(event) =>
                  updateExperience(index, { period: event.target.value })
                }
              />
              <Button
                size="sm"
                variant="text"
                aria-label={`Xóa kinh nghiệm ${index + 1}`}
                disabled={experience.length === 1}
                onClick={() =>
                  setExperience(experience.filter((_, i) => i !== index))
                }
              >
                <CloseIcon size={16} />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            className="self-start"
            onClick={() => setExperience([...experience, BLANK_EXPERIENCE])}
          >
            <PlusIcon size={16} />
            Thêm kinh nghiệm
          </Button>
        </div>
        <TextField
          id="staff-certificates"
          label="Bằng cấp, chứng chỉ"
          placeholder="Tập huấn an toàn thực phẩm 2024"
          value={certificates}
          onChange={(event) => setCertificates(event.target.value)}
        />
        <PhotoGalleryField
          id="staff-cv"
          label="Ảnh CV, bằng cấp"
          photos={cvFiles}
          onChange={setCvFiles}
          max={6}
          hint="Chụp CV giấy hoặc chứng chỉ để lưu kèm hồ sơ."
        />
        <TextareaField
          id="staff-note"
          label="Ghi chú"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </fieldset>
    </form>
  );
}
