import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative">
      <div className="relative h-[850px] w-full">
        <Image
          src="/images/carrosparking.png"
          alt="carros estacionados en un parking"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-carbon/80 via-carbon/50 to-carbon/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="ml-110 max-w-xl">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              {dict.hero.eyebrow}
            </span>

            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-paper drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-5xl">
              {dict.hero.title}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] md:text-lg">
              {dict.hero.subtitle}
            </p>

            <ul className="mt-8 space-y-2">
              {dict.hero.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-stone-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                >
                  <span
                    aria-hidden="true"
                    className="text-signal"
                  >
                    ✔
                  </span>

                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Link
                href={`/${lang}#servicios`}
                className="inline-block rounded-full border border-signal bg-carbon/70 px-7 py-3.5 text-center text-sm font-semibold text-signal backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-carbon/85 hover:shadow-md hover:shadow-signal/20"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}