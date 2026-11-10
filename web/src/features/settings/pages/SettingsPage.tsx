import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { ROLE_LABEL } from "@/constants/roles";
import { getStaffSession } from "@/lib/auth";
import { STAFF_ACCOUNTS } from "@/mocks/people";

import { AccountTable } from "../components/accounts/AccountTable";
import { BusinessSettingsForm } from "../components/parameters/BusinessSettingsForm";
import { ChangePasswordForm } from "../components/password/ChangePasswordForm";

export async function SettingsPage() {
  const session = await getStaffSession();
  // The session carries no phone yet; the sample accounts are the lookup until the API exists.
  const account = STAFF_ACCOUNTS.find(
    (candidate) => candidate.name === session?.name
  );

  return (
    <WorkspaceTabs
      screen="settings"
      panels={{
        password: (
          <ChangePasswordForm
            name={session?.name ?? ""}
            phone={account?.phone ?? ""}
            roles={(session?.roles ?? [])
              .map((role) => ROLE_LABEL[role])
              .join(", ")}
          />
        ),
        parameters: <BusinessSettingsForm />,
        accounts: <AccountTable />,
      }}
    />
  );
}
