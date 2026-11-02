import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MastercookVN",
  description: "Dịch vụ catering cho thuê tiệc tại Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
