"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

import { BowlIcon, UploadIcon } from "@/components/icons";
import { MAX_UPLOAD_BYTES, resizeImage } from "@/lib/image";
import { cn } from "@/lib/utils";

import { Button } from "./Button";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const IMAGE_RULES_HINT = "JPG, PNG hoặc WebP, tối đa 5 MB.";

export function imageFileProblem(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type))
    return "Chỉ nhận ảnh JPG, PNG hoặc WebP.";
  if (file.size > MAX_UPLOAD_BYTES) return "Ảnh tối đa 5 MB.";
  return null;
}

export function ImageUploadField({
  id,
  label,
  value,
  alt,
  onChange,
  hint = `${IMAGE_RULES_HINT} Kéo thả ảnh vào khung cũng được. Tỉ lệ 4:3 hiển thị đẹp nhất.`,
  placeholder = <BowlIcon size={30} />,
}: {
  id: string;
  label: string;
  value: string | null;
  alt: string;
  onChange: (dataUrl: string | null) => void;
  hint?: string;
  placeholder?: ReactNode;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const accept = async (file: File | undefined) => {
    if (!file) return;
    const problem = imageFileProblem(file);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    try {
      onChange(await resizeImage(file));
      setError(null);
    } catch (cause) {
      console.error("Image upload failed", cause);
      setError("Không đọc được ảnh này, hãy thử ảnh khác.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="image-upload">
        <button
          type="button"
          aria-label={
            value ? `Đổi ${label.toLowerCase()}` : `Chọn ${label.toLowerCase()}`
          }
          onClick={() => input.current?.click()}
          className={cn("image-upload-preview", dragging && "is-dragging")}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            void accept(event.dataTransfer.files[0]);
          }}
        >
          {value ? (
            <Image
              src={value}
              alt={alt}
              fill
              sizes="132px"
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="image-upload-empty">
              {placeholder}
              <span>Chạm để chọn ảnh</span>
            </span>
          )}
        </button>
        <div className="l-stack gap-1.5">
          <div className="l-row gap-2">
            <Button
              size="sm"
              disabled={busy}
              onClick={() => input.current?.click()}
            >
              <UploadIcon size={16} />
              {busy ? "Đang xử lý..." : value ? "Đổi ảnh" : "Tải ảnh lên"}
            </Button>
            {value ? (
              <Button size="sm" variant="text" onClick={() => onChange(null)}>
                Gỡ ảnh
              </Button>
            ) : null}
          </div>
          <span className={error ? "field-error" : "field-hint"}>
            {error ?? hint}
          </span>
        </div>
      </div>
      <input
        ref={input}
        id={id}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => {
          void accept(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}
