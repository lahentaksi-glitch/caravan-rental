export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "https://caravanrentlahti.fi";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://caravanrentlahti.fi";
  }
}

export const siteUrl = getSiteUrl();

export const siteKeywords = [
  "asuntovaunun vuokraus Lahti",
  "paljuvaunu vuokraus Lahti",
  "knaus sport 500 kd vuokraus",
  "paljukärry Lahti",
] as const;

const pickupQuery = "Vuokraamontie 12, 15100 Lahti, Suomi";

export function googleMapsEmbedUrl(): string {
  const override = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim();
  if (override) return override;
  return `https://maps.google.com/maps?q=${encodeURIComponent(pickupQuery)}&z=15&hl=fi&output=embed`;
}

export const site = {
  name: "Caravan Rent Lahti",
  partnerName: "Lahden Paljuvuokraus",
  tagline: "Asuntovaunu ja paljuvaunu Lahden seudulla",
  description:
    "Vuokraa Knaus Sport -asuntovaunu tai elämyksellinen paljuvaunu — helppo nouto Lahdelta, täysi varustelu ja joustavat ajat.",
  ogImage: "/images/caravan/exterior-side.jpg",
  phone: "+358 40 123 4567",
  whatsapp: "+358401234567",
  email: "varaus@caravanrentlahti.fi",
  logos: {
    caravan: "/brand/caravan-rent-lahti.jpg",
    palju: "/brand/lahden-paljuvuokraus.png",
    icon: "/brand/palju-icon.png",
  },
  address: {
    street: "Vuokraamontie 12",
    city: "15100 Lahti",
    region: "Päijät-Häme",
    country: "Suomi",
  },
  geo: {
    latitude: 60.98267,
    longitude: 25.66151,
  },
  hours: {
    weekdays: "Ma–Pe 9:00–18:00",
    weekend: "La 10:00–15:00 (nouto sopimuksen mukaan)",
    note: "Palautus sunnuntaisin klo 18:00 mennessä, ellei toisin sovita.",
  },
  mapEmbedUrl: googleMapsEmbedUrl(),
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Vuokraamontie 12, 15100 Lahti")}`,
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;
