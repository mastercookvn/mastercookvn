"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LogoutIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { ROUTES } from "@/constants/routes";
import { LIVE_VALIDATION_MODE, personNameSchema } from "@/lib/validation";
import { logout } from "@/features/auth/actions";

import { ChangePasswordFields } from "@/features/auth/components/password/ChangePasswordFields";
import { SavePasswordButton } from "@/features/auth/components/password/SavePasswordButton";

export function ProfileForm({
  customer,
}: {
  customer: { name: string; phone: string };
}) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(z.object({ name: personNameSchema })),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { name: customer.name },
  });

  return (
    <div className="card l-stack max-w-[520px]">
      <TextField
        id="profile-name"
        label="Họ tên"
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
      />
      <TextField
        id="profile-phone"
        label="Số điện thoại"
        defaultValue={customer.phone}
        readOnly
        hint="Số điện thoại là định danh hồ sơ và không đổi tại đây."
      />
      <h3 className="card-title card-title-flush mt-2">Đổi mật khẩu</h3>
      <ChangePasswordFields />
      <div className="l-between">
        <SavePasswordButton />
        <form action={logout.bind(null, ROUTES.home)}>
          <Button type="submit">
            <LogoutIcon size={18} />
            Đăng xuất
          </Button>
        </form>
      </div>
    </div>
  );
}
