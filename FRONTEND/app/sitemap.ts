import type { MetadataRoute } from "next";
import { i18n, localeHreflang } from "@/lib/i18n-config";
import { siteUrl } from "@/lib/seo";

const paths = ["", "/about", "/international", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const languages: Record<string, string> = {};
    for (const locale of i18n.locales) {
      languages[localeHreflang[locale]] = `${siteUrl}/${locale}${path}`;
    }
    languages["x-default"] = `${siteUrl}/${i18n.defaultLocale}${path}`;

    for (const locale of i18n.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
