import { getSession } from "@/lib/auth";
import { CUSTOMER } from "@/mocks/contracts";

import { AccountHeader } from "../components/AccountHeader";
import { AccountTabs } from "../components/AccountTabs";

export async function AccountPage() {
  const session = await getSession();
  const customer =
    session?.kind === "customer"
      ? { name: session.name, phone: session.phone }
      : CUSTOMER;

  return (
    <div className="page">
      <AccountHeader customer={customer} />
      <AccountTabs customer={customer} />
    </div>
  );
}
