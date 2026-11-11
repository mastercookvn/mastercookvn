"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { BOOKING_STEP, type BookingStep } from "@/constants/booking";
import { ROUTES } from "@/constants/routes";
import { DEMO_TODAY } from "@/constants/settings";
import { useQueryParam } from "@/hooks/useQueryParam";
import { formatDayMonthYear } from "@/lib/format";
import { CUSTOMER } from "@/mocks/contracts";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
  type EstimateMeal,
} from "@/mocks/demoStore";

import { ContactStep } from "@/features/booking/components/contact/ContactStep";
import { EventStep } from "@/features/booking/components/event/EventStep";
import { MenuStep } from "@/features/booking/components/menu/MenuStep";
import { OrderReview } from "@/features/booking/components/review/OrderReview";
import { OrderSentState } from "@/features/booking/components/review/OrderSentState";
import { ServicesStep } from "@/features/booking/components/services/ServicesStep";
import { BookingSummary } from "@/features/booking/components/summary/BookingSummary";
import {
  contactErrors,
  estimateMeal,
  mealInfoErrors,
  mealMenuErrors,
} from "@/features/booking/lib/estimate";

import { BookingStepper } from "./BookingStepper";

const STEPS: { step: BookingStep; label: string; next: string }[] = [
  { step: BOOKING_STEP.Event, label: "Thông tin tiệc", next: "Tiếp tục" },
  { step: BOOKING_STEP.Contact, label: "Người đặt", next: "Tiếp tục chọn món" },
  { step: BOOKING_STEP.Menu, label: "Chọn món", next: "Tiếp tục chọn dịch vụ" },
  { step: BOOKING_STEP.Services, label: "Dịch vụ", next: "Xem lại đơn" },
  { step: BOOKING_STEP.Review, label: "Xem lại", next: "Gửi đơn" },
];

const FIRST_ONLINE_ORDER = 143;

function BookingSteps({ signedIn }: { signedIn: boolean }) {
  const [param, setParam] = useQueryParam("step");
  const router = useRouter();
  const showToast = useToast();
  const [showErrors, setShowErrors] = useState(false);

  const meals = useDemoState((state) => state.estimate);
  const dishes = useDemoState((state) => state.dishes);
  const services = useDemoState((state) => state.services);
  const menuSets = useDemoState((state) => state.menuSets);
  const catalog = { dishes, services, menuSets };
  const savedContact = useDemoState((state) => state.bookingContact);
  const contact = signedIn
    ? { ...savedContact, name: CUSTOMER.name, phone: CUSTOMER.phone }
    : savedContact;
  const estimates = meals.map((meal) => estimateMeal(meal, catalog));

  if (param === BOOKING_STEP.Sent) return <OrderSentState />;

  const current = Math.max(
    0,
    STEPS.findIndex(({ step }) => step === param)
  );
  const { step, next } = STEPS[current];

  const mealProblems = (check: (meal: EstimateMeal) => string[]) =>
    meals.flatMap((meal, index) =>
      check(meal).map((problem) => `Bữa ${index + 1}: ${problem}`)
    );
  const problemsByStep: Record<BookingStep, string[]> = {
    [BOOKING_STEP.Event]: mealProblems(mealInfoErrors),
    [BOOKING_STEP.Contact]: Object.values(contactErrors(contact)).filter(
      (problem) => problem !== null
    ),
    [BOOKING_STEP.Menu]: mealProblems((meal) => mealMenuErrors(meal, catalog)),
    [BOOKING_STEP.Services]: [],
    [BOOKING_STEP.Review]: estimates.flatMap(
      (estimate) => estimate.errors ?? []
    ),
    [BOOKING_STEP.Sent]: [],
  };
  const problems = problemsByStep[step];

  const goTo = (target: BookingStep) => {
    setShowErrors(false);
    setParam(target === BOOKING_STEP.Event ? null : target);
    window.scrollTo(0, 0);
  };

  const submit = () => {
    if (!signedIn) {
      showToast("Đăng nhập để gửi đơn, lựa chọn của bạn vẫn được giữ", "info");
      router.push(
        `${ROUTES.login}?next=${encodeURIComponent(`${ROUTES.booking}?step=${BOOKING_STEP.Review}`)}`
      );
      return;
    }
    const { submittedOrders, bookingEventType } = readDemoState();
    // Placeholder for POST /orders, which assigns the real code.
    const code = `DH-${String(FIRST_ONLINE_ORDER + submittedOrders.length).padStart(4, "0")}`;
    updateDemoState({
      submittedOrders: [
        {
          code,
          submittedAt: formatDayMonthYear(DEMO_TODAY),
          eventType: bookingEventType,
          contact,
          meals,
          total: estimates.reduce(
            (sum, estimate) => sum + (estimate.price?.total ?? 0),
            0
          ),
        },
        ...submittedOrders,
      ],
    });
    goTo(BOOKING_STEP.Sent);
  };

  const proceed = () => {
    if (problems.length) {
      setShowErrors(true);
      return;
    }
    if (step === BOOKING_STEP.Review) {
      submit();
      return;
    }
    goTo(STEPS[current + 1].step);
  };

  return (
    <>
      <BookingStepper
        steps={STEPS.map(({ label }) => label)}
        current={current}
        onSelect={(index) => goTo(STEPS[index].step)}
      />
      <div className="l-grid l-grid-main">
        <div key={step} className="tab-panel l-stack gap-4">
          {step === BOOKING_STEP.Event ? (
            <EventStep showErrors={showErrors} />
          ) : null}
          {step === BOOKING_STEP.Contact ? (
            <ContactStep
              contact={contact}
              signedIn={signedIn}
              showErrors={showErrors}
            />
          ) : null}
          {step === BOOKING_STEP.Menu ? (
            <MenuStep showErrors={showErrors} />
          ) : null}
          {step === BOOKING_STEP.Services ? <ServicesStep /> : null}
          {step === BOOKING_STEP.Review ? (
            <OrderReview
              meals={meals}
              estimates={estimates}
              contact={contact}
              onEdit={goTo}
            />
          ) : null}
        </div>
        <BookingSummary
          meals={meals}
          estimates={estimates}
          problems={showErrors ? problems : []}
        >
          <Button variant="primary" onClick={proceed}>
            {next}
          </Button>
          {current > 0 ? (
            <Button onClick={() => goTo(STEPS[current - 1].step)}>
              Quay lại
            </Button>
          ) : null}
        </BookingSummary>
      </div>
    </>
  );
}

export function BookingFlow({ signedIn }: { signedIn: boolean }) {
  return (
    <Suspense fallback={null}>
      <BookingSteps signedIn={signedIn} />
    </Suspense>
  );
}
