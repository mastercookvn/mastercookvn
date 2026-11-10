"use client";

import { useState } from "react";

import { StarIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { updateDemoState, useDemoState } from "@/mocks/demoStore";

import { StarRating } from "./StarRating";

export function ReviewForm() {
  const submitted = useDemoState((state) => state.reviewSubmitted);
  const [score, setScore] = useState(0);
  const showToast = useToast();

  if (submitted) {
    return (
      <EmptyState>
        <StarIcon size={44} />
        <h3 className="text-18 font-semibold">Cảm ơn bạn đã đánh giá!</h3>
      </EmptyState>
    );
  }

  return (
    <form
      className="card l-stack max-w-[560px]"
      onSubmit={(event) => {
        event.preventDefault();
        updateDemoState({ reviewSubmitted: true });
        showToast("Cảm ơn bạn đã đánh giá");
      }}
    >
      <h3 className="card-title card-title-flush">Bữa tiệc thế nào?</h3>
      <p className="text-small text-soft">
        Không bắt buộc. Đánh giá chỉ dùng nội bộ, không đăng công khai.
      </p>
      <StarRating value={score} onChange={setScore} />
      <Field id="review-comment" label="Nhận xét">
        <textarea
          id="review-comment"
          className="input"
          placeholder="Món ăn, phục vụ, thu dọn..."
        />
      </Field>
      <div>
        <Button type="submit" variant="primary" disabled={!score}>
          Gửi đánh giá
        </Button>
      </div>
    </form>
  );
}
