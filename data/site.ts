export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "https://paljuvuokrauslahti.fi";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://paljuvuokrauslahti.fi";
  }
}

export const siteUrl = getSiteUrl();

export const siteKeywords = [
  "Paljun vuokraus Lahti",
  "Paljuvuokraus Pertunmaa",
  "Kärrypalju vuokraus Päijät-Häme",
  "paljuvaunu vuokraus Lahti",
  "asuntovaunun vuokraus Lahti",
  "knaus sport 500 kd vuokraus",
  "paljukärry Lahti",
  "Paljuvuokraus Lahti",
] as const;

const pickupQuery = "Penttilänpolku 161, 19430 Pertunmaa, Suomi";

export function googleMapsEmbedUrl(): string {
  const override = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim();
  if (override) return override;
  return `https://maps.google.com/maps?q=${encodeURIComponent(pickupQuery)}&z=14&hl=fi&output=embed`;
}

export const site = {
  name: "Paljuvuokraus Lahti",
  legalName: "Kuitunen Tarja-Leena Tellervo",
  ownerName: "Tarja-Leena Kuitunen",
  businessId: "3529040-7",
  domicile: "Mäntyharju",
  partnerName: "Paljuvuokraus Lahti",
  tagline: "Asuntovaunu ja paljuvaunu",
  description:
    "Vuokraa Knaus Sport 500 KD -asuntovaunu tai paljuvaunu Lahden ja Päijät-Hämeen alueella — selkeä hinta, huolletut laitteet ja nouto sopimuksen mukaan Lahdesta tai Pertunmaalta.",
  metaTitle:
    "Paljun vuokraus Lahti & Pertunmaa | Kärrypalju Päijät-Häme - Paljuvuokraus Lahti",
  metaDescription:
    "Paljun vuokraus Lahti ja Paljuvuokraus Pertunmaa — kärrypalju vuokraus Päijät-Hämeessä. Nouto Lahdesta tai Penttilänpolulta. Alkaen 59 €/vrk. Varaa: info@paljuvuokrauslahti.fi",
  ogImage: "/og.jpg",
  phone: "+358 50 047 4501",
  whatsapp: "+358500474501",
  email: "info@paljuvuokrauslahti.fi",
  logos: {
    caravan: "/brand/caravan-rent-lahti.jpg",
    palju: "/brand/lahden-paljuvuokraus.png",
    icon: "/brand/palju-icon.png",
  },
  address: {
    street: "Penttilänpolku 161",
    city: "19430 Pertunmaa",
    postalCode: "19430",
    locality: "Pertunmaa",
    region: "Päijät-Häme",
    country: "Suomi",
    areaLabel: "Lahti & Päijät-Häme",
  },
  pickupNote:
    "Noutomahdollisuus sopimuksen mukaan sekä Lahdesta että Pertunmaalta (Penttilänpolku 161, 19430 Pertunmaa).",
  deliveryNote:
    "Kuljetuspalvelu alkaen 30 € (Lahti & Päijät-Häme sekä lähialueet).",
  geo: {
    latitude: 61.5034,
    longitude: 26.4789,
  },
  hours: {
    weekdays: "Ma–Pe 9:00–18:00",
    weekend: "La 10:00–15:00 (nouto sopimuksen mukaan)",
    note: "Paljuvaunun tavanomainen vuokrausaika klo 14:00–12:00, ellei toisin sovita.",
  },
  mapEmbedUrl: googleMapsEmbedUrl(),
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pickupQuery)}`,
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;
