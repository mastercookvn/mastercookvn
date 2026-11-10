import { UserIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";

export function SignInLink() {
  return (
    <ButtonLink href={ROUTES.login}>
      <UserIcon size={18} />
      Đăng nhập
    </ButtonLink>
  );
}
