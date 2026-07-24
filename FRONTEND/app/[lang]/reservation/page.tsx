import type { Metadata } from "next";
import { asLocale } from "@/lib/as-locale";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import ReservationConfigurator from "@/components/ReservationConfigurator";

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
    path: "/reservation",
    title: dict.meta.reservation.title,
    description: dict.meta.reservation.description,
  });
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);

  await getDictionary(lang);

  return (
    <section className="container-page py-20 md:py-28">
      <div className="max-w-3xl">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          Reserva
        </span>

        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-carbon md:text-5xl">
          Personaliza tu reserva
        </h1>

        <p className="mt-6 text-base leading-relaxed text-stone md:text-lg">
          Elige el tipo de parking, añade servicios extra y consulta el precio
          total en tiempo real antes de finalizar tu reserva.
        </p>
      </div>

      <div className="mt-14">
        <ReservationConfigurator />
      </div>
    </section>
  );
}