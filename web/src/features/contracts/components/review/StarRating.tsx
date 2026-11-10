"use client";

import { StarIcon } from "@/components/icons";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rating" role="group" aria-label="Chọn điểm">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          className={score <= value ? "is-on" : undefined}
          aria-label={`${score} điểm`}
          onClick={() => onChange(score)}
        >
          <StarIcon size={36} />
        </button>
      ))}
    </div>
  );
}
