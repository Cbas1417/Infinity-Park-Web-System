import type { Dictionary } from "@/lib/dictionaries";

export default function ProcessTimeline({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-carbon py-20 text-paper md:py-28">
      <div className="container-page">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          {dict.process.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
          {dict.process.title}
        </h2>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <li key={step.title} className="relative pl-0">
              <span className="text-4xl font-extrabold text-amber/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-light">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-carbon-soft pt-10">
          <h3 className="text-lg font-bold text-amber">{dict.guarantee.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-light">{dict.guarantee.body}</p>
        </div>
      </div>
    </section>
  );
}
