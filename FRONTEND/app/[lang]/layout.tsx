import type { ReactNode } from "react";
import { i18n } from "@/lib/i18n-config";
import { asLocale } from "@/lib/as-locale";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/app/globals.css";



export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="bg-paper text-carbon antialiased">
        <Header lang={lang} dict={dict} />
        <main>{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}