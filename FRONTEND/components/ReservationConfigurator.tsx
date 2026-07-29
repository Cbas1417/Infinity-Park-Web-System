"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { apiFetch, findOrCreate } from "@/lib/api";

const AIRPORT_INFO: Record<
  string,
  { name: string; IATA_code: string; country: string; city: string }
> = {
  "Schiphol – Ámsterdam": {
    name: "Schiphol – Ámsterdam",
    IATA_code: "AMS",
    country: "Países Bajos",
    city: "Ámsterdam",
  },
  "Eindhoven Airport": {
    name: "Eindhoven Airport",
    IATA_code: "EIN",
    country: "Países Bajos",
    city: "Eindhoven",
  },
};

const DEFAULT_ROLE_NAME = "Cliente";

export default function ReservationConfigurator() {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const airport = searchParams.get("airport") || "";

  const [parkingType, setParkingType] = useState<"covered" | "uncovered">(
    "uncovered" 
    
  );

  const [extras, setExtras] = useState<string[]>([]);

  const [step, setStep] = useState<"extras" | "customer-data">("extras");

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plate: "",
    carMake: "",
    vehicleModel: "",
    flightNumber: "",
    notes: "",
  });

  const updateCustomerData = (
    field: keyof typeof customerData,
    value: string
  ) => {
    setCustomerData((current) => ({ ...current, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const days = 
    checkin && checkout
      ? Math.max(1, Math.ceil(
          (new Date(checkout).getTime() -
           new Date(checkin).getTime()) /
          (1000 * 60 * 60 * 24)
        ))
      : 0;

  const reservation = {
    checkin, 
    checkout,
    airport,
    days,
  };

  const parkingPrices = {
    uncovered: 8,
    covered: 12,
  };

const parkingOptions: {
  id: "covered" | "uncovered";
  name: string;
  description: string;
  price: number;
  image: string;
}[] = [
  {
    id: "covered",
    name: "Parking cubierto",
    description:
      "Elige una plaza techada para proteger tu vehículo del sol, la lluvia y el granizo.",
    price: 12,
    image: "/images/photo-1570396005418-db78f32e2b29.jpeg",
  },
  {
    id: "uncovered",
    name: "Parking sin cubrir",
    description:
      "Elige una plaza sin techado para disfrutar de un lugar de estacionamiento accesible y conveniente.",
    price: 8,
    image: "/images/photo-1690910693729-8632ce25c1b3.jpeg",
  },
];

const availableExtras: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}[] = [
  {

    id: "traslado",
    name: "Traslado al aeropuerto",
    description:
      "Servicio de traslado cómodo y puntual entre nuestras instalaciones y el aeropuerto para garantizar una experiencia de viaje fluida.",
    price: 15,
    image: "/images/traslado.png",
  },
  {
        id: "valet",
        name: "Valet Airport Parking",
        description:
          "Recogida y entrega del vehículo directamente en la terminal para una experiencia más cómoda.",
        price: 49,
      image: "/images/valet.png",
  },
  {
    id: "lavado-exterior",
    name: "Lavado Exterior",
    description:
      "Lavado completo de la carrocería para que su vehículo luzca impecable a la vuelta de su viaje.",
    price: 20,
    image: "/images/carwash.png",
  },
  {
    id: "lavado-style",
    name: "Lavado Style",
    description:
      "Lavado interior y exterior para un acabado completo, cuidando cada detalle de su vehículo.",
    price: 40,
    image: "/images/lavadodetalling.png",
  },
  {
    id: "lavado-premium",
    name: "Lavado Premium",
    description:
      "Tratamiento premium interior y exterior con detailing completo para el máximo cuidado de su vehículo.",
    price: 80,
    image: "/images/lavadopremium.png",
  },
  {
    id: "ev-charge",
    name: "Carga de vehículo eléctrico",
    description:
      "Recargue su vehículo durante la estancia y recójalo listo para continuar su viaje.",
    price: 25,
    image: "/images/chargercar.png",
  },
  {
    id: "home-delivery",
    name: "Home Delivery",
    description:
      "Entrega del vehículo en su domicilio o en una ubicación previamente acordada.",
    price: 39,
    image: "/images/HomeDelivery.png",
  },
];

  const toggleExtra = (id: string) => {
    setExtras((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const total = useMemo(() => {
    const parkingCost =
      reservation.days * parkingPrices[parkingType];

    const extrasCost = availableExtras
      .filter((extra) => extras.includes(extra.id))
      .reduce((sum, extra) => sum + extra.price, 0);

    return parkingCost + extrasCost;
  }, [parkingType, extras]);

  async function handleConfirmBooking() {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const airportInfo = AIRPORT_INFO[reservation.airport] ?? {
        name: reservation.airport || "Aeropuerto",
        IATA_code: (reservation.airport || "N/A").slice(0, 3).toUpperCase(),
        country: "",
        city: "",
      };

      const airportId = await findOrCreate(
        "/Airport/airports/",
        "id",
        "name",
        airportInfo.name,
        airportInfo
      );

      const roleId = await findOrCreate(
        "/Role/roles/",
        "id",
        "name",
        DEFAULT_ROLE_NAME,
        { name: DEFAULT_ROLE_NAME, description: "Cliente que reserva desde la web" }
      );

      const user = await apiFetch<{ id_user: number }>("/User/users/", {
        method: "POST",
        body: JSON.stringify({
          name_user: `${customerData.firstName} ${customerData.lastName}`.trim(),
          phone: customerData.phone,
          email: customerData.email,
          password: crypto.randomUUID(),
          id_role: roleId,
          id_airport: airportId,
        }),
      });

      const vehicle = await apiFetch<{ id: number }>("/Vehicle/vehicles/", {
        method: "POST",
        body: JSON.stringify({
          plate_number: customerData.plate,
          car_make: customerData.carMake,
          car_model: customerData.vehicleModel,
          car_color: "",
          id_user: user.id_user,
        }),
      });

      const booking = await apiFetch<{ id_booking: number }>("/Booking/booking/", {
        method: "POST",
        body: JSON.stringify({
          datetime_checkin: reservation.checkin,
          datetime_checkout: reservation.checkout,
          associated_flight: customerData.flightNumber,
          status_booking: "pending",
          id_airport: airportId,
          id_user: user.id_user,
          id_vehicle: vehicle.id,
        }),
      });

      for (const extraId of extras) {
        const extra = availableExtras.find((item) => item.id === extraId);
        if (!extra) continue;

        const serviceId = await findOrCreate(
          "/Service/services/",
          "id_service",
          "name_service",
          extra.name,
          {
            name_service: extra.name,
            base_price: extra.price,
            description_service: extra.description,
          }
        );

        await apiFetch("/Booking/booking-services/", {
          method: "POST",
          body: JSON.stringify({
            id_service: serviceId,
            id_booking: booking.id_booking,
            aplied_price: extra.price,
          }),
        });
      }

      setBookingId(booking.id_booking);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "No se pudo completar la reserva"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
      {/* RESUMEN */}
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-lg lg:sticky lg:top-8">
        <h2 className="text-xl font-bold text-carbon">
          Resumen de reserva
        </h2>

        <div className="mt-6 space-y-3 text-sm">
          <div>
            <p className="font-semibold">Entrada</p>
            <p>{reservation.checkin}</p>
          </div>

          <div>
            <p className="font-semibold">Salida</p>
            <p>{reservation.checkout}</p>
          </div>

          <div>
            <p className="font-semibold">Aeropuerto</p>
            <p>{reservation.airport}</p>
          </div>

          <div>
            <p className="font-semibold">Duración</p>
            <p>{reservation.days} días</p>
          </div>

          <div>
            <p className="font-semibold">Parking</p>
            <p>
              {parkingType === "covered"
                ? "Cubierto"
                : "Descubierto"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Extras</p>

            {extras.length === 0 ? (
              <p>Ninguno</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {availableExtras
                  .filter((extra) =>
                    extras.includes(extra.id)
                  )
                  .map((extra) => (
                    <li key={extra.id}>• {extra.name}</li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-gray-500">
            Total estimado
          </p>

          <p className="text-4xl font-extrabold text-signal">
            € {total}
          </p>
        </div>

        {step === "extras" ? (
          <button
            className="mt-6 w-full rounded-full bg-signal px-6 py-3 font-semibold text-white transition hover:bg-signal-light"
            type="button"
            onClick={() => setStep("customer-data")}
          >
            Continuar reserva
          </button>
        ) : (
          <>
            <button
              className="mt-6 w-full rounded-full border border-stone-300 px-6 py-3 font-semibold text-carbon transition hover:bg-stone-100"
              type="button"
              onClick={() => setStep("extras")}
            >
              Volver a extras
            </button>

            <button
              className="mt-3 w-full rounded-full bg-signal px-6 py-3 font-semibold text-white transition hover:bg-signal-light disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={handleConfirmBooking}
              disabled={isSubmitting || bookingId !== null}
            >
              {bookingId
                ? "Reserva confirmada ✓"
                : isSubmitting
                ? "Procesando..."
                : `Pagar € ${total}`}
            </button>

            {submitError && (
              <p className="mt-3 text-sm text-red-600">{submitError}</p>
            )}

            {bookingId && (
              <p className="mt-3 text-sm text-green-600">
                Reserva #{bookingId} creada correctamente.
              </p>
            )}
          </>
        )}
      </aside>

      {/* CONFIGURACIÓN */}
      <div className="space-y-6">
        {step === "extras" ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
              Tipo de parking
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {parkingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    parkingType === option.id
                      ? "border-signal ring-2 ring-signal"
                      : "border-stone-200"
                  }`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">
                        {option.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-white">
                        €{option.price} / día
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-4 text-sm text-gray-600">
                      {option.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-signal">
                        €{option.price} / día
                      </span>

                      <input
                        type="radio"
                        name="parkingType"
                        checked={parkingType === option.id}
                        onChange={() => setParkingType(option.id)}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <h2 className="mb-6 mt-10 text-xl font-bold">
              Servicios extra
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {availableExtras.map((extra) => (
                <label
                  key={extra.id}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    extras.includes(extra.id)
                      ? "border-signal ring-2 ring-signal"
                      : "border-stone-200"
                  }`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={extra.image}
                      alt={extra.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">
                        {extra.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-white">
                        Desde €{extra.price}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-4 text-sm text-gray-600">
                      {extra.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-signal">
                        + €{extra.price}
                      </span>

                      <input
                        type="checkbox"
                        checked={extras.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
              Datos del cliente
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Nombre
                </label>
                <input
                  type="text"
                  value={customerData.firstName}
                  onChange={(e) =>
                    updateCustomerData("firstName", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={customerData.lastName}
                  onChange={(e) =>
                    updateCustomerData("lastName", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Email
                </label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) =>
                    updateCustomerData("email", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) =>
                    updateCustomerData("phone", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Matrícula
                </label>
                <input
                  type="text"
                  value={customerData.plate}
                  onChange={(e) =>
                    updateCustomerData("plate", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Modelo del vehículo
                </label>
                <input
                  type="text"
                  value={customerData.vehicleModel}
                  onChange={(e) =>
                    updateCustomerData("vehicleModel", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Marca del vehículo
                </label>
                <input
                  type="text"
                  value={customerData.carMake}
                  onChange={(e) =>
                    updateCustomerData("carMake", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Número de vuelo (opcional)
                </label>
                <input
                  type="text"
                  value={customerData.flightNumber}
                  onChange={(e) =>
                    updateCustomerData("flightNumber", e.target.value)
                  }
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-carbon">
                  Observaciones
                </label>
                <textarea
                  value={customerData.notes}
                  onChange={(e) =>
                    updateCustomerData("notes", e.target.value)
                  }
                  rows={4}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-signal focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
