import { TextField } from "@/components/ui/TextField";

export function ChangePasswordFields() {
  return (
    <>
      <TextField
        id="password-current"
        label="Mật khẩu hiện tại"
        type="password"
      />
      <TextField id="password-new" label="Mật khẩu mới" type="password" />
    </>
  );
}
