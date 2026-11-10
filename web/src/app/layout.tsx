import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

// Runs before paint. Without JS no hidden reveal state applies.
const MOTION_SCRIPT = `document.documentElement.classList.add(matchMedia("(prefers-reduced-motion: reduce)").matches?"motion-still":"motion-live")`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
