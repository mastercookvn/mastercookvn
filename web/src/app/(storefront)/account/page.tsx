import type { Metadata } from "next";

import { AccountPage } from "@/features/account/pages/AccountPage";

export const metadata: Metadata = { title: "Hồ sơ của tôi" };

export default function Page() {
  return <AccountPage />;
}
