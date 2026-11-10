import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, siteConfig.url).href }));
}
