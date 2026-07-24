import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function CtaBanner({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/photo-1756914593896-fcebe6ad202f.jpeg"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-carbon/60" />
      </div>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-2xl font-extrabold text-paper md:text-3xl">
          {dict.ctaBanner.title}
        </h2>
        <p className="mt-3 max-w-lg text-sm text-stone-light md:text-base">{dict.ctaBanner.subtitle}</p>
        <Link
          href={`/${lang}/reservation`}
          className="mt-8 inline-block rounded-full bg-signal px-9 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-signal/30 transition-all hover:-translate-y-0.5 hover:bg-signal-light hover:shadow-xl hover:shadow-signal/40"
        >
          {dict.ctaBanner.button}
        </Link>
      </div>
    </section>
  );
}
