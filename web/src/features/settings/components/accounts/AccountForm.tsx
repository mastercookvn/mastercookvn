"use client";

import { useState } from "react";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { ALL_ROLES, ROLE_LABEL, type Role } from "@/constants/roles";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";

const PHONE = /^0\d{9}$/;
const MINIMUM_PASSWORD_LENGTH = 8;

export function AccountForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const digits = phone.replace(/\D/g, "");
  const existing = readDemoState().staffAccounts.find(
    (account) => account.phone.replace(/\D/g, "") === digits
  );
  const errors = {
    name: existing || name.trim() ? null : "Nhập họ tên",
    phone: PHONE.test(digits)
      ? null
      : "Số điện thoại gồm 10 số, bắt đầu bằng 0",
    password:
      existing || password.length >= MINIMUM_PASSWORD_LENGTH
        ? null
        : `Mật khẩu tạm tối thiểu ${MINIMUM_PASSWORD_LENGTH} ký tự`,
    roles: roles.length > 0 ? null : "Chọn ít nhất một vai trò",
  };

  const save = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    const accounts = readDemoState().staffAccounts;
    if (existing) {
      updateDemoState({
        staffAccounts: accounts.map((account) =>
          account === existing
            ? {
                ...account,
                roles: [...new Set([...account.roles, ...roles])],
              }
            : account
        ),
      });
      showToast(`Đã thêm vai trò cho ${existing.name}`);
    } else {
      updateDemoState({
        staffAccounts: [
          {
            name: name.trim(),
            phone: `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
            roles,
            active: true,
          },
          ...accounts,
        ],
      });
      showToast("Đã tạo tài khoản. Báo mật khẩu tạm cho nhân viên.");
    }
    onSaved();
  };

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <TextField
        id="account-phone"
        label="Số điện thoại"
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        error={submitted ? errors.phone : null}
        hint={
          existing
            ? `Đã có tài khoản ${existing.name}. Lưu sẽ thêm vai trò cho tài khoản này.`
            : "Trùng SĐT sẽ thêm vai trò vào tài khoản đã có."
        }
      />
      {existing ? null : (
        <>
          <TextField
            id="account-name"
            label="Họ tên"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={submitted ? errors.name : null}
          />
          <TextField
            id="account-password"
            label="Mật khẩu tạm"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={submitted ? errors.password : null}
            hint="Nhân viên đổi mật khẩu ở lần đăng nhập đầu."
          />
        </>
      )}
      <fieldset className="l-stack gap-1.5">
        <legend className="field-legend">Vai trò</legend>
        {ALL_ROLES.map((role) => (
          <CheckboxLabel
            key={role}
            checked={roles.includes(role)}
            onChange={() =>
              setRoles(
                roles.includes(role)
                  ? roles.filter((other) => other !== role)
                  : [...roles, role]
              )
            }
          >
            {ROLE_LABEL[role]}
          </CheckboxLabel>
        ))}
        {submitted && errors.roles ? (
          <p className="field-error" role="alert">
            {errors.roles}
          </p>
        ) : null}
      </fieldset>
    </form>
  );
}
