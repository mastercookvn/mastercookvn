import { env } from "@/lib/env";

export const siteConfig = {
  name: "MasterCook VN",
  description:
    "Tiệc nấu sẵn tại bếp, giao và phục vụ tại địa điểm của bạn, trong phạm vi 20 km.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "vi_VN",
  themeColor: "#f8f7f2",
  /** Placeholder (V10). */
  phone: "0900 000 000",
} as const;
