import { UserIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";
import { getSession } from "@/lib/auth";

import { CustomerNoticeCount } from "@/features/account/components/orders/CustomerNoticeCount";

import { SignInLink } from "./SignInLink";

export async function SiteAccountLink() {
  const session = await getSession();
  if (!session) return <SignInLink />;

  return (
    <ButtonLink
      href={session.kind === "staff" ? ROUTES.workspace : ROUTES.account}
    >
      <UserIcon size={18} />
      {session.name}
      {session.kind === "customer" ? <CustomerNoticeCount /> : null}
    </ButtonLink>
  );
}
