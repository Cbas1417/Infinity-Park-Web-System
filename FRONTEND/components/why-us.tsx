import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

export default function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
            {dict.whyUs.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold leading-tight text-carbon md:text-4xl">
            {dict.whyUs.title}
          </h2>

          <ul className="mt-8 space-y-3">
            {dict.whyUs.items.map((item) => (
              <li key={item.title} className="flex items-start gap-2 text-sm text-stone md:text-base">
                <span aria-hidden="true" className="mt-0.5 text-signal">✔</span>
                <span>
                  <span className="font-semibold text-carbon">{item.title}</span>
                  {" — "}
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-xl shadow-carbon/10 md:h-96">
          <Image
            src="/images/photo-1610049485914-73ba514f92f9.jpeg"
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
