import { WorkspaceTabs } from "@/components/layout/workspace/WorkspaceTabs";

import { AccountTable } from "../components/accounts/AccountTable";
import { BusinessSettingsForm } from "../components/parameters/BusinessSettingsForm";
import { ChangePasswordForm } from "../components/password/ChangePasswordForm";

export function SettingsPage() {
  return (
    <WorkspaceTabs
      screen="settings"
      panels={{
        password: <ChangePasswordForm />,
        parameters: <BusinessSettingsForm />,
        accounts: <AccountTable />,
      }}
    />
  );
}
