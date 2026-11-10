import { ToastButton } from "@/components/ui/ToastButton";

export function ResetPasswordButton() {
  return (
    <ToastButton
      size="sm"
      message="Đã đặt mật khẩu tạm. Báo nhân viên ngoài hệ thống."
    >
      Đặt lại mật khẩu
    </ToastButton>
  );
}
