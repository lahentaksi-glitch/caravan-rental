export const ANALYTICS_EVENTS = {
  bookingRequest: "booking_request",
  whatsappBooking: "whatsapp_booking",
  customRentalInquiry: "custom_rental_inquiry",
} as const;

export type BookingChannel = "whatsapp" | "email";

export type AnalyticsProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      eventName: string,
      options?: { props?: AnalyticsProps }
    ) => void;
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return undefined;
  return id;
}

export function getPlausibleDomain(): string | undefined {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  if (!domain || !/^[a-z0-9.-]+$/i.test(domain)) return undefined;
  return domain;
}

export function trackEvent(name: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    /* ignore blocked trackers */
  }

  try {
    window.gtag?.("event", name, props);
  } catch {
    /* ignore blocked trackers */
  }
}

export function trackBookingRequest(
  channel: BookingChannel,
  productSlug: string
): void {
  const props = { channel, product: productSlug };
  trackEvent(ANALYTICS_EVENTS.bookingRequest, props);
  if (channel === "whatsapp") {
    trackEvent(ANALYTICS_EVENTS.whatsappBooking, { product: productSlug });
  }
}

export function trackCustomRentalInquiry(productSlug: string): void {
  trackEvent(ANALYTICS_EVENTS.customRentalInquiry, { product: productSlug });
}
