import { site } from "@/data/site";
import { formatFiDate } from "@/lib/dates";
import { formatEuro } from "@/lib/pricing";
import type { RentalExtra, RentalProduct } from "@/types/rental";

export function toWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export interface BookingMessageInput {
  product: RentalProduct;
  dateFrom: string;
  dateTo: string;
  nights: number;
  extras: RentalExtra[];
  subtotal: number;
  extrasTotal: number;
  total: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function buildBookingMessage(input: BookingMessageInput): string {
  const extraLines =
    input.extras.length > 0
      ? input.extras
          .map((extra) => `• ${extra.label} (+${formatEuro(extra.price)})`)
          .join("\n")
      : "Ei lisäpalveluita";

  const nightLabel = input.nights === 1 ? "yö" : "yötä";
  const note = input.message.trim()
    ? `\nViesti:\n${input.message.trim()}`
    : "";

  return `Hei! Haluaisin tehdä varauspyynnön.

Tuote: ${input.product.name}
Ajankohta: ${formatFiDate(input.dateFrom)} – ${formatFiDate(input.dateTo)} (${input.nights} ${nightLabel})
Lisäpalvelut:
${extraLines}

Vuokra: ${formatEuro(input.subtotal)}
Lisät: ${formatEuro(input.extrasTotal)}
Yhteensä: ${formatEuro(input.total)}

Yhteystiedot:
Nimi: ${input.name}
Sähköposti: ${input.email}
Puhelin: ${input.phone}${note}`;
}

export function whatsappBookingUrl(text: string): string {
  const number = toWhatsAppNumber(site.whatsapp);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function mailtoBookingUrl(text: string, productName: string): string {
  const subject = encodeURIComponent(`Varauspyyntö: ${productName}`);
  const body = encodeURIComponent(text);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function customRentalWhatsAppUrl(
  productName: string,
  dateFrom?: string,
  dateTo?: string
): string {
  const dateLine = dateFrom
    ? `\nToiveajankohta: ${formatFiDate(dateFrom)}${dateTo ? ` – ${formatFiDate(dateTo)}` : ""}`
    : "";
  const text = `Hei! Haluaisin kysyä mukautettua tai erikoispituista vuokrausaikaa.

Tuote: ${productName}${dateLine}

Kyseessä on lyhyt, pidempi tai muuten räätälöity jakso kalenterin vakiojaksojen sijaan.`;
  return whatsappBookingUrl(text);
}
