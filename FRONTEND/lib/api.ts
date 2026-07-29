const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ApiEnvelope<T> = {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: unknown;
};

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body: ApiEnvelope<T> = await res.json();

  if (!res.ok) {
    const detail =
      body.errors && typeof body.errors === "object"
        ? Object.values(body.errors as Record<string, unknown>)
            .flat()
            .join(" ")
        : body.message;
    throw new Error(detail || `Error ${res.status}`);
  }

  return body.data as T;
}

/**
 * Busca un registro existente por `matchField` (comparación case-insensitive) trayendo
 * la lista completa del recurso; si no existe, lo crea. Se evita el parámetro `?search=`
 * del backend porque varias vistas (Airport, Booking) filtran sobre columnas que no
 * coinciden con los nombres reales del modelo.
 */
export async function findOrCreate(
  listPath: string,
  pkField: string,
  matchField: string,
  matchValue: string,
  createPayload: Record<string, unknown>
): Promise<number> {
  const list = await apiFetch<Record<string, unknown>[]>(listPath);
  const existing = list.find(
    (item) => String(item[matchField]).toLowerCase() === matchValue.toLowerCase()
  );
  if (existing) return existing[pkField] as number;

  const created = await apiFetch<Record<string, unknown>>(listPath, {
    method: "POST",
    body: JSON.stringify(createPayload),
  });
  return created[pkField] as number;
}
