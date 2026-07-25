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
    path: "/international",
    title: dict.meta.international.title,
    description: dict.meta.international.description,
  });
}

export default async function InternationalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.internationalPage;

  return (
    <>
      <section className="bg-carbon py-20 text-paper md:py-28">
        <div className="container-page max-w-3xl">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
            {p.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {p.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-stone-light md:text-lg">{p.intro}</p>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-2">
          <p className="text-base leading-relaxed text-stone md:text-lg">{p.body}</p>
          <div className="border-t-2 border-amber pt-5">
            <h2 className="text-xl font-bold text-carbon">{p.whyTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone">{p.whyBody}</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-blueprint pt-10 sm:grid-cols-3">
          {p.regions.map((region) => (
            <div
              key={region}
              className="rounded-2xl bg-mist px-6 py-5 text-center text-carbon shadow-sm shadow-carbon/5 transition-shadow hover:shadow-md hover:shadow-carbon/10"
            >
              <span className="text-base font-bold text-carbon">{region}</span>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}