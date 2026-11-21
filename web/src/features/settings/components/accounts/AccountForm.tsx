"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { CheckboxLabel } from "@/components/ui/CheckboxLabel";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { ALL_ROLES, ROLE, ROLE_LABEL } from "@/constants/roles";
import {
  firstError,
  LIVE_VALIDATION_MODE,
  personNameSchema,
  phoneSchema,
  toLocalPhone,
} from "@/lib/validation";
import { readDemoState, updateDemoState } from "@/lib/demoStore";

const MINIMUM_PASSWORD_LENGTH = 8;

const findAccount = (phone: string) =>
  readDemoState().staffAccounts.find(
    (account) => toLocalPhone(account.phone) === toLocalPhone(phone)
  );

/** Name and password unregister while the phone already has an account (UC-TK-03 4e), so they are optional here. */
const accountSchema = z.object({
  phone: phoneSchema,
  name: personNameSchema.optional(),
  password: z
    .string()
    .min(
      MINIMUM_PASSWORD_LENGTH,
      `Mật khẩu tạm tối thiểu ${MINIMUM_PASSWORD_LENGTH} ký tự`
    )
    .optional(),
  roles: z.array(z.enum(ROLE)).min(1, "Chọn ít nhất một vai trò"),
});

export function AccountForm({
  formId,
  onSaved,
}: {
  formId: string;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    mode: LIVE_VALIDATION_MODE,
    shouldUnregister: true,
    defaultValues: { phone: "", name: "", password: "", roles: [] },
  });

  const phone = useWatch({ control, name: "phone" });
  const existing = firstError(phoneSchema, phone)
    ? undefined
    : findAccount(phone);

  const save = handleSubmit((values) => {
    const accounts = readDemoState().staffAccounts;
    if (existing) {
      updateDemoState({
        staffAccounts: accounts.map((account) =>
          account === existing
            ? {
                ...account,
                roles: [...new Set([...account.roles, ...values.roles])],
              }
            : account
        ),
      });
      showToast(`Đã thêm vai trò cho ${existing.name}`);
    } else {
      const digits = values.phone;
      updateDemoState({
        staffAccounts: [
          {
            name: values.name ?? "",
            phone: `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
            roles: values.roles,
            active: true,
          },
          ...accounts,
        ],
      });
      showToast("Đã tạo tài khoản. Báo mật khẩu tạm cho nhân viên.");
    }
    onSaved();
  });

  return (
    <form id={formId} className="l-stack" noValidate onSubmit={save}>
      <TextField
        id="account-phone"
        label="Số điện thoại"
        type="tel"
        inputMode="tel"
        autoComplete="off"
        {...register("phone")}
        error={errors.phone?.message}
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
            {...register("name")}
            error={errors.name?.message}
          />
          <TextField
            id="account-password"
            label="Mật khẩu tạm"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
            hint="Nhân viên đổi mật khẩu ở lần đăng nhập đầu."
          />
        </>
      )}
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
