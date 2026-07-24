import { i18n, type Locale } from "./i18n-config";

/** Narrows a raw route param string down to a supported Locale, defaulting safely. */
export function asLocale(lang: string): Locale {
  return (i18n.locales as readonly string[]).includes(lang) ? (lang as Locale) : i18n.defaultLocale;
}
