import type { Locale } from "./i18n-config";
import "server-only";

const dictionaries = {
  nl: () => import("@/dictionaries/nl").then((mod) => mod.default),
  en: () => import("@/dictionaries/en").then((mod) => mod.default),
  de: () => import("@/dictionaries/de").then((mod) => mod.default),
  es: () => import("@/dictionaries/es").then((mod) => mod.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.nl();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
