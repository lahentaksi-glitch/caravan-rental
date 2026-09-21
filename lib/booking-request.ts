import type { RentalExtra, RentalProduct, RentalSlug } from "@/types/rental";

export type BookingChannel = "whatsapp" | "email";

export interface BookingApiInput {
  productSlug: RentalSlug;
  dateFrom: string;
  dateTo: string;
  extraIds: string[];
  name: string;
  email: string;
  phone: string;
  message?: string;
  channel: BookingChannel;
}

export interface ResolvedBooking {
  product: RentalProduct;
  extras: RentalExtra[];
  dateFrom: string;
  dateTo: string;
  nights: number;
  subtotal: number;
  extrasTotal: number;
  total: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  channel: BookingChannel;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUGS: RentalSlug[] = ["knaus-sport-500-kd", "paljuvaunu"];

export function isBookingChannel(value: unknown): value is BookingChannel {
  return value === "whatsapp" || value === "email";
}

export function parseBookingInput(body: unknown): BookingApiInput | string {
  if (!body || typeof body !== "object") {
    return "Virheellinen pyyntö.";
  }
  const data = body as Record<string, unknown>;
  const productSlug = data.productSlug;
  if (typeof productSlug !== "string" || !SLUGS.includes(productSlug as RentalSlug)) {
    return "Tuntematon tuote.";
  }
  const dateFrom = data.dateFrom;
  const dateTo = data.dateTo;
  if (typeof dateFrom !== "string" || !ISO_DATE.test(dateFrom)) {
    return "Valitse aloituspäivä.";
  }
  if (typeof dateTo !== "string" || !ISO_DATE.test(dateTo)) {
    return "Valitse päättymispäivä.";
  }
  const extraIds = Array.isArray(data.extraIds)
    ? data.extraIds.filter((id): id is string => typeof id === "string")
    : [];
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!name) return "Syötä nimi.";
  if (!EMAIL.test(email)) return "Syötä kelvollinen sähköposti.";
  if (!phone) return "Syötä puhelinnumero.";
  if (!isBookingChannel(data.channel)) return "Valitse lähetystapa.";

  return {
    productSlug: productSlug as RentalSlug,
    dateFrom,
    dateTo,
    extraIds: extraIds.slice(0, 20),
    name: name.slice(0, 120),
    email: email.slice(0, 180),
    phone: phone.slice(0, 40),
    message: message.slice(0, 2000),
    channel: data.channel,
  };
}
