"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { useToast } from "@/components/ui/Toast";
import { ROUTES } from "@/constants/routes";
import { useQueryParam } from "@/hooks/useQueryParam";

import { BookingStepper } from "./BookingStepper";
import { EstimateStep } from "@/features/booking/components/estimate/EstimateStep";
import { OrderDetailsForm } from "@/features/booking/components/details/OrderDetailsForm";
import { OrderReview } from "@/features/booking/components/review/OrderReview";
import { OrderSentState } from "@/features/booking/components/review/OrderSentState";

const STEP_NUMBER: Record<string, number> = { details: 2, review: 3, sent: 4 };

function BookingSteps({ signedIn }: { signedIn: boolean }) {
  const [step, setStep] = useQueryParam("step");
  const router = useRouter();
  const showToast = useToast();
  const current = (step && STEP_NUMBER[step]) || 1;

  const goTo = (next: string | null) => {
    setStep(next);
    window.scrollTo(0, 0);
  };

  const goToReview = () => {
    if (signedIn) {
      goTo("review");
      return;
    }
    showToast("Đăng nhập để gửi đơn, lựa chọn của bạn vẫn được giữ", "info");
    router.push(
      `${ROUTES.login}?next=${encodeURIComponent(`${ROUTES.booking}?step=details`)}`,
    );
  };

  return (
    <>
      <BookingStepper current={current} />
      <div key={current} className="tab-panel">
        {current === 1 ? (
          <EstimateStep onContinue={() => goTo("details")} />
        ) : null}
        {current === 2 ? (
          <OrderDetailsForm
            signedIn={signedIn}
            onBack={() => goTo(null)}
            onContinue={goToReview}
          />
        ) : null}
        {current === 3 ? (
          <OrderReview
            onBack={() => goTo("details")}
            onSubmit={() => {
              goTo("sent");
              showToast(
                "Đặt đơn thành công! Tư vấn sẽ sớm gọi cho bạn để khảo sát địa điểm.",
              );
            }}
          />
        ) : null}
        {current === 4 ? <OrderSentState /> : null}
      </div>
    </>
  );
}

export function BookingFlow({ signedIn }: { signedIn: boolean }) {
  return (
    <Suspense fallback={<BookingStepper current={1} />}>
      <BookingSteps signedIn={signedIn} />
    </Suspense>
  );
}
