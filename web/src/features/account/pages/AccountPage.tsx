import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { AccountHeader } from "../components/AccountHeader";
import { AccountTabs } from "../components/AccountTabs";

export async function AccountPage() {
  const session = await getSession();
  if (session?.kind !== "customer") redirect(ROUTES.login);
  const customer = { name: session.name, phone: session.phone };

  return (
    <div className="page">
      <AccountHeader customer={customer} />
      <AccountTabs customer={customer} />
    </div>
  );
}
