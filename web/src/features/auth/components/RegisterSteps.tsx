import { CheckIcon } from "@/components/icons";

export const REGISTER_STEP = {
  Details: 0,
  VerifyPhone: 1,
  Done: 2,
} as const;

export type RegisterStep = (typeof REGISTER_STEP)[keyof typeof REGISTER_STEP];

const STEPS = [
  { title: "Thông tin", hint: "Họ tên, SĐT, mật khẩu" },
  { title: "Xác thực SĐT", hint: "Nhập mã SMS gửi tới số của bạn" },
  { title: "Hoàn tất", hint: "Thấy ngay đơn đặt bằng SĐT này" },
];

export function RegisterSteps({ current }: { current: RegisterStep }) {
  return (
    <ol className="auth-steps" aria-label="Các bước tạo tài khoản">
      {STEPS.map((step, index) => (
        <li
          key={step.title}
          className={
            index < current ? "is-done" : index === current ? "is-active" : ""
          }
          aria-current={index === current ? "step" : undefined}
        >
          <span className="auth-step-mark">
            {index < current ? <CheckIcon size={14} /> : index + 1}
          </span>
          <span className="l-stack gap-0">
            <b>{step.title}</b>
            <small>{step.hint}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
