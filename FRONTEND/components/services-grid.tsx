import Image from "next/image";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";

const images = [
  "/images/photo-1570396005418-db78f32e2b29.jpeg",
  "/images/carwash.png",
  "/images/valet.png",
  "/images/chargercar.png",
  "/images/HomeDelivery.png",
  "/images/traslado.png",
  
];

export default function ServicesGrid({ dict }: { lang: Locale; dict: Dictionary }) {
  const s = dict.services;

  return (
    <section id="servicios" className="container-page py-20 md:py-28">
      <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
        {s.eyebrow}
      </span>
      <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-carbon md:text-4xl">
        {s.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">{s.subtitle}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.slice(0, 6).map((service, i) => (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-2xl shadow-lg shadow-carbon/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-carbon/20"
          >
            <div className="relative h-90 w-full">
              <Image
                src={images[i % images.length]}
                alt=""
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-140"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-lg font-bold text-paper">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-light">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
