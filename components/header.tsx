"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n-config";
import { i18n, localeNames } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import Image from "next/image";

function getLocalizedPath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/");
  segments[1] = targetLocale;
  return segments.join("/") || `/${targetLocale}`;
}

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}#servicios`, label: dict.nav.services },
    { href: `/${lang}/international`, label: dict.nav.international },
    { href: `/${lang}/reservation`, label: dict.nav.reservation },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-blueprint bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between">
    <Link href={`/${lang}`} className="flex items-center gap-3" aria-label="Group  C.A.S infinity B.V.">
  <Image
        src="/images/logo.png"
        alt="Group  C.A.S infinity B.V."
        width={64}
        height={64}
        className="h-14 w-14 rounded-xl object-cover"
        priority
        />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-carbon-soft transition-colors hover:text-amber-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 rounded-full border border-blueprint px-3 py-2 text-sm font-medium uppercase tracking-wide text-carbon-soft transition-colors hover:border-carbon"
            >
              {lang}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-40 rounded-xl border border-blueprint bg-paper py-1 shadow-lg"
              >
                {i18n.locales.map((locale) => (
                  <li key={locale}>
                    <Link
                      href={getLocalizedPath(pathname, locale)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-mist ${
                        locale === lang ? "font-semibold text-amber-deep" : "text-carbon-soft"
                      }`}
                    >
                      {localeNames[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href={`/${lang}/reservation`}
            className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-paper shadow-sm shadow-signal/20 transition-all hover:-translate-y-0.5 hover:bg-signal-light hover:shadow-md hover:shadow-signal/30"
          >
            {dict.nav.cta}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center xl:hidden"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path d="M0 1H22M0 8H22M0 15H22" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-blueprint bg-paper xl:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-carbon-soft hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 flex gap-2">
              {i18n.locales.map((locale) => (
                <Link
                  key={locale}
                  href={getLocalizedPath(pathname, locale)}
                  onClick={() => setOpen(false)}
                  className={`flex-1 rounded-full border px-3 py-2 text-center text-sm font-medium uppercase ${
                    locale === lang
                      ? "border-amber-deep text-amber-deep"
                      : "border-blueprint text-stone"
                  }`}
                >
                  {locale}
                </Link>
              ))}
            </div>
            <Link
              href={`/${lang}/reservation`}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-signal px-5 py-3 text-center text-sm font-semibold text-paper shadow-sm shadow-signal/20 transition-colors hover:bg-signal-light"
            >
              {dict.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
