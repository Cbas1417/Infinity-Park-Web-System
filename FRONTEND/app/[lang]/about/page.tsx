import type { Metadata } from "next";
import { asLocale } from "@/lib/as-locale";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import CtaBanner from "@/components/cta-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = await getDictionary(lang);
  return buildMetadata({
    locale: lang,
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-carbon py-20 md:py-28">
        <div className="container-page max-w-3xl">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
            {dict.about.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-paper md:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-light md:text-lg">
            {dict.about.intro}
          </p>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <span className="block h-px w-10 bg-amber" />
            <h2 className="mt-4 text-2xl font-extrabold text-carbon">
              {dict.about.mission.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              {dict.about.mission.body}
            </p>
          </div>
          <div>
            <span className="block h-px w-10 bg-amber" />
            <h2 className="mt-4 text-2xl font-extrabold text-carbon">
              {dict.about.team.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              {dict.about.team.body}
            </p>
          </div>
        </div>

        <div className="mt-24">
          <span className="block h-px w-10 bg-amber" />
          <h2 className="mt-4 text-2xl font-extrabold text-carbon">
            {dict.about.values.title}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.items.map((value) => (
              <div key={value.title}>
                <h3 className="text-base font-bold text-carbon">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}