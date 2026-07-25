import type { Metadata } from "next";
import { asLocale } from "@/lib/as-locale";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import Hero from "@/components/hero";
import BookingSection from "@/components/booking-section";
import IntroStats from "@/components/intro-stats";
import ServicesGrid from "@/components/services-grid";
import WhyUs from "@/components/why-us";
import ProjectsShowcase from "@/components/projects-showcase";
import ProcessTimeline from "@/components/process-timeline";
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
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = await getDictionary(lang);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(lang)) }}
      />
      <Hero lang={lang} dict={dict} />
      <BookingSection lang={lang} dict={dict} />
      <IntroStats dict={dict} />
      <WhyUs dict={dict} />
      <ServicesGrid lang={lang} dict={dict} />
      <ProjectsShowcase dict={dict} />
      <ProcessTimeline dict={dict} />
      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}
