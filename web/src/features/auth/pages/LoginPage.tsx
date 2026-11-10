import { AuthLayout } from "../components/AuthLayout";
import { AuthTabs } from "../components/AuthTabs";

export function LoginPage() {
  return (
    <div className="page">
      <AuthLayout>
        <AuthTabs />
      </AuthLayout>
    </div>
  );
}
