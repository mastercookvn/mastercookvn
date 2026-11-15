"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { ALL_ROLES, ROLE, ROLE_LABEL } from "@/constants/roles";
import { LIVE_VALIDATION_MODE, personNameSchema } from "@/lib/validation";
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
  const accounts = readDemoState().staffAccounts;
  const isLastManager =
    account.roles.includes(ROLE.BranchManager) &&
    !accounts.some(
      (other) =>
        other.phone !== account.phone &&
        other.active &&
        other.roles.includes(ROLE.BranchManager)
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: personNameSchema,
        roles: z
          .array(z.enum(ROLE))
          .min(1, "Chọn ít nhất một vai trò")
          .refine(
            (roles) => !isLastManager || roles.includes(ROLE.BranchManager),
            "Không gỡ vai trò Quản lý cơ sở của quản lý cuối cùng"
          ),
      })
    ),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { name: account.name, roles: account.roles },
  });

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={handleSubmit((values) => {
        updateDemoState({
          staffAccounts: accounts.map((other) =>
            other.phone === account.phone
              ? { ...other, name: values.name, roles: values.roles }
              : other
          ),
        });
        showToast(`Đã lưu tài khoản ${values.name}`);
        onSaved();
      })}
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
        {...register("name")}
        error={errors.name?.message}
      />
      <fieldset className="l-stack gap-1.5">
        <legend className="field-legend">Vai trò</legend>
        {ALL_ROLES.map((role) => (
          <CheckboxLabel key={role} value={role} {...register("roles")}>
            {ROLE_LABEL[role]}
          </CheckboxLabel>
        ))}
        {errors.roles ? (
          <p className="field-error" role="alert">
            {errors.roles.message}
          </p>
        ) : null}
      </fieldset>
    </form>
  );
}
