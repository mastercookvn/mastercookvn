import { CheckIcon } from "@/components/icons";

export type AuthStep = { title: string; hint: string };

export function AuthSteps({
  steps,
  current,
  label,
}: {
  steps: readonly AuthStep[];
  current: number;
  label: string;
}) {
  return (
    <ol className="auth-steps" aria-label={label}>
      {steps.map((step, index) => (
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
