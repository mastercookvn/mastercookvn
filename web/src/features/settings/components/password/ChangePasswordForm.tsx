import { PanelHeader } from "@/components/ui/PanelHeader";
import { ChangePasswordFields } from "@/features/auth/components/password/ChangePasswordFields";
import { SavePasswordButton } from "@/features/auth/components/password/SavePasswordButton";

export function ChangePasswordForm() {
  return (
    <>
      <PanelHeader title="Đổi mật khẩu" />
      <div className="card l-stack max-w-[420px]">
        <ChangePasswordFields />
        <div>
          <SavePasswordButton />
        </div>
      </div>
    </>
  );
}
