"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { CloseIcon, UploadIcon } from "@/components/icons";
import { resizeImage } from "@/lib/image";

import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_RULES_HINT,
  imageFileProblem,
} from "./ImageUploadField";

/** Several photos, e.g. receipts or evidence of damage. */
export function PhotoGalleryField({
  id,
  label,
  photos,
  onChange,
  hint,
  max = 6,
}: {
  id: string;
  label: string;
  photos: string[];
  onChange: (photos: string[]) => void;
  hint?: string;
  max?: number;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const accept = async (files: File[]) => {
    if (files.length === 0) return;
    const room = max - photos.length;
    const problem = files.map(imageFileProblem).find(Boolean) ?? null;
    if (problem) {
      setError(problem);
      return;
    }
    if (files.length > room) {
      setError(`Tối đa ${max} ảnh.`);
      return;
    }
    setBusy(true);
    try {
      const added = await Promise.all(files.map(resizeImage));
      onChange([...photos, ...added]);
      setError(null);
    } catch (cause) {
      console.error("Photo upload failed", cause);
      setError("Không đọc được ảnh này, hãy thử ảnh khác.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div
        className="photo-gallery"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void accept(Array.from(event.dataTransfer.files));
        }}
      >
        {photos.map((photo, index) => (
          <div key={photo.slice(-40) + index} className="photo-gallery-item">
            <Image
              src={photo}
              alt={`${label} ${index + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
            <button
              type="button"
              className="photo-gallery-remove"
              aria-label={`Gỡ ảnh ${index + 1}`}
              onClick={() => onChange(photos.filter((_, i) => i !== index))}
            >
              <CloseIcon size={14} />
            </button>
          </div>
        ))}
        {photos.length < max ? (
          <button
            type="button"
            className="photo-gallery-add"
            disabled={busy}
            onClick={() => input.current?.click()}
          >
            <UploadIcon size={22} />
            <span>{busy ? "Đang xử lý..." : "Thêm ảnh"}</span>
          </button>
        ) : null}
      </div>
      <span className={error ? "field-error" : "field-hint"}>
        {error ??
          `${hint ? `${hint} ` : ""}${IMAGE_RULES_HINT} Tối đa ${max} ảnh.`}
      </span>
      <input
        ref={input}
        id={id}
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => {
          void accept(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />
    </div>
  );
}
