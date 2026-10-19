import type { PricingRow } from "@/types/rental";
import { site } from "@/data/site";

export const caravanPricingTable: PricingRow[] = [
  { label: "Vuorokausi", season: "69 €", offSeason: "59 €" },
  { label: "Viikonloppu (pe–su)", season: "180 €", offSeason: "150 €" },
  { label: "Viikko", season: "420 €", offSeason: "350 €" },
];

export const hotTubRates = {
  weekdayNight: 59,
  weekdayStretch: 120,
  weekendPackage: 140,
} as const;

export const hotTubPricingRows = [
  {
    label: "Arki (ma–to)",
    value: "59 € / vrk",
    note: "Yksittäiset arkivuorokaudet.",
  },
  {
    label: "Ma–to koko pätkä",
    value: "120 €",
    note: "Koko arkipaketti maanantaista torstaihin.",
  },
  {
    label: "Viikonloppu (pe–su)",
    value: "140 €",
    note: "Koko viikonloppupaketti.",
  },
  {
    label: "Juhlapyhät",
    value: "Erikoishinnoittelu",
    note: "Juhannus, uusivuosi, vappu jne. — kysy tarjous.",
  },
] as const;

export const hotTubTrust = {
  cleanliness:
    "Puhtaustakuu: Jokainen palju desinfioidaan ja pestään huolellisesti ennen luovutusta.",
  hours:
    "Tavanomainen vuokrausaika alkaa klo 14:00 ja päättyy palautuspäivänä klo 12:00 (tai sopimuksen mukaan).",
  pickup: site.pickupNote,
  delivery: site.deliveryNote,
} as const;

export const rentalTerms = [
  {
    title: "Vakuus",
    body: "Varauksen vahvistamiseen peritään 200 € vakuus, joka palautetaan tarkistuksen jälkeen 3–5 arkipäivän kuluessa palautuksesta.",
  },
  {
    title: "Peruutus",
    body: "Yli 14 vrk ennen vuokrausta: täysi hyvitys. 7–14 vrk: 50 % hyvitys. Alle 7 vrk: ei hyvitystä (poikkeustapauksissa neuvotellaan).",
  },
  {
    title: "Omavastuu",
    body: "Omavastuu 800 € / vahinko. Vakuutus ei kata tahallista vahingoittamista tai huolimattomuutta ohjeiden vastaisesti.",
  },
  {
    title: "Paljun vuokra-aika",
    body: hotTubTrust.hours,
  },
  {
    title: "Nouto ja kuljetus",
    body: `${site.pickupNote} ${site.deliveryNote}`,
  },
] as const;

export const footerTermsSummary = {
  deductible: "Omavastuu 800 € / vahinko.",
  cancellation:
    "Peruutus: yli 14 vrk täysi hyvitys, 7–14 vrk 50 % hyvitys, alle 7 vrk ei hyvitystä.",
} as const;
