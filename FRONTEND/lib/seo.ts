import type { Metadata } from "next";
import { i18n, localeHreflang, type Locale } from "./i18n-config";

// TODO: reemplazar por el dominio real de Infinity Park cuando esté definido.
export const siteUrl = "https://infinitypark.nl"; 

export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[localeHreflang[locale]] = `${siteUrl}/${locale}${path}`;
  }
  languages["x-default"] = `${siteUrl}/${i18n.defaultLocale}${path}`;

  return {
    canonical: `${siteUrl}/${i18n.defaultLocale}${path}`,
    languages,
  };
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(path),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}${path}`,
      siteName: "Infinity Park",
      locale: localeHreflang[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * JSON-LD structured data for a ParkingFacility business.
 * Helps Google understand entity type for local + sector searches
 * ("parking aeropuerto Schiphol", "airport parking Netherlands", etc.)
 */
export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ParkingFacility",
    name: "Infinity Park",
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
    areaServed: "NL",
    inLanguage: localeHreflang[locale],
  };
}
