import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getExtrasForProduct, getProductBySlug } from "@/data/rentals";
import { site } from "@/data/site";
import { customerConfirmationHtml, ownerNotificationHtml } from "@/lib/booking-email";
import { parseBookingInput, type ResolvedBooking } from "@/lib/booking-request";
import { calculateRentalSubtotal, countNights } from "@/lib/pricing";

export const runtime = "nodejs";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    `${site.name} <onboarding@resend.dev>`
  );
}

function notifyAddress(): string {
  return process.env.BOOKING_NOTIFY_EMAIL?.trim() || site.email;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Virheellinen JSON." }, { status: 400 });
  }

  const parsed = parseBookingInput(json);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  const product = getProductBySlug(parsed.productSlug);
  if (!product) {
    return NextResponse.json({ error: "Tuotetta ei löytynyt." }, { status: 400 });
  }

  const nights = countNights(parsed.dateFrom, parsed.dateTo);
  if (nights <= 0) {
    return NextResponse.json({ error: "Tarkista päivämäärät." }, { status: 400 });
  }

  const allowed = getExtrasForProduct(product);
  const extras = allowed.filter((extra) => parsed.extraIds.includes(extra.id));
  const subtotal = calculateRentalSubtotal(product, nights);
  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

  const booking: ResolvedBooking = {
    product,
    extras,
    dateFrom: parsed.dateFrom,
    dateTo: parsed.dateTo,
    nights,
    subtotal,
    extrasTotal,
    total: subtotal + extrasTotal,
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone,
    message: parsed.message ?? "",
    channel: parsed.channel,
  };

  const resend = getResend();
  if (!resend) {
    console.info("[booking] RESEND_API_KEY puuttuu — mock-tila, sähköposteja ei lähetetty.");
    return NextResponse.json({ ok: true, emailed: false, mode: "mock" });
  }

  try {
    const from = fromAddress();
    const owner = notifyAddress();
    const { error: customerError } = await resend.emails.send({
      from,
      to: booking.email,
      subject: `Varauspyyntö vastaanotettu — ${booking.product.name}`,
      html: customerConfirmationHtml(booking),
    });
    if (customerError) {
      throw new Error(customerError.message);
    }
    const { error: ownerError } = await resend.emails.send({
      from,
      to: owner,
      replyTo: booking.email,
      subject: `Uusi varauspyyntö: ${booking.product.name} (${booking.name})`,
      html: ownerNotificationHtml(booking),
    });
    if (ownerError) {
      throw new Error(ownerError.message);
    }
    return NextResponse.json({ ok: true, emailed: true, mode: "resend" });
  } catch (error) {
    console.error("[booking] Resend-virhe", error);
    return NextResponse.json(
      { error: "Sähköpostin lähetys epäonnistui.", emailed: false },
      { status: 502 }
    );
  }
}
