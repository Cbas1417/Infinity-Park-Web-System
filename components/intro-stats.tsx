import type { Dictionary } from "@/lib/dictionaries";

export default function IntroStats({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <h2 className="text-3xl font-extrabold leading-tight text-carbon md:text-4xl">
          {dict.intro.title}
        </h2>
        <p className="text-base leading-relaxed text-stone md:text-lg">{dict.intro.body}</p>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-blueprint pt-10 md:grid-cols-4">
        {dict.intro.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-3xl font-extrabold text-amber-deep md:text-4xl">
              {stat.value}
            </dd>
            <p className="mt-2 text-sm leading-snug text-stone">{stat.label}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
