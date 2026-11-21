import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";
import { ROLE_LABEL } from "@/constants/roles";
import { getStaffSession } from "@/lib/auth";

import { AccountTable } from "../components/accounts/AccountTable";
import { BusinessSettingsForm } from "../components/parameters/BusinessSettingsForm";
import { ChangePasswordForm } from "../components/password/ChangePasswordForm";

export async function SettingsPage() {
  const session = await getStaffSession();

  return (
    <WorkspaceTabs
      screen="settings"
      panels={{
        password: (
          <ChangePasswordForm
            name={session?.name ?? ""}
            phone={session?.phone ?? ""}
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
