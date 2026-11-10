"use client";

import { useState } from "react";

import { CheckIcon, LockIcon, ShieldIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PasswordField } from "@/components/ui/PasswordField";
import { useToast } from "@/components/ui/Toast";

const MINIMUM_LENGTH = 8;

const STRENGTH_LABEL = ["Rất yếu", "Yếu", "Tạm được", "Khá", "Mạnh"];

export function ChangePasswordForm({
  name,
  phone,
  roles,
}: {
  name: string;
  phone: string;
  roles: string;
}) {
  const showToast = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [signOutOthers, setSignOutOthers] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const digits = phone.replace(/\D/g, "");
  const rules = [
    {
      label: `Tối thiểu ${MINIMUM_LENGTH} ký tự`,
      met: next.length >= MINIMUM_LENGTH,
    },
    {
      label: "Có cả chữ và số",
      met: /[a-zA-Z]/.test(next) && /\d/.test(next),
    },
    {
      label: "Có chữ hoa hoặc ký tự đặc biệt",
      met: /[A-Z]/.test(next) || /[^a-zA-Z0-9]/.test(next),
    },
    {
      label: "Không chứa số điện thoại của bạn",
      met: next !== "" && !next.replace(/\D/g, "").includes(digits),
    },
  ];
  const score = rules.filter((rule) => rule.met).length;
  const errors = {
    current: current ? null : "Nhập mật khẩu hiện tại",
    next:
      score < 3
        ? "Mật khẩu mới chưa đủ mạnh"
        : next === current
          ? "Mật khẩu mới phải khác mật khẩu hiện tại"
          : null,
    confirmation:
      confirmation === next ? null : "Nhập lại chưa khớp với mật khẩu mới",
  };

  return (
    <>
      <PanelHeader
        title="Mật khẩu và đăng nhập"
        subtitle="Mật khẩu chỉ bạn biết. Quên mật khẩu thì nhờ Quản lý cơ sở đặt lại, hệ thống không gửi email."
      />
      <div className="password-layout">
        <form
          className="card l-stack"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            if (Object.values(errors).some(Boolean)) return;
            showToast(
              signOutOthers
                ? "Đã đổi mật khẩu và đăng xuất các thiết bị khác"
                : "Đã đổi mật khẩu"
            );
            setCurrent("");
            setNext("");
            setConfirmation("");
            setSubmitted(false);
          }}
        >
          <h3 className="card-title card-title-flush with-icon">
            <LockIcon size={18} />
            Đổi mật khẩu
          </h3>
          <PasswordField
            id="password-current"
            label="Mật khẩu hiện tại"
            autoComplete="current-password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            error={submitted ? errors.current : null}
          />
          <PasswordField
            id="password-new"
            label="Mật khẩu mới"
            autoComplete="new-password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            error={submitted ? errors.next : null}
          />
          <div className="password-strength" aria-live="polite">
            <div className="password-meter" data-score={score}>
              {[1, 2, 3, 4].map((level) => (
                <span key={level} className={score >= level ? "is-on" : ""} />
              ))}
            </div>
            <span>
              Độ mạnh: <b>{next ? STRENGTH_LABEL[score] : "Chưa nhập"}</b>
            </span>
          </div>
          <ul className="password-rules">
            {rules.map((rule) => (
              <li key={rule.label} className={rule.met ? "is-met" : ""}>
                <CheckIcon size={14} />
                {rule.label}
              </li>
            ))}
          </ul>
          <PasswordField
            id="password-confirm"
            label="Nhập lại mật khẩu mới"
            autoComplete="new-password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            error={submitted ? errors.confirmation : null}
          />
          <CheckboxLabel
            checked={signOutOthers}
            onChange={(event) => setSignOutOthers(event.target.checked)}
          >
            Đăng xuất khỏi các thiết bị khác sau khi đổi
          </CheckboxLabel>
          <div className="form-actions">
            <Button variant="primary" type="submit">
              Đổi mật khẩu
            </Button>
          </div>
        </form>

        <aside className="card l-stack">
          <h3 className="card-title card-title-flush with-icon">
            <ShieldIcon size={18} />
            Tài khoản đăng nhập
          </h3>
          <dl className="account-facts">
            <div>
              <dt>Họ tên</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Tên đăng nhập (SĐT)</dt>
              <dd>{phone}</dd>
            </div>
            <div>
              <dt>Vai trò</dt>
              <dd>{roles}</dd>
            </div>
            <div>
              <dt>Thiết bị đang đăng nhập</dt>
              <dd>Trình duyệt này</dd>
            </div>
          </dl>
          <p className="text-small text-soft">
            Mật khẩu tạm do quản lý cấp nên đổi ngay ở lần đăng nhập đầu. Không
            dùng chung mật khẩu với tài khoản khác.
          </p>
        </aside>
      </div>
    </>
  );
}
