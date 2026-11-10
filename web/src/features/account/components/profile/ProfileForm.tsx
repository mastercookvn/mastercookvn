import { LogoutIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/features/auth/actions";

import { ChangePasswordFields } from "@/features/auth/components/password/ChangePasswordFields";
import { SavePasswordButton } from "@/features/auth/components/password/SavePasswordButton";

export function ProfileForm({
  customer,
}: {
  customer: { name: string; phone: string };
}) {
  return (
    <div className="card l-stack max-w-[520px]">
      <TextField
        id="profile-name"
        label="Họ tên"
        defaultValue={customer.name}
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
