import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { company } from "@/lib/company-data";
import Image from "next/image";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blueprint bg-carbon text-paper">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
    <Link href={`/${lang}`} className="flex items-center gap-3" aria-label="Group  C.A.S infinity B.V.">
      <Image
          src="/images/logo.png"
          alt="Group  C.A.S infinity B.V."
          width={60}
          height={56}
          className="h-13 w-13 rounded-xl object-cover"
        />
      </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-light">
            {dict.footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber">
            {dict.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-light">
            <li><Link href={`/${lang}`} className="hover:text-paper">{dict.nav.home}</Link></li>
            <li><Link href={`/${lang}/about`} className="hover:text-paper">{dict.nav.about}</Link></li>
            <li><Link href={`/${lang}#servicios`} className="hover:text-paper">{dict.nav.services}</Link></li>
            <li><Link href={`/${lang}/international`} className="hover:text-paper">{dict.nav.international}</Link></li>
            <li><Link href={`/${lang}/reservation`} className="hover:text-paper">{dict.nav.reservation}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-light">
            <li>{company.address.street}</li>
            <li>{company.phone}</li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-paper">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-carbon-soft py-6 text-xs text-stone-light md:flex-row">
        <p>
          © {year} {company.legalName} — {dict.footer.rights}
        </p>
        <p>{dict.footer.kvk}: {company.kvkNumber}</p>
      </div>
    </footer>
  );
}
