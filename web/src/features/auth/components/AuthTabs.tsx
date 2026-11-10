import { Suspense } from "react";

import { Tabs } from "@/components/ui/Tabs";
import { env } from "@/lib/env";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { SampleAccountList } from "./SampleAccountList";

const ITEMS = [
  { value: "login", label: "Đăng nhập" },
  { value: "register", label: "Tạo tài khoản" },
];

export function AuthTabs() {
  return (
    <Tabs
      items={ITEMS}
      panelClassName="tab-panel flex flex-col gap-[18px]"
      panels={{
        login: (
          <>
            <LoginForm />
            {env.NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS === "true" ? (
              <Suspense fallback={null}>
                <SampleAccountList />
              </Suspense>
            ) : null}
          </>
        ),
        register: <RegisterForm />,
      }}
    />
  );
}
