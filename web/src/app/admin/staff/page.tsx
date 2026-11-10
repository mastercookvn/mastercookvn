import type { Metadata } from "next";

import { StaffPage } from "@/features/staff/pages/StaffPage";

export const metadata: Metadata = { title: "Nhân sự" };

export default function Page() {
  return <StaffPage />;
}
