import { SITE } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/DesignSystem`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
