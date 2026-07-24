"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function BookingSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const b = dict.hero.booking;

  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [airport, setAirport] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({
      checkin: entry,
      checkout: exit,
      airport,
    });

    router.push(`/${lang}/reservation?${params.toString()}`);
  }

  return (
    <section
      id="reserva"
      className="absolute top-90 right-[15%] z-30 w-full max-w-xl min-h-[750px]"
    >
      <div className="rounded-2xl bg-white/95 p-10 shadow-2xl backdrop-blur-sm">
        <h2 className="mb-7 text-center text-4xl font-bold text-carbon">
          {b.sectionTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="entrada"
                className="block text-sm font-medium text-carbon"
              >
                {b.entryLabel}
              </label>

              <input
                id="entrada"
                type="date"
                required
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-blueprint bg-paper px-4 py-2.5 text-sm text-carbon"
              />
            </div>

            <div>
              <label
                htmlFor="salida"
                className="block text-sm font-medium text-carbon"
              >
                {b.exitLabel}
              </label>

              <input
                id="salida"
                type="date"
                required
                value={exit}
                onChange={(e) => setExit(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-blueprint bg-paper px-4 py-2.5 text-sm text-carbon"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="aeropuerto"
              className="block text-sm font-medium text-carbon"
            >
              {b.airportLabel}
            </label>

            <select
              id="aeropuerto"
              required
              value={airport}
              onChange={(e) => setAirport(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-blueprint bg-paper px-4 py-2.5 text-sm text-carbon"
            >
              <option value="" disabled>
                {b.airportPlaceholder}
              </option>

              {b.airportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-signal px-9 py-3.5 text-sm font-semibold text-paper shadow-md transition-all hover:bg-signal-light"
            >
              {b.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}