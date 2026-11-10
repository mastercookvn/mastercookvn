"use client";

import { useState } from "react";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { ALL_ROLES, ROLE, ROLE_LABEL, type Role } from "@/constants/roles";
import { readDemoState, updateDemoState } from "@/mocks/demoStore";
import type { StaffAccount } from "@/mocks/people";

export function AccountEditForm({
  formId,
  account,
  onSaved,
}: {
  formId: string;
  account: StaffAccount;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const [name, setName] = useState(account.name);
  const [roles, setRoles] = useState<Role[]>(account.roles);
  const [submitted, setSubmitted] = useState(false);

  const accounts = readDemoState().staffAccounts;
  const otherManagers = accounts.filter(
    (other) =>
      other.phone !== account.phone &&
      other.active &&
      other.roles.includes(ROLE.BranchManager)
  );
  const errors = {
    name: name.trim() ? null : "Nhập họ tên",
    roles:
      roles.length === 0
        ? "Chọn ít nhất một vai trò"
        : account.roles.includes(ROLE.BranchManager) &&
            !roles.includes(ROLE.BranchManager) &&
            otherManagers.length === 0
          ? "Không gỡ vai trò Quản lý cơ sở của quản lý cuối cùng"
          : null,
  };

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (Object.values(errors).some(Boolean)) return;
        updateDemoState({
          staffAccounts: accounts.map((other) =>
            other.phone === account.phone
              ? { ...other, name: name.trim(), roles }
              : other
          ),
        });
        showToast(`Đã lưu tài khoản ${name.trim()}`);
        onSaved();
      }}
    >
      <TextField
        id="account-edit-phone"
        label="Số điện thoại"
        value={account.phone}
        disabled
        hint="SĐT là tên đăng nhập, không đổi được."
      />
      <TextField
        id="account-edit-name"
        label="Họ tên"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={submitted ? errors.name : null}
      />
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
