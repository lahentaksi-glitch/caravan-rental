import type { BookingApiInput } from "@/lib/booking-request";

export async function submitBookingRequest(
  payload: BookingApiInput
): Promise<{ ok: boolean; emailed: boolean }> {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    emailed?: boolean;
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error || "Varauspyynnön lähetys epäonnistui.");
  }
  return { ok: true, emailed: Boolean(data.emailed) };
}
