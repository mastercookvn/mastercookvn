import type { Metadata } from "next";

import { BookingPage } from "@/features/booking/pages/BookingPage";

export const metadata: Metadata = { title: "Tính giá và đặt tiệc" };

export default function Page() {
  return <BookingPage />;
}
