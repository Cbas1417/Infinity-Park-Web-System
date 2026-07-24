export const i18n = {
  defaultLocale: "nl",
  locales: ["nl", "en", "de", "es"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
  es: "Español",
};

// hreflang values for SEO <link rel="alternate">
export const localeHreflang: Record<Locale, string> = {
  nl: "nl-NL",
  en: "en",
  de: "de-DE",
  es: "es",
};
