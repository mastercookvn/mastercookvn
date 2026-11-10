import type { Metadata } from "next";

import { SettingsPage } from "@/features/settings/pages/SettingsPage";

export const metadata: Metadata = { title: "Cài đặt" };

export default function Page() {
  return <SettingsPage />;
}
